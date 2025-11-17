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
  `;
  document.head.appendChild(style);

  ModalManager.init();
  window.ModalManager = ModalManager;
  window.showQuickModal = function(n){ ModalManager.showModal('qs-modal-'+n); };
  window.closeQuickModal = function(n){ ModalManager.closeModal('qs-modal-'+n); };
  window.applyQuickStage = function(n){
    if(n===1){ if(window.RWD && typeof RWD.updateSalesFlow==='function'){ RWD.updateSalesFlow('lead','Qualified','Quick Sales Stage 1: Account confirmed'); } alert('Quick Sales: Account & Need confirmed (demo state updated)'); ModalManager.closeModal('qs-modal-1'); }
    else if(n===2){ if(window.RWD && typeof RWD.updateSalesFlow==='function'){ RWD.updateSalesFlow('quote','Config','Quick Sales Stage 2: Quick Quote launched'); } alert('Quick Sales: Quick Quote launched (demo state updated)'); ModalManager.closeModal('qs-modal-2'); }
    else if(n===3){
      if(window.RWD && typeof RWD.createPursuitViaOIC==='function'){
        if(window.RWD && typeof RWD.updateSalesFlow==='function'){ RWD.updateSalesFlow('opportunity','Closed Won','Quick Sales Stage 3: Converted & handed off'); }
        RWD.createPursuitViaOIC(function(){ alert('Quick Sales: Converted and pursuit created via OIC (demo state updated)'); ModalManager.closeModal('qs-modal-3'); });
      } else if(window.RWD && typeof RWD.updateSalesFlow==='function'){
        RWD.updateSalesFlow('opportunity','Closed Won','Quick Sales Stage 3: Converted (local)');
        alert('Quick Sales: Converted (demo state updated)');
        ModalManager.closeModal('qs-modal-3');
      } else { alert('Demo state not available'); ModalManager.closeModal('qs-modal-3'); }
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
