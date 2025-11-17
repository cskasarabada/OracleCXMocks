(function(){
  // Quick Sales sample dataset (10 leads + 10 quotes)
  window.QUICK_SALES_DATA = {
    leads: [
      {id:'LD001',account:'Acme Power',contact:'Jane Doe',title:'Director of Ops',status:'New',notes:'Potential expansion, priority account'},
      {id:'LD002',account:'Beta Utilities',contact:'John Smith',title:'PM',status:'Open',notes:'Follow-up after maintenance demo'},
      {id:'LD003',account:'Centennial Mining',contact:'Aisha Khan',title:'Procurement',status:'Open',notes:'Looking for long-term support'},
      {id:'LD004',account:'Delta Roads',contact:'Peter Zhang',title:'Infrastructure Lead',status:'New',notes:'Regulatory-driven scope increase'},
      {id:'LD005',account:'Everest Energy',contact:'Sara Lee',title:'Head of Projects',status:'Open',notes:'Interested in bundled services'},
      {id:'LD006',account:'Frontier Water',contact:'Tom Brown',title:'Operations Manager',status:'New',notes:'Small expansion, quick win'},
      {id:'LD007',account:'Global Transit',contact:'Raj Patel',title:'VP Engineering',status:'Open',notes:'Pilot requested for Q1'},
      {id:'LD008',account:'Horizon Telecom',contact:'Mary Johnson',title:'CTO',status:'Open',notes:'Integration required with CPQ'},
      {id:'LD009',account:'Indigo Pharma',contact:'Dr. Luis Gomez',title:'Facilities',status:'New',notes:'Urgent regulatory upgrade'},
      {id:'LD010',account:'Jade Construction',contact:'Amy Nguyen',title:'Project Director',status:'Open',notes:'Multiple sites opportunity'}
    ],
    quotes: [
      {id:'QO001',account:'Acme Power',contact:'Jane Doe',ref:'Quick Quote #1001',amount:120000,status:'Draft',template:'Template A',notes:'Pre-built bundle, 30-day approval'},
      {id:'QO002',account:'Beta Utilities',contact:'John Smith',ref:'Quick Quote #1002',amount:45000,status:'Pending',template:'Template B',notes:'Requires approval from procurement'},
      {id:'QO003',account:'Centennial Mining',contact:'Aisha Khan',ref:'Quick Quote #1003',amount:90000,status:'Approved',template:'Template C',notes:'Discount applied for volume'},
      {id:'QO004',account:'Delta Roads',contact:'Peter Zhang',ref:'Quick Quote #1004',amount:30000,status:'Pending',template:'Template A',notes:'Fast lane approval requested'},
      {id:'QO005',account:'Everest Energy',contact:'Sara Lee',ref:'Quick Quote #1005',amount:78000,status:'Draft',template:'Template B',notes:'Needs CPQ verification'},
      {id:'QO006',account:'Frontier Water',contact:'Tom Brown',ref:'Quick Quote #1006',amount:15000,status:'Approved',template:'Template C',notes:'Local pricing applied'},
      {id:'QO007',account:'Global Transit',contact:'Raj Patel',ref:'Quick Quote #1007',amount:56000,status:'Pending',template:'Template A',notes:'Integration with PPM planned'},
      {id:'QO008',account:'Horizon Telecom',contact:'Mary Johnson',ref:'Quick Quote #1008',amount:64000,status:'Draft',template:'Template B',notes:'Awaiting contract terms'},
      {id:'QO009',account:'Indigo Pharma',contact:'Dr. Luis Gomez',ref:'Quick Quote #1009',amount:210000,status:'Approved',template:'Template C',notes:'High priority - expedite'},
      {id:'QO010',account:'Jade Construction',contact:'Amy Nguyen',ref:'Quick Quote #1010',amount:47000,status:'Pending',template:'Template A',notes:'Multiple site discount'}
    ]
  };
})();
