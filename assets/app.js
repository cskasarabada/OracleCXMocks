(function(){
  const NAV_LINKS=[
    {href:'index.html',label:'Overview'},
    {href:'Easy_Start_Flows.html',label:'Easy Start'},
    {href:'sales_cloud.html',label:'Sales Flow'},
    {href:'sales_tools.html',label:'Sales Tools'},
    {href:'cx_lead.html',label:'Lead'},
    {href:'cx_opportunity.html',label:'Opportunity'},
    {href:'ppm_pursuit.html',label:'PPM Pursuit'},
    {href:'ppm_construction.html',label:'PPM Construction'},
    {href:'analytics.html',label:'Analytics'},
    {href:'forecasting_pipeline.html',label:'Forecasting'},
    {href:'integration_features.html',label:'Integration'},
    {href:'sales_process_visualization.html',label:'Process Visualization'},
    {href:'results_driven.html',label:'Results Driven'},
    {href:'quick_sales_screen.html',label:'Quick Sales Screen',accent:true},
    {href:'executive_command_center.html',label:'Exec Command'},
    {href:'account_360.html',label:'Account 360'},
    {href:'partner_hub.html',label:'Partner Hub'},
    {href:'revenue_intelligence.html',label:'Revenue Intelligence'},
    {href:'field_mobile_snapshot.html',label:'Field Mobile'},
    {href:'sales_ppm_sync.html',label:'Sales↔PPM'},
    {href:'quote_to_docusign.html',label:'Quote → DocuSign'},
    {href:'pursuit_project.html',label:'Pursuit Project'}
  ];
  const KEY='rw_demo_v2';
  const FLOW_STAGES=[
    {key:'lead',label:'Lead',owner:'Sales Development',statuses:['New','Working','Qualified','Nurture'],description:'SDR captures interest and qualifies the inbound record.'},
    {key:'opportunity',label:'Opportunity',owner:'Account Executive',statuses:['Qualification','Evaluation','Proposal','Negotiation','Closed Won'],description:'AE manages discovery, solutioning and negotiations.'},
    {key:'quote',label:'Quote',owner:'Sales Operations',statuses:['Config','Pricing','Released to Customer','Accepted'],description:'Sales Ops configures price list items and publishes quote to customer.'},
    {key:'pursuit',label:'Pursuit (PPM)',owner:'Pursuit Manager',statuses:['Draft','Costing','Submitted','Awarded'],description:'OIC pushes qualified deals to PPM where Pursuit Managers refine estimates.'},
    {key:'project',label:'Project Delivery',owner:'Project Manager',statuses:['Planning','Execution','Substantial Completion','Warranty'],description:'Awarded pursuits become delivery projects that track execution milestones.'}
  ];
  const SCENARIOS={
    skyline:{
      label:'Skyline Renewables Microgrid',
      lead:{company:'Skyline Renewables',contact:'Lena Ortiz',score:78,status:'Working'},
      oppty:{name:'Skyline Microgrid Modernization',amount:1250000,stage:'Qualification'},
      pursuit:{name:'Skyline Microgrid Modernization - Pursuit',estimate:1250000,status:'Draft'},
      project:{name:'Skyline Microgrid Modernization - Construction',budget:1287500,status:'Planning'},
      leadsList:[
        {company:'Skyline Renewables',name:'Microgrid Expansion Lead',contact:'Lena Ortiz',owner:'Chandra Kasarabada'},
        {company:'BrightGrid Solar',name:'Battery Storage Upgrade',contact:'Daniel Reese',owner:'Subash Nagarajan'}
      ],
      opptyList:[
        {name:'Skyline Microgrid Modernization',company:'Skyline Renewables',stage:'Qualification',amount:'$1.25M',owner:'Jessica Brooks'},
        {name:'BrightGrid Battery Upgrade',company:'BrightGrid Solar',stage:'Evaluation',amount:'$620K',owner:'Subash Nagarajan'}
      ],
      storyline:[
        {stage:'Lead',event:'Inbound Signal',detail:'Captured during Sustainability Summit registration.'},
        {stage:'Opportunity',event:'AE Assigned',detail:'Jessica Brooks engages value engineering team.'},
        {stage:'Pursuit',event:'Costing',detail:'PPM estimators loading rates for quick-turn proposal.'}
      ]
    },
    apex:{
      label:'Apex Healthcare Tower',
      lead:{company:'Apex Healthcare',contact:'Marcus Lee',score:84,status:'New'},
      oppty:{name:'Apex Tower CX/PPM Rollout',amount:1860000,stage:'Evaluation'},
      pursuit:{name:'Apex Tower CX/PPM Pursuit',estimate:1860000,status:'Costing'},
      project:{name:'Apex Tower Delivery',budget:1915000,status:'Planning'},
      leadsList:[
        {company:'Apex Healthcare',name:'Tower CX Modernization',contact:'Marcus Lee',owner:'Chandra Kasarabada'},
        {company:'Trinity Medical',name:'Clinic Expansion',contact:'Sarah Cole',owner:'Subash Nagarajan'}
      ],
      opptyList:[
        {name:'Apex Tower CX/PPM Rollout',company:'Apex Healthcare',stage:'Evaluation',amount:'$1.86M',owner:'Jessica Brooks'},
        {name:'Trinity Clinic Expansion',company:'Trinity Medical',stage:'Proposal',amount:'$920K',owner:'Subash Nagarajan'}
      ],
      storyline:[
        {stage:'Lead',event:'Referral',detail:'Partner referred Apex expansion to Argano.'},
        {stage:'Opportunity',event:'Discovery',detail:'Hybrid sales + services bundle framed with Smart Actions.'},
        {stage:'Pursuit',event:'Resource Request',detail:'PPM resource manager flagged estimating gap.'}
      ]
    }
  };
  const read=()=>{try{return JSON.parse(localStorage.getItem(KEY))||{};}catch(e){return {};}};
  const write=(d)=>localStorage.setItem(KEY, JSON.stringify(d));
  const subscribers=new Set();
  const now=()=>new Date().toLocaleString();
  const clone=(data)=>data ? JSON.parse(JSON.stringify(data)) : data;
  function upsert(list,predicate,data){
    if(!Array.isArray(list)) return;
    const idx=list.findIndex(predicate);
    if(idx>-1){ list[idx]=Object.assign({}, list[idx], data); }
    else{ list.unshift(data); }
  }
  function broadcast(){
    const snapshot=ensure();
    subscribers.forEach(function(cb){
      try{ cb(snapshot); }catch(e){ console.warn('timeline subscriber failed', e); }
    });
  }
  function commit(d){
    write(d);
    broadcast();
  }
  function ensure(){
    const d=read();
    d.lead=d.lead||{company:'',contact:'',score:60,status:'Unqualified',activities:[]};
    d.oppty=d.oppty||{name:'',amount:0,stage:'Qualification',activities:[]};
    d.pursuit=d.pursuit||{name:'',estimate:0,status:'Draft'};
    d.const=d.const||{name:'',budget:0,status:'Planned'};
    if(!d.salesFlow){
      d.salesFlow={};
      const stamp=now();
      FLOW_STAGES.forEach(function(stage){
        d.salesFlow[stage.key]={status:stage.statuses[0],owner:stage.owner,note:'',updated:stamp};
      });
    }
    d.logs=d.logs||[];
    d.timeline=d.timeline||[];
    d.leads=d.leads||[];
    d.opportunities=d.opportunities||[];
    write(d);
    return d;
  }
  function log(msg){
    const d=ensure();
    d.logs.unshift('['+now()+'] '+msg);
    d.logs=d.logs.slice(0,60);
    commit(d);
  }
  function addAct(arr,type,text){arr.unshift({ts:now(), type, text, who:'System'});}
  function stageName(key){
    const hit=FLOW_STAGES.find(function(s){ return s.key===key; });
    return hit ? hit.label : (key||'Stage');
  }
  function addTimeline(d,stage,event,detail){
    if(!d.timeline) d.timeline=[];
    d.timeline.unshift({ts:now(),stage:stage,event:event,detail:detail||''});
    d.timeline=d.timeline.slice(0,30);
  }
  function pickScenario(name){
    if(name && SCENARIOS[name]) return name;
    return Object.keys(SCENARIOS)[0];
  }

  window.RWD={
    reset(){localStorage.removeItem(KEY); broadcast();},
    get(){return ensure();},
    availableScenarios(){
      return Object.keys(SCENARIOS).map(function(key){
        return {key,label:SCENARIOS[key].label||key};
      });
    },
    loadScenario(name){
      const scenarioKey=pickScenario(name);
      const conf=SCENARIOS[scenarioKey];
      const d=ensure();
      d.lead=Object.assign({}, d.lead, conf.lead||{});
      d.lead.activities=[];
      d.oppty=Object.assign({}, d.oppty, conf.oppty||{});
      d.oppty.activities=[];
      d.pursuit=Object.assign({}, d.pursuit, conf.pursuit||{});
      d.const=Object.assign({}, d.const, conf.project||{});
      if(d.salesFlow.lead){ d.salesFlow.lead.status=d.lead.status||d.salesFlow.lead.status; d.salesFlow.lead.updated=now(); }
      if(d.salesFlow.opportunity){ d.salesFlow.opportunity.status=d.oppty.stage||d.salesFlow.opportunity.status; d.salesFlow.opportunity.updated=now(); }
      d.leads=clone(conf.leadsList||[]);
      d.opportunities=clone(conf.opptyList||[]);
      d.timeline=[];
      (conf.storyline||[]).forEach(function(item){
        addTimeline(d,item.stage,item.event,item.detail);
      });
      d.logs=[];
      commit(d);
      log('Scenario loaded: '+(conf.label||scenarioKey));
      return scenarioKey;
    },
    timeline(limit){
      const d=ensure();
      return (d.timeline||[]).slice(0, typeof limit==='number'?limit:10);
    },
    clearTimeline(){
      const d=ensure();
      d.timeline=[];
      commit(d);
    },

    // Lead
    saveLead(f){
      const d=ensure();
      d.lead.company=f.company.value;
      d.lead.contact=f.contact.value;
      d.lead.score=Number(f.score.value||60);
      d.lead.status='Qualified';
      addAct(d.lead.activities,'Update','Lead qualified');
      addTimeline(d,'Lead','Qualified','Score '+d.lead.score);
      d.leads=d.leads||[];
      d.leads.unshift({
        company:d.lead.company,
        name:f.name && f.name.value ? f.name.value : (d.lead.company+' Lead'),
        contact:d.lead.contact,
        owner:f.owner && f.owner.value ? f.owner.value : 'Chandra Kasarabada'
      });
      d.leads=d.leads.slice(0,10);
      commit(d);
      log('Lead qualified for '+d.lead.company);
    },
    convertToOpportunity(){
      const d=ensure();
      d.oppty.name=d.lead.company+' - New Build';
      d.oppty.amount=Math.max(250000, d.lead.score*10000);
      d.oppty.stage='Qualification';
      addAct(d.oppty.activities,'Convert','Lead converted to Opportunity');
      addTimeline(d,'Opportunity','Converted','Created from '+(d.lead.company||'lead'));
      d.opportunities=d.opportunities||[];
      d.opportunities.unshift({
        name:d.oppty.name,
        company:d.lead.company,
        stage:d.oppty.stage,
        amount:'$'+d.oppty.amount.toLocaleString(),
        owner:'Jessica Brooks'
      });
      d.opportunities=d.opportunities.slice(0,10);
      commit(d);
      log('Lead converted to Opportunity');
    },

    // OIC job simulator
    runOICJob(kind,next){ ensure(); log('OIC job started: '+kind); const id=Math.floor(Math.random()*9000+1000); setTimeout(()=>{ log('OIC job '+id+' completed: '+kind); if(next) next(id); }, 900); },

    // Opportunity
    saveOppty(f){
      const d=ensure();
      d.oppty.name=f.name.value;
      d.oppty.amount=Number(f.amount.value||0);
      d.oppty.stage=f.stage.value;
      addAct(d.oppty.activities,'Update','Opportunity updated');
      addTimeline(d,'Opportunity','Updated',d.oppty.stage+' stage');
      d.opportunities=d.opportunities||[];
      upsert(d.opportunities, function(item){ return item && item.name===d.oppty.name; }, {
        name:d.oppty.name,
        company:f.company && f.company.value ? f.company.value : d.lead.company,
        stage:d.oppty.stage,
        amount:'$'+d.oppty.amount.toLocaleString(),
        owner:f.owner && f.owner.value ? f.owner.value : 'Jessica Brooks'
      });
      d.opportunities=d.opportunities.slice(0,10);
      commit(d);
    },
    createPursuitViaOIC(cb){
      const d=ensure();
      d.pursuit.name=d.oppty.name+' - Pursuit';
      d.pursuit.estimate=d.oppty.amount;
      d.pursuit.status='Draft';
      addTimeline(d,'Pursuit','OIC Sync','Creating pursuit in PPM');
      commit(d);
      this.runOICJob('Create Pursuit in PPM', ()=>{
        const latest=ensure();
        addAct(latest.oppty.activities,'Integration','Pursuit created in PPM');
        addTimeline(latest,'Pursuit','PPM Record Ready',latest.pursuit.name);
        commit(latest);
        if(cb) cb();
      });
    },

    // Pursuit
    savePursuit(f){
      const d=ensure();
      d.pursuit.name=f.name.value;
      d.pursuit.estimate=Number(f.estimate.value||0);
      addTimeline(d,'Pursuit','Updated','Estimate $'+d.pursuit.estimate.toLocaleString());
      commit(d);
    },
    awardToConstruction(cb){
      const d=ensure();
      d.const.name=d.pursuit.name.replace(/ - Pursuit$/,'')+' - Construction';
      d.const.budget=Math.round(d.pursuit.estimate*1.03);
      d.const.status='Active';
      addTimeline(d,'Project','Award in progress',d.const.name);
      commit(d);
      this.runOICJob('Create Construction in PPM', ()=>{
        const latest=ensure();
        addAct(latest.oppty.activities,'Integration','Construction project created');
        addTimeline(latest,'Project','Activated',latest.const.name+' budget $'+latest.const.budget.toLocaleString());
        latest.const.status='Active';
        commit(latest);
        if(cb) cb();
      });
    },

    // Construction
    completeSubstantial(cb){
      const d=ensure();
      d.const.status='Substantially Complete';
      addTimeline(d,'Project','Milestone','Substantial completion achieved');
      commit(d);
      log('Substantial Completion -> Warranty start');
      addAct(d.oppty.activities,'Milestone','Substantial Completion');
      if(cb) cb();
    },

    // Smart Actions
    actLead(type){
      const d=ensure();
      addAct(d.lead.activities,type,'Action on Lead: '+type);
      addTimeline(d,'Lead','Action: '+type,'Smart Action rail');
      commit(d);
      log('Lead action: '+type);
    },
    actOppty(type){
      const d=ensure();
      addAct(d.oppty.activities,type,'Action on Opportunity: '+type);
      addTimeline(d,'Opportunity','Action: '+type,'Smart Action rail');
      commit(d);
      log('Opportunity action: '+type);
    },

    // Sales Cloud flow helpers
    updateSalesFlow(stageKey,status,note){
      const d=ensure();
      if(!d.salesFlow[stageKey]) return;
      d.salesFlow[stageKey].status=status;
      if(typeof note==='string') d.salesFlow[stageKey].note=note;
      d.salesFlow[stageKey].updated=now();
      addAct(d.oppty.activities,'Sales Flow',stageKey+' -> '+status);
      if(stageKey==='lead' && status==='Qualified'){ d.lead.status='Qualified'; }
      if(stageKey==='opportunity'){ d.oppty.stage=status; }
      addTimeline(d,stageName(stageKey),status,note||'');
      commit(d);
      log('Sales flow updated: '+stageKey+' -> '+status);
    },
    // Agent simulation: run demo agents that perform periodic actions
    _agentHandles: {},
    _agentState: {},
    startAgent(type){
      const key = String(type||'').toLowerCase();
      if(this._agentHandles[key]) return; // already running
      this._agentState[key] = this._agentState[key] || {running:true, lastAction:''};
      this._agentState[key].running = true;

      if(key==='sales' || key==='sales agent'){
        // Sales Agent: qualify leads, convert to opportunity, advance stages
        const iv = setInterval(()=>{
          try{
            const d = ensure();
            if(!d.lead || d.lead.status!=='Qualified'){
              d.lead.company = d.lead.company || ('Acme Co ' + Math.floor(Math.random()*900+100));
              d.lead.contact = d.lead.contact || 'rep@'+d.lead.company.replace(/\s+/g,'').toLowerCase()+'.com';
              d.lead.score = d.lead.score || (50 + Math.floor(Math.random()*40));
              d.lead.status = 'Qualified';
              addAct(d.lead.activities,'Agent','Sales Agent qualified lead');
              write(d); log('Sales Agent qualified lead for '+d.lead.company);
              this._agentState[key].lastAction = 'Qualified lead: '+d.lead.company;
              return;
            }
            if(!d.oppty || !d.oppty.name){
              this.convertToOpportunity();
              this._agentState[key].lastAction = 'Converted lead to Opportunity';
              return;
            }
            // advance opportunity stage if possible
            const stages = ['Qualification','Evaluation','Proposal','Negotiation','Closed Won'];
            const idx = stages.indexOf(d.oppty.stage || 'Qualification');
            if(idx < stages.length-1 && Math.random()>0.4){
              d.oppty.stage = stages[idx+1];
              addAct(d.oppty.activities,'Agent','Sales Agent advanced opportunity to '+d.oppty.stage);
              write(d); log('Sales Agent advanced opportunity to '+d.oppty.stage);
              this._agentState[key].lastAction = 'Advanced opportunity to '+d.oppty.stage;
            }
          }catch(e){ console.error('sales agent', e); }
        }, 5000 + Math.floor(Math.random()*3000));
        this._agentHandles[key]=iv;
      } else if(key==='forecast' || key==='forecasting agent'){
        // Forecasting Agent: read pipeline and produce forecast suggestions
        const iv = setInterval(()=>{
          try{
            const d = ensure();
            const amt = (d.oppty && d.oppty.amount) ? d.oppty.amount : (100000 + Math.floor(Math.random()*900000));
            const suggested = Math.round(amt * (0.9 + Math.random()*0.2));
            const confidence = 60 + Math.floor(Math.random()*35);
            d.forecast = { suggested, confidence, ts: now() };
            addAct(d.oppty.activities || [], 'Agent', 'Forecasting Agent suggested $'+suggested+' ('+confidence+'%)');
            write(d); log('Forecasting Agent suggested $'+suggested+' ('+confidence+'%)');
            this._agentState[key].lastAction = 'Suggested $'+suggested+' ('+confidence+'%)';
          }catch(e){ console.error('forecast agent', e); }
        }, 8000 + Math.floor(Math.random()*4000));
        this._agentHandles[key]=iv;
      } else if(key==='integration' || key==='integration agent'){
        // Integration Agent: run OIC job simulations regularly
        const iv = setInterval(()=>{
          try{
            const kinds = ['Sync CX→PPM','Sync PPM→CX','Push Pursuit','Update Estimates'];
            const kind = kinds[Math.floor(Math.random()*kinds.length)];
            this.runOICJob(kind, (id)=>{
              const d = ensure();
              addAct(d.oppty.activities || [], 'Agent', 'Integration Agent ran '+kind+' (id:'+id+')');
              write(d); log('Integration Agent completed job '+id+' ('+kind+')');
              this._agentState[key].lastAction = kind+' → '+id;
            });
          }catch(e){ console.error('integration agent', e); }
        }, 10000 + Math.floor(Math.random()*6000));
        this._agentHandles[key]=iv;
      } else {
        // unknown type: create a simple heartbeat
        const iv = setInterval(()=>{
          try{ log('Agent ['+type+'] heartbeat'); this._agentState[key].lastAction='heartbeat '+now(); }catch(e){}
        }, 7000);
        this._agentHandles[key]=iv;
      }
    },
    stopAgent(type){
      const key = String(type||'').toLowerCase();
      const h = this._agentHandles[key];
      if(h){ clearInterval(h); delete this._agentHandles[key]; }
      this._agentState[key]=this._agentState[key]||{}; this._agentState[key].running=false; this._agentState[key].lastAction='stopped';
    },
    getAgentStates(){ return Object.assign({}, this._agentState); },
    subscribe(fn){
      if(typeof fn!=='function') return function(){};
      subscribers.add(fn);
      try{ fn(ensure()); }catch(e){}
      return function(){ subscribers.delete(fn); };
    },
    runScenarioFlow(opts){
      const scenarioKey=this.loadScenario(opts && opts.scenario);
      const scenario=SCENARIOS[scenarioKey];
      const leadEntry=(scenario.leadsList && scenario.leadsList[0])||{};
      const opptyEntry=(scenario.opptyList && scenario.opptyList[0])||{};
      const leadForm={
        company:{value:scenario.lead.company},
        contact:{value:scenario.lead.contact},
        score:{value:scenario.lead.score},
        name:{value:leadEntry.name || (scenario.lead.company+' Lead')},
        owner:{value:leadEntry.owner || 'Chandra Kasarabada'}
      };
      const opptyForm={
        name:{value:scenario.oppty.name},
        amount:{value:scenario.oppty.amount},
        stage:{value:scenario.oppty.stage||'Qualification'},
        company:{value:opptyEntry.company || scenario.lead.company},
        owner:{value:opptyEntry.owner || 'Jessica Brooks'}
      };
      const pursuitForm={name:{value:scenario.pursuit.name},estimate:{value:scenario.pursuit.estimate}};
      const steps=[
        ()=>new Promise((resolve)=>{ this.saveLead(leadForm); setTimeout(resolve,500); }),
        ()=>new Promise((resolve)=>{ this.convertToOpportunity(); setTimeout(resolve,500); }),
        ()=>new Promise((resolve)=>{ this.saveOppty(opptyForm); setTimeout(resolve,500); }),
        ()=>new Promise((resolve)=>{ this.createPursuitViaOIC(()=>{ this.savePursuit(pursuitForm); setTimeout(resolve,600); }); }),
        ()=>new Promise((resolve)=>{ this.awardToConstruction(()=>{ this.completeSubstantial(()=>{ setTimeout(resolve,700); }); }); })
      ];
      return steps.reduce(function(promise,step){ return promise.then(step); }, Promise.resolve()).then(()=>scenarioKey);
    },
    flowStages: FLOW_STAGES
  };
  function renderNavLinks(current){
    return NAV_LINKS.map(function(link){
      var cls=[];
      if(link.accent) cls.push('accent');
      if(current===link.href.toLowerCase()) cls.push('active');
      var classAttr=cls.length?(' class="'+cls.join(' ')+'"'):'';
      return '<a'+classAttr+' href="'+link.href+'">'+link.label+'</a>';
    }).join('');
  }
  function ensureGlobalChrome(){
    var body=document.body;
    if(!body || body.dataset.chromeReady==='1') return;
    body.dataset.chromeReady='1';
    body.classList.add('miconnex-theme');
    var header=document.querySelector('.miconnex-bar');
    if(!header){
      header=document.createElement('header');
      header.className='miconnex-bar';
      header.innerHTML='<div class="logo-mark"><span class="logo-icon">A</span><div><div class="logo-text">Argano</div><div class="logo-sub">Connected Cloud</div></div></div><div class="bar-actions"><button class="ghost-btn small">Help</button><button class="ghost-btn small">Support</button><div class="avatar-chip">CK</div></div>';
      body.insertBefore(header, body.firstChild);
    } else {
      header.innerHTML='<div class="logo-mark"><span class="logo-icon">A</span><div><div class="logo-text">Argano</div><div class="logo-sub">Connected Cloud</div></div></div><div class="bar-actions"><button class="ghost-btn small">Help</button><button class="ghost-btn small">Support</button><div class="avatar-chip">CK</div></div>';
    }
    var nav=document.querySelector('nav.quick-nav');
    var current=(location.pathname.split('/').pop()||'index.html').toLowerCase();
    if(!nav){
      nav=document.createElement('nav');
      nav.className='quick-nav auto-nav';
      nav.innerHTML=renderNavLinks(current);
      if(header && header.nextSibling){
        body.insertBefore(nav, header.nextSibling);
      }else{
        body.appendChild(nav);
      }
    }else{
      nav.innerHTML=renderNavLinks(current);
    }
    var footerNav=document.querySelector('.app-nav-rail');
    if(footerNav){
      var inner=footerNav.querySelector('.app-nav-items');
      if(!inner){ inner=document.createElement('div'); inner.className='app-nav-items'; inner.innerHTML=renderNavLinks(current); footerNav.innerHTML=''; footerNav.appendChild(inner); }
      else inner.innerHTML=renderNavLinks(current);
    }
  }
  document.addEventListener('DOMContentLoaded', function(){ try{ ensureGlobalChrome(); }catch(e){ console.warn('chrome init failed', e); }});
})();
