(function(){
  const ModalManager = {
    overlays: {},
    activeOverlay: null,
    lastFocused: null,
    liveEl: null,
    init(){
      document.addEventListener('DOMContentLoaded', ()=> {
        this.liveEl = document.getElementById('aria-live') || this.createLive();
        const overlays = document.querySelectorAll('#qs-modals .qs-overlay');
        overlays.forEach(o => {
          this.overlays[o.id] = o;
          o.style.display = 'none';
          o.setAttribute('aria-hidden','true');
          const d = o.querySelector('.qs-modal');
          if(d && !d.hasAttribute('tabindex')) d.setAttribute('tabindex','-1');
        });
      });
      this._keydownHandler = this._keydownHandler.bind(this);
    },
    createLive(){
      const el = document.createElement('div');
      el.id = 'aria-live';
      el.setAttribute('aria-live','polite');
      el.setAttribute('aria-atomic','true');
      el.className='visually-hidden';
      document.body.appendChild(el);
      return el;
    },
    announce(msg){
      if(!this.liveEl) this.liveEl = this.createLive();
      try{ this.liveEl.textContent = msg || ''; }catch(e){}
    },
    showModal(id){
      const overlay = this.overlays[id] || document.getElementById(id);
      if(!overlay) return;
      this.lastFocused = document.activeElement;
      // ensure the wrapper that contains overlays is visible
      try{
        var wrapper = document.getElementById('qs-modals');
        if(wrapper && (wrapper.style.display==='none' || !wrapper.style.display)) wrapper.style.display='block';
      }catch(e){}
      overlay.style.display='flex';
      overlay.setAttribute('aria-hidden','false');
      overlay.classList.remove('qs-closing');
      overlay.classList.add('qs-opening');
      this.activeOverlay = overlay;
      const dialog = overlay.querySelector('.qs-modal');
      const title = (dialog && dialog.querySelector('h2')) ? dialog.querySelector('h2').textContent : 'Dialog opened';
      this.announce(title + ' opened');
      setTimeout(()=> {
        const focusables = this._getFocusable(dialog);
        if(focusables.length) focusables[0].focus(); else dialog.focus();
      }, 60);
      document.addEventListener('keydown', this._keydownHandler);
    },
    closeModal(id){
      const overlay = this.overlays[id] || document.getElementById(id);
      if(!overlay) return;
      overlay.classList.remove('qs-opening');
      overlay.classList.add('qs-closing');
      overlay.setAttribute('aria-hidden','true');
      this.announce('Dialog closed');
      const onAnimEnd = (e) => {
        if(e.target !== overlay) return;
        overlay.style.display='none';
        overlay.classList.remove('qs-closing');
        overlay.removeEventListener('animationend', onAnimEnd);
        // if no other overlays are visible, hide the wrapper
        try{
          var wrapper = document.getElementById('qs-modals');
          if(wrapper){
            var any = wrapper.querySelectorAll('.qs-overlay');
            var visible=false;
            for(var i=0;i<any.length;i++){ var s = any[i].style.display; if(s && s.indexOf('flex')!==-1) { visible=true; break; } }
            if(!visible) wrapper.style.display='none';
          }
        }catch(e){}
      };
      overlay.addEventListener('animationend', onAnimEnd);
      document.removeEventListener('keydown', this._keydownHandler);
      if(this.lastFocused && typeof this.lastFocused.focus==='function') this.lastFocused.focus();
      this.activeOverlay = null;
    },
    _getFocusable(container){
      return container.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])');
    },
    _keydownHandler(e){
      if(!this.activeOverlay) return;
      if(e.key === 'Escape' || e.key === 'Esc'){
        e.preventDefault();
        const id = this.activeOverlay.id;
        this.closeModal(id);
        return;
      }
      if(e.key === 'Tab'){
        const dialog = this.activeOverlay.querySelector('.qs-modal');
        const focusables = Array.prototype.slice.call(this._getFocusable(dialog));
        if(!focusables.length) return;
        const idx = focusables.indexOf(document.activeElement);
        if(e.shiftKey){
          if(idx === 0){ e.preventDefault(); focusables[focusables.length-1].focus(); }
        } else {
          if(idx === focusables.length-1){ e.preventDefault(); focusables[0].focus(); }
        }
      }
    }
  };

  // inject animation and visually-hidden styles
  const style = document.createElement('style');
  style.textContent = `
  .visually-hidden{position:absolute!important;height:1px;width:1px;overflow:hidden;clip:rect(1px,1px,1px,1px);white-space:nowrap;border:0;padding:0;margin:-1px}
  .qs-opening .qs-modal{animation:qs-open .18s ease-out forwards; transform-origin:center top}
  .qs-closing .qs-modal{animation:qs-close .16s ease-in forwards}
  @keyframes qs-open{from{opacity:0;transform:translateY(-6px) scale(.997)}to{opacity:1;transform:none}}
  @keyframes qs-close{from{opacity:1;transform:none}to{opacity:0;transform:translateY(-6px) scale(.997)}}
  /* toast styles */
  .rw-toast-root{position:fixed;right:18px;bottom:18px;z-index:9999;display:flex;flex-direction:column;gap:8px;align-items:flex-end}
  .rw-toast{background:var(--rw-surface,#fff);border:1px solid var(--rw-border,#ddd);padding:8px 12px;border-radius:8px;box-shadow:0 6px 18px rgba(2,6,23,.18);max-width:320px;font-size:0.95em;opacity:0;transform:translateY(6px);transition:opacity .18s ease,transform .18s ease}
  .rw-toast.show{opacity:1;transform:none}
  `;
  document.head.appendChild(style);

  // Toast manager
  function ensureToastRoot(){
    var r = document.getElementById('rw-toast-root');
    if(!r){ r = document.createElement('div'); r.id='rw-toast-root'; r.className='rw-toast-root'; document.body.appendChild(r); }
    return r;
  }
  window.showToast = function(msg, timeout){
    try{
      var root = ensureToastRoot();
      var t = document.createElement('div'); t.className='rw-toast'; t.textContent = msg || '';
      root.appendChild(t);
      // allow CSS transition
      setTimeout(function(){ t.classList.add('show'); }, 20);
      setTimeout(function(){ t.classList.remove('show'); setTimeout(function(){ try{ t.parentNode.removeChild(t); }catch(e){} }, 220); }, (typeof timeout==='number'?timeout:3000));
    }catch(e){ try{ alert(msg); }catch(e){} }
  };

  ModalManager.init();
  window.ModalManager = ModalManager;
  window.showQuickModal = function(n){ ModalManager.showModal('qs-modal-'+n); };
  window.closeQuickModal = function(n){ ModalManager.closeModal('qs-modal-'+n); };
  window.applyQuickStage = function(n){
    if(n===1){ if(window.RWD && typeof RWD.updateSalesFlow==='function'){ RWD.updateSalesFlow('lead','Qualified','Quick Sales Stage 1: Account confirmed'); } showToast('Quick Sales: Account & Need confirmed (demo state updated)'); ModalManager.closeModal('qs-modal-1'); }
    else if(n===2){ if(window.RWD && typeof RWD.updateSalesFlow==='function'){ RWD.updateSalesFlow('quote','Config','Quick Sales Stage 2: Quick Quote launched'); } showToast('Quick Sales: Quick Quote launched (demo state updated)'); ModalManager.closeModal('qs-modal-2'); }
    else if(n===3){
      if(window.RWD && typeof RWD.createPursuitViaOIC==='function'){
        if(window.RWD && typeof RWD.updateSalesFlow==='function'){ RWD.updateSalesFlow('opportunity','Closed Won','Quick Sales Stage 3: Converted & handed off'); }
        RWD.createPursuitViaOIC(function(){ showToast('Quick Sales: Converted and pursuit created via OIC (demo state updated)'); ModalManager.closeModal('qs-modal-3'); });
      } else if(window.RWD && typeof RWD.updateSalesFlow==='function'){
        RWD.updateSalesFlow('opportunity','Closed Won','Quick Sales Stage 3: Converted (local)');
        showToast('Quick Sales: Converted (demo state updated)');
        ModalManager.closeModal('qs-modal-3');
      } else { showToast('Demo state not available'); ModalManager.closeModal('qs-modal-3'); }
    }
  };

  // Apply a stage without alerts or closing the UI (used for 'Next' progression)
  window.applyQuickStageSilent = function(n){
    if(n===1){ if(window.RWD && typeof RWD.updateSalesFlow==='function'){ RWD.updateSalesFlow('lead','Qualified','Quick Sales Stage 1: Account confirmed'); } }
    else if(n===2){ if(window.RWD && typeof RWD.updateSalesFlow==='function'){ RWD.updateSalesFlow('quote','Config','Quick Sales Stage 2: Quick Quote launched'); } }
    else if(n===3){ if(window.RWD && typeof RWD.updateSalesFlow==='function'){ RWD.updateSalesFlow('opportunity','Closed Won','Quick Sales Stage 3: Converted & handed off'); } }
  };

  // Advance from stage n to n+1: silently apply current stage, close current modal, then open next
  window.nextQuickStep = function(n){
    var currentId = 'qs-modal-'+n;
    var nextId = 'qs-modal-'+(n+1);
    try{ window.applyQuickStageSilent(n); }catch(e){}
    // close current then open next after a short delay so animations look natural
    try{ ModalManager.closeModal(currentId); }catch(e){}
    setTimeout(function(){ try{ ModalManager.showModal(nextId); }catch(e){} }, 220);
  };

})();
