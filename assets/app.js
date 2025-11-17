(function(){
  const KEY='rw_demo_v2';
  const FLOW_STAGES=[
    {key:'lead',label:'Lead',owner:'Sales Development',statuses:['New','Working','Qualified','Nurture'],description:'SDR captures interest and qualifies the inbound record.'},
    {key:'opportunity',label:'Opportunity',owner:'Account Executive',statuses:['Qualification','Evaluation','Proposal','Negotiation','Closed Won'],description:'AE manages discovery, solutioning and negotiations.'},
    {key:'quote',label:'Quote',owner:'Sales Operations',statuses:['Config','Pricing','Released to Customer','Accepted'],description:'Sales Ops configures price list items and publishes quote to customer.'},
    {key:'pursuit',label:'Pursuit (PPM)',owner:'Pursuit Manager',statuses:['Draft','Costing','Submitted','Awarded'],description:'OIC pushes qualified deals to PPM where Pursuit Managers refine estimates.'},
    {key:'project',label:'Project Delivery',owner:'Project Manager',statuses:['Planning','Execution','Substantial Completion','Warranty'],description:'Awarded pursuits become delivery projects that track execution milestones.'}
  ];
  const read=()=>{try{return JSON.parse(localStorage.getItem(KEY))||{};}catch(e){return {};}};
  const write=(d)=>localStorage.setItem(KEY, JSON.stringify(d));
  const now=()=>new Date().toLocaleString();
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
    write(d);
    return d;
  }
  function log(msg){const d=ensure(); d.logs.unshift('['+now()+'] '+msg); write(d);}
  function addAct(arr,type,text){arr.unshift({ts:now(), type, text, who:'System'});}

  window.RWD={
    reset(){localStorage.removeItem(KEY);},
    get(){return ensure();},

    // Lead
    saveLead(f){const d=ensure(); d.lead.company=f.company.value; d.lead.contact=f.contact.value; d.lead.score=Number(f.score.value||60); d.lead.status='Qualified'; addAct(d.lead.activities,'Update','Lead qualified'); write(d); log('Lead qualified for '+d.lead.company);},
    convertToOpportunity(){const d=ensure(); d.oppty.name=d.lead.company+' – New Build'; d.oppty.amount=Math.max(250000, d.lead.score*10000); d.oppty.stage='Qualification'; addAct(d.oppty.activities,'Convert','Lead converted to Opportunity'); write(d); log('Lead converted to Opportunity');},

    // OIC job simulator
    runOICJob(kind,next){ ensure(); log('OIC job started: '+kind); const id=Math.floor(Math.random()*9000+1000); setTimeout(()=>{ log('OIC job '+id+' completed: '+kind); if(next) next(id); }, 900); },

    // Opportunity
    saveOppty(f){const d=ensure(); d.oppty.name=f.name.value; d.oppty.amount=Number(f.amount.value||0); d.oppty.stage=f.stage.value; addAct(d.oppty.activities,'Update','Opportunity updated'); write(d);},
    createPursuitViaOIC(cb){const d=ensure(); d.pursuit.name=d.oppty.name+' – Pursuit'; d.pursuit.estimate=d.oppty.amount; d.pursuit.status='Draft'; write(d); this.runOICJob('Create Pursuit in PPM', ()=>{ addAct(d.oppty.activities,'Integration','Pursuit created in PPM'); if(cb) cb(); });},

    // Pursuit
    savePursuit(f){const d=ensure(); d.pursuit.name=f.name.value; d.pursuit.estimate=Number(f.estimate.value||0); write(d);},
    awardToConstruction(cb){const d=ensure(); d.const.name=d.pursuit.name.replace(/ – Pursuit$/,'')+' – Construction'; d.const.budget=Math.round(d.pursuit.estimate*1.03); d.const.status='Active'; write(d); this.runOICJob('Create Construction in PPM', ()=>{ addAct(d.oppty.activities,'Integration','Construction project created'); if(cb) cb(); });},

    // Construction
    completeSubstantial(cb){const d=ensure(); d.const.status='Substantially Complete'; write(d); log('Substantial Completion → Warranty start'); addAct(d.oppty.activities,'Milestone','Substantial Completion'); if(cb) cb();},

    // Smart Actions
    actLead(type){const d=ensure(); addAct(d.lead.activities,type,'Action on Lead: '+type); write(d); log('Lead action: '+type);},
    actOppty(type){const d=ensure(); addAct(d.oppty.activities,type,'Action on Opportunity: '+type); write(d); log('Opportunity action: '+type);},

    // Sales Cloud flow helpers
    updateSalesFlow(stageKey,status,note){
      const d=ensure();
      if(!d.salesFlow[stageKey]) return;
      d.salesFlow[stageKey].status=status;
      if(typeof note==='string') d.salesFlow[stageKey].note=note;
      d.salesFlow[stageKey].updated=now();
      addAct(d.oppty.activities,'Sales Flow',stageKey+' → '+status);
      if(stageKey==='lead' && status==='Qualified'){ d.lead.status='Qualified'; }
      if(stageKey==='opportunity'){ d.oppty.stage=status; }
      write(d);
      log('Sales flow updated: '+stageKey+' → '+status);
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
    flowStages: FLOW_STAGES
  };
})();
