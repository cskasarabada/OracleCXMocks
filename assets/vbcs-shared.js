(function(){
  function ensureRibbon() {
    if (document.getElementById('persona-ribbon')) return;
    var bar = document.createElement('div');
    bar.id = 'persona-ribbon';
    bar.className = 'persona-ribbon';
    ['all','rep','manager'].forEach(function(key){
      var btn = document.createElement('button');
      btn.textContent = key === 'all' ? 'All Persona' : (key === 'rep' ? 'Sales Rep' : 'Sales Manager');
      btn.dataset.personaToggle = key;
      btn.addEventListener('click', function(){
        if (window.applyPersonaSelection) { window.applyPersonaSelection(key); }
        bar.querySelectorAll('button').forEach(function(b){ b.classList.toggle('active', b.dataset.personaToggle === key); });
      });
      bar.appendChild(btn);
    });
    document.body.appendChild(bar);
    var storedPersona = 'all';
    try { storedPersona = sessionStorage.getItem('rw_persona') || 'all'; } catch(e) {}
    bar.querySelectorAll('button').forEach(function(b){ b.classList.toggle('active', b.dataset.personaToggle === storedPersona); });
  }
  function refreshRibbonOnChange() {
    ensureRibbon();
    var bar = document.getElementById('persona-ribbon');
    if (!bar) return;
    var storedPersona = 'all';
    try { storedPersona = sessionStorage.getItem('rw_persona') || 'all'; } catch(e) {}
    bar.querySelectorAll('button').forEach(function(b){ b.classList.toggle('active', b.dataset.personaToggle === storedPersona); });
  }
  window.initVBCSPersonaRibbon = function() {
    ensureRibbon();
    setInterval(ensureRibbon, 1500);
    document.addEventListener('scroll', ensureRibbon, { passive: true });
    document.addEventListener('rw_persona_change', refreshRibbonOnChange);
  };
})();
