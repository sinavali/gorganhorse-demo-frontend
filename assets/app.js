/* ============================================================================
   Gorgan Horse Federation - application engine (rebuilt, complete)
   Default fa-IR (RTL, Jalali) + en-US. Requires assets/i18n.js.
   ============================================================================ */
(function(){
'use strict';
var I=window.I18N||null;
function T(k){return I?I.t(k):k;}
function RTL(){return I?I.isRTL():false;}
function fD(s){return I?I.fmtDate(s):s;}
function fDT(s){return I?I.fmtDateTime(s):s;}
function faNum(v){return I?I.num(v):String(v);}
var $=function(s,r){return (r||document).querySelector(s);};
var $$=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s));};
function esc(v){return String(v==null?'':v).replace(/[&<>"']/g,function(c){return({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c];});}
function n(v){return faNum(Math.round(Number(v)||0));}
function K(v){v=Number(v)||0;return v>=1e9?(v/1e9).toFixed(2)+'B':v>=1e6?(v/1e6).toFixed(1)+'M':v>=1e3?(v/1e3).toFixed(1)+'K':faNum(v);}
function IRT(v){return n(v)+' IRT';}
function ini(s){return String(s||'').trim().split(/\s+/).slice(0,2).map(function(w){return w[0];}).join('').toUpperCase();}
function ic(nm,c){return '<svg class="ic'+(c?' '+c:'')+'"><use href="#'+nm+'"/></svg>';}
function cv(x){return getComputedStyle(document.documentElement).getPropertyValue(x).trim();}
function uid(p){return p+'-'+Math.random().toString(36).slice(2,7).toUpperCase();}
function today(){return I?I.today():new Date().toISOString().slice(0,10);}
function nowISO(){return new Date().toISOString().slice(0,16).replace('T',' ');}
function daysTo(d){return Math.round((new Date(d)-new Date(today()))/86400000);}
function rel(d){var x=daysTo(d);if(x===0)return T('Today');if(x===1)return T('Tomorrow');if(x===-1)return T('Yesterday');return (x>0?'in '+x+'d':Math.abs(x)+'d');}
function sum(a,f){return a.reduce(function(t,x){return t+(f?f(x):x);},0);}
function by(k,d){return function(a,b){var x=a[k],y=b[k];if(typeof x==='number'&&typeof y==='number')return (x-y)*(d||1);return String(x).localeCompare(String(y))*(d||1);};}
function uniq(a){return a.filter(function(v,i){return a.indexOf(v)===i;});}
function clamp(v,a,b){return Math.max(a,Math.min(b,v));}
function tip(t,p){return ' data-tip="'+esc(t)+'"'+(p?' data-tip-pos="'+p+'"':'');}
function qm(t){return '<span class="qmark"'+tip(t)+'></span>';}
function btnI(icon,label,act,ex,cls){return '<button class="btn-i'+(cls?' '+cls:'')+'" data-action="'+act+'"'+(ex||'')+tip(label)+'>'+ic(icon,'')+'</button>';}
function chip(t,on,a,v){return '<button class="chip'+(on?' on':'')+'" data-action="'+a+'" data-v="'+esc(v)+'">'+esc(t)+'</button>';}

/* ------------------------------- SEED DATA ------------------------------- */
var BREEDS=['Akhal-Teke','Turkmen','Arabian','Thoroughbred','Caspian','Kurdish'];
var SEXES=['Stallion','Mare','Gelding','Filly','Colt'];
var DISC=['Beauty','Jumping','Racing','Endurance','Dressage'];
var HSTAT=['Active','In Training','For Sale','Retired','Quarantine'];
var MTIERS=['Gold','Silver','Bronze'];
var MROLES=['Breeder','Trainer','Owner','Veterinarian'];
var REGIONS=['Gorgan','Gonbad-e Kavus','Bandar Torkaman','Akkaleh','Kalaleh','Aliabad','Aqqala'];
var VETT=['Vaccination','Dental Check','General Checkup','Deworming','Blood Test','X-Ray','Inspection'];
var RECS=['Completed','Scheduled','Due Soon','Overdue','Quarantine'];
var ESTAT=['Draft','Published','Open for Entry','Completed','Cancelled'];
var ETYPES=['Show Jumping','Racing','Endurance','Dressage','Breed Show'];
var CATS=['Registration','Membership','Sponsorship','Prize Fund','Veterinary','Facilities','Officials','Permits','Insurance','Entry Fees'];
var USERS=[
 {u:'admin',p:'demo1234',name:'Sina Hormozi',title:'Chief Registry Officer',role:'admin',email:'s.hormozi@gorganhf.ir',phone:'+98 17 3224 0001'},
 {u:'manager',p:'demo1234',name:'Maryam Ebrahimi',title:'Registry Manager',role:'manager',email:'m.ebrahimi@gorganhf.ir',phone:'+98 17 3224 0014'},
 {u:'vet',p:'demo1234',name:'Dr. Amir Tavakoli',title:'Federation Veterinarian',role:'vet',phone:'+98 913 118 5562',memberId:'M-203'},
 {u:'rider',p:'demo1234',name:'Reza Aghamiri',title:'Licensed Rider',role:'rider',phone:'+98 911 320 4417',memberId:'M-201'}
];
var ROLE_LABEL={admin:'Administrator',manager:'Manager',vet:'Veterinarian',rider:'Rider'};
function seed(){
 var M=[
  ['M-201','Reza Aghamiri','Breeder','Gold','Gonbad-e Kavus','+98 911 320 4417','r.aghamiri@turkmenstud.ir','BR-1042','2023-07-03','Active',42000000,'2026-12-30','Turkmen Stud'],
  ['M-202','Niloofar Sadeghi','Trainer','Silver','Gorgan','+98 912 774 0091','n.sadeghi@grc.ir','TR-2210','2024-11-22','Active',26000000,'2026-11-14','Gorgan Riding Club'],
  ['M-203','Dr. Amir Tavakoli','Veterinarian','Gold','Gorgan','+98 913 118 5562','','VT-0311','2021-05-11','Active',38000000,'2027-01-20','Veterinary Unit'],
  ['M-204','Mahmoud Rahimi','Breeder','Gold','Akkaleh','+98 911 455 8823','','BR-0987','2020-01-25','Active',40000000,'2026-10-02','Akkala Farm'],
  ['M-205','Sara Kavian','Owner','Silver','Bandar Torkaman','+98 935 660 1174','','OW-3320','2026-09-09','Active',22000000,'2026-09-11','Caspian Stables'],
  ['M-206','Dr. Leila Norouzi','Veterinarian','Silver','Gonbad-e Kavus','+98 901 220 7733','','VT-0455','2025-05-30','Active',28000000,'2026-12-01','Gonbad Clinic'],
  ['M-207','Behnam Shirdel','Trainer','Bronze','Gorgan','+98 919 004 5512','','TR-2455','2027-02-16','Suspended',0,'2024-06-30','Gorgan Riding Club'],
  ['M-208','Farzad Mohammadi','Breeder','Bronze','Kalaleh','+98 936 771 2200','','BR-1580','2027-04-03','Pending',18000000,'','Kalaleh Stud'],
  ['M-209','Hengameh Rostami','Owner','Gold','Gorgan','+98 912 300 6645','','JD-0071','2019-08-21','Active',34000000,'2027-02-15','Officials Pool'],
  ['M-210','Kaveh Yamchi','Trainer','Silver','Gonbad-e Kavus','+98 930 118 4477','','JD-0102','2023-09-30','Active',29000000,'2026-12-20','Officials Pool'],
  ['M-211','Parisa Ghorbani','Owner','Silver','Aqqala','+98 933 552 8891','','OW-3401','2026-04-12','Active',31000000,'2026-08-01','Aqqala Stud'],
  ['M-212','Yousef Kordi','Breeder','Gold','Kalaleh','+98 901 776 3344','','BR-1101','2022-02-09','Active',45000000,'2027-03-18','Kordi Ranch'],
  ['M-213','Atefeh Rahmani','Trainer','Bronze','Gorgan','+98 936 220 1188','','TR-2488','2026-06-15','Active',15000000,'2026-09-05','Gorgan Riding Club'],
  ['M-214','Iman Fallah','Farrier','Bronze','Bandar Torkaman','+98 910 883 2211','','FR-0033','2025-03-03','Active',9000000,'2026-08-08','Farrier Guild']
 ].map(function(r){return{id:r[0],name:r[1],role:r[2],tier:r[3],region:r[4],phone:r[5],email:r[6],licence:r[7],joined:r[8],status:r[9],dues:r[10],duesUntil:r[11],org:r[12]};});
 var HN=['Baran','Tara','Omid','Laleh','Kaveh','Shirin','Arash','Nika','Sorkh','Noor','Dara','Arezoo','Taranom','Kayhan','Mahsa','Zar','Sepid','Samira'];
 var H=[];
 for(var i=0;i<24;i++){
  var m=M[i%M.length];
  H.push({id:'H-'+String(1001+i),name:HN[i%HN.length]+' '+(i<12?'I':'II'),breed:BREEDS[i%BREEDS.length],sex:SEXES[i%SEXES.length],color:['Bay','Chestnut','Black','Grey'][i%4],yob:2015+(i%10),age:2026-(2015+(i%10)),discipline:DISC[i%DISC.length],status:HSTAT[i%HSTAT.length],ownerId:m.id,stable:m.org,value:300000000+((i*137)%900)*1000000,dna:['Verified','Pending'][i%3===0?1:0],insured:i%2===0,region:m.region,chip:'IR-CHIP-'+String(48211+i),sire:'Sire '+(i%5+1),dam:'Dam '+(i%5+1),registered:'2021-0'+((i%9)+1)+'-1'+((i%9))});
 }
 var E=[];
 var EN=['Spring Show Jumping','Caspian Endurance Cup','Gorgan Breed Show','Autumn Racing Meet','Dressage Gala','Turkmen Heritage Trophy'];
 for(var j=0;j<6;j++){
  E.push({id:'EV-'+(201+j),name:EN[j],type:ETYPES[j%ETYPES.length],date:'2026-'+String(10+ (j%3))+'-'+String(10+j),venue:REGIONS[j%REGIONS.length]+' Arena',status:ESTAT[(j%4)],fee:1500000+j*250000,cap:60+j*8,entries:[],judge:mname(M,(j%M.length)),prize:50000000+j*10000000});
 }
 function mname(list,id){return id;}
 var HE=[];
 for(var k=0;k<22;k++){HE.push({id:'V-'+String(3001+k),horseId:H[k%H.length].id,type:VETT[k%VETT.length],date:'2026-0'+((k%9)+1)+'-0'+(k%9+1),next:'2026-1'+((k%2))+'-1'+(k%9),vetId:M[2].id,status:RECS[k%RECS.length],notes:''});}
 var F=[];
 for(var q=0;q<28;q++){F.push({id:'T-'+String(4001+q),date:'2026-0'+((q%9)+1)+'-1'+(q%9),type:q%3===0?'Expense':'Income',cat:CATS[q%CATS.length],amount:2000000+((q*97)%80)*500000,method:['Bank','Cash','Cheque'][q%3],status:q%4===0?'Settled':'Pending',ref:'RC-'+String(1000+q)});}
 var IV=[];
 for(var r2=0;r2<10;r2++){IV.push({id:'INV-'+String(5001+r2),no:'INV-1405-'+String(101+r2),memberId:M[r2%M.length].id,issued:'2026-0'+((r2%9)+1)+'-05',due:'2026-1'+((r2%2))+'-05',status:['Paid','Unpaid','Overdue'][r2%3],items:[{d:'Membership',q:1,p:2500000}]});}
 var NO=[];
 for(var s=0;s<8;s++){NO.push({id:'N-'+String(9001+s),text:['New licence application','Vaccination overdue','Payment received','Event entry submitted','Horse transfer pending','DNA result ready'][s%6],date:'2026-0'+((s%9)+1)+'-2'+(s%9),read:s%3===0,go:['members','health','finance','events','horses','horses'][s%6],tone:['b-info','b-warn','b-ok','b-mut','b-warn','b-ok'][s%6]});}
 var AU=[];
 for(var t=0;t<14;t++){AU.push({id:'A-'+String(7001+t),at:'2026-0'+((t%9)+1)+'-2'+(t%9)+' 09:'+String(10+t%50),action:['Signed in','Updated horse record','Approved member','Issued invoice','Recorded vaccination','Published event'][t%6],actor:M[t%M.length].name,module:['auth','horses','members','finance','health','events'][t%6],tone:['b-info','b-mut','b-ok','b-mut','b-ok','b-info'][t%6]});}
 return{members:M,horses:H,events:E,health:HE,finance:F,invoices:IV,notifs:NO,audit:AU,requests:[],prefs:{density:'comfortable',accent:'green',theme:'light',org:{name:'Gorgan Horse Federation',reg:'IR-GHF-1405',phone:'+98 17 3224 0000',email:'info@gorganhf.ir'}},counters:{horse:1024,member:214,event:201,health:3001,txn:4001,inv:5001,req:1}};
}

/* --------------------------------- STORE --------------------------------- */
var KEY='ghf-demo-v5',DB,SES=null;
function load(){try{var s=localStorage.getItem(KEY);if(s){DB=JSON.parse(s);if(!DB.counters)DB.counters=seed().counters;if(!DB.requests)DB.requests=[];return;}}catch(e){}DB=seed();save();}
function save(){try{localStorage.setItem(KEY,JSON.stringify(DB));}catch(e){}}
function resetDB(){DB=seed();save();}
function loadSes(){try{var s=localStorage.getItem(KEY+'-ses');if(s)SES=JSON.parse(s);}catch(e){}}
function saveSes(){try{if(SES)localStorage.setItem(KEY+'-ses',JSON.stringify(SES));else localStorage.removeItem(KEY+'-ses');}catch(e){}}
function horse(id){return DB.horses.filter(function(h){return h.id===id;})[0];}
function member(id){return DB.members.filter(function(m){return m.id===id;})[0];}
function mname(id){var m=member(id);return m?m.name:'\u2014';}
function hname(id){var h=horse(id);return h?h.name:'\u2014';}
function ev(id){return DB.events.filter(function(e){return e.id===id;})[0];}
function inv(id){return DB.invoices.filter(function(v){return v.id===id;})[0];}
function invTotal(v){return sum(v.items,function(i){return i.q*i.p;});}
function ownerHorses(id){return DB.horses.filter(function(h){return h.ownerId===id;});}

/* ------------------------------ PERMISSIONS ------------------------------ */
var NAV={
 admin:['dashboard','horses','members','events','health','finance','reports','notifications','audit','settings'],
 manager:['dashboard','horses','members','events','health','finance','reports','notifications','audit','settings'],
 vet:['dashboard','horses','health','events','notifications'],
 rider:['portal','events','notifications','settings']
};
var PAGES={
 dashboard:{label:'Dashboard',icon:'i-grid',sec:'Operations'},
 horses:{label:'Horse Registry',icon:'i-horse',sec:'Operations'},
 members:{label:'Members & Licences',icon:'i-users',sec:'Operations'},
 events:{label:'Competitions',icon:'i-calendar',sec:'Operations'},
 health:{label:'Health & Veterinary',icon:'i-pulse',sec:'Operations'},
 finance:{label:'Finance & Invoicing',icon:'i-wallet',sec:'Insights'},
 reports:{label:'Reports & Analytics',icon:'i-chart',sec:'Insights'},
 notifications:{label:'Notifications',icon:'i-bell',sec:'Insights'},
 audit:{label:'Audit Log',icon:'i-shield',sec:'Insights'},
 settings:{label:'Settings',icon:'i-settings',sec:'System'},
 portal:{label:'My Portal',icon:'i-horse',sec:'Operations'}
};
var CAN={
 'horse.w':['admin','manager'],'horse.request':['rider'],'member.w':['admin','manager'],
 'event.w':['admin','manager'],'entry.w':['admin','manager','rider'],
 'health.w':['admin','manager','vet'],'finance.w':['admin','manager'],
 'settings.w':['admin','manager'],'audit.v':['admin','manager'],
 'reports.v':['admin','manager'],'approve.w':['admin','manager']
};
function can(p){if(!SES)return false;if(SES.role==='admin')return true;var l=CAN[p];return !l||l.indexOf(SES.role)>=0;}
function allowed(p){return SES&&NAV[SES.role].indexOf(p)>=0;}

/* --------------------------------- STATE --------------------------------- */
var S={page:'dashboard',drawer:null,ui:{
 horses:{q:'',breed:'all',status:'all',owner:'all',sort:'name',dir:1,page:1,perPage:8},
 members:{q:'',role:'all',tier:'all',status:'all',sort:'name',dir:1,page:1,perPage:9,layout:'grid'},
 events:{q:'',status:'all',tab:'entries'},
 health:{q:'',type:'all',status:'all',sort:'next',dir:1,page:1,perPage:8},
 finance:{tab:'txn',q:'',type:'all',cat:'all',sort:'date',dir:-1,page:1,perPage:8,iq:'',istatus:'all'},
 reports:{module:'all',region:'all',status:'all',from:'',to:'',metric:'registrations',sort:'label',dir:1,page:1,perPage:10},
 notif:{f:'all'},
 audit:{q:'',module:'all',sort:'at',dir:-1,page:1,perPage:12},
 portal:{tab:'horses',page:1,perPage:8}
}};


/* --- UI PRIMITIVES --- */
var PAL=['#1d8f5f','#c98f16','#1f6f8b','#7a4b9c','#b4552d','#3f7d3a','#0f7a86','#a03a5a'];
function bdg(s){var t={Active:'b-ok',Verified:'b-ok',Paid:'b-ok',Approved:'b-ok',Completed:'b-ok','Open for Entry':'b-info',Published:'b-info',Scheduled:'b-info',Silver:'b-info',Gold:'b-warn','Due Soon':'b-warn',Draft:'b-mut',Bronze:'b-mut','In Training':'b-info','For Sale':'b-warn',Retired:'b-mut',Quarantine:'b-bad',Overdue:'b-bad',Unpaid:'b-warn',Suspended:'b-bad',Rejected:'b-bad',Pending:'b-warn',Cancelled:'b-mut'}[s]||'b-mut';return '<span class="badge '+t+'">'+esc(T(s))+'</span>';}
function avc(name){var h=0;String(name).split('').forEach(function(c){h=(h*31+c.charCodeAt(0))%360;});return h;}
function av(name,sz,seed){var h=avc(seed||name);var bg='linear-gradient(140deg,hsl('+h+',42%,38%),hsl('+((h+40)%360)+',48%,24%))';var d={'s':'34px','m':'40px','l':'64px'}[sz||'s']||'34px';var f=sz==='l'?'20px':'13px';return '<span style="display:inline-grid;place-items:center;width:'+d+';height:'+d+';border-radius:'+(sz==='l'?'18px':'11px')+';background:'+bg+';color:#fff;font-weight:700;font-size:'+f+';flex:none">'+esc(ini(name))+'</span>';}
function statCard(o){return '<div class="panel pad lift"><div class="row jb gap3"><div class="g1"><div class="mut i11 b" style="text-transform:uppercase;letter-spacing:.07em">'+esc(T(o.label))+(o.tip?qm(o.tip):'')+'</div><div class="dsp bb" style="font-size:25px;line-height:1.15;margin-top:5px">'+o.value+'</div>'+(o.sub?'<div class="mut i11 mt1">'+o.sub+'</div>':'')+'</div><span class="badge '+o.tone+'" style="width:38px;height:38px;border-radius:12px;justify-content:center;padding:0">'+ic(o.icon,'')+'</span></div></div>';}
function pageHead(t,sub,actions){return '<div class="row jb gap4 wrap mb5"><div class="g1"><h2 class="dsp bb" style="font-size:23px">'+esc(T(t))+'</h2>'+(sub?'<p class="mut i13 mt1">'+sub+'</p>':'')+'</div><div class="row gap2 wrap">'+(actions||'')+'</div></div>';}
function searchBox(ph,key,val){return '<div style="position:relative;flex:1;min-width:190px;max-width:320px"><span style="position:absolute;inset-inline-start:11px;top:50%;transform:translateY(-50%);color:var(--muted);display:flex">'+ic('i-search','')+'</span><input class="inp" data-filter="'+key+'" value="'+esc(val||'')+'" placeholder="'+esc(T(ph))+'" style="padding-inline-start:34px"/></div>';}
function selBox(key,opts,val,label){return '<select class="sel" data-filter="'+key+'" style="width:auto;min-width:130px">'+(label?'<option value="all">'+esc(T(label))+'</option>':'')+opts.map(function(o){var v=(o&&o.v!==undefined)?o.v:o,l=(o&&o.l!==undefined)?o.l:o;return '<option value="'+esc(v)+'"'+(String(val)===String(v)?' selected':'')+'>'+esc(T(l))+'</option>';}).join('')+'</select>';}
function pager(total,page,perPage,act){var pages=Math.max(1,Math.ceil(total/perPage)),start=(page-1)*perPage;var nums='';for(var p=1;p<=pages;p++){if(pages>7&&p>2&&p<pages-1&&Math.abs(p-page)>1){if(p===3)nums+='<span class="mut" style="padding:0 4px">&#8230;</span>';continue;}nums+='<button class="btn btn-sm '+(p===page?'btn-p':'btn-g')+'" data-action="'+act+'" data-p="'+p+'">'+n(p)+'</button>';}return '<div class="row jb gap3 wrap" style="padding:13px 16px;border-top:1px solid var(--border)"><div class="mut i12">'+n(total?start+1:0)+' &#8211; '+n(Math.min(start+perPage,total))+' / '+n(total)+'</div><div class="row gap1 wrap"><button class="btn btn-sm btn-g" data-action="'+act+'" data-p="'+(page-1)+'"'+(page===1?' disabled':'')+'>'+ic('i-cl','')+'</button>'+nums+'<button class="btn btn-sm btn-g" data-action="'+act+'" data-p="'+(page+1)+'"'+(page===pages?' disabled':'')+'>'+ic('i-cr','')+'</button></div></div>';}
function empty(m,s,act){return '<div class="empty">'+ic('i-search','')+'<div class="b i13" style="color:var(--text)">'+esc(T(m))+'</div>'+(s?'<div class="i12 mt1">'+esc(T(s))+'</div>':'')+(act||'')+'</div>';}
function kv(k,v){return '<div class="pad-s" style="border:1px solid var(--border);border-radius:12px;background:var(--surface-2)"><div class="mut i11 b" style="text-transform:uppercase;letter-spacing:.06em">'+esc(T(k))+'</div><div class="b i13 mt1" style="word-break:break-word">'+v+'</div></div>';}
function rl(left,right){return '<div class="rl"><div class="g1">'+left+'</div><div class="row gap2">'+right+'</div></div>';}
function thSort(key,label,ui){var on=ui.sort===key;return '<th class="sortable'+(on?' on':'')+'" data-action="ui.sort" data-key="'+key+'"'+tip(T('Sort by')+' '+T(label))+' style="cursor:pointer">'+esc(T(label))+'<span class="sortind">'+(on?(ui.dir>0?'&#9650;':'&#9660;'):'&#9660;')+'</span></th>';}
function sortRows(rows,key,dir){return rows.slice().sort(by(key,dir));}
function tw(inner){return '<div class="tw">'+inner+'</div>';}
function lineChart(o){var W=680,H=o.h||240,pad=34;var all=[].concat.apply([],o.series.map(function(s){return s.data;}));var mx=Math.max.apply(null,all.concat([1]));var n2=o.labels.length;var gw=(W-pad*2)/Math.max(1,n2-1);var gy=function(v){return H-pad-(v/mx)*(H-pad*2);};var g='';o.labels.forEach(function(l,i){g+='<text x="'+(pad+i*gw)+'" y="'+(H-10)+'" font-size="10" fill="#8ba598" text-anchor="middle">'+esc(l)+'</text>';});var lines=o.series.map(function(s){var pts=s.data.map(function(v,i){return (pad+i*gw)+','+gy(v);}).join(' ');return '<polyline points="'+pts+'" fill="none" stroke="'+s.color+'" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>'+s.data.map(function(v,i){return '<circle cx="'+(pad+i*gw)+'" cy="'+gy(v)+'" r="3" fill="'+s.color+'"/>';}).join('');}).join('');var grid='';for(var k=0;k<=4;k++){var yy=pad+(H-pad*2)*k/4;grid+='<line x1="'+pad+'" y1="'+yy+'" x2="'+(W-pad)+'" y2="'+yy+'" stroke="#e2e9e5"/>';}return '<svg viewBox="0 0 '+W+' '+H+'" style="width:100%;height:auto;display:block">'+grid+g+lines+'</svg>';}
function barChart(o){var W=680,H=o.h||240,pad=34;var all=[];o.series.forEach(function(s){all=all.concat(s.data);});var mx=Math.max.apply(null,all.concat([1]));var n2=o.labels.length;var bw=(W-pad*2)/n2*0.6;var step=(W-pad*2)/n2;var bars='';o.labels.forEach(function(l,i){var v=o.series[0].data[i]||0;var hh=(v/mx)*(H-pad*2);bars+='<rect x="'+(pad+i*step+(step-bw)/2)+'" y="'+(H-pad-hh)+'" width="'+bw+'" height="'+hh+'" rx="4" fill="'+o.series[0].color+'"/><text x="'+(pad+i*step+step/2)+'" y="'+(H-10)+'" font-size="9.5" fill="#8ba598" text-anchor="middle">'+esc(l)+'</text>';});return '<svg viewBox="0 0 '+W+' '+H+'" style="width:100%;height:auto;display:block">'+bars+'</svg>';}
function donut(o){var R=70,C=2*Math.PI*R,total=sum(o.data,function(d){return d.v;})||1,acc=0;var seg=o.data.map(function(d,i){var frac=d.v/total;var dash=frac*C;var el='<circle r="'+R+'" cx="90" cy="90" fill="none" stroke="'+PAL[i%PAL.length]+'" stroke-width="22" stroke-dasharray="'+dash+' '+(C-dash)+'" stroke-dashoffset="'+(-acc*C)+'" transform="rotate(-90 90 90)"/>';acc+=frac;return el;}).join('');return '<div class="row gap4 wrap"><svg viewBox="0 0 180 180" style="width:150px;height:150px;flex:none">'+seg+'<text x="90" y="94" text-anchor="middle" font-size="20" font-weight="700" fill="currentColor">'+n(total)+'</text></svg><div class="g1">'+o.data.map(function(d,i){return '<div class="row jb i12 mb2"><span class="row gap2"><i style="width:10px;height:10px;border-radius:3px;background:'+PAL[i%PAL.length]+';display:inline-block"></i>'+esc(d.l)+'</span><span class="b">'+n(d.v)+'</span></div>';}).join('')+'</div></div>';}
function bars(list){var mx=Math.max.apply(null,list.map(function(x){return x.v;}).concat([1]));return list.map(function(x){return '<div class="mb3"><div class="row jb i12 mb1"><span class="b row gap1">'+ic(x.icon||'i-pin','')+' '+esc(x.l)+'</span><span class="mut">'+n(x.v)+'</span></div><div style="height:8px;border-radius:99px;background:var(--surface-3);overflow:hidden"><i style="display:block;height:100%;width:'+Math.round(x.v/mx*100)+'%;background:linear-gradient(90deg,var(--brand),color-mix(in srgb,var(--brand) 45%,#fff))"></i></div></div>';}).join('');}
/* --- OVERLAYS --- */
var layers=0;function ovEl(){return $('#ov');}
function layOn(){layers++;var o=ovEl();if(o)o.classList.add('on');}
function layOff(){layers=Math.max(0,layers-1);var o=ovEl();if(o&&!layers)o.classList.remove('on');}
var mOpen=false;
function openModal(html,max){var b=$('#mbox');if(!b)return;b.innerHTML=html;b.style.maxWidth=max||'640px';$('#mw').classList.add('on');layOn();requestAnimationFrame(function(){b.classList.add('on');});mOpen=true;var f=b.querySelector('input,select,textarea');if(f)setTimeout(function(){f.focus();},140);}
function closeModal(){if(!mOpen)return;var b=$('#mbox');b.classList.remove('on');mOpen=false;layOff();setTimeout(function(){if(!mOpen){$('#mw').classList.remove('on');b.innerHTML='';}},200);}
var dOpen=false;
function openDrawer(html,wide){var d=$('#drw');d.innerHTML=html;d.classList.toggle('wide',!!wide);d.setAttribute('aria-hidden','false');layOn();requestAnimationFrame(function(){d.classList.add('on');});dOpen=true;}
function closeDrawer(){if(!dOpen)return;var d=$('#drw');d.classList.remove('on');d.setAttribute('aria-hidden','true');dOpen=false;layOff();S.drawer=null;setTimeout(function(){if(!dOpen)d.innerHTML='';},300);}
function closeAll(){closeDrawer();closeModal();sideClose();}
function confirmDlg(o){openModal('<div class="pad" style="border-bottom:1px solid var(--border)"><div class="row gap3"><span class="badge '+(o.tone||'b-bad')+'" style="width:38px;height:38px;border-radius:12px;justify-content:center">'+ic(o.icon||'i-info','')+'</span><div class="g1"><h3 class="dsp bb" style="font-size:16.5px">'+esc(o.title)+'</h3><p class="mut i13 mt1" style="line-height:1.55">'+(o.body||'')+'</p></div></div></div><div class="pad jend row gap2"><button class="btn btn-g" data-action="ui.closeModal">'+esc(T('Cancel'))+'</button><button class="btn '+(o.tone==='b-bad'||!o.tone?'btn-d':'btn-p')+'" data-action="ui.confirmYes">'+esc(o.ok||T('Confirm'))+'</button></div>','480px');confirmDlg._fn=o.onOk;}
function openForm(cfg){var fs=cfg.fields||[];var body=fs.map(function(f){var c='';if(f.type==='select'){c='<select class="sel" name="'+f.name+'">'+(f.placeholder?'<option value="">'+esc(f.placeholder)+'</option>':'')+f.options.map(function(o){var v=(o&&o.v!==undefined)?o.v:o,l=(o&&o.l!==undefined)?o.l:o;return '<option value="'+esc(v)+'"'+(String(f.value)===String(v)?' selected':'')+'>'+esc(l)+'</option>';}).join('')+'</select>';}else if(f.type==='textarea'){c='<textarea class="ta" name="'+f.name+'" placeholder="'+esc(f.ph||'')+'">'+esc(f.value||'')+'</textarea>';}else if(f.type==='date'){c='<input class="inp ghf-dp-input" type="text" readonly name="'+f.name+'" value="'+esc(f.value||'')+'" data-datepicker/>';}else{c='<input class="inp" type="'+(f.type||'text')+'" name="'+f.name+'" placeholder="'+esc(f.ph||'')+'"'+(f.value!=null?' value="'+esc(f.value)+'"':'')+'/>';}return '<div class="'+(f.full?'full':'')+'"><label class="lbl">'+esc(T(f.label))+(f.req?' <span style="color:var(--danger)">*</span>':'')+(f.tip?qm(f.tip):'')+'</label>'+c+(f.hint?'<div class="mut i11 mt1">'+esc(T(f.hint))+'</div>':'')+'<div class="emsg" data-e="'+f.name+'"></div></div>';}).join('');openModal('<div class="pad" style="border-bottom:1px solid var(--border);position:sticky;top:0;background:var(--surface);z-index:2"><div class="row jb gap3"><div class="g1"><h3 class="dsp bb" style="font-size:17px">'+esc(cfg.title)+'</h3>'+(cfg.sub?'<p class="mut i12 mt1">'+esc(cfg.sub)+'</p>':'')+'</div><button class="btn-i" data-action="ui.closeModal">'+ic('i-x','')+'</button></div></div><form id="gform" class="pad"><div class="frow">'+body+'</div><div class="row jend gap2 mt5" style="border-top:1px solid var(--border);padding-top:16px"><button type="button" class="btn btn-g" data-action="ui.closeModal">'+esc(T('Cancel'))+'</button><button type="submit" class="btn btn-p">'+ic('i-check','')+' '+esc(cfg.ok||T('Save'))+'</button></div></form>',cfg.max||'680px');if(I&&I.mountDatePickers)I.mountDatePickers($('#mbox'));$('#gform').addEventListener('submit',function(ev){ev.preventDefault();var vals={},ok=true,firstBad=null;fs.forEach(function(f){var el=$('#mbox [name="'+f.name+'"]');if(!el)return;var raw=String(el.value).trim();var e=$('[data-e="'+f.name+'"]');var msg='';var v=raw;if(f.req&&!v)msg=T('This field is required.');else if(v&&f.type==='email'&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v))msg=T('Enter a valid email address.');else if(v&&f.type==='tel'&&!/^[+0-9][0-9 \-()]{6,}$/.test(v))msg=T('Enter a valid phone number.');if(msg){ok=false;el.classList.add('err');if(e){e.textContent=msg;e.classList.add('on');}if(!firstBad)firstBad=el;}else{el.classList.remove('err');if(e)e.classList.remove('on');}vals[f.name]=v;});if(!ok){if(firstBad)firstBad.focus();toast(T('Please correct the highlighted fields.'),'e');return;}cfg.submit(vals);closeModal();});}
function toast(msg,kind){var r=$('#toasts');if(!r)return;var el=document.createElement('div');el.className='toast '+(kind||'');el.innerHTML='<span class="tdot '+(kind||'')+'"></span><div class="g1 i13">'+msg+'</div>';r.appendChild(el);requestAnimationFrame(function(){el.classList.add('on');});setTimeout(function(){el.classList.remove('on');setTimeout(function(){el.remove();},300);},4200);}
function logA(action,actor,module,tone){DB.audit.unshift({id:'A-'+Date.now(),at:nowISO(),action:action,actor:actor||(SES?SES.name:'system'),module:module||'general',tone:tone||'b-mut'});if(DB.audit.length>400)DB.audit.length=400;save();}


/* --- CSV / PRINT --- */
function csv(name,head,rows){var line=function(a){return a.map(function(c){var s=String(c==null?'':c).replace(/<[^>]+>/g,'');return /[",\n]/.test(s)?'"'+s.replace(/"/g,'""')+'"':s;}).join(',');};var txt=[line(head)].concat(rows.map(line)).join('\n');var b=new Blob(['\ufeff'+txt],{type:'text/csv;charset=utf-8;'});var u=URL.createObjectURL(b),a=document.createElement('a');a.href=u;a.download=name;document.body.appendChild(a);a.click();a.remove();setTimeout(function(){URL.revokeObjectURL(u);},600);toast('Exported <b>'+esc(name)+'</b>.');logA('Exported '+name,name,'reports','b-mut');}
function printDoc(title,html){var org=(DB.prefs&&DB.prefs.org)||{};var head='<div class="ghf-print-head"><div class="ghf-print-seal">GHF</div><div style="flex:1"><div style="font-size:14px;font-weight:700">'+esc(org.name||'Gorgan Horse Federation')+'</div><div style="font-size:10.5px;color:#555">'+esc(org.reg||'IR-GHF')+' &middot; '+esc(fDT(nowISO()))+'</div></div></div>';var inner='<div dir="'+(RTL()?'rtl':'ltr')+'"><h1 style="font-size:19px;margin:0 0 12px">'+esc(title)+'</h1>'+head+html+'<div class="ghf-print-foot">'+esc(org.name||'GHF')+' &middot; '+esc(org.phone||'')+' &middot; '+esc(org.email||'')+'</div></div>';var pa=$('#printArea');if(pa)pa.innerHTML=inner;openModal('<div class="pad" style="border-bottom:1px solid var(--border)"><div class="row jb gap3"><div><h3 class="dsp bb" style="font-size:17px">'+esc(title)+'</h3></div><button class="btn-i" data-action="ui.closeModal">'+ic('i-x','')+'</button></div></div><div class="pad scroll" style="max-height:56vh;overflow:auto;background:var(--surface-2)"><div class="panel pad" style="box-shadow:none">'+inner+'</div></div><div class="pad row jend gap2" style="border-top:1px solid var(--border)"><button class="btn btn-g" data-action="ui.closeModal">'+esc(T('Close'))+'</button><button class="btn btn-p" data-action="ui.printNow">'+ic('i-print','')+' '+esc(T('Print'))+'</button></div>','760px');}
function backup(){var b=new Blob([JSON.stringify(DB,null,2)],{type:'application/json'});var u=URL.createObjectURL(b),a=document.createElement('a');a.href=u;a.download='ghf-backup-'+today()+'.json';document.body.appendChild(a);a.click();a.remove();toast('Backup downloaded.');}
/* --- NAV / ROUTER --- */
function navCount(pg){if(pg==='members')return DB.members.filter(function(m){return m.status==='Pending';}).length;if(pg==='health')return DB.health.filter(function(r){return r.status==='Overdue'||r.status==='Due Soon';}).length;if(pg==='events')return DB.events.filter(function(e){return e.status==='Draft';}).length;if(pg==='finance')return DB.invoices.filter(function(v){return v.status!=='Paid';}).length;if(pg==='notifications')return DB.notifs.filter(function(x){return !x.read;}).length;if(pg==='horses')return DB.horses.filter(function(h){return h.dna==='Pending';}).length;if(pg==='settings')return (DB.requests||[]).length;return 0;}
function renderNav(){var list=NAV[SES.role],secs={};list.forEach(function(pg){var s=PAGES[pg].sec;(secs[s]=secs[s]||[]).push(pg);});var html='';Object.keys(secs).forEach(function(s){html+='<div class="nsec">'+esc(T(s))+'</div>';secs[s].forEach(function(pg){var cnt=navCount(pg);html+='<button class="ni'+(S.page===pg?' on':'')+'" data-action="nav" data-page="'+pg+'"'+tip(T(PAGES[pg].label))+'><span class="g1 trunc" style="text-align:start;display:flex;gap:8px;align-items:center">'+ic(PAGES[pg].icon,'')+esc(T(PAGES[pg].label))+'</span>'+(cnt?'<span class="i11 bb" style="padding:2px 6px;border-radius:7px;background:rgba(224,172,58,.2);color:#e6c377">'+n(cnt)+'</span>':'')+'</button>';});html+='<div style="height:14px"></div>';});var nv=$('#nav');if(nv)nv.innerHTML=html;var sn=$('#sideName');if(sn)sn.textContent=SES.name;var st=$('#sideTitle');if(st)st.textContent=SES.title;var sr=$('#sideRole');if(sr)sr.textContent=T(ROLE_LABEL[SES.role])+' \u00b7 '+T('workspace');var sa=$('#sideAv');if(sa)sa.innerHTML=av(SES.name,'m',SES.u);bellCount();}
function bellCount(){var c=DB.notifs.filter(function(x){return !x.read;}).length,d=$('#bellDot');if(!d)return;d.textContent=(I&&I.toFaDigits)?I.toFaDigits(c>9?'9+':c):(c>9?'9+':c);d.style.display=c?'grid':'none';}
function go(pg,opts){if(!allowed(pg)){toast(T('That module is not available for your role.'),'w');return;}S.page=pg;closeDrawer();closeModal();var cr=$('#crumb');if(cr)cr.textContent=T(PAGES[pg].label);renderNav();render();if(window.scrollTo)if(window.scrollTo)window.scrollTo({top:0,behavior:'smooth'});if(opts&&opts.toast)toast(opts.toast);}
function render(){var c=$('#content');if(!c)return;var fn=RENDER[S.page]||RENDER.dashboard;c.innerHTML='<div class="fade-in">'+fn()+'</div>';if(I&&I.mountDatePickers)I.mountDatePickers(c);}
function refresh(){save();renderNav();bellCount();render();}
var RENDER={};
RENDER.dashboard=function(){var inc=sum(DB.finance.filter(function(f){return f.type==='Income';}),function(f){return f.amount;});var exp=sum(DB.finance.filter(function(f){return f.type==='Expense';}),function(f){return f.amount;});var pend=DB.members.filter(function(m){return m.status==='Pending';}).length;var overdue=DB.health.filter(function(r){return r.status==='Overdue';}).length;var unpaid=DB.invoices.filter(function(v){return v.status!=='Paid';}).length;
 var h='<div class="hero pad" style="padding:26px"><div style="position:relative" class="row gap4 wrap"><div class="g1" style="min-width:280px"><span class="badge" style="background:rgba(224,172,58,.18);color:#f0d79a">'+ic('i-star','icf')+' '+esc(T('Season'))+' 1405</span><h1 class="dsp bb mt3" style="font-size:clamp(22px,2.6vw,31px);color:#fff;line-height:1.2">'+esc(T('Welcome back'))+', '+esc(SES.name.split(' ')[0])+'</h1><p class="mt2 i13" style="color:#a9c3b5">'+esc(T('All figures are live demo data.'))+'</p><div class="row gap2 wrap mt4">'+(can('horse.w')?'<button class="btn btn-gold" data-action="horse.new">'+ic('i-plus','')+' '+esc(T('Register horse'))+'</button>':'')+'<button class="btn" style="background:rgba(255,255,255,.1);color:#fff" data-action="nav" data-page="events">'+ic('i-calendar','')+' '+esc(T('Competition calendar'))+'</button></div></div></div></div>';
 h+='<div class="grid c4 mt5">'+statCard({label:'Studbook entries',value:n(DB.horses.length),sub:K(sum(DB.horses,function(x){return x.value;}))+' IRT',icon:'i-horse',tone:'b-ok'})+statCard({label:'Members & Licences',value:n(DB.members.length),sub:n(pend)+' '+T('Pending'),icon:'i-users',tone:'b-info'})+statCard({label:'Revenue',value:K(inc)+' <span class="mut i12">IRT</span>',sub:T('Expenditure')+' '+K(exp),icon:'i-wallet',tone:'b-ok'})+statCard({label:'Open invoices',value:n(unpaid),sub:n(overdue)+' '+T('Overdue'),icon:'i-invoice',tone:unpaid?'b-warn':'b-ok'})+'</div>';
 h+='<div class="grid main31 mt5"><div class="panel pad"><h3 class="dsp bb" style="font-size:16px">'+esc(T('Registrations trend'))+'</h3><div class="mt3">'+lineChart({labels:['Frv','Ord','Khr','Tir','Mrd','Shr'],h:220,series:[{name:'R',data:[79,92,104,96,112,128],color:cv('--brand')}]})+'</div></div><div class="panel pad"><h3 class="dsp bb" style="font-size:16px">'+esc(T('Members by role'))+'</h3><div class="mt3">'+donut({data:MROLES.map(function(r){return {l:T(r),v:DB.members.filter(function(m){return m.role===r;}).length};})})+'</div></div></div>';
 return h;};
function filteredHorses(){var u=S.ui.horses;return DB.horses.filter(function(h){return (u.breed==='all'||h.breed===u.breed)&&(u.status==='all'||h.status===u.status)&&(u.owner==='all'||h.ownerId===u.owner)&&(!u.q||(h.name+' '+h.breed+' '+h.chip+' '+mname(h.ownerId)).toLowerCase().indexOf(u.q)>=0);});}
RENDER.horses=function(){var u=S.ui.horses,rows=sortRows(filteredHorses(),u.sort,u.dir),w=can('horse.w');var pages=Math.max(1,Math.ceil(rows.length/u.perPage));if(u.page>pages)u.page=pages;var slice=rows.slice((u.page-1)*u.perPage,u.page*u.perPage);var ownerOpts=DB.members.map(function(m){return{v:m.id,l:m.name};});
 var h=pageHead('Horse Registry',esc(T('Studbook of registered horses.')),'<button class="btn btn-g" data-action="horse.export">'+ic('i-dl','')+' '+esc(T('Export CSV'))+'</button>'+(w?'<button class="btn btn-p" data-action="horse.new">'+ic('i-plus','')+' '+esc(T('Register horse'))+'</button>':''));
 h+='<div class="panel"><div class="pad-s row gap2 wrap">'+searchBox('Search horses','hq',u.q)+selBox('hbreed',BREEDS,u.breed,'All breeds')+selBox('hstatus',HSTAT,u.status,'All statuses')+selBox('howner',ownerOpts,u.owner,'All owners')+'</div>';
 h+=tw('<table class="tb"><thead><tr>'+thSort('name','Horse',u)+thSort('breed','Breed',u)+thSort('age','Age',u)+'<th>'+esc(T('Owner'))+'</th>'+thSort('value','Valuation',u)+thSort('dna','DNA',u)+thSort('status','Status',u)+'<th>'+esc(T('Actions'))+'</th></tr></thead><tbody>'+slice.map(function(x){return '<tr><td><div class="row gap3">'+av(x.name,'s',x.id)+'<div><div class="b i13">'+esc(x.name)+'</div><div class="mut i11">'+esc(x.stable)+'</div></div></div></td><td class="i12">'+esc(T(x.breed))+'</td><td class="i12">'+n(x.age)+'</td><td class="i12">'+esc(mname(x.ownerId))+'</td><td class="b i12">'+K(x.value)+'</td><td>'+bdg(x.dna)+'</td><td>'+bdg(x.status)+'</td><td><div class="row gap1">'+btnI('i-eye',T('View'),'horse.view','data-id="'+x.id+'"')+(w?btnI('i-edit',T('Edit'),'horse.edit','data-id="'+x.id+'"'):'')+(w?btnI('i-print',T('Print passport'),'horse.passport','data-id="'+x.id+'"'):'')+'</div></td></tr>';}).join('')+'</tbody></table>')+(rows.length?pager(rows.length,u.page,u.perPage,'horse.page'):empty('No horses found','Adjust the filters.'))+'</div>';return h;};
function filteredMembers(){var u=S.ui.members;return DB.members.filter(function(m){return (u.role==='all'||m.role===u.role)&&(u.tier==='all'||m.tier===u.tier)&&(u.status==='all'||m.status===u.status)&&(!u.q||(m.name+' '+m.region+' '+m.phone+' '+m.licence+' '+m.role).toLowerCase().indexOf(u.q)>=0);});}
RENDER.members=function(){var u=S.ui.members,rows=sortRows(filteredMembers(),u.sort,u.dir),w=can('member.w');var pages=Math.max(1,Math.ceil(rows.length/u.perPage));if(u.page>pages)u.page=pages;var slice=rows.slice((u.page-1)*u.perPage,u.page*u.perPage);
 var h=pageHead('Members & Licences',esc(T('Licence holders, riders and officials.')),'<button class="btn btn-g" data-action="member.layout">'+ic(u.layout==='grid'?'i-list':'i-grid','')+' '+esc(T(u.layout==='grid'?'Table':'Grid'))+'</button>'+(w?'<button class="btn btn-p" data-action="member.new">'+ic('i-plus','')+' '+esc(T('Add member'))+'</button>':''));
 h+='<div class="panel"><div class="pad-s row gap2 wrap">'+searchBox('Search members','mq',u.q)+selBox('mrole',MROLES,u.role,'All roles')+selBox('mtier',MTIERS,u.tier,'All tiers')+selBox('mstatus',['Active','Pending','Suspended'],u.status,'All statuses')+'</div>';
 if(u.layout==='grid'){h+='<div class="pad grid c3">'+slice.map(function(m){return '<div class="panel pad lift"><div class="row gap3">'+av(m.name,'m',m.id)+'<div class="g1"><div class="b i13 trunc">'+esc(m.name)+'</div><div class="mut i11 trunc">'+esc(T(m.role))+' \u00b7 '+esc(m.region)+'</div></div></div><div class="row jb mt3"><span class="kbd">'+esc(m.licence)+'</span>'+bdg(m.status)+'</div><div class="row gap1 mt3">'+btnI('i-eye',T('View'),'member.view','data-id="'+m.id+'"')+(w?btnI('i-edit',T('Edit'),'member.edit','data-id="'+m.id+'"'):'')+'</div></div>';}).join('')+'</div>';}else{h+=tw('<table class="tb"><thead><tr>'+thSort('name','Name',u)+thSort('role','Role',u)+thSort('tier','Tier',u)+thSort('region','Region',u)+thSort('status','Status',u)+'<th>'+esc(T('Phone'))+'</th><th>'+esc(T('Actions'))+'</th></tr></thead><tbody>'+slice.map(function(m){return '<tr><td><div class="row gap3">'+av(m.name,'s',m.id)+'<div><div class="b i13">'+esc(m.name)+'</div><div class="mut i11">'+esc(m.licence)+'</div></div></div></td><td class="i12">'+esc(T(m.role))+'</td><td>'+bdg(m.tier)+'</td><td class="i12">'+esc(m.region)+'</td><td>'+bdg(m.status)+'</td><td class="i12" dir="ltr">'+esc(m.phone)+'</td><td><div class="row gap1">'+btnI('i-eye',T('View'),'member.view','data-id="'+m.id+'"')+(w?btnI('i-edit',T('Edit'),'member.edit','data-id="'+m.id+'"'):'')+'</div></td></tr>';}).join('')+'</tbody></table>');}
 h+=(rows.length?pager(rows.length,u.page,u.perPage,'member.page'):'')+'</div>';return h;};


RENDER.events=function(){var u=S.ui.events,list=DB.events.filter(function(e){return (u.status==='all'||e.status===u.status)&&(!u.q||e.name.toLowerCase().indexOf(u.q)>=0);}).sort(by('date',1));var w=can('event.w');var isRider=SES.role==='rider';
 var h=pageHead('Competitions',esc(T('Calendar, entries, results and start lists.')),'<button class="btn btn-g" data-action="event.export">'+ic('i-dl','')+' '+esc(T('Export CSV'))+'</button>'+(w?'<button class="btn btn-p" data-action="event.new">'+ic('i-plus','')+' '+esc(T('Add event'))+'</button>':''));
 h+='<div class="panel pad-s mb4 row gap2 wrap">'+searchBox('Search events','eq',u.q)+selBox('estatus',ESTAT,u.status,'All statuses')+'</div>';
 h+='<div class="grid c2">'+list.map(function(e){var ent=e.entries||[];return '<div class="panel pad lift"><div class="row jb gap3"><div class="g1"><div class="b i15">'+esc(e.name)+'</div><div class="mut i12 mt1">'+esc(T(e.type))+' \u00b7 '+esc(e.venue)+'</div></div>'+bdg(e.status)+'</div><div class="grid c3 mt3" style="gap:8px"><div class="pad-s" style="background:var(--surface-2);border-radius:10px"><div class="mut i11">'+esc(T('Date'))+'</div><div class="b i13">'+fD(e.date)+'</div></div><div class="pad-s" style="background:var(--surface-2);border-radius:10px"><div class="mut i11">'+esc(T('Fee'))+'</div><div class="b i13">'+K(e.fee)+'</div></div><div class="pad-s" style="background:var(--surface-2);border-radius:10px"><div class="mut i11">'+esc(T('Entries'))+'</div><div class="b i13">'+n(ent.length)+'</div></div></div><div class="row gap2 wrap mt3"><button class="btn btn-g btn-sm" data-action="event.view" data-id="'+e.id+'">'+ic('i-eye','')+' '+esc(T('View'))+'</button>'+(isRider&&e.status==='Open for Entry'?'<button class="btn btn-p btn-sm" data-action="event.riderEntry" data-id="'+e.id+'">'+ic('i-plus','')+' '+esc(T('Register for competition'))+'</button>':'')+(w?'<button class="btn btn-g btn-sm" data-action="event.edit" data-id="'+e.id+'">'+ic('i-edit','')+' '+esc(T('Edit'))+'</button>':'')+'</div></div>';}).join('')+'</div>';
 return h;};
function eventDrawer(id){var e=ev(id);if(!e)return;var ent=e.entries||[];var w=can('event.w');var isRider=SES.role==='rider';
 var h='<div class="pad" style="border-bottom:1px solid var(--border)"><div class="row jb gap3"><div class="g1"><h3 class="dsp bb" style="font-size:17px">'+esc(e.name)+'</h3><div class="mut i12 mt1">'+esc(T(e.type))+' \u00b7 '+fD(e.date)+'</div></div>'+bdg(e.status)+'<button class="btn-i" data-action="ui.closeDrawer">'+ic('i-x','')+'</button></div></div><div class="pad">'+(isRider&&e.status==='Open for Entry'?'<button class="btn btn-p mb3" data-action="event.riderEntry" data-id="'+e.id+'">'+ic('i-plus','')+' '+esc(T('Register for competition'))+'</button>':'')+'<div class="grid c2" style="gap:10px">'+kv('Venue',esc(e.venue))+kv('Fee',K(e.fee)+' IRT')+kv('Capacity',n(e.cap))+kv('Prize fund',K(e.prize)+' IRT')+'</div><h4 class="dsp bb mt4 mb2" style="font-size:14px">'+esc(T('Entries'))+' ('+n(ent.length)+')</h4>';
 h+=ent.length?tw('<table class="tb"><thead><tr><th>'+esc(T('Horse'))+'</th><th>'+esc(T('Rider'))+'</th><th>'+esc(T('Fee'))+'</th><th>'+esc(T('Place'))+'</th><th></th></tr></thead><tbody>'+ent.map(function(en,i){return '<tr><td class="b i13">'+esc(hname(en.horseId))+'</td><td class="i12">'+esc(en.rider||mname(en.riderId))+'</td><td>'+bdg(en.paid?'Paid':'Unpaid')+'</td><td>'+(en.place?'<span class="badge b-warn">'+n(en.place)+'</span>':'\u2014')+'</td><td><div class="row gap1">'+(w?btnI('i-check',T('Pay fee'),'event.payEntry','data-id="'+e.id+'" data-i="'+i+'"'):'')+(w?btnI('i-trash',T('Remove'),'event.rmEntry','data-id="'+e.id+'" data-i="'+i+'"'):'')+'</div></td></tr>';}).join('')+'</tbody></table>'):empty('No entries yet','Riders may register when entries are open.');
 if(w){h+='<div class="row gap2 mt4">'+btnI('i-plus',T('Add entry'),'event.addEntry','data-id="'+e.id+'"')+btnI('i-trophy',T('Enter results'),'event.results','data-id="'+e.id+'"')+'</div>';}
 h+='</div>';openDrawer(h,true);S.drawer={type:'event',id:id};}
function filteredHealth(){var u=S.ui.health;return DB.health.filter(function(r){return (u.type==='all'||r.type===u.type)&&(u.status==='all'||r.status===u.status)&&(!u.q||(hname(r.horseId)+' '+r.type).toLowerCase().indexOf(u.q)>=0);});}
RENDER.health=function(){var u=S.ui.health,rows=sortRows(filteredHealth(),u.sort,u.dir),w=can('health.w');var pages=Math.max(1,Math.ceil(rows.length/u.perPage));if(u.page>pages)u.page=pages;var slice=rows.slice((u.page-1)*u.perPage,u.page*u.perPage);
 var h=pageHead('Health & Veterinary',esc(T('Vaccinations, check-ups and compliance.')),'<button class="btn btn-g" data-action="record.export">'+ic('i-dl','')+' '+esc(T('Export CSV'))+'</button>'+(w?'<button class="btn btn-p" data-action="record.new">'+ic('i-plus','')+' '+esc(T('Add record'))+'</button>':''));
 h+='<div class="panel"><div class="pad-s row gap2 wrap">'+searchBox('Search records','vq',u.q)+selBox('vtype',VETT,u.type,'All types')+selBox('vstatus',RECS,u.status,'All statuses')+'</div>';
 h+=tw('<table class="tb"><thead><tr>'+thSort('horseId','Horse',u)+thSort('type','Procedure',u)+'<th>'+esc(T('Vet'))+'</th>'+thSort('date','Performed',u)+thSort('next','Next due',u)+thSort('status','Status',u)+'<th>'+esc(T('Actions'))+'</th></tr></thead><tbody>'+slice.map(function(r){return '<tr><td class="b i13">'+esc(hname(r.horseId))+'</td><td class="i12">'+esc(T(r.type))+'</td><td class="mut i12">'+esc(mname(r.vetId))+'</td><td class="i12">'+fD(r.date)+'</td><td class="i12">'+fD(r.next)+'</td><td>'+bdg(r.status)+'</td><td><div class="row gap1">'+(w?btnI('i-edit',T('Edit'),'record.edit','data-id="'+r.id+'"'):'')+(w?btnI('i-check',T('Complete'),'record.complete','data-id="'+r.id+'"'):'')+'</div></td></tr>';}).join('')+'</tbody></table>')+(rows.length?pager(rows.length,u.page,u.perPage,'record.page'):empty('No records','Log the first veterinary record.'))+'</div>';return h;};
function filteredTxn(){var u=S.ui.finance;return DB.finance.filter(function(f){return (u.type==='all'||f.type===u.type)&&(u.cat==='all'||f.cat===u.cat)&&(!u.q||(f.cat+' '+f.ref).toLowerCase().indexOf(u.q)>=0);});}
function filteredInv(){var u=S.ui.finance;return DB.invoices.filter(function(v){return (u.istatus==='all'||v.status===u.istatus)&&(!u.iq||(v.no+' '+mname(v.memberId)).toLowerCase().indexOf(u.iq)>=0);});}
RENDER.finance=function(){var u=S.ui.finance,w=can('finance.w');var inc=sum(DB.finance.filter(function(f){return f.type==='Income';}),function(f){return f.amount;});var exp=sum(DB.finance.filter(function(f){return f.type==='Expense';}),function(f){return f.amount;});
 var h=pageHead('Finance & Invoicing',esc(T('Ledger, invoices and dues.')),'<button class="btn btn-g" data-action="finance.export">'+ic('i-dl','')+' '+esc(T('Export CSV'))+'</button>');
 h+='<div class="grid c3 mb4">'+statCard({label:'Total income',value:K(inc)+' <span class="mut i12">IRT</span>',icon:'i-trend',tone:'b-ok'})+statCard({label:'Total expenditure',value:K(exp)+' <span class="mut i12">IRT</span>',icon:'i-wallet',tone:'b-warn'})+statCard({label:'Net position',value:K(inc-exp)+' <span class="mut i12">IRT</span>',icon:'i-chart',tone:'b-info'})+'</div>';
 h+='<div class="row gap2 mb3">'+chip(T('Transactions'),u.tab==='txn','finance.tab','txn')+chip(T('Invoices'),u.tab==='inv','finance.tab','inv')+'</div>';
 if(u.tab==='txn'){var rows=sortRows(filteredTxn(),u.sort,u.dir);var pages=Math.max(1,Math.ceil(rows.length/u.perPage));if(u.page>pages)u.page=pages;var slice=rows.slice((u.page-1)*u.perPage,u.page*u.perPage);
  h+='<div class="panel"><div class="pad-s row gap2 wrap">'+searchBox('Search transactions','fq',u.q)+selBox('ftype',['Income','Expense'],u.type,'All types')+selBox('fcat',CATS,u.cat,'All categories')+(w?'<button class="btn btn-p btn-sm" data-action="txn.new">'+ic('i-plus','')+' '+esc(T('Add transaction'))+'</button>':'')+'</div>';
  h+=tw('<table class="tb"><thead><tr>'+thSort('date','Date',u)+thSort('cat','Category',u)+thSort('type','Type',u)+thSort('amount','Amount',u)+'<th>'+esc(T('Status'))+'</th><th>'+esc(T('Actions'))+'</th></tr></thead><tbody>'+slice.map(function(f){return '<tr><td class="i12">'+fD(f.date)+'</td><td class="i12">'+esc(T(f.cat))+'</td><td>'+bdg(f.type==='Income'?'Paid':'Unpaid')+'</td><td class="b i12">'+K(f.amount)+'</td><td>'+bdg(f.status)+'</td><td><div class="row gap1">'+(w?btnI('i-edit',T('Edit'),'txn.edit','data-id="'+f.id+'"'):'')+btnI('i-eye',T('View'),'txn.view','data-id="'+f.id+'"')+'</div></td></tr>';}).join('')+'</tbody></table>')+(rows.length?pager(rows.length,u.page,u.perPage,'finance.page'):empty('No transactions',''))+'</div>';
 }else{var rows2=filteredInv();h+='<div class="panel"><div class="pad-s row gap2 wrap">'+searchBox('Search invoices','fiq',u.iq)+selBox('fistatus',['Paid','Unpaid','Overdue'],u.istatus,'All statuses')+(w?'<button class="btn btn-p btn-sm" data-action="invoice.new">'+ic('i-plus','')+' '+esc(T('New invoice'))+'</button>':'')+'</div>';
  h+=tw('<table class="tb"><thead><tr><th>'+esc(T('Invoice'))+'</th><th>'+esc(T('Member'))+'</th>'+thSort('issued','Issued',u)+thSort('due','Due',u)+'<th>'+esc(T('Total'))+'</th><th>'+esc(T('Status'))+'</th><th>'+esc(T('Actions'))+'</th></tr></thead><tbody>'+rows2.map(function(v){return '<tr><td><span class="kbd">'+esc(v.no)+'</span></td><td class="i13">'+esc(mname(v.memberId))+'</td><td class="i12">'+fD(v.issued)+'</td><td class="i12">'+fD(v.due)+'</td><td class="b i13">'+K(invTotal(v))+'</td><td>'+bdg(v.status)+'</td><td><div class="row gap1">'+btnI('i-eye',T('View'),'invoice.view','data-id="'+v.id+'"')+btnI('i-print',T('Print'),'invoice.print','data-id="'+v.id+'"')+(w&&v.status!=='Paid'?btnI('i-check',T('Mark paid'),'invoice.pay','data-id="'+v.id+'"'):'')+'</div></td></tr>';}).join('')+'</tbody></table>')+(rows2.length?'':empty('No invoices',''))+'</div>';}
 return h;};
/* ===END RENDERERS=== */

RENDER.reports=function(){var u=S.ui.reports;var rows=[
  {id:'k1',label:T('Registrations processed'),module:'horses',region:'all',status:'ok',value:1284},
  {id:'k2',label:T('Competition entries'),module:'events',region:'all',status:'ok',value:sum(DB.events,function(e){return (e.entries||[]).length;})},
  {id:'k3',label:T('Active members'),module:'members',region:'all',status:'ok',value:DB.members.filter(function(m){return m.status==='Active';}).length},
  {id:'k4',label:T('Revenue (M IRT)'),module:'finance',region:'all',status:'ok',value:Math.round(sum(DB.finance.filter(function(f){return f.type==='Income';}),function(f){return f.amount;})/1e6)},
  {id:'k5',label:T('Horses by region')+' - Gorgan',module:'horses',region:'Gorgan',status:'ok',value:DB.horses.filter(function(h){return h.region==='Gorgan';}).length},
  {id:'k6',label:T('Horses by region')+' - Gonbad-e Kavus',module:'horses',region:'Gonbad-e Kavus',status:'ok',value:DB.horses.filter(function(h){return h.region==='Gonbad-e Kavus';}).length},
  {id:'k7',label:T('Horses by region')+' - Bandar Torkaman',module:'horses',region:'Bandar Torkaman',status:'ok',value:DB.horses.filter(function(h){return h.region==='Bandar Torkaman';}).length}
];
 if(u.region!=='all')rows=rows.filter(function(r){return r.region==='all'||r.region===u.region;});
 if(u.module!=='all')rows=rows.filter(function(r){return r.module===u.module;});
 if(u.status!=='all')rows=rows.filter(function(r){return r.status===u.status;});
 rows=sortRows(rows,u.sort,u.dir);
 var pages=Math.max(1,Math.ceil(rows.length/u.perPage));if(u.page>pages)u.page=pages;var slice=rows.slice((u.page-1)*u.perPage,u.page*u.perPage);
 var h=pageHead('Reports & Analytics',esc(T('Flexible filters, sorting and pagination across all datasets.')),'<button class="btn btn-g" data-action="report.print">'+ic('i-print','')+' '+esc(T('Print'))+'</button><button class="btn btn-g" data-action="report.export">'+ic('i-dl','')+' '+esc(T('Export CSV'))+'</button>');
 h+='<div class="panel pad mb4"><div class="flt"><div class="fld"><label>'+esc(T('Module'))+'</label>'+selBox('rmodule',['all','horses','members','events','finance'],u.module,'All')+'</div><div class="fld"><label>'+esc(T('Region'))+'</label>'+selBox('rregion',['all'].concat(REGIONS),u.region,'All')+'</div><div class="fld"><label>'+esc(T('Status'))+'</label>'+selBox('rstatus',['all','ok'],u.status,'All')+'</div><div class="fld"><label>'+esc(T('Metric'))+'</label>'+selBox('rmetric',['registrations','revenue','entries'],u.metric,'All')+'</div></div></div>';
 h+='<div class="panel"><div class="pad-s row jb gap2 wrap"><div class="mut i12">'+n(rows.length)+' '+esc(T('indicators'))+'</div></div>';
 h+=tw('<table class="tb"><thead><tr>'+thSort('label','Indicator',u)+thSort('module','Module',u)+thSort('region','Region',u)+thSort('value','Value',u)+'</tr></thead><tbody>'+slice.map(function(r){return '<tr><td class="i13 b">'+esc(r.label)+'</td><td>'+bdg('Published')+'</td><td class="i12">'+esc(T(r.region))+'</td><td class="b i13">'+n(r.value)+'</td></tr>';}).join('')+'</tbody></table>')+(rows.length?pager(rows.length,u.page,u.perPage,'report.page'):empty('No data','Adjust filters.'))+'</div>';
 return h;};
RENDER.notifications=function(){var u=S.ui.notif;var list=DB.notifs.filter(function(x){return u.f==='all'||(u.f==='unread'?!x.read:x.read);});
 var h=pageHead('Notifications',esc(T('System and workflow alerts.')),'<button class="btn btn-g" data-action="notif.all">'+ic('i-check','')+' '+esc(T('Mark all read'))+'</button>');
 h+='<div class="row gap2 mb3">'+chip(T('All'),u.f==='all','notif.filter','all')+chip(T('Unread'),u.f==='unread','notif.filter','unread')+chip(T('Read'),u.f==='read','notif.filter','read')+'</div>';
 h+='<div class="panel">'+(list.length?list.map(function(x){return '<div class="rl" style="cursor:pointer" data-action="notif.open" data-id="'+x.id+'"><div class="row gap3"><span class="badge '+x.tone+'" style="width:34px;height:34px;border-radius:10px;justify-content:center">'+ic('i-bell','')+'</span><div class="g1"><div class="b i13">'+esc(x.text)+'</div><div class="mut i11 mt1">'+fDT(x.date)+'</div></div></div><div class="row gap2">'+(x.read?'':'<span class="badge b-info">'+esc(T('New'))+'</span>')+ic('i-cr','')+'</div></div>';}).join(''):empty('No notifications',''))+'</div>';
 return h;};
RENDER.audit=function(){var u=S.ui.audit;var rows=sortRows(DB.audit.filter(function(a){return (u.module==='all'||a.module===u.module)&&(!u.q||a.action.toLowerCase().indexOf(u.q)>=0);}),u.sort,u.dir);var pages=Math.max(1,Math.ceil(rows.length/u.perPage));if(u.page>pages)u.page=pages;var slice=rows.slice((u.page-1)*u.perPage,u.page*u.perPage);
 var h=pageHead('Audit Log',esc(T('Every action is recorded.')),'<button class="btn btn-g" data-action="audit.export">'+ic('i-dl','')+' '+esc(T('Export CSV'))+'</button>'+(can('settings.w')?'<button class="btn btn-d" data-action="audit.clear">'+ic('i-trash','')+' '+esc(T('Clear'))+'</button>':''));
 h+='<div class="panel"><div class="pad-s row gap2 wrap">'+searchBox('Search log','aq',u.q)+selBox('amod',['all','auth','horses','members','events','health','finance','settings','reports','general'],u.module,'All modules')+'</div>';
 h+=tw('<table class="tb"><thead><tr>'+thSort('at','Time',u)+thSort('action','Action',u)+thSort('actor','Actor',u)+thSort('module','Module',u)+'</tr></thead><tbody>'+slice.map(function(a){return '<tr><td class="i12">'+esc(a.at)+'</td><td class="i13">'+esc(a.action)+'</td><td class="i12">'+esc(a.actor)+'</td><td>'+bdg('Published')+'</td></tr>';}).join('')+'</tbody></table>')+(rows.length?pager(rows.length,u.page,u.perPage,'audit.page'):empty('No log entries',''))+'</div>';
 return h;};
RENDER.settings=function(){var o=(DB.prefs&&DB.prefs.org)||{};
 var h=pageHead('Settings',esc(T('Organisation, preferences and data.')),'');
 h+='<div class="grid main31"><div class="panel pad"><h3 class="dsp bb" style="font-size:16px">'+esc(T('Organisation profile'))+'</h3><div class="mt3 grid c2" style="gap:10px">'+kv('Name',esc(o.name||''))+kv('Registration',esc(o.reg||''))+kv('Phone',esc(o.phone||''))+kv('Email',esc(o.email||''))+'</div>'+(can('settings.w')?'<form id="orgF" class="mt4 row gap2"><input class="inp" name="name" value="'+esc(o.name||'')+'"'+tip(T('Name'))+'/><input class="inp" name="phone" value="'+esc(o.phone||'')+'"'+tip(T('Phone'))+'/><button class="btn btn-p" type="submit">'+esc(T('Save'))+'</button></form>':'')+'</div>'+
  '<div class="panel pad"><h3 class="dsp bb" style="font-size:16px">'+esc(T('Preferences'))+'</h3><div class="mt3"><div class="mut i11 b mb2">'+esc(T('Language'))+'</div><div class="langsw"><button class="'+(I&&I.lang==='fa-IR'?'on':'')+'" data-action="set.lang" data-v="fa-IR">'+'\u0641\u0627\u0631\u0633\u06cc'+'</button><button class="'+(I&&I.lang==='en-US'?'on':'')+'" data-action="set.lang" data-v="en-US">English</button></div></div><div class="mt3"><div class="mut i11 b mb2">'+esc(T('Theme'))+'</div><div class="row gap2">'+btnI('i-moon',T('Dark'),'set.theme','data-v="dark"')+btnI('i-sun',T('Light'),'set.theme','data-v="light"')+'</div></div><div class="mt3"><div class="mut i11 b mb2">'+esc(T('Backup'))+'</div><div class="row gap2"><button class="btn btn-g" data-action="set.backup">'+ic('i-dl','')+' '+esc(T('Backup'))+'</button>'+(can('settings.w')?'<button class="btn btn-d" data-action="set.reset">'+ic('i-refresh','')+' '+esc(T('Reset demo data'))+'</button>':'')+'</div></div></div></div>';
 return h;};
RENDER.portal=function(){var m=member(SES.memberId);if(!m)return '<div class="panel pad">'+empty('No member profile linked','')+'</div>';var hs=ownerHorses(m.id),u=S.ui.portal;var ents=[];DB.events.forEach(function(e){(e.entries||[]).forEach(function(en){var h=horse(en.horseId);if(h&&h.ownerId===m.id)ents.push({e:e,en:en,h:h});});});var ivs=DB.invoices.filter(function(v){return v.memberId===m.id;});var due=sum(ivs.filter(function(v){return v.status!=='Paid';}),invTotal);var myreq=(DB.requests||[]).filter(function(r){return r.ownerId===m.id;});
 var h='<div class="hero pad" style="padding:24px"><div class="row gap4 wrap" style="position:relative">'+av(m.name,'l',m.id)+'<div class="g1"><div class="i11" style="color:#a9c3b5">'+esc(m.licence)+' \u00b7 '+esc(T(m.role))+' \u00b7 '+esc(m.region)+'</div><h1 class="dsp bb" style="font-size:24px;color:#fff">'+esc(T('Welcome back'))+', '+esc(m.name.split(' ')[0])+'</h1></div><div class="row gap2 wrap">'+(due?'<button class="btn btn-gold" data-action="portal.payAll">'+ic('i-wallet','')+' '+esc(T('Pay'))+' '+K(due)+'</button>':'')+'<button class="btn" style="background:rgba(255,255,255,.1);color:#fff" data-action="horse.new">'+ic('i-plus','')+' '+esc(T('Add horse'))+'</button></div></div></div>';
 h+='<div class="grid c3 mt5">'+statCard({label:'My horses',value:n(hs.length),sub:K(sum(hs,function(x){return x.value;}))+' IRT',icon:'i-horse',tone:'b-ok'})+statCard({label:'Competition entries',value:n(ents.length),sub:n(ents.filter(function(x){return x.en.paid;}).length)+' '+T('Paid'),icon:'i-trophy',tone:'b-info'})+statCard({label:'Outstanding',value:K(due)+' <span class="mut i12">IRT</span>',sub:n(ivs.filter(function(v){return v.status!=='Paid';}).length)+' '+T('open'),icon:'i-invoice',tone:due?'b-warn':'b-ok'})+'</div>';
 h+='<div class="row gap2 mt5 mb3"><div class="pill-nav">'+[['horses','My horses'],['entries','My entries'],['requests','My requests'],['invoices','My invoices']].map(function(t){return '<button class="'+(u.tab===t[0]?'on':'')+'" data-action="portal.tab" data-v="'+t[0]+'">'+esc(T(t[1]))+'</button>';}).join('')+'</div></div><div class="panel">';
 if(u.tab==='horses'){h+=hs.length?tw('<table class="tb"><thead><tr><th>'+esc(T('Horse'))+'</th><th>'+esc(T('Breed'))+'</th><th>'+esc(T('Status'))+'</th><th>'+esc(T('Actions'))+'</th></tr></thead><tbody>'+hs.map(function(x){return '<tr><td class="b i13">'+esc(x.name)+'</td><td class="i12">'+esc(T(x.breed))+'</td><td>'+bdg(x.status)+'</td><td><div class="row gap1">'+btnI('i-eye',T('View'),'horse.view','data-id="'+x.id+'"')+btnI('i-edit',T('Edit'),'horse.edit','data-id="'+x.id+'"')+btnI('i-trash',T('Delete'),'horse.del','data-id="'+x.id+'"')+'</div></td></tr>';}).join('')+'</tbody></table>'):empty('No horses','');}
 else if(u.tab==='entries'){h+=ents.length?tw('<table class="tb"><thead><tr><th>'+esc(T('Event'))+'</th><th>'+esc(T('Horse'))+'</th><th>'+esc(T('Result'))+'</th><th>'+esc(T('Fee'))+'</th></tr></thead><tbody>'+ents.map(function(x){return '<tr><td class="b i13">'+esc(x.e.name)+'</td><td class="i12">'+esc(x.h.name)+'</td><td>'+(x.en.place?'<span class="badge b-warn">'+n(x.en.place)+'</span>':'\u2014')+'</td><td>'+(x.en.paid?bdg('Paid'):'<button class="btn btn-s btn-sm" data-action="portal.payEntry" data-e="'+x.e.id+'" data-h="'+x.h.id+'">'+esc(T('Pay fee'))+'</button>')+'</td></tr>';}).join('')+'</tbody></table>'):empty('No entries','');}
 else if(u.tab==='requests'){h+=myreq.length?tw('<table class="tb"><thead><tr><th>'+esc(T('Type'))+'</th><th>'+esc(T('Details'))+'</th><th>'+esc(T('Status'))+'</th></tr></thead><tbody>'+myreq.map(function(r){return '<tr><td class="i12">'+esc(r.kind)+'</td><td class="i13">'+esc(r.label)+'</td><td>'+bdg(r.status)+'</td></tr>';}).join('')+'</tbody></table>'):empty('No requests','Your change requests will appear here for approval.');}
 else{h+=ivs.length?tw('<table class="tb"><thead><tr><th>'+esc(T('Invoice'))+'</th><th>'+esc(T('Due'))+'</th><th>'+esc(T('Total'))+'</th><th>'+esc(T('Status'))+'</th></tr></thead><tbody>'+ivs.map(function(v){return '<tr><td><span class="kbd">'+esc(v.no)+'</span></td><td class="i12">'+fD(v.due)+'</td><td class="b i13">'+K(invTotal(v))+'</td><td>'+bdg(v.status)+'</td></tr>';}).join('')+'</tbody></table>'):empty('No invoices','');}
 return h+'</div>';};
/* ===END R2=== */

/* --- ACTIONS --- */
var A={};
function need(p){if(can(p))return true;toast(T('Your role cannot perform this action.'),'e');return false;}
A['nav']=function(el){go(el.dataset.page);};
A['ui.sort']=function(el){var u=curUi();if(!u)return;var k=el.dataset.key;if(u.sort===k)u.dir=-u.dir;else{u.sort=k;u.dir=1;}render();};
function curUi(){return S.ui[S.page];}
A['ui.tab']=function(el){var u=curUi();if(u&&u.tab!==undefined)u.tab=el.dataset.v;render();};
A['ui.closeModal']=function(){closeModal();};
A['ui.closeDrawer']=function(){closeDrawer();};
A['ui.confirmYes']=function(){var f=confirmDlg._fn;closeModal();if(f)f();};
A['ui.printNow']=function(){window.print();};
A['horse.new']=function(){if(!SES)return;horseForm(null);};
A['horse.edit']=function(el){var h=horse(el.dataset.id);if(!h)return;if(SES.role==='rider'&&h.ownerId!==SES.memberId){toast(T('You can only edit your own horses.'),'e');return;}horseForm(h);};
A['horse.view']=function(el){horseDrawer(el.dataset.id);};
A['horse.page']=function(el){S.ui.horses.page=+el.dataset.p;render();};
A['horse.export']=function(){csv('horses.csv',['Name','Breed','Sex','Age','Owner','Value','DNA','Status'],DB.horses.map(function(h){return [h.name,h.breed,h.sex,h.age,mname(h.ownerId),h.value,h.dna,h.status];}));};
A['horse.del']=function(el){var h=horse(el.dataset.id);if(!h)return;var isRider=SES.role==='rider';confirmDlg({title:T('Delete horse?'),body:esc(h.name),ok:T('Delete'),onOk:function(){if(isRider){pushReq('delete',h.id,T('Delete horse')+' '+h.name);toast(T('Request submitted for approval.'));}else{DB.horses=DB.horses.filter(function(x){return x.id!==h.id;});logA('Deleted horse '+h.name,h.id,'horses','b-bad');save();refresh();toast(T('Horse deleted.'));}}});};
A['horse.passport']=function(el){var h=horse(el.dataset.id);if(!h)return;printDoc(T('Studbook passport')+' \u2014 '+h.name,'<table><tr><td>'+T('Name')+'</td><td>'+esc(h.name)+'</td></tr><tr><td>'+T('Breed')+'</td><td>'+esc(T(h.breed))+'</td></tr><tr><td>'+T('Sex')+'</td><td>'+esc(T(h.sex))+'</td></tr><tr><td>'+T('Microchip')+'</td><td>'+esc(h.chip)+'</td></tr><tr><td>'+T('Owner')+'</td><td>'+esc(mname(h.ownerId))+'</td></tr><tr><td>'+T('DNA verification')+'</td><td>'+esc(T(h.dna))+'</td></tr></table>');};
A['member.new']=function(){if(need('member.w'))memberForm(null);};
A['member.edit']=function(el){if(need('member.w'))memberForm(member(el.dataset.id));};
A['member.view']=function(el){var m=member(el.dataset.id);if(!m)return;openDrawer('<div class="pad" style="border-bottom:1px solid var(--border)"><div class="row jb gap3"><div class="row gap3">'+av(m.name,'m',m.id)+'<div><h3 class="dsp bb" style="font-size:17px">'+esc(m.name)+'</h3><div class="mut i12">'+esc(T(m.role))+'</div></div></div><button class="btn-i" data-action="ui.closeDrawer">'+ic('i-x','')+'</button></div></div><div class="pad"><div class="grid c2" style="gap:10px">'+kv('Licence',esc(m.licence))+kv('Tier',esc(T(m.tier)))+kv('Region',esc(m.region))+kv('Phone',esc(m.phone))+kv('Email',esc(m.email||'\u2014'))+kv('Status',T(m.status))+'</div></div>',false);S.drawer={type:'member',id:m.id};};
A['member.layout']=function(){S.ui.members.layout=S.ui.members.layout==='grid'?'table':'grid';render();};
A['member.page']=function(el){S.ui.members.page=+el.dataset.p;render();};
A['event.new']=function(){if(need('event.w'))eventForm(null);};
A['event.edit']=function(el){if(need('event.w'))eventForm(ev(el.dataset.id));};
A['event.view']=function(el){eventDrawer(el.dataset.id);};
A['event.riderEntry']=function(el){var e=ev(el.dataset.id);if(!e)return;var hs=ownerHorses(SES.memberId);if(!hs.length){toast(T('You have no horses to enter.'),'e');return;}openForm({title:T('Register for competition'),fields:[{name:'horseId',label:'Horse',type:'select',req:1,options:hs.map(function(h){return{v:h.id,l:h.name};})},{name:'rider',label:'Rider',req:1,value:SES.name}],submit:function(v){e.entries=e.entries||[];e.entries.push({horseId:v.horseId,rider:v.rider,riderId:SES.memberId,paid:false,place:null});pushReq('entry',e.id,T('Entry')+' '+hname(v.horseId)+' \u2192 '+e.name);logA('Rider entered competition',SES.name,'events','b-info');save();refresh();toast(T('Entry submitted for approval.'));}});};
A['event.addEntry']=function(el){if(!need('event.w'))return;var e=ev(el.dataset.id);if(!e)return;openForm({title:T('Add entry'),fields:[{name:'horseId',label:'Horse',type:'select',req:1,options:DB.horses.map(function(h){return{v:h.id,l:h.name};})},{name:'rider',label:'Rider',req:1}],submit:function(v){e.entries=e.entries||[];e.entries.push({horseId:v.horseId,rider:v.rider,paid:false,place:null});logA('Added entry',e.id,'events','b-mut');save();closeDrawer();eventDrawer(e.id);render();}});};
A['event.rmEntry']=function(el){if(!need('event.w'))return;var e=ev(el.dataset.id);if(!e)return;e.entries.splice(+el.dataset.i,1);save();closeDrawer();eventDrawer(e.id);render();};
A['event.payEntry']=function(el){if(!need('event.w'))return;var e=ev(el.dataset.id);if(!e)return;e.entries[+el.dataset.i].paid=true;logA('Marked entry fee paid',e.id,'events','b-ok');save();closeDrawer();eventDrawer(e.id);};
A['event.results']=function(el){if(!need('event.w'))return;var e=ev(el.dataset.id);if(!e)return;openForm({title:T('Enter results'),fields:(e.entries||[]).map(function(en,i){return {name:'p'+i,label:hname(en.horseId),type:'number',value:en.place||''};}),submit:function(v){(e.entries||[]).forEach(function(en,i){en.place=+v['p'+i]||null;});e.status='Completed';logA('Entered results',e.id,'events','b-ok');save();closeDrawer();render();}});};
A['event.export']=function(){csv('events.csv',['Name','Type','Date','Venue','Status','Fee','Entries'],DB.events.map(function(e){return [e.name,e.type,e.date,e.venue,e.status,e.fee,(e.entries||[]).length];}));};
A['record.new']=function(){if(need('health.w'))recForm(null);};
A['record.edit']=function(el){if(need('health.w'))recForm(DB.health.filter(function(r){return r.id===el.dataset.id;})[0]);};
A['record.complete']=function(el){var r=DB.health.filter(function(x){return x.id===el.dataset.id;})[0];if(!r)return;r.status='Completed';logA('Completed record',r.id,'health','b-ok');save();refresh();};
A['record.page']=function(el){S.ui.health.page=+el.dataset.p;render();};
A['record.export']=function(){csv('health.csv',['Horse','Procedure','Vet','Date','Next','Status'],DB.health.map(function(r){return [hname(r.horseId),r.type,mname(r.vetId),r.date,r.next,r.status];}));};
A['finance.tab']=function(el){S.ui.finance.tab=el.dataset.v;render();};
A['finance.page']=function(el){S.ui.finance.page=+el.dataset.p;render();};
A['finance.export']=function(){csv('finance.csv',['Date','Type','Category','Amount','Status'],DB.finance.map(function(f){return [f.date,f.type,f.cat,f.amount,f.status];}));};
A['txn.new']=function(){if(need('finance.w'))txnForm(null);};
A['txn.edit']=function(el){if(need('finance.w'))txnForm(DB.finance.filter(function(f){return f.id===el.dataset.id;})[0]);};
A['txn.view']=function(el){var f=DB.finance.filter(function(x){return x.id===el.dataset.id;})[0];if(!f)return;openDrawer('<div class="pad"><div class="row jb"><h3 class="dsp bb">'+esc(T(f.cat))+'</h3><button class="btn-i" data-action="ui.closeDrawer">'+ic('i-x','')+'</button></div><div class="grid c2 mt3" style="gap:10px">'+kv('Date',fD(f.date))+kv('Type',T(f.type))+kv('Amount',K(f.amount))+kv('Status',T(f.status))+'</div></div>',false);};
A['invoice.new']=function(){if(need('finance.w'))invoiceForm();};
A['invoice.view']=function(el){var v=inv(el.dataset.id);if(!v)return;openDrawer('<div class="pad"><div class="row jb"><h3 class="dsp bb">'+esc(v.no)+'</h3><button class="btn-i" data-action="ui.closeDrawer">'+ic('i-x','')+'</button></div><div class="mt3">'+kv('Member',esc(mname(v.memberId)))+'</div><div class="mt3">'+kv('Total',K(invTotal(v)))+'</div></div>',false);};
A['invoice.print']=function(el){var v=inv(el.dataset.id);if(!v)return;printDoc(T('Invoice')+' '+v.no,'<table><tr><td>'+T('Member')+'</td><td>'+esc(mname(v.memberId))+'</td></tr><tr><td>'+T('Issued')+'</td><td>'+fD(v.issued)+'</td></tr><tr><td>'+T('Due')+'</td><td>'+fD(v.due)+'</td></tr><tr><td>'+T('Total')+'</td><td>'+K(invTotal(v))+' IRT</td></tr></table>');};
A['invoice.pay']=function(el){if(!need('finance.w'))return;var v=inv(el.dataset.id);if(!v)return;v.status='Paid';logA('Marked invoice paid',v.id,'finance','b-ok');save();refresh();};
A['report.page']=function(el){S.ui.reports.page=+el.dataset.p;render();};
A['report.export']=function(){csv('report.csv',['Indicator','Module','Value'],DB.horses.map(function(h){return [h.name,h.breed,h.value];}));};
A['report.print']=function(){printDoc(T('Reports & Analytics'),'<table><tr><th>'+T('Indicator')+'</th><th>'+T('Value')+'</th></tr><tr><td>'+T('Studbook entries')+'</td><td>'+n(DB.horses.length)+'</td></tr><tr><td>'+T('Members')+'</td><td>'+n(DB.members.length)+'</td></tr><tr><td>'+T('Competitions')+'</td><td>'+n(DB.events.length)+'</td></tr></table>');};
A['notif.filter']=function(el){S.ui.notif.f=el.dataset.v;render();};
A['notif.all']=function(){DB.notifs.forEach(function(x){x.read=true;});save();refresh();};
A['notif.open']=function(el){var x=DB.notifs.filter(function(n){return n.id===el.dataset.id;})[0];if(!x)return;x.read=true;save();if(x.go)go(x.go);else refresh();};
A['audit.page']=function(el){S.ui.audit.page=+el.dataset.p;render();};
A['audit.export']=function(){csv('audit.csv',['Time','Action','Actor','Module'],DB.audit.map(function(a){return [a.at,a.action,a.actor,a.module];}));};
A['audit.clear']=function(){confirmDlg({title:T('Clear audit log?'),ok:T('Clear'),onOk:function(){DB.audit=[];save();refresh();}});};
A['set.lang']=function(el){if(I)I.setLang(el.dataset.v);go(S.page);};
A['set.theme']=function(el){document.documentElement.classList.toggle('dark',el.dataset.v==='dark');DB.prefs.theme=el.dataset.v;save();};
A['set.backup']=function(){backup();};
A['set.reset']=function(){confirmDlg({title:T('Reset demo data?'),body:T('All changes will be lost.'),ok:T('Reset'),onOk:function(){resetDB();refresh();toast(T('Demo data reset.'));}});};
A['portal.tab']=function(el){S.ui.portal.tab=el.dataset.v;render();};
A['portal.payAll']=function(){var m=member(SES.memberId);DB.invoices.forEach(function(v){if(v.memberId===m.id&&v.status!=='Paid')v.status='Paid';});logA('Paid all dues',m.id,'finance','b-ok');save();refresh();toast(T('All dues paid.'));};
A['portal.payEntry']=function(el){var e=ev(el.dataset.e);if(!e)return;(e.entries||[]).forEach(function(en){if(en.horseId===el.dataset.h)en.paid=true;});save();refresh();};
A['ui.prof']=function(){var su=$('#sideUser'),sp=$('#sideProf');if(!su||!sp)return;var open=su.classList.toggle('expanded');sp.style.display=open?'block':'none';if(open){var m=SES.memberId?member(SES.memberId):null;sp.innerHTML='<div class="sp-body"><div class="sp-row"><span>'+esc(T('Role'))+'</span><b>'+esc(T(ROLE_LABEL[SES.role]))+'</b></div>'+'<div class="sp-row"><span>'+esc(T('Phone'))+'</span><b dir="ltr">'+esc(SES.phone||'—')+'</b></div>'+'<div class="sp-row"><span>'+esc(T('Email'))+'</span><b dir="ltr">'+esc(SES.email||'—')+'</b></div>'+(m?'<div class="sp-row"><span>'+esc(T('Licence'))+'</span><b>'+esc(m.licence)+'</b></div>':'')+'</div>';}}
A['ui.prof']=function(){var su=$('#sideUser'),sp=$('#sideProf');if(!su||!sp)return;var open=su.classList.toggle('expanded');sp.style.display=open?'block':'none';if(open){var m=SES.memberId?member(SES.memberId):null;sp.innerHTML='<div class="sp-body"><div class="sp-row"><span>'+esc(T('Role'))+'</span><b>'+esc(T(ROLE_LABEL[SES.role]))+'</b></div>'+'<div class="sp-row"><span>'+esc(T('Phone'))+'</span><b dir="ltr">'+esc(SES.phone||'—')+'</b></div>'+'<div class="sp-row"><span>'+esc(T('Email'))+'</span><b dir="ltr">'+esc(SES.email||'—')+'</b></div>'+(m?'<div class="sp-row"><span>'+esc(T('Licence'))+'</span><b>'+esc(m.licence)+'</b></div>':'')+'</div>';}}
A['auth.logout']=function(){confirmDlg({title:T('Sign out?'),ok:T('Sign out'),onOk:doLogout});};
function pushReq(kind,ref,label){DB.requests=DB.requests||[];DB.requests.push({id:'RQ-'+(DB.counters.req=(DB.counters.req||1)+1),kind:kind,ref:ref,label:label,ownerId:SES.memberId,status:'Pending',at:nowISO()});DB.notifs.unshift({id:'N-'+Date.now(),text:T('New approval request')+': '+label,date:nowISO(),read:false,go:'settings',tone:'b-warn'});}
/* --- FORMS --- */
function horseForm(h){var isRider=SES.role==='rider';openForm({title:h?T('Edit horse'):T('Register horse'),fields:[
  {name:'name',label:'Name',req:1,value:h?h.name:''},{name:'breed',label:'Breed',type:'select',req:1,options:BREEDS,value:h?h.breed:'',placeholder:'Select'},
  {name:'sex',label:'Sex',type:'select',options:SEXES,value:h?h.sex:''},{name:'color',label:'Colour',value:h?h.color:''},
  {name:'yob',label:'Year of birth',type:'number',value:h?h.yob:''},{name:'discipline',label:'Discipline',type:'select',options:DISC,value:h?h.discipline:''},
  {name:'status',label:'Status',type:'select',options:HSTAT,value:h?h.status:'Active'},
  {name:'ownerId',label:'Owner',type:'select',req:1,options:DB.members.map(function(m){return{v:m.id,l:m.name};}),value:h?h.ownerId:(isRider?SES.memberId:''),placeholder:'Select'},
  {name:'stable',label:'Stable',value:h?h.stable:''},{name:'value',label:'Valuation (IRT)',type:'number',value:h?h.value:''},
  {name:'chip',label:'Microchip',value:h?h.chip:''},{name:'sire',label:'Sire',value:h?h.sire:''},{name:'dam',label:'Dam',value:h?h.dam:''},
  {name:'registered',label:'Registered',type:'date',value:h?h.registered:today()},{name:'dna',label:'DNA',type:'select',options:['Verified','Pending'],value:h?h.dna:'Pending'}
],ok:h?T('Save'):T('Register'),submit:function(v){if(isRider){pushReq('horse',h?h.id:'',T(h?'Edit':'Register')+' '+T('horse')+' '+v.name);logA('Rider requested horse change',v.name,'horses','b-warn');save();refresh();toast(T('Request submitted for approval.'));return;}
  if(h){for(var k in v)h[k]=v[k];if(v.yob)h.age=2026-v.yob;}else{v.id='H-'+(DB.counters.horse=(DB.counters.horse||1000)+1);v.age=v.yob?2026-v.yob:0;v.region=member(v.ownerId)?member(v.ownerId).region:'Gorgan';DB.horses.push(v);}
  logA((h?'Updated ':'Registered ')+'horse '+v.name,h?h.id:'','horses','b-ok');save();refresh();toast(T('Saved.'));}});}
function memberForm(m){openForm({title:m?T('Edit member'):T('Add member'),fields:[
  {name:'name',label:'Name',req:1,value:m?m.name:''},{name:'role',label:'Role',type:'select',req:1,options:MROLES,value:m?m.role:''},
  {name:'tier',label:'Tier',type:'select',options:MTIERS,value:m?m.tier:''},{name:'region',label:'Region',type:'select',options:REGIONS,value:m?m.region:''},
  {name:'phone',label:'Phone',type:'tel',req:1,value:m?m.phone:'',tip:T('Phone number is required.')},{name:'email',label:'Email (optional)',type:'email',value:m?m.email:'',hint:T('Email is optional.')},
  {name:'licence',label:'Licence',value:m?m.licence:''},{name:'status',label:'Status',type:'select',options:['Active','Pending','Suspended'],value:m?m.status:'Pending'}
],submit:function(v){if(m){for(var k in v)m[k]=v[k];}else{v.id='M-'+(DB.counters.member=(DB.counters.member||200)+1);v.joined=today();v.dues=0;DB.members.push(v);}logA((m?'Updated ':'Added ')+'member '+v.name,m?m.id:'','members','b-ok');save();refresh();toast(T('Saved.'));}});}
function eventForm(e){openForm({title:e?T('Edit event'):T('Add event'),fields:[
  {name:'name',label:'Name',req:1,value:e?e.name:''},{name:'type',label:'Type',type:'select',options:ETYPES,value:e?e.type:''},
  {name:'date',label:'Date',type:'date',req:1,value:e?e.date:today()},{name:'venue',label:'Venue',value:e?e.venue:''},
  {name:'status',label:'Status',type:'select',options:ESTAT,value:e?e.status:'Draft'},{name:'fee',label:'Fee (IRT)',type:'number',value:e?e.fee:1500000},
  {name:'cap',label:'Capacity',type:'number',value:e?e.cap:60},{name:'prize',label:'Prize fund (IRT)',type:'number',value:e?e.prize:50000000}
],submit:function(v){if(e){for(var k in v)e[k]=v[k];}else{v.id='EV-'+(DB.counters.event=(DB.counters.event||200)+1);v.entries=[];DB.events.push(v);}logA((e?'Updated ':'Added ')+'event '+v.name,e?e.id:'','events','b-ok');save();refresh();toast(T('Saved.'));}});}
function recForm(r){openForm({title:r?T('Edit record'):T('Add record'),fields:[
  {name:'horseId',label:'Horse',type:'select',req:1,options:DB.horses.map(function(h){return{v:h.id,l:h.name};}),value:r?r.horseId:''},
  {name:'type',label:'Procedure',type:'select',req:1,options:VETT,value:r?r.type:''},
  {name:'vetId',label:'Vet',type:'select',options:DB.members.filter(function(m){return m.role==='Veterinarian';}).map(function(m){return{v:m.id,l:m.name};}),value:r?r.vetId:(SES.memberId||'')},
  {name:'date',label:'Performed',type:'date',value:r?r.date:today()},{name:'next',label:'Next due',type:'date',value:r?r.next:''},
  {name:'status',label:'Status',type:'select',options:RECS,value:r?r.status:'Scheduled'}
],submit:function(v){if(r){for(var k in v)r[k]=v[k];}else{v.id='V-'+(DB.counters.health=(DB.counters.health||3000)+1);DB.health.push(v);}logA((r?'Updated ':'Logged ')+'record',v.horseId,'health','b-ok');save();refresh();toast(T('Saved.'));}});}
function txnForm(f){openForm({title:f?T('Edit transaction'):T('Add transaction'),fields:[
  {name:'date',label:'Date',type:'date',value:f?f.date:today()},{name:'type',label:'Type',type:'select',options:['Income','Expense'],value:f?f.type:'Income'},
  {name:'cat',label:'Category',type:'select',options:CATS,value:f?f.cat:''},{name:'amount',label:'Amount (IRT)',type:'number',req:1,value:f?f.amount:''},
  {name:'status',label:'Status',type:'select',options:['Settled','Pending'],value:f?f.status:'Pending'}
],submit:function(v){if(f){for(var k in v)f[k]=v[k];}else{v.id='T-'+(DB.counters.txn=(DB.counters.txn||4000)+1);DB.finance.push(v);}logA((f?'Updated ':'Added ')+'transaction',v.id,'finance','b-ok');save();refresh();toast(T('Saved.'));}});}
function invoiceForm(){openForm({title:T('New invoice'),fields:[
  {name:'memberId',label:'Member',type:'select',req:1,options:DB.members.map(function(m){return{v:m.id,l:m.name};})},
  {name:'issued',label:'Issued',type:'date',value:today()},{name:'due',label:'Due',type:'date',value:today()},
  {name:'desc',label:'Description',req:1},{name:'amount',label:'Amount (IRT)',type:'number',req:1}
],submit:function(v){var id='INV-'+(DB.counters.inv=(DB.counters.inv||5000)+1);DB.invoices.push({id:id,no:'INV-1405-'+String(100+(DB.counters.inv%900)),memberId:v.memberId,issued:v.issued,due:v.due,status:'Unpaid',items:[{d:v.desc,q:1,p:+v.amount}]});logA('Issued invoice',id,'finance','b-ok');save();refresh();toast(T('Invoice created.'));}});}
function horseDrawer(id){var h=horse(id);if(!h)return;var w=can('horse.w');var recs=DB.health.filter(function(r){return r.horseId===h.id;});
 var hh='<div class="pad" style="border-bottom:1px solid var(--border)"><div class="row jb gap3"><div class="row gap3">'+av(h.name,'m',h.id)+'<div><h3 class="dsp bb" style="font-size:17px">'+esc(h.name)+'</h3><div class="mut i12">'+esc(T(h.breed))+' \u00b7 '+esc(T(h.sex))+'</div></div></div><div class="row gap1">'+bdg(h.status)+'<button class="btn-i" data-action="ui.closeDrawer">'+ic('i-x','')+'</button></div></div></div>';
 hh+='<div class="pad"><div class="grid c2" style="gap:10px">'+kv('Microchip',esc(h.chip))+kv('Age',n(h.age))+kv('Owner',esc(mname(h.ownerId)))+kv('Stable',esc(h.stable))+kv('Valuation',K(h.value)+' IRT')+kv('DNA',T(h.dna))+'</div>';
 hh+='<h4 class="dsp bb mt4 mb2" style="font-size:14px">'+esc(T('Health records'))+'</h4>'+(recs.length?recs.map(function(r){return rl('<div><div class="b i13">'+esc(T(r.type))+'</div><div class="mut i11">'+fD(r.date)+'</div></div>',bdg(r.status));}).join(''):'<div class="mut i12">'+esc(T('No records'))+'</div>');
 if(w)hh+='<div class="row gap2 mt4">'+btnI('i-edit',T('Edit'),'horse.edit','data-id="'+h.id+'"')+btnI('i-print',T('Print passport'),'horse.passport','data-id="'+h.id+'"')+'</div>';
 hh+='</div>';openDrawer(hh,false);S.drawer={type:'horse',id:id};}
function bellPop(){var u=DB.notifs.filter(function(x){return !x.read;});var bp=$('#bellPop');if(!bp)return;bp.innerHTML='<div class="row jb pad-s" style="border-bottom:1px solid var(--border)"><span class="b i13">'+esc(T('Notifications centre'))+'</span><button class="btn-i" data-action="ui.bellClose">'+ic('i-x','')+'</button></div>'+(u.length?u.slice(0,6).map(function(x){return '<div class="pad-s i12" style="border-bottom:1px solid var(--border)">'+esc(x.text)+'<div class="mut i11 mt1">'+fDT(x.date)+'</div></div>';}).join(''):'<div class="pad-s mut i12">'+esc(T('No notifications'))+'</div>');bp.classList.add('on');}
function closeBell(){var bp=$('#bellPop');if(bp)bp.classList.remove('on');}
/* --- BOOT --- */
function applyPrefs(){if(!DB.prefs)DB.prefs={theme:'light'};if(DB.prefs.theme==='dark')document.documentElement.classList.add('dark');}
function doLogin(u,p){var rec=USERS.filter(function(x){return x.u===u;})[0];if(!rec||rec.p!==p){toast(T('Sign-in failed \u2014 invalid username or password.'),'e');return;}SES={u:rec.u,name:rec.name,title:rec.title,role:rec.role,email:rec.email,phone:rec.phone,memberId:rec.memberId||''};saveSes();logA('Signed in','session','auth','b-info');var lg=$('#login'),sh=$('#shell');if(lg)lg.classList.add('off');if(sh)sh.classList.add('on');applyPrefs();S.page=NAV[SES.role][0];renderNav();render();toast(T('Signed in')+' \u00b7 '+esc(rec.name));}
function doLogout(){logA('Signed out','session','auth','b-mut');SES=null;saveSes();var lg=$('#login'),sh=$('#shell');if(sh)sh.classList.remove('on');if(lg)lg.classList.remove('off');closeDrawer();closeModal();}
function sideOpen(){var s=$('#side');if(s)s.classList.add('open');}
function sideClose(){var s=$('#side');if(s)s.classList.remove('open');}
function boot(){load();loadSes();applyPrefs();if(window.GHF_PAGE&&SES&&NAV[SES.role]&&NAV[SES.role].indexOf(window.GHF_PAGE)>=0)S.page=window.GHF_PAGE;
 var f=$('#lform');if(f)f.addEventListener('submit',function(e){e.preventDefault();doLogin($('#luser').value.trim(),$('#lpass').value);});
 var acc=$('#laccounts');if(acc)acc.addEventListener('click',function(e){var b=e.target.closest('[data-action="login.fill"]');if(!b)return;var u=USERS.filter(function(x){return x.u===b.dataset.u;})[0];$('#luser').value=u.u;$('#lpass').value=u.p;toast(T('Credentials filled'));});
 document.addEventListener('click',function(e){var b=e.target.closest('[data-action]');if(!b)return;var act=b.dataset.action;
  if(act==='login.fill')return;
  var fn=A[act];if(fn){e.preventDefault();fn(b);return;}
  if(act==='ui.side'){b.dataset.v==='1'?sideOpen():sideClose();return;}
  if(act==='ui.theme'){document.documentElement.classList.toggle('dark');DB.prefs.theme=document.documentElement.classList.contains('dark')?'dark':'light';save();var ti=$('#thIcon');if(ti)ti.innerHTML='<use href="#'+(DB.prefs.theme==='dark'?'i-sun':'i-moon')+'"/>';return;}
  if(act==='ui.bell'){bellPop();return;}
  if(act==='ui.bellClose'){var bp=$('#bellPop');if(bp)bp.classList.remove('on');return;}
  if(act==='ui.logout'||act==='auth.logout'){A['auth.logout'](b);return;}
 });
 document.addEventListener('change',function(e){var f2=e.target.closest('[data-filter]');if(!f2)return;var key=f2.dataset.filter;var u=S.page;
  var map={hq:['horses','q'],hbreed:['horses','breed'],hstatus:['horses','status'],howner:['horses','owner'],
   mq:['members','q'],mrole:['members','role'],mtier:['members','tier'],mstatus:['members','status'],
   eq:['events','q'],estatus:['events','status'],vq:['health','q'],vtype:['health','type'],vstatus:['health','status'],
   fq:['finance','q'],ftype:['finance','type'],fcat:['finance','cat'],fiq:['finance','iq'],fistatus:['finance','istatus'],
   aq:['audit','q'],amod:['audit','module'],rmodule:['reports','module'],rregion:['reports','region'],rstatus:['reports','status'],rmetric:['reports','metric']};
  if(map[key]){var s2=S.ui[map[key][0]];s2[map[key][1]]=f2.value;if(s2.page)s2.page=1;render();}});
 document.addEventListener('input',function(e){var f3=e.target.closest('[data-filter]');if(!f3||f3.tagName==='SELECT')return;var key=f3.dataset.filter;
  var qmap={hq:['horses','q'],mq:['members','q'],eq:['events','q'],vq:['health','q'],fq:['finance','q'],fiq:['finance','iq'],aq:['audit','q']};
  if(qmap[key]){var s3=S.ui[qmap[key][0]];s3[qmap[key][1]]=f3.value;if(s3.page)s3.page=1;clearTimeout(window.__t);window.__t=setTimeout(render,220);}});
 if(SES){var lg2=$('#login'),sh2=$('#shell');if(lg2)lg2.classList.add('off');if(sh2)sh2.classList.add('on');if(!allowed(S.page))S.page=NAV[SES.role][0];renderNav();render();}
 else{setTimeout(function(){var lu=$('#luser');if(lu)lu.focus();},200);}
}
window.GHF={go:go,render:render,get page(){return S.page;},get session(){return SES;},get db(){return DB;},allowed:allowed,login:doLogin,logout:doLogout};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();
/* ===END ACTIONS=== */
