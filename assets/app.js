(function () {
  const NAV_LINKS = [
    { href: '#', label: 'All Persona', group: 'persona', personaKey: 'all' },
    { href: '#', label: 'Sales Rep', group: 'persona', personaKey: 'rep' },
    { href: '#', label: 'Sales Manager', group: 'persona', personaKey: 'manager' },
    { href: '#', label: 'Executive', group: 'persona', personaKey: 'exec' },
    { href: '#', label: 'Delivery', group: 'persona', personaKey: 'delivery' },
    { href: '#', label: 'Partner', group: 'persona', personaKey: 'partner' },
    { href: 'index.html', label: 'Overview', group: 'journey' },
    { href: 'Easy_Start_Flows.html', label: 'Easy Start', group: 'journey' },
    { href: 'sales_cloud.html', label: 'Sales Flow', group: 'journey' },
    { href: 'sources.html', label: 'Lead Gen (3rd Party Sources)', group: 'journey' },
    { href: 'cx_lead.html', label: 'Lead', group: 'journey' },
    { href: 'cx_opportunity.html', label: 'Opportunity', group: 'journey' },
    { href: 'my_team.html', label: 'My Team', group: 'journey' },
    { href: 'sales_tools.html', label: 'Sales Tools', group: 'journey' },
    { href: 'ppm_pursuit.html', label: 'PPM Pursuit', group: 'journey' },
    { href: 'ppm_construction.html', label: 'PPM Construction', group: 'journey' },
    { href: 'quick_sales_screen.html', label: 'Quick Sales Screen', accent: true, group: 'journey' },
    { href: 'analytics.html', label: 'Analytics', group: 'toolkit' },
    { href: 'forecasting_pipeline.html', label: 'Forecasting', group: 'toolkit' },
    { href: 'integration_features.html', label: 'Integration', group: 'toolkit' },
    { href: 'sales_process_visualization.html', label: 'Process Visualization', group: 'toolkit' },
    { href: 'results_driven.html', label: 'Results Driven', group: 'toolkit' },
    { href: 'executive_command_center.html', label: 'Exec Command', group: 'toolkit' },
    { href: 'account_360.html', label: 'Account 360', group: 'toolkit' },
    { href: 'partner_hub.html', label: 'Partner Hub', group: 'toolkit' },
    { href: 'revenue_intelligence.html', label: 'Revenue Intelligence', group: 'toolkit' },
    { href: 'field_mobile_snapshot.html', label: 'Field Mobile', group: 'toolkit' },
    { href: 'sales_ppm_sync.html', label: 'Sales-PPM', group: 'toolkit' },
    { href: 'quote_to_docusign.html', label: 'Quote to DocuSign', group: 'toolkit' },
    { href: 'pursuit_project.html', label: 'Pursuit Project', group: 'toolkit' }
  ];
  const NAV_GROUP_LABELS = {
    persona: 'Persona Views',
    journey: 'Sales & Delivery Journey',
    toolkit: 'Insights & Toolkit'
  };
  const PERSONA_FILTERS = {
    all: null,
    rep: [
      'account_360.html',
      'quick_sales_screen.html',
      'sources.html',
      'cx_lead.html',
      'cx_opportunity.html',
      'sales_cloud.html',
      'sales_tools.html',
      'quote_to_docusign.html'
    ],
    manager: [
      'analytics.html',
      'forecasting_pipeline.html',
      'revenue_intelligence.html',
      'executive_command_center.html',
      'account_360.html',
      'sales_process_visualization.html',
      'sales_cloud.html',
      'sources.html',
      'my_team.html'
    ],
    exec: [
      'executive_command_center.html',
      'analytics.html',
      'revenue_intelligence.html',
      'forecasting_pipeline.html',
      'results_driven.html',
      'sales_process_visualization.html',
      'account_360.html',
      'sales_cloud.html'
    ],
    delivery: [
      'ppm_pursuit.html',
      'ppm_construction.html',
      'pursuit_project.html',
      'sales_ppm_sync.html',
      'quote_to_docusign.html',
      'integration_features.html'
    ],
    partner: [
      'partner_hub.html',
      'integration_features.html',
      'sales_tools.html',
      'sales_cloud.html'
    ]
  };

  const PERSONA_META = [
    { key: 'all', label: 'All Persona', desc: 'Show every mockup', accent: '#334155' },
    { key: 'rep', label: 'Sales Rep', desc: 'Leads, quotes, quick sales', accent: '#ef4444' },
    { key: 'manager', label: 'Sales Manager', desc: 'Forecasting, team, analytics', accent: '#0ea5e9' },
    { key: 'exec', label: 'Executive', desc: 'Exec command, revenue, results', accent: '#8b5cf6' },
    { key: 'delivery', label: 'Delivery', desc: 'PPM pursuits, projects, handoff', accent: '#10b981' },
    { key: 'partner', label: 'Partner', desc: 'Partner hub, integrations', accent: '#f59e0b' }
  ];
  function injectAssistantChrome() {
    if (document.getElementById('ai-assist-launch')) return;
    var style = document.createElement('style');
    style.textContent = "\n      .ai-assist-launch {\n        position: fixed;\n        bottom: 22px;\n        right: 20px;\n        z-index: 902;\n        background: #0f172a;\n        color: #fff;\n        border: 1px solid rgba(255,255,255,.16);\n        border-radius: 12px;\n        padding: 12px 14px;\n        font-weight: 700;\n        box-shadow: 0 18px 30px rgba(12,18,30,.32);\n        cursor: pointer;\n      }\n      .ai-assist-pop {\n        position: fixed;\n        top: 86px;\n        right: 18px;\n        width: min(360px, 92vw);\n        max-height: calc(100vh - 120px);\n        background: #fff;\n        border-radius: 16px;\n        border: 1px solid rgba(15,23,42,.14);\n        box-shadow: 0 30px 70px rgba(0,0,0,.25);\n        display: none;\n        flex-direction: column;\n        overflow: hidden;\n        z-index: 901;\n      }\n      .ai-assist-pop.open { display: flex; }\n      .ai-assist-head {\n        display: flex;\n        justify-content: space-between;\n        align-items: center;\n        padding: 12px 14px;\n        border-bottom: 1px solid rgba(15,23,42,.08);\n      }\n      .ai-assist-head h4 { margin: 0; font-size: 1rem; }\n      .ai-assist-head p { margin: 0; color: #475467; }\n      .ai-assist-feed {\n        list-style: none;\n        margin: 0;\n        padding: 12px;\n        display: flex;\n        flex-direction: column;\n        gap: 10px;\n        overflow: auto;\n        max-height: 320px;\n        background: #f8fafc;\n      }\n      .ai-assist-feed .msg { display: flex; }\n      .ai-assist-feed .msg span {\n        padding: 9px 11px;\n        border-radius: 12px;\n        font-size: 13px;\n        line-height: 1.35;\n        max-width: 92%;\n      }\n      .ai-assist-feed .msg.user { justify-content: flex-end; }\n      .ai-assist-feed .msg.user span { background: #ffeadb; color: #7c2d12; }\n      .ai-assist-feed .msg.assistant span { background: #0f172a; color: #fff; }\n      .ai-assist-compose { display: flex; gap: 8px; padding: 10px 12px; border-top: 1px solid rgba(15,23,42,.08); background:#fff; }\n      .ai-assist-compose input {\n        flex: 1;\n        border: 1px solid rgba(15,23,42,.12);\n        border-radius: 10px;\n        padding: 9px 10px;\n      }\n      .ai-assist-compose button {\n        border: 1px solid #0f172a;\n        background: #0f172a;\n        color: #fff;\n        border-radius: 10px;\n        padding: 9px 12px;\n        font-weight: 700;\n        cursor: pointer;\n      }\n      @media (max-width: 640px) {\n        .ai-assist-launch { right: 12px; bottom: 16px; }\n        .ai-assist-pop { right: 10px; left: 10px; width: auto; top: 78px; }\n      }\n    ";
    document.head.appendChild(style);
    var launch = document.createElement('button');
    launch.id = 'ai-assist-launch';
    launch.className = 'ai-assist-launch';
    launch.textContent = 'Oracle GenAI Assistant';
    var panel = document.createElement('div');
    panel.id = 'ai-assist-panel';
    panel.className = 'ai-assist-pop';
    panel.innerHTML = '<div class="ai-assist-head"><div><p class="eyebrow">GenAI</p><h4>Oracle Assistant</h4></div><button class="ghost-btn small" data-close>Close</button></div><ul class="ai-assist-feed" id="ai-assist-feed"></ul><div class="ai-assist-compose"><input type="text" id="ai-assist-input" placeholder="Ask about leads, opportunities, quotes..." autocomplete="off" /><button type="button" id="ai-assist-send">Send</button></div>';
    function appendMsg(text, who) {
      var feed = panel.querySelector('#ai-assist-feed');
      if (!feed) return;
      var li = document.createElement('li');
      li.className = 'msg ' + who;
      li.innerHTML = '<span>' + text + '</span>';
      feed.appendChild(li);
      feed.scrollTop = feed.scrollHeight;
    }
    function sendMessage() {
      var input = panel.querySelector('#ai-assist-input');
      if (!input || !input.value.trim()) return;
      appendMsg(input.value.trim(), 'user');
      appendMsg('On it. I will surface risks, smart actions, and quote status for this record.', 'assistant');
      input.value = '';
    }
    function closePanel() { panel.classList.remove('open'); }
    launch.addEventListener('click', function () { panel.classList.toggle('open'); });
    panel.querySelector('[data-close]').addEventListener('click', closePanel);
    panel.querySelector('#ai-assist-send').addEventListener('click', sendMessage);
    panel.querySelector('#ai-assist-input').addEventListener('keypress', function (e) { if (e.key === 'Enter') { e.preventDefault(); sendMessage(); } });
    document.body.appendChild(panel);
    document.body.appendChild(launch);
    appendMsg('Hi there. I can summarize Account 360, Opportunity, Quick Sales, or Analytics on this page.', 'assistant');
  }

  const KEY = 'rw_demo_v2';
  const FLOW_STAGES = [
    { key: 'lead', label: 'Lead', owner: 'Sales Development', statuses: ['New', 'Working', 'Qualified', 'Nurture'], description: 'SDR captures interest and qualifies the inbound record.' },
    { key: 'opportunity', label: 'Opportunity', owner: 'Account Executive', statuses: ['Qualification', 'Evaluation', 'Proposal', 'Negotiation', 'Closed Won'], description: 'AE manages discovery, solutioning and negotiations.' },
    { key: 'quote', label: 'Quote', owner: 'Sales Operations', statuses: ['Config', 'Pricing', 'Released to Customer', 'Accepted'], description: 'Sales Ops configures price list items and publishes quote to customer.' },
    { key: 'pursuit', label: 'Pursuit (PPM)', owner: 'Pursuit Manager', statuses: ['Draft', 'Costing', 'Submitted', 'Awarded'], description: 'OIC pushes qualified deals to PPM where Pursuit Managers refine estimates.' },
    { key: 'project', label: 'Project Delivery', owner: 'Project Manager', statuses: ['Planning', 'Execution', 'Substantial Completion', 'Warranty'], description: 'Awarded pursuits become delivery projects that track execution milestones.' }
  ];
  const SCENARIOS = {
    skyline: {
      label: 'Skyline Renewables Microgrid',
      lead: { company: 'Skyline Renewables', contact: 'Lena Ortiz', score: 78, status: 'Working', product: 'Solar Power Generation' },
      oppty: { name: 'Skyline Microgrid Modernization', amount: 1250000, stage: 'Qualification' },
      pursuit: { name: 'Skyline Microgrid Modernization - Pursuit', estimate: 1250000, status: 'Draft' },
      project: { name: 'Skyline Microgrid Modernization - Construction', budget: 1287500, status: 'Planning' },
      storyline: [
        { stage: 'Lead', event: 'Inbound Signal', detail: 'Captured during Sustainability Summit registration.' },
        { stage: 'Opportunity', event: 'AE Assigned', detail: 'Jessica Brooks engages value engineering team.' },
        { stage: 'Pursuit', event: 'Costing', detail: 'PPM estimators loading rates for quick-turn proposal.' }
      ]
    },
    apex: {
      label: 'Apex Healthcare Expansion',
      lead: { company: 'Apex Healthcare', contact: 'Marcus Lee', score: 84, status: 'Qualified', product: 'Clinical Wing Expansion' },
      oppty: { name: 'Apex Tower CX/PPM Rollout', amount: 1860000, stage: 'Evaluation' },
      pursuit: { name: 'Apex Tower CX/PPM Pursuit', estimate: 1860000, status: 'Costing' },
      project: { name: 'Apex Tower Delivery', budget: 1915000, status: 'Execution' },
      storyline: [
        { stage: 'Lead', event: 'Referral', detail: 'Partner referred Apex expansion to Argano.' },
        { stage: 'Opportunity', event: 'Discovery', detail: 'Hybrid sales + services bundle framed with Smart Actions.' },
        { stage: 'Pursuit', event: 'Resource Request', detail: 'PPM resource manager flagged estimating gap.' }
      ]
    },
    metro: {
      label: 'Metro City Rail Upgrade',
      lead: { company: 'Metro City Rail', contact: 'Sarah Jenkins', score: 92, status: 'Qualified', product: 'Signaling Infrastructure' },
      oppty: { name: 'Metro Rail Signaling Upgrade', amount: 4500000, stage: 'Proposal' },
      pursuit: { name: 'Metro Rail Signaling Pursuit', estimate: 4200000, status: 'Submitted' },
      project: { name: 'Metro Rail Signaling Delivery', budget: 4500000, status: 'Planning' },
      storyline: [
        { stage: 'Lead', event: 'RFP Issued', detail: 'Public tender for signaling modernization.' },
        { stage: 'Opportunity', event: 'Bid Prep', detail: 'Engineering team reviewing technical requirements.' },
        { stage: 'Pursuit', event: 'Review', detail: 'Legal and Finance approving bid terms.' }
      ]
    },
    global: {
      label: 'Global Data Systems HQ',
      lead: { company: 'Global Data Systems', contact: 'David Chen', score: 65, status: 'New', product: 'Data Center HVAC' },
      oppty: { name: 'GDS Data Center Cooling', amount: 850000, stage: 'Qualification' },
      pursuit: { name: 'GDS Cooling Pursuit', estimate: 800000, status: 'Draft' },
      project: { name: 'GDS Cooling Install', budget: 850000, status: 'Planned' },
      storyline: [
        { stage: 'Lead', event: 'Web Inquiry', detail: 'Downloaded whitepaper on efficient cooling.' },
        { stage: 'Opportunity', event: 'Outreach', detail: 'SDR scheduling initial discovery call.' },
        { stage: 'Pursuit', event: 'Pending', detail: 'Awaiting qualification.' }
      ]
    },
    oceanic: {
      label: 'Oceanic Logistics Port',
      lead: { company: 'Oceanic Logistics', contact: 'Fiona Gallagher', score: 88, status: 'Working', product: 'Port Automation' },
      oppty: { name: 'Port Automation Phase 1', amount: 3200000, stage: 'Negotiation' },
      pursuit: { name: 'Port Automation Pursuit', estimate: 3100000, status: 'Awarded' },
      project: { name: 'Port Automation Delivery', budget: 3200000, status: 'Execution' },
      storyline: [
        { stage: 'Lead', event: 'Trade Show', detail: 'Met at Logistics World conference.' },
        { stage: 'Opportunity', event: 'Demo', detail: 'On-site demo of automation software.' },
        { stage: 'Pursuit', event: 'Contracting', detail: 'Finalizing MSA and SOW.' }
      ]
    }
  };
  const read = () => { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return {}; } };
  const write = (d) => localStorage.setItem(KEY, JSON.stringify(d));
  const subscribers = new Set();
  const now = () => new Date().toLocaleString();
  const clone = (data) => data ? JSON.parse(JSON.stringify(data)) : data;
  function upsert(list, predicate, data) {
    if (!Array.isArray(list)) return;
    const idx = list.findIndex(predicate);
    if (idx > -1) { list[idx] = Object.assign({}, list[idx], data); }
    else { list.unshift(Object.assign({}, data)); }
  }
  function parseAmount(val) {
    if (typeof val === 'number') return val;
    if (typeof val !== 'string') return 0;
    var cleaned = val.replace(/[$,\s]/g, '').toLowerCase();
    var mult = 1;
    if (cleaned.endsWith('m')) { mult = 1e6; cleaned = cleaned.slice(0, -1); }
    else if (cleaned.endsWith('k')) { mult = 1e3; cleaned = cleaned.slice(0, -1); }
    var num = parseFloat(cleaned);
    return isNaN(num) ? 0 : Math.round(num * mult);
  }
  function currency(num) { return '$' + Number(num || 0).toLocaleString(); }
  function upsert(list, predicate, data) {
    if (!Array.isArray(list)) return;
    const idx = list.findIndex(predicate);
    if (idx > -1) { list[idx] = Object.assign({}, list[idx], data); }
    else { list.unshift(data); }
  }
  function broadcast() {
    const snapshot = ensure();
    subscribers.forEach(function (cb) {
      try { cb(snapshot); } catch (e) { console.warn('timeline subscriber failed', e); }
    });
  }
  function commit(d) {
    write(d);
    broadcast();
  }
  function ensure() {
    let d = read();
    // Auto-seed with Skyline scenario if state is empty
    if ((!d.lead || !d.lead.company) && (!d.oppty || !d.oppty.name)) {
      if (SCENARIOS && SCENARIOS.skyline) {
        const seed = JSON.parse(JSON.stringify(SCENARIOS.skyline));
        d = Object.assign(d, seed);
        d.logs = d.logs || [];
        d.timeline = d.timeline || [];
        d.logs.unshift('[' + now() + '] System initialized with Skyline Renewables scenario');
      }
    }

    d.lead = d.lead || { company: '', contact: '', score: 60, status: 'Unqualified', activities: [] };
    d.oppty = d.oppty || { name: '', amount: 0, stage: 'Qualification', activities: [] };
    d.pursuit = d.pursuit || { name: '', estimate: 0, status: 'Draft' };
    d.const = d.const || { name: '', budget: 0, status: 'Planned' };
    if (!d.salesFlow) {
      d.salesFlow = {};
      const stamp = now();
      FLOW_STAGES.forEach(function (stage) {
        d.salesFlow[stage.key] = { status: stage.statuses[0], owner: stage.owner, note: '', updated: stamp };
      });
    }
    d.logs = d.logs || [];
    d.timeline = d.timeline || [];
    d.leads = d.leads || [];
    d.opportunities = d.opportunities || [];
    write(d);
    return d;
  }
  function log(msg) {
    const d = ensure();
    d.logs.unshift('[' + now() + '] ' + msg);
    d.logs = d.logs.slice(0, 60);
    commit(d);
  }
  function addAct(arr, type, text) { arr.unshift({ ts: now(), type, text, who: 'System' }); }
  function stageName(key) {
    const hit = FLOW_STAGES.find(function (s) { return s.key === key; });
    return hit ? hit.label : (key || 'Stage');
  }
  function addTimeline(d, stage, event, detail) {
    if (!d.timeline) d.timeline = [];
    d.timeline.unshift({ ts: now(), stage: stage, event: event, detail: detail || '' });
    d.timeline = d.timeline.slice(0, 30);
  }
  function pickScenario(name) {
    if (name && SCENARIOS[name]) return name;
    return Object.keys(SCENARIOS)[0];
  }
  function parseAmount(val) {
    if (typeof val === 'number') return val;
    if (typeof val !== 'string') return 0;
    var cleaned = val.replace(/[$,\s]/g, '').toLowerCase();
    var mult = 1;
    if (cleaned.endsWith('m')) { mult = 1e6; cleaned = cleaned.slice(0, -1); }
    else if (cleaned.endsWith('k')) { mult = 1e3; cleaned = cleaned.slice(0, -1); }
    var num = parseFloat(cleaned);
    return isNaN(num) ? 0 : Math.round(num * mult);
  }
  function currency(num) { return '$' + Number(num || 0).toLocaleString(); }

  window.RWD = {
    reset() { localStorage.removeItem(KEY); broadcast(); },
    get() { return ensure(); },
    availableScenarios() {
      return Object.keys(SCENARIOS).map(function (key) {
        return { key, label: SCENARIOS[key].label || key };
      });
    },
    loadScenario(name) {
      const scenarioKey = pickScenario(name);
      const conf = SCENARIOS[scenarioKey];
      const d = ensure();
      d.lead = Object.assign({}, d.lead, conf.lead || {});
      d.lead.activities = [];
      d.oppty = Object.assign({}, d.oppty, conf.oppty || {});
      d.oppty.activities = [];
      d.pursuit = Object.assign({}, d.pursuit, conf.pursuit || {});
      d.const = Object.assign({}, d.const, conf.project || {});
      if (d.salesFlow.lead) { d.salesFlow.lead.status = d.lead.status || d.salesFlow.lead.status; d.salesFlow.lead.updated = now(); }
      if (d.salesFlow.opportunity) { d.salesFlow.opportunity.status = d.oppty.stage || d.salesFlow.opportunity.status; d.salesFlow.opportunity.updated = now(); }
      d.leads = clone(conf.leadsList || []);
      d.opportunities = clone(conf.opptyList || []);
      d.timeline = [];
      (conf.storyline || []).forEach(function (item) {
        addTimeline(d, item.stage, item.event, item.detail);
      });
      d.logs = [];
      commit(d);
      log('Scenario loaded: ' + (conf.label || scenarioKey));
      return scenarioKey;
    },
    timeline(limit) {
      const d = ensure();
      return (d.timeline || []).slice(0, typeof limit === 'number' ? limit : 10);
    },
    clearTimeline() {
      const d = ensure();
      d.timeline = [];
      commit(d);
    },

    // Lead
    saveLead(f) {
      const d = ensure();
      d.lead.company = f.company.value;
      d.lead.name = f.name.value || (d.lead.company + ' Lead');
      d.lead.contact = f.contact.value;
      d.lead.score = Number(f.score.value || 60);
      d.lead.status = f.status.value || 'Working';
      d.lead.owner = f.owner.value || 'Chandra Kasarabada';
      addAct(d.lead.activities, 'Update', 'Lead qualified');
      addTimeline(d, 'Lead', 'Qualified', 'Score ' + d.lead.score);
      d.leads = d.leads || [];
      const entry = {
        company: d.lead.company,
        name: d.lead.name,
        contact: d.lead.contact,
        owner: d.lead.owner,
        leadStatus: d.lead.status,
        opportunity: (f.opportunity && f.opportunity.value) || (d.lead.company + ' Opportunity'),
        opportunityStage: (f.opportunityStage && f.opportunityStage.value) || 'Qualification',
        amount: parseAmount(f.estAmount && f.estAmount.value ? f.estAmount.value : (d.lead.score * 10000)),
        pursuitStatus: (f.pursuitStatus && f.pursuitStatus.value) || 'Draft',
        project: (f.project && f.project.value) || (d.lead.company + ' Delivery'),
        projectStatus: (f.projectStatus && f.projectStatus.value) || 'Planning'
      };
      upsert(d.leads, function (row) { return row && row.company === entry.company && row.name === entry.name; }, entry);
      d.leads = d.leads.slice(0, 10);
      commit(d);
      log('Lead qualified for ' + d.lead.company);
    },
    updateLead(fields) {
      const d = ensure();
      const payload = Object.assign({}, fields);
      if (payload.company) d.lead.company = payload.company;
      if (payload.name) d.lead.name = payload.name;
      if (payload.contact) d.lead.contact = payload.contact;
      if (payload.score) d.lead.score = Number(payload.score);
      if (payload.status) d.lead.status = payload.status;
      if (payload.owner) d.lead.owner = payload.owner;
      addAct(d.lead.activities, 'Update', 'Lead updated');
      addTimeline(d, 'Lead', 'Details Updated', d.lead.company);
      d.leads = d.leads || [];
      upsert(d.leads, function (row) { return row && row.company === d.lead.company && row.name === d.lead.name; }, {
        company: d.lead.company,
        name: d.lead.name,
        contact: d.lead.contact,
        owner: d.lead.owner,
        leadStatus: d.lead.status
      });
      commit(d);
      log('Lead updated for ' + d.lead.company);
    },
    convertToOpportunity() {
      const d = ensure();
      d.oppty.name = d.lead.company + ' - New Build';
      d.oppty.amount = Math.max(250000, d.lead.score * 10000);
      d.oppty.stage = 'Qualification';
      addAct(d.oppty.activities, 'Convert', 'Lead converted to Opportunity');
      addTimeline(d, 'Opportunity', 'Converted', 'Created from ' + (d.lead.company || 'lead'));
      d.opportunities = d.opportunities || [];
      upsert(d.opportunities, function (row) { return row && row.name === d.oppty.name; }, {
        name: d.oppty.name,
        company: d.lead.company,
        stage: d.oppty.stage,
        amount: d.oppty.amount,
        owner: 'Jessica Brooks'
      });
      d.opportunities = d.opportunities.slice(0, 10);
      commit(d);
      log('Lead converted to Opportunity');
    },

    // OIC job simulator
    runOICJob(kind, next) { ensure(); log('OIC job started: ' + kind); const id = Math.floor(Math.random() * 9000 + 1000); setTimeout(() => { log('OIC job ' + id + ' completed: ' + kind); if (next) next(id); }, 900); },

    // Opportunity
    saveOppty(f) {
      const d = ensure();
      d.oppty.name = f.name.value;
      d.oppty.amount = Number(f.amount.value || 0);
      d.oppty.stage = f.stage.value;
      d.oppty.account = (f.company && f.company.value) || d.oppty.account || d.lead.company;
      addAct(d.oppty.activities, 'Update', 'Opportunity updated');
      addTimeline(d, 'Opportunity', 'Updated', d.oppty.stage + ' stage');
      d.opportunities = d.opportunities || [];
      upsert(d.opportunities, function (item) { return item && item.name === d.oppty.name; }, {
        name: d.oppty.name,
        company: d.oppty.account,
        stage: d.oppty.stage,
        amount: d.oppty.amount,
        owner: f.owner && f.owner.value ? f.owner.value : 'Jessica Brooks'
      });
      d.opportunities = d.opportunities.slice(0, 10);
      commit(d);
    },
    createPursuitViaOIC(cb) {
      const d = ensure();
      d.pursuit.name = d.oppty.name + ' - Pursuit';
      d.pursuit.estimate = d.oppty.amount;
      d.pursuit.status = 'Draft';
      addTimeline(d, 'Pursuit', 'OIC Sync', 'Creating pursuit in PPM');
      commit(d);
      this.runOICJob('Create Pursuit in PPM', () => {
        const latest = ensure();
        addAct(latest.oppty.activities, 'Integration', 'Pursuit created in PPM');
        addTimeline(latest, 'Pursuit', 'PPM Record Ready', latest.pursuit.name);
        commit(latest);
        if (cb) cb();
      });
    },

    // Pursuit
    savePursuit(f) {
      const d = ensure();
      d.pursuit.name = f.name.value;
      d.pursuit.estimate = Number(f.estimate.value || 0);
      addTimeline(d, 'Pursuit', 'Updated', 'Estimate $' + d.pursuit.estimate.toLocaleString());
      commit(d);
    },
    awardToConstruction(cb) {
      const d = ensure();
      d.const.name = d.pursuit.name.replace(/ - Pursuit$/, '') + ' - Construction';
      d.const.budget = Math.round(d.pursuit.estimate * 1.03);
      d.const.status = 'Active';
      addTimeline(d, 'Project', 'Award in progress', d.const.name);
      commit(d);
      this.runOICJob('Create Construction in PPM', () => {
        const latest = ensure();
        addAct(latest.oppty.activities, 'Integration', 'Construction project created');
        addTimeline(latest, 'Project', 'Activated', latest.const.name + ' budget $' + latest.const.budget.toLocaleString());
        latest.const.status = 'Active';
        commit(latest);
        if (cb) cb();
      });
    },

    // Construction
    completeSubstantial(cb) {
      const d = ensure();
      d.const.status = 'Substantially Complete';
      addTimeline(d, 'Project', 'Milestone', 'Substantial completion achieved');
      commit(d);
      log('Substantial Completion -> Warranty start');
      addAct(d.oppty.activities, 'Milestone', 'Substantial Completion');
      if (cb) cb();
    },

    // Smart Actions
    actLead(type) {
      const d = ensure();
      addAct(d.lead.activities, type, 'Action on Lead: ' + type);
      addTimeline(d, 'Lead', 'Action: ' + type, 'Smart Action rail');
      commit(d);
      log('Lead action: ' + type);
    },
    actOppty(type) {
      const d = ensure();
      addAct(d.oppty.activities, type, 'Action on Opportunity: ' + type);
      addTimeline(d, 'Opportunity', 'Action: ' + type, 'Smart Action rail');
      commit(d);
      log('Opportunity action: ' + type);
    },
    actPursuit(type) {
      const d = ensure();
      addTimeline(d, 'Pursuit', 'Action: ' + type, 'Smart Action rail');
      commit(d);
      log('Pursuit action: ' + type);
    },
    actProject(type) {
      const d = ensure();
      addTimeline(d, 'Project', 'Action: ' + type, 'Smart Action rail');
      commit(d);
      log('Project action: ' + type);
    },

    // Sales Cloud flow helpers
    updateSalesFlow(stageKey, status, note) {
      const d = ensure();
      if (!d.salesFlow[stageKey]) return;
      d.salesFlow[stageKey].status = status;
      if (typeof note === 'string') d.salesFlow[stageKey].note = note;
      d.salesFlow[stageKey].updated = now();
      addAct(d.oppty.activities, 'Sales Flow', stageKey + ' -> ' + status);
      if (stageKey === 'lead' && status === 'Qualified') { d.lead.status = 'Qualified'; }
      if (stageKey === 'opportunity') { d.oppty.stage = status; }
      addTimeline(d, stageName(stageKey), status, note || '');
      commit(d);
      log('Sales flow updated: ' + stageKey + ' -> ' + status);
    },
    // Agent simulation: run demo agents that perform periodic actions
    _agentHandles: {},
    _agentState: {},
    startAgent(type) {
      const key = String(type || '').toLowerCase();
      if (this._agentHandles[key]) return; // already running
      this._agentState[key] = this._agentState[key] || { running: true, lastAction: '' };
      this._agentState[key].running = true;

      if (key === 'sales' || key === 'sales agent') {
        // Sales Agent: qualify leads, convert to opportunity, advance stages
        const iv = setInterval(() => {
          try {
            const d = ensure();
            if (!d.lead || d.lead.status !== 'Qualified') {
              d.lead.company = d.lead.company || ('Acme Co ' + Math.floor(Math.random() * 900 + 100));
              d.lead.contact = d.lead.contact || 'rep@' + d.lead.company.replace(/\s+/g, '').toLowerCase() + '.com';
              d.lead.score = d.lead.score || (50 + Math.floor(Math.random() * 40));
              d.lead.status = 'Qualified';
              addAct(d.lead.activities, 'Agent', 'Sales Agent qualified lead');
              write(d); log('Sales Agent qualified lead for ' + d.lead.company);
              this._agentState[key].lastAction = 'Qualified lead: ' + d.lead.company;
              return;
            }
            if (!d.oppty || !d.oppty.name) {
              this.convertToOpportunity();
              this._agentState[key].lastAction = 'Converted lead to Opportunity';
              return;
            }
            // advance opportunity stage if possible
            const stages = ['Qualification', 'Evaluation', 'Proposal', 'Negotiation', 'Closed Won'];
            const idx = stages.indexOf(d.oppty.stage || 'Qualification');
            if (idx < stages.length - 1 && Math.random() > 0.4) {
              d.oppty.stage = stages[idx + 1];
              addAct(d.oppty.activities, 'Agent', 'Sales Agent advanced opportunity to ' + d.oppty.stage);
              write(d); log('Sales Agent advanced opportunity to ' + d.oppty.stage);
              this._agentState[key].lastAction = 'Advanced opportunity to ' + d.oppty.stage;
            }
          } catch (e) { console.error('sales agent', e); }
        }, 5000 + Math.floor(Math.random() * 3000));
        this._agentHandles[key] = iv;
      } else if (key === 'forecast' || key === 'forecasting agent') {
        // Forecasting Agent: read pipeline and produce forecast suggestions
        const iv = setInterval(() => {
          try {
            const d = ensure();
            const amt = (d.oppty && d.oppty.amount) ? d.oppty.amount : (100000 + Math.floor(Math.random() * 900000));
            const suggested = Math.round(amt * (0.9 + Math.random() * 0.2));
            const confidence = 60 + Math.floor(Math.random() * 35);
            d.forecast = { suggested, confidence, ts: now() };
            addAct(d.oppty.activities || [], 'Agent', 'Forecasting Agent suggested $' + suggested + ' (' + confidence + '%)');
            write(d); log('Forecasting Agent suggested $' + suggested + ' (' + confidence + '%)');
            this._agentState[key].lastAction = 'Suggested $' + suggested + ' (' + confidence + '%)';
          } catch (e) { console.error('forecast agent', e); }
        }, 8000 + Math.floor(Math.random() * 4000));
        this._agentHandles[key] = iv;
      } else if (key === 'integration' || key === 'integration agent') {
        // Integration Agent: run OIC job simulations regularly
        const iv = setInterval(() => {
          try {
            const kinds = ['Sync CX→PPM', 'Sync PPM→CX', 'Push Pursuit', 'Update Estimates'];
            const kind = kinds[Math.floor(Math.random() * kinds.length)];
            this.runOICJob(kind, (id) => {
              const d = ensure();
              addAct(d.oppty.activities || [], 'Agent', 'Integration Agent ran ' + kind + ' (id:' + id + ')');
              write(d); log('Integration Agent completed job ' + id + ' (' + kind + ')');
              this._agentState[key].lastAction = kind + ' → ' + id;
            });
          } catch (e) { console.error('integration agent', e); }
        }, 10000 + Math.floor(Math.random() * 6000));
        this._agentHandles[key] = iv;
      } else {
        // unknown type: create a simple heartbeat
        const iv = setInterval(() => {
          try { log('Agent [' + type + '] heartbeat'); this._agentState[key].lastAction = 'heartbeat ' + now(); } catch (e) { }
        }, 7000);
        this._agentHandles[key] = iv;
      }
    },
    stopAgent(type) {
      const key = String(type || '').toLowerCase();
      const h = this._agentHandles[key];
      if (h) { clearInterval(h); delete this._agentHandles[key]; }
      this._agentState[key] = this._agentState[key] || {}; this._agentState[key].running = false; this._agentState[key].lastAction = 'stopped';
    },
    getAgentStates() { return Object.assign({}, this._agentState); },
    subscribe(fn) {
      if (typeof fn !== 'function') return function () { };
      subscribers.add(fn);
      try { fn(ensure()); } catch (e) { }
      return function () { subscribers.delete(fn); };
    },
    runScenarioFlow(opts) {
      const scenarioKey = this.loadScenario(opts && opts.scenario);
      const scenario = SCENARIOS[scenarioKey];
      const leadEntry = (scenario.leadsList && scenario.leadsList[0]) || {};
      const opptyEntry = (scenario.opptyList && scenario.opptyList[0]) || {};
      const leadForm = {
        company: { value: scenario.lead.company },
        contact: { value: scenario.lead.contact },
        score: { value: scenario.lead.score },
        name: { value: leadEntry.name || (scenario.lead.company + ' Lead') },
        owner: { value: leadEntry.owner || 'Chandra Kasarabada' }
      };
      const opptyForm = {
        name: { value: scenario.oppty.name },
        amount: { value: scenario.oppty.amount },
        stage: { value: scenario.oppty.stage || 'Qualification' },
        company: { value: opptyEntry.company || scenario.lead.company },
        owner: { value: opptyEntry.owner || 'Jessica Brooks' }
      };
      const pursuitForm = { name: { value: scenario.pursuit.name }, estimate: { value: scenario.pursuit.estimate } };
      const steps = [
        () => new Promise((resolve) => { this.saveLead(leadForm); setTimeout(resolve, 500); }),
        () => new Promise((resolve) => { this.convertToOpportunity(); setTimeout(resolve, 500); }),
        () => new Promise((resolve) => { this.saveOppty(opptyForm); setTimeout(resolve, 500); }),
        () => new Promise((resolve) => { this.createPursuitViaOIC(() => { this.savePursuit(pursuitForm); setTimeout(resolve, 600); }); }),
        () => new Promise((resolve) => { this.awardToConstruction(() => { this.completeSubstantial(() => { setTimeout(resolve, 700); }); }); })
      ];
      return steps.reduce(function (promise, step) { return promise.then(step); }, Promise.resolve()).then(() => scenarioKey);
    },
    adoptLeadStory(lead) {
      const info = lead || {};
      const d = ensure();
      const amount = parseAmount(info.amount || d.oppty.amount || (d.lead.score || 70) * 10000);
      d.lead.company = info.company || d.lead.company || 'Demo Customer';
      d.lead.contact = info.contact || d.lead.contact || 'contact@' + d.lead.company.replace(/\s+/g, '').toLowerCase() + '.com';
      d.lead.score = info.score || d.lead.score || 75;
      d.lead.status = info.leadStatus || 'Working';
      d.oppty.name = info.opportunity || (d.lead.company + ' Opportunity');
      d.oppty.account = info.company || d.oppty.account || d.lead.company;
      d.oppty.amount = amount;
      d.oppty.stage = info.opportunityStage || d.oppty.stage || 'Qualification';
      d.pursuit.name = info.pursuit || (d.oppty.name + ' - Pursuit');
      d.pursuit.estimate = amount;
      d.pursuit.status = info.pursuitStatus || d.pursuit.status || 'Draft';
      d.const.name = info.project || (d.oppty.name + ' Delivery');
      d.const.budget = Math.round(amount * 1.03);
      d.const.status = info.projectStatus || d.const.status || 'Planning';
      d.selectedCustomer = d.lead.company;
      d.leads = d.leads || [];
      upsert(d.leads, function (row) { return row && row.company === info.company && row.name === info.name; }, Object.assign({}, info));
      d.opportunities = d.opportunities || [];
      upsert(d.opportunities, function (row) { return row && row.name === d.oppty.name; }, {
        name: d.oppty.name,
        company: d.lead.company,
        stage: d.oppty.stage,
        amount: currency(d.oppty.amount),
        owner: info.owner || 'Jessica Brooks'
      });
      if (d.salesFlow.lead) { d.salesFlow.lead.status = d.lead.status; d.salesFlow.lead.updated = now(); }
      if (d.salesFlow.opportunity) { d.salesFlow.opportunity.status = d.oppty.stage; d.salesFlow.opportunity.updated = now(); }
      if (d.salesFlow.pursuit) { d.salesFlow.pursuit.status = d.pursuit.status; d.salesFlow.pursuit.updated = now(); }
      if (d.salesFlow.project) { d.salesFlow.project.status = d.const.status; d.salesFlow.project.updated = now(); }
      addTimeline(d, 'Lead', 'Story Selected', d.lead.company);
      addTimeline(d, 'Opportunity', 'Aligned to ' + d.oppty.stage, d.oppty.name);
      addTimeline(d, 'Pursuit', d.pursuit.status, d.pursuit.name);
      addTimeline(d, 'Project', d.const.status, d.const.name);
      commit(d);
      log('Story activated for ' + d.lead.company);
    },
    flowStages: FLOW_STAGES
  };
  function renderNavLinks(current) {
    var groups = {};
    NAV_LINKS.forEach(function (link) {
      var key = link.group || 'journey';
      groups[key] = groups[key] || [];
      groups[key].push(link);
    });
    return Object.keys(NAV_GROUP_LABELS).map(function (groupKey) {
      var links = groups[groupKey] || [];
      if (!links.length) return '';
      var items = links.map(function (link) {
        var cls = [];
        if (link.accent) cls.push('accent');
        var linkPath = link.href.split('?')[0].split('#')[0].toLowerCase();
        var currentPath = current.split('?')[0].split('#')[0].toLowerCase();
        if (currentPath === linkPath || (currentPath === '' && linkPath === 'index.html')) cls.push('active');
        var classAttr = cls.length ? (' class="' + cls.join(' ') + '"') : '';
        var personaAttr = link.allowedFor ? (' data-personas="' + link.allowedFor.join(',') + '"') : '';
        var toggleAttr = link.personaKey ? (' data-persona-toggle="' + link.personaKey + '"') : '';
        return '<a' + classAttr + personaAttr + toggleAttr + ' href="' + link.href + '">' + link.label + '</a>';
      }).join('');
      return '<div class="nav-group"><div class="nav-label">' + (NAV_GROUP_LABELS[groupKey] || groupKey) + '</div><div class="nav-items">' + items + '</div></div>';
    }).join('');
  }
  window.filterNavLinks = function (personaKey, allowedList) {
    var nav = document.querySelector('nav.quick-nav');
    if (!nav) return;
    var allowed = allowedList && allowedList.length ? allowedList.map(function (h) { return h.toLowerCase(); }) : null;
    var anchors = nav.querySelectorAll('a');
    anchors.forEach(function (a) {
      var href = (a.getAttribute('href') || '').toLowerCase();
      var personas = (a.dataset.personas || '').split(',').map(function (p) { return p.trim(); }).filter(Boolean);
      var personaMatch = !personas.length || !personaKey || personas.indexOf(personaKey) > -1;
      var isPersonaToggle = !!a.dataset.personaToggle;
      var allowMatch = isPersonaToggle || !allowed || allowed.indexOf(href) > -1;
      a.style.display = personaMatch && allowMatch ? '' : 'none';
    });
    nav.querySelectorAll('.nav-group').forEach(function (group) {
      var visibleLinks = Array.from(group.querySelectorAll('a')).filter(function (a) { return a.style.display !== 'none'; });
      group.style.display = visibleLinks.length ? '' : 'none';
    });
  };
  function getPersonaMeta(key) {
    return PERSONA_META.find(function (p) { return p.key === key; }) || PERSONA_META[0];
  }
  function updatePersonaUI(personaKey) {
    var meta = getPersonaMeta(personaKey);
    document.body.dataset.persona = personaKey;
    document.querySelectorAll('.persona-select').forEach(function (select) {
      if (select.value !== personaKey) {
        select.value = personaKey;
      }
    });
    var badge = document.getElementById('persona-badge');
    if (badge) {
      badge.textContent = meta.label;
      badge.style.borderColor = meta.accent;
      badge.style.color = meta.accent;
    }
    var rail = document.getElementById('persona-rail');
    if (rail) {
      rail.querySelectorAll('[data-persona]').forEach(function (btn) {
        btn.classList.toggle('active', btn.dataset.persona === personaKey);
      });
    }
  }
  function ensurePersonaRail() {
    if (document.getElementById('persona-rail')) return;
    var rail = document.createElement('aside');
    rail.id = 'persona-rail';
    rail.className = 'persona-rail';
    var chips = PERSONA_META.map(function (p) {
      return '<button type="button" data-persona="' + p.key + '"><span class="dot" style="background:' + p.accent + '"></span><div><div class="label">' + p.label + '</div><div class="desc">' + p.desc + '</div></div></button>';
    }).join('');
    rail.innerHTML = '<p class="eyebrow">Personas</p><div class="persona-chip-list">' + chips + '</div>';
    rail.addEventListener('click', function (e) {
      var btn = e.target.closest('button[data-persona]');
      if (!btn) return;
      applyPersonaSelection(btn.dataset.persona);
    });
    document.body.appendChild(rail);
  }
  function applyPersonaSelection(key) {
    var personaKey = key || 'all';
    window.filterNavLinks(personaKey, PERSONA_FILTERS[personaKey]);
    var toggles = document.querySelectorAll('nav.quick-nav a[data-persona-toggle]');
    toggles.forEach(function (a) {
      a.classList.toggle('active', a.dataset.personaToggle === personaKey);
    });
    updatePersonaUI(personaKey);
    try { sessionStorage.setItem('rw_persona', personaKey); } catch (e) { }
    try {
      var evt = new CustomEvent('rw_persona_change', { detail: { persona: personaKey } });
      window.dispatchEvent(evt);
      document.dispatchEvent(evt);
    } catch (e) { }
  }
  window.applyPersonaSelection = applyPersonaSelection;
  function sweepRibbons() {
    var ribbons = document.querySelectorAll('.persona-ribbon');
    if (!ribbons || !ribbons.length) return;
    // Keep the first ribbon that has children; remove the rest/empties.
    var keep = null;
    ribbons.forEach(function (r) {
      var hasButtons = r.querySelector('button');
      if (!keep && hasButtons) {
        keep = r;
        return;
      }
      r.remove();
    });
  }

  function ensurePersonaDropdown() {
    var bars = document.querySelectorAll('.bar-actions');
    if (!bars.length) {
      var header = document.querySelector('.miconnex-bar');
      if (header) {
        var bar = document.createElement('div');
        bar.className = 'bar-actions';
        header.appendChild(bar);
        bars = document.querySelectorAll('.bar-actions');
      }
    }

    if (bars.length) {
      bars.forEach(function (bar) {
        if (bar.querySelector('.persona-dropdown')) return;
        var wrap = document.createElement('div');
        wrap.className = 'persona-dropdown';
        wrap.innerHTML = '<label>Persona</label>' +
          '<select class="persona-select">' +
          PERSONA_META.map(function (p) { return '<option value="' + p.key + '">' + p.label + '</option>'; }).join('') +
          '</select>';
        bar.prepend(wrap);
      });
    } else {
      if (!document.getElementById('persona-fab')) {
        var fab = document.createElement('div');
        fab.id = 'persona-fab';
        fab.className = 'persona-fab';
        fab.innerHTML = '<div style="font-weight:700;margin-bottom:6px;">Persona</div>' +
          '<select class="persona-select">' +
          PERSONA_META.map(function (p) { return '<option value="' + p.key + '">' + p.label + '</option>'; }).join('') +
          '</select>';
        document.body.appendChild(fab);
      }
    }

    document.querySelectorAll('.persona-select').forEach(function (select) {
      if (select.dataset.personaWired === '1') return;
      select.dataset.personaWired = '1';
      select.addEventListener('change', function () { applyPersonaSelection(select.value); });
      var stored = 'all';
      try { stored = sessionStorage.getItem('rw_persona') || 'all'; } catch (e) { stored = 'all'; }
      select.value = stored;
    });
  }
  function killRibbons() {
    document.querySelectorAll('.persona-ribbon').forEach(function (el) { el.remove(); });
  }

  function injectPersonaRibbon() {
    if (window.disableRibbonAuto) return;
    // Remove any previously injected ribbons (from legacy scripts) so we render a single bar.
    document.querySelectorAll('.persona-ribbon').forEach(function (el) { el.remove(); });
    var style = document.createElement('style');
    style.textContent = "\n      .persona-ribbon {\n        position: fixed;\n        bottom: 80px;\n        left: 50%;\n        transform: translateX(-50%);\n        background: #2a0f46;\n        color: #fff;\n        border-radius: 999px;\n        padding: 14px 22px;\n        box-shadow: 0 32px 60px rgba(32,10,64,.35);\n        z-index: 4000;\n        display: inline-flex;\n        gap: 12px;\n        align-items: center;\n        justify-content: center;\n        width: min(1250px, 95vw);\n        pointer-events: auto;\n        flex-wrap: wrap;\n        row-gap: 8px;\n        border: 1px solid rgba(255,255,255,0.1);\n      }\n      .persona-ribbon button {\n        background: rgba(255,255,255,.12);\n        border: 1px solid rgba(255,255,255,.25);\n        color: #fff;\n        border-radius: 18px;\n        padding: 12px 16px;\n        font-weight: 800;\n        font-size: 15px;\n        cursor: pointer;\n        white-space: nowrap;\n      }\n      .persona-ribbon button.active {\n        background: #f97316;\n        border-color: #fcbf9b;\n        color: #0b1324;\n        box-shadow: 0 10px 20px rgba(249,115,22,.25);\n      }\n      @media (max-width: 720px) {\n        .persona-ribbon { bottom: 70px; padding: 10px 14px; gap: 10px; width: 95vw; }\n        .persona-ribbon button { padding: 10px 14px; font-size: 13px; }\n      }\n    ";
    document.head.appendChild(style);
    var bar = document.createElement('div');
    bar.id = 'persona-ribbon';
    bar.className = 'persona-ribbon';
    var links = [
      { label: 'Lead', href: 'cx_lead.html' },
      { label: 'Opportunity', href: 'cx_opportunity.html' },
      { label: 'Quick Sales Screen', href: 'quick_sales_screen.html' },
      { label: 'Account 360', href: 'account_360.html' },
      { label: 'Field Mobile', href: 'field_mobile_snapshot.html' }
    ];
    var currentPath = (window.location.pathname.split('/').pop() || '').toLowerCase();
    links.forEach(function (link) {
      var btn = document.createElement('button');
      btn.textContent = link.label;
      btn.addEventListener('click', function () { window.location.href = link.href; });
      if (currentPath === link.href.toLowerCase()) btn.classList.add('active');
      bar.appendChild(btn);
    });
    document.body.appendChild(bar);
    sweepRibbons();
  }
  function ensureGlobalChrome() {
    var body = document.body;
    if (!body || body.dataset.chromeReady === '1') return;
    body.dataset.chromeReady = '1';
    body.classList.add('miconnex-theme');
    body.classList.add('oracle-fusion-skin');
    var header = document.querySelector('.miconnex-bar');
    var headerMarkup = '<div class="logo-mark"><span class="logo-icon argano">A</span><div><div class="logo-text">Argano</div><div class="logo-sub">Connected Cloud</div></div></div><div class="bar-actions"><div id="persona-badge" class="persona-badge">All Persona</div><button class="ghost-btn small">Help</button><button class="ghost-btn small">Support</button><div class="avatar-chip">CK</div></div>';
    if (!header) {
      header = document.createElement('header');
      header.className = 'miconnex-bar';
      header.innerHTML = headerMarkup;
      body.insertBefore(header, body.firstChild);
    } else {
      header.innerHTML = headerMarkup;
    }
    document.querySelectorAll('.header, .tabs').forEach(function (el) { el.parentNode && el.parentNode.removeChild(el); });
    var nav = document.querySelector('nav.quick-nav');
    var current = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
    if (!nav) {
      nav = document.createElement('nav');
      nav.className = 'quick-nav auto-nav';
      nav.innerHTML = renderNavLinks(current);
      if (header && header.nextSibling) {
        body.insertBefore(nav, header.nextSibling);
      } else {
        body.appendChild(nav);
      }
    } else {
      nav.innerHTML = renderNavLinks(current);
    }
    if (!nav.dataset.personaWired) {
      nav.dataset.personaWired = '1';
      nav.addEventListener('click', function (e) {
        var target = e.target.closest('a[data-persona-toggle]');
        if (!target) return;
        e.preventDefault();
        applyPersonaSelection(target.dataset.personaToggle || 'all');
      });
    }
    ensurePersonaRail();
    ensurePersonaDropdown();
    var storedPersona = 'all';
    try { storedPersona = sessionStorage.getItem('rw_persona') || 'all'; } catch (e) { storedPersona = 'all'; }
    applyPersonaSelection(storedPersona);
    injectAssistantChrome();
    injectVisionFooter();
    killRibbons();
    setInterval(killRibbons, 1500);

  }

  function renderFallback(canvasEl, title, items) {
    if (!canvasEl || !canvasEl.parentElement) return;
    var host = canvasEl.parentElement;
    host.innerHTML = '<div style="padding:12px;min-height:220px;display:flex;flex-direction:column;gap:8px;">' +
      '<div style="font-weight:700;color:#0f172a;">' + title + '</div>' +
      items.map(function (t) { return '<div style="display:flex;align-items:center;gap:8px;color:#334155;font-weight:600;"><span style="width:10px;height:10px;border-radius:999px;background:#f97316;display:inline-block;"></span>' + t + '</div>'; }).join('') +
      '</div>';
  }

  function renderSalesFunnelFallback() {
    const canvas = document.getElementById('salesFunnelChart');
    if (!canvas || !canvas.parentElement) return;
    const host = canvas.parentElement;
    const steps = ["Lead → Opportunity","Opportunity → Quote","Quote → Pursuit","Pursuit → Project"];
    const widths = [90,75,55,40];
    host.innerHTML = '<div style="padding:12px;min-height:240px;display:flex;flex-direction:column;gap:8px;">' +
      '<div style="font-weight:700;color:#0f172a;">Conversion Funnel</div>' +
      steps.map(function(label,i){ return '<div style="display:flex;align-items:center;gap:8px;">' +
        '<span style="width:10px;height:10px;border-radius:999px;background:#f97316;display:inline-block;"></span>' +
        '<div style="flex:1;background:#f1f5f9;border-radius:10px;height:10px;overflow:hidden;"><div style="height:100%;width:' + widths[i] + '%;background:linear-gradient(90deg,#f97316,#fb923c);border-radius:10px;"></div></div>' +
        '<span style="min-width:160px;font-weight:700;color:#334155;">' + label + '</span>' +
      '</div>'; }).join('') +
      '</div>';
  }

function renderSalesTrendFallback() {
    const canvas = document.getElementById('salesTrendChart');
    if (!canvas || !canvas.parentElement) return;
    const host = canvas.parentElement;
    const points = [["Jan",70,"$1.2M"],["Feb",90,"$1.5M"],["Mar",82,"$1.4M"],["Apr",110,"$1.8M"],["May",135,"$2.2M"],["Jun",150,"$2.5M"]];
    host.innerHTML = '<div style="padding:12px;min-height:240px;display:flex;flex-direction:column;gap:12px;">' +
      '<div style="font-weight:700;color:#0f172a;">Revenue Trend</div>' +
      '<div style="display:flex;align-items:flex-end;gap:10px;min-height:140px;">' +
        points.map(function(p){ return '<div style="display:flex;flex-direction:column;align-items:center;gap:6px;flex:1;">' +
          '<div style="font-weight:700;color:#0f172a;">' + p[2] + '</div>' +
          '<div style="width:100%;background:linear-gradient(180deg,#10b981,#34d399);border-radius:12px;min-height:40px;height:' + p[1] + 'px;"></div>' +
          '<div style="color:#475467;font-weight:600;">' + p[0] + '</div>' +
        '</div>'; }).join('') +
      '</div></div>';
  }
function initCharts() {
    // Index charts (only if Chart.js is available)
    if (typeof Chart === "function") {
      const ctxPipeline = document.getElementById("pipelineChart");
      if (ctxPipeline) {
        new Chart(ctxPipeline, {
          type: "doughnut",
          data: {
            labels: ["Qualified", "Proposal", "Negotiation", "Closed"],
            datasets: [{
              data: [12, 8, 5, 15],
              backgroundColor: ["#3b82f6", "#f59e0b", "#8b5cf6", "#10b981"],
              borderWidth: 0
            }]
          },
          options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: "right", labels: { boxWidth: 10, font: { size: 10 } } } } }
        });
      }

      const ctxLeadSource = document.getElementById("leadSourceChart");
      if (ctxLeadSource) {
        new Chart(ctxLeadSource, {
          type: "bar",
          data: {
            labels: ["Web", "Referral", "Event", "Outbound"],
            datasets: [{
              label: "Leads",
              data: [45, 25, 20, 10],
              backgroundColor: "#f97316",
              borderRadius: 4
            }]
          },
          options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true, grid: { display: false } }, x: { grid: { display: false } } } }
        });
      }
    }

    // Sales Flow charts: try interactive, else fallback
    try {
      if (typeof Chart !== "function") throw new Error("Chart.js missing");
      const ctxFunnel = document.getElementById("salesFunnelChart");
      if (ctxFunnel) {
        new Chart(ctxFunnel, {
          type: "bar",
          data: {
            labels: ["Lead", "Opportunity", "Quote", "Pursuit", "Project"],
            datasets: [{
              label: "Volume",
              data: [35, 24, 18, 9, 4],
              backgroundColor: ["#f97316", "#fb923c", "#fdba74", "#4f46e5", "#22c55e"],
              borderRadius: 6
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: { y: { beginAtZero: true, grid: { display: false } }, x: { grid: { display: false } } }
          }
        });
      }

      const ctxTrend = document.getElementById("salesTrendChart");
      if (ctxTrend) {
        new Chart(ctxTrend, {
          type: "line",
          data: {
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
            datasets: [{
              label: "Revenue (M)",
              data: [1.2, 1.5, 1.4, 1.8, 2.2, 2.5],
              borderColor: "#10b981",
              backgroundColor: "rgba(16, 185, 129, 0.1)",
              fill: true,
              tension: 0.4,
              pointRadius: 4,
              pointBorderWidth: 2
            }]
          },
          options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false }, tooltip: { enabled: true } }, scales: { y: { beginAtZero: false } } }
        });
      }
    } catch (err) {
      console.warn("Sales charts fallback", err.message);
      renderSalesFunnelFallback();
      renderSalesTrendFallback();
    }
  }
function streamText(element, text, speed = 30) {
    if (!element) return;
    element.innerHTML = '';
    let i = 0;
    function type() {
      if (i < text.length) {
        element.innerHTML += text.charAt(i);
        i++;
        setTimeout(type, speed);
      }
    }
    type();
  }

  function initGenAIChat() {
    const body = document.body;
    if (document.getElementById('genai-chat-fab')) return;

    // FAB
    const fab = document.createElement('button');
    fab.id = 'genai-chat-fab';
    fab.className = 'genai-fab';
    fab.innerHTML = '<span class="genai-icon">&#10024;</span>';
    fab.onclick = toggleChat;
    body.appendChild(fab);

    // Chat Window
    const chat = document.createElement('div');
    chat.id = 'genai-chat-window';
    chat.className = 'genai-chat-window hidden';
    chat.innerHTML = `
      <div class="genai-chat-header">
        <span>Oracle GenAI Assistant</span>
        <button onclick="toggleChat()" class="close-btn">&times;</button>
      </div>
      <div class="genai-chat-body" id="genai-chat-body">
        <div class="genai-msg system">Hello! I'm your Oracle GenAI assistant. Ask me about your pipeline, risks, or next best actions.</div>
      </div>
      <div class="genai-chat-input">
        <input type="text" id="genai-input" placeholder="Ask a question..." onkeypress="if(event.key==='Enter') sendGenAIMsg()">
        <button onclick="sendGenAIMsg()">&#10148;</button>
      </div>
    `;
    body.appendChild(chat);
  }

  window.toggleChat = function () {
    const chat = document.getElementById('genai-chat-window');
    chat.classList.toggle('hidden');
    if (!chat.classList.contains('hidden')) {
      document.getElementById('genai-input').focus();
    }
  };

  window.sendGenAIMsg = function () {
    const input = document.getElementById('genai-input');
    const body = document.getElementById('genai-chat-body');
    const txt = input.value.trim();
    if (!txt) return;

    // User Msg
    const uDiv = document.createElement('div');
    uDiv.className = 'genai-msg user';
    uDiv.innerText = txt;
    body.appendChild(uDiv);
    input.value = '';
    body.scrollTop = body.scrollHeight;

    // Simulated AI Response
    setTimeout(() => {
      const aDiv = document.createElement('div');
      aDiv.className = 'genai-msg system';
      body.appendChild(aDiv);

      let response = "I'm analyzing the current context...";
      const lower = txt.toLowerCase();
      const d = RWD.get();

      if (lower.includes('revenue') || lower.includes('pipeline')) {
        response = `Current pipeline health is strong. You have ${d.opportunities ? d.opportunities.length : 0} active opportunities with a total value of $${d.oppty ? d.oppty.amount : '1.2M'}.`;
      } else if (lower.includes('risk')) {
        response = "I've detected a potential risk in the 'Skyline Microgrid' project due to supply chain delays. Recommended action: Schedule a review with the procurement team.";
      } else if (lower.includes('summary')) {
        response = `You are currently viewing the ${document.title}. The active scenario is '${d.lead ? d.lead.company : 'Demo'}'. Key focus: Closing Q4 deals.`;
      } else if (lower.includes('action') || lower.includes('next')) {
        response = "Based on recent activity, your next best action is to follow up with 'Lena Ortiz' regarding the revised quote.";
      } else {
        response = "I can help you with pipeline analysis, risk assessment, and deal acceleration. Try asking about 'revenue', 'risks', or 'next actions'.";
      }

      streamText(aDiv, response, 20);
      body.scrollTop = body.scrollHeight;
    }, 600);
  };

  function initCommandPalette() {
    if (document.getElementById('cmd-palette')) return;
    const body = document.body;
    const overlay = document.createElement('div');
    overlay.id = 'cmd-palette-overlay';
    overlay.className = 'cmd-palette-overlay';
    overlay.innerHTML = `
      <div class="cmd-palette" id="cmd-palette">
        <input type="text" class="cmd-input" id="cmd-input" placeholder="Type a command or search..." autocomplete="off">
        <div class="cmd-results" id="cmd-results"></div>
      </div>
    `;
    body.appendChild(overlay);

    const input = document.getElementById('cmd-input');
    const results = document.getElementById('cmd-results');

    // Commands
    const commands = [
      { label: 'Go to Dashboard', action: () => window.location.href = 'index.html', type: 'Navigation' },
      { label: 'Go to Sales Flow', action: () => window.location.href = 'sales_cloud.html', type: 'Navigation' },
      { label: 'Go to Lead Workspace', action: () => window.location.href = 'cx_lead.html', type: 'Navigation' },
      { label: 'Create New Lead', action: () => { toggleCmd(); setTimeout(() => RWD.saveLead({ company: { value: 'New Lead' } }), 200); }, type: 'Action' },
      { label: 'Run AI Simulation', action: () => { toggleCmd(); RWD.startAgent('sales'); }, type: 'Action' },
      { label: 'Reset Demo State', action: () => { toggleCmd(); RWD.reset(); window.location.reload(); }, type: 'Action' }
    ];

    function renderResults(filter = '') {
      const filtered = commands.filter(c => c.label.toLowerCase().includes(filter.toLowerCase()));
      results.innerHTML = filtered.map((c, i) => `
        <div class="cmd-item ${i === 0 ? 'selected' : ''}" onclick="window.cmdRun(${i})">
          <span>${c.label}</span>
          <span class="shortcut">${c.type}</span>
        </div>
      `).join('');
      window.cmdMatches = filtered;
    }

    window.cmdRun = (index) => {
      const match = window.cmdMatches[index];
      if (match) {
        match.action();
        toggleCmd();
      }
    };

    window.toggleCmd = () => {
      overlay.classList.toggle('open');
      if (overlay.classList.contains('open')) {
        input.value = '';
        renderResults();
        input.focus();
      }
    };

    input.addEventListener('input', (e) => renderResults(e.target.value));
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const selected = results.querySelector('.selected');
        if (selected) selected.click();
      }
      if (e.key === 'Escape') toggleCmd();
    });

    // Global Shortcut
    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        toggleCmd();
      }
    });
  }

  document.addEventListener('DOMContentLoaded', function () { try { ensureGlobalChrome(); initCharts(); initGenAIChat(); initCommandPalette(); } catch (e) { console.warn('chrome init failed', e); } });
})();







