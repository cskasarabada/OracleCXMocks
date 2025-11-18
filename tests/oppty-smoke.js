const fs = require('fs');
const path = require('path');
const {JSDOM} = require('jsdom');

const HTML_PATH = path.join(__dirname, '..', 'cx_opportunity.html');
const RAW_HTML = fs.readFileSync(HTML_PATH, 'utf8');
const HTML_WITHOUT_RWD = RAW_HTML.replace('<script defer src="assets/app.js"></script>', '');

function delay(win, ms) {
  return new Promise((resolve) => win.setTimeout(resolve, ms));
}

async function runScenario(label, {withRWD}) {
  const dom = new JSDOM(HTML_WITHOUT_RWD, {
    runScripts: 'dangerously',
    resources: 'usable',
    pretendToBeVisual: true,
    url: 'https://example.com/cx_opportunity.html'
  });
  const {window} = dom;
  const events = {
    label,
    modalOpened: false,
    modalClosed: false,
    toasts: [],
    alerts: [],
    pursuit: {running: '', final: '', widthStart: '', widthEnd: ''},
    savedObjects: [],
    saveCount: 0,
    pursuitCalls: 0
  };
  window.showToast = function(msg){ events.toasts.push(msg); };
  window.alert = function(msg){ events.alerts.push(msg); };
  if(withRWD){
    const baseState = {
      oppty:{ name:'Existing Demo', stage:'Qualification', activities:[], account:'Argano Demo', amount:50000 },
      opportunities:[]
    };
    window.RWD = {
      _state: JSON.parse(JSON.stringify(baseState)),
      get(){ return JSON.parse(JSON.stringify(this._state)); },
      set(next){ this._state = JSON.parse(JSON.stringify(next)); },
      saveOppty(obj){
        events.saveCount += 1;
        events.savedObjects.push(obj);
        this._state.oppty = Object.assign({}, this._state.oppty, obj);
      },
      createPursuitViaOIC(cb){
        events.pursuitCalls += 1;
        if(typeof cb === 'function') window.setTimeout(cb, 30);
      }
    };
  }
  await new Promise((resolve) => {
    if(window.document.readyState === 'complete' || window.document.readyState === 'interactive'){
      resolve();
    }else{
      window.document.addEventListener('DOMContentLoaded', resolve, {once:true});
    }
  });
  await delay(window, 0);

  const addBtn = window.document.getElementById('add-new-oppty-btn');
  const form = window.document.getElementById('addOpptyForm');
  const modal = window.document.getElementById('add-oppty-modal');
  if(!addBtn || !form || !modal){
    throw new Error('Modal elements missing in DOM snapshot');
  }

  addBtn.click();
  events.modalOpened = modal.style.display === 'flex';
  form.elements.name.value = 'Test Deal';
  form.elements.account.value = 'Demo Account';
  form.elements.amount.value = '42000';
  form.elements.owner.value = 'Demo Owner';
  form.elements.stage.value = 'Proposal';
  form.elements.notes.value = 'Smoke test submission.';
  form.dispatchEvent(new window.Event('submit', {bubbles:true, cancelable:true}));
  await delay(window, 0);
  events.modalClosed = modal.style.display === 'none';

  const statusEl = window.document.getElementById('status');
  const progEl = window.document.getElementById('prog');
  const pursuitBtn = window.document.getElementById('btnCreatePursuit');
  if(statusEl && progEl && pursuitBtn){
    pursuitBtn.click();
    events.pursuit.running = statusEl.textContent;
    events.pursuit.widthStart = progEl.style.width;
    await delay(window, 550);
    events.pursuit.final = statusEl.textContent;
    events.pursuit.widthEnd = progEl.style.width;
  }else{
    events.pursuit.error = 'Missing pursuit UI nodes';
  }

  dom.window.close();
  return events;
}

async function main(){
  const withRWD = await runScenario('with-rwd', {withRWD:true});
  const withoutRWD = await runScenario('without-rwd', {withRWD:false});
  const report = [withRWD, withoutRWD];
  console.log(JSON.stringify(report, null, 2));
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
