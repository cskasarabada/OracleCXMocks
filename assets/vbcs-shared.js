(function () {
  // Prevent the older persona ribbon from auto-rendering; app.js owns the new quick-jump ribbon.
  window.disableSharedRibbon = true;

  function ensureRibbonStyle() {
    if (window.disableSharedRibbon) return;
    if (document.querySelector('style[data-ribbon-inline]')) return;
    if (!document.querySelector('link[href*="vbcs-shared.css"]')) {
      var s = document.createElement('style');
      s.dataset.ribbonInline = '1';
      s.textContent = '.persona-ribbon{position:fixed;bottom:20px;left:50%;transform:translateX(-50%);background:#2a0f46;color:#fff;border-radius:999px;padding:12px 18px;box-shadow:0 32px 60px rgba(32,10,64,.35);z-index:4000;display:inline-flex;gap:12px;align-items:center;justify-content:center;min-width:280px;max-width:90vw}.persona-ribbon button{background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.25);color:#fff;border-radius:18px;padding:12px 16px;font-weight:800;font-size:15px;cursor:pointer;white-space:nowrap}.persona-ribbon button.active{background:#f97316;border-color:#fcbf9b;color:#0b1324;box-shadow:0 10px 20px rgba(249,115,22,.25)}';
      document.head.appendChild(s);
    }
  }
  function ensureRibbon() {
    if (window.disableSharedRibbon) return;
    ensureRibbonStyle();
    if (document.getElementById('persona-ribbon')) return;
    var bar = document.createElement('div');
    bar.id = 'persona-ribbon';
    bar.className = 'persona-ribbon';
    ['all', 'rep', 'manager'].forEach(function (key) {
      var btn = document.createElement('button');
      btn.textContent = key === 'all' ? 'All Persona' : (key === 'rep' ? 'Sales Rep' : 'Sales Manager');
      btn.dataset.personaToggle = key;
      btn.addEventListener('click', function () {
        if (window.applyPersonaSelection) { window.applyPersonaSelection(key); }
        bar.querySelectorAll('button').forEach(function (b) { b.classList.toggle('active', b.dataset.personaToggle === key); });
      });
      bar.appendChild(btn);
    });
    document.body.appendChild(bar);
    syncActive(bar);
  }
  function syncActive(bar) {
    var ribbon = bar || document.getElementById('persona-ribbon');
    if (!ribbon) return;
    var persona = 'all';
    try { persona = sessionStorage.getItem('rw_persona') || 'all'; } catch (e) { }
    ribbon.querySelectorAll('button').forEach(function (b) {
      b.classList.toggle('active', b.dataset.personaToggle === persona);
    });
  }
  function refreshRibbonOnChange() {
    if (window.disableSharedRibbon) return;
    ensureRibbon();
    syncActive();
  }
  window.initVBCSPersonaRibbon = function () {
    if (window.disableSharedRibbon) return;
    ensureRibbon();
    setInterval(ensureRibbon, 1200);
    document.addEventListener('scroll', ensureRibbon, { passive: true });
    document.addEventListener('rw_persona_change', refreshRibbonOnChange);
  };
  document.addEventListener('DOMContentLoaded', function () {
    if (window.disableRibbonAuto || window.disableSharedRibbon) return;
    window.initVBCSPersonaRibbon && window.initVBCSPersonaRibbon();
  });
})();
