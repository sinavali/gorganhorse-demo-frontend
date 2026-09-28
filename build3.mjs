import fs from 'node:fs';
const Q = String.fromCharCode(39);
let s = fs.readFileSync('assets/app.js','utf8');

// ---- CAN ----
const cStart = s.indexOf('var CAN={');
const cEnd = s.indexOf('};', cStart) + 2;
const q = Q;
const newCan = [
'var CAN={',
'  ' + q + 'horse.w' + q + ':[' + q + 'admin' + q + ',' + q + 'manager' + q + '],' + q + 'horse.request' + q + ':[' + q + 'rider' + q + '],',
'  ' + q + 'member.w' + q + ':[' + q + 'admin' + q + ',' + q + 'manager' + q + '],' + q + 'event.w' + q + ':[' + q + 'admin' + q + ',' + q + 'manager' + q + '],',
'  ' + q + 'entry.w' + q + ':[' + q + 'admin' + q + ',' + q + 'manager' + q + ',' + q + 'rider' + q + '],' + q + 'health.w' + q + ':[' + q + 'admin' + q + ',' + q + 'manager' + q + ',' + q + 'vet' + q + '],',
'  ' + q + 'finance.w' + q + ':[' + q + 'admin' + q + ',' + q + 'manager' + q + '],' + q + 'settings.w' + q + ':[' + q + 'admin' + q + '],',
'  ' + q + 'audit.v' + q + ':[' + q + 'admin' + q + ',' + q + 'manager' + q + '],' + q + 'reports.v' + q + ':[' + q + 'admin' + q + ',' + q + 'manager' + q + '],',
'  ' + q + 'approve.w' + q + ':[' + q + 'admin' + q + ',' + q + 'manager' + q + '],' + q + 'request.w' + q + ':[' + q + 'admin' + q + ',' + q + 'manager' + q + ',' + q + 'rider' + q + ']',
'};'
].join(String.fromCharCode(10));
s = s.slice(0,cStart) + newCan + s.slice(cEnd);

fs.writeFileSync('assets/app.js', s, 'utf8');
console.log('CAN patched');
