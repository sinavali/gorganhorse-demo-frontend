import fs from 'node:fs';
let s = fs.readFileSync('assets/app.js','utf8');
const marker='i18n + UX HELPERS';
let idx=-1,cnt=0,pos=[];
while((idx=s.indexOf(marker,idx+1))>=0){cnt++;pos.push(idx);}
console.log('helper marker occurrences: '+cnt+' at '+pos.join(','));
const seedMarker = s.indexOf('SEED DATA');
console.log('SEED DATA at '+seedMarker);
// show text around each marker boundary
console.log('--- around first ---');
console.log(JSON.stringify(s.slice(pos[0]-30,pos[0]+40)));
if(pos[1]!=null){console.log('--- around second ---');console.log(JSON.stringify(s.slice(pos[1]-30,pos[1]+40)));}
