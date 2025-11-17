
(function(){
  const KEY='rw_demo_v2';
  const read=()=>{try{return JSON.parse(localStorage.getItem(KEY))||{}}catch(e){return {}}};
  const write=(d)=>localStorage.setItem(KEY, JSON.stringify(d));
  const now=()=>new Date().toLocaleString();
  function ensure(){
    const d=read();
    d.lead=d.lead||{company:'',contact:'',score:60,status:'Unqualified',activities:[]};
    d.oppty=d.oppty||{name:'',amount:0,stage:'Qualification',activities:[]};
    d.pursuit=d.pursuit||{name:'',estimate:0,status:'Draft'};
    d.const=d.const||{name:'',budget:0,status:'Planned'};
    d.logs=d.logs||[]; write(d); return d;
  }
  function log(msg){const d=ensure(); d.logs.unshift('['+now()+'] '+msg); write(d);}
  function addAct(arr,type,text){arr.unshift({ts:now(), type, text, who:'System'});}

  window.RWD={
    reset(){localStorage.removeItem(KEY)},
    get(){return ensure()},

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
    actOppty(type){const d=ensure(); addAct(d.oppty.activities,type,'Action on Opportunity: '+type); write(d); log('Opportunity action: '+type);}
  };
})();
