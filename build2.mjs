import fs from 'node:fs';
const NL = String.fromCharCode(10);
let s = fs.readFileSync('assets/app.js','utf8');

// 1) USERS block -> 4 roles
const usersStart = s.indexOf('var USERS=[');
const usersEnd = s.indexOf('];', usersStart) + 2;
const newUsers =
  'var USERS=[' + NL +
  ' {u:' + String.fromCharCode(39) + 'admin' + String.fromCharCode(39) + ',p:' + String.fromCharCode(39) + 'demo1234' + String.fromCharCode(39) + ',name:' + String.fromCharCode(39) + 'Sina Hormozi' + String.fromCharCode(39) + ',title:' + String.fromCharCode(39) + 'Chief Registry Officer' + String.fromCharCode(39) + ',role:' + String.fromCharCode(39) + 'admin' + String.fromCharCode(39) + ',email:' + String.fromCharCode(39) + 's.hormozi@gorganhf.ir' + String.fromCharCode(39) + ',phone:' + String.fromCharCode(39) + '+98 17 3224 0001' + String.fromCharCode(39) + '},' + NL +
  ' {u:' + String.fromCharCode(39) + 'manager' + String.fromCharCode(39) + ',p:' + String.fromCharCode(39) + 'demo1234' + String.fromCharCode(39) + ',name:' + String.fromCharCode(39) + 'Maryam Ebrahimi' + String.fromCharCode(39) + ',title:' + String.fromCharCode(39) + 'Registry Manager' + String.fromCharCode(39) + ',role:' + String.fromCharCode(39) + 'manager' + String.fromCharCode(39) + ',email:' + String.fromCharCode(39) + 'm.ebrahimi@gorganhf.ir' + String.fromCharCode(39) + ',phone:' + String.fromCharCode(39) + '+98 17 3224 0014' + String.fromCharCode(39) + '},' + NL +
  ' {u:' + String.fromCharCode(39) + 'vet' + String.fromCharCode(39) + ',p:' + String.fromCharCode(39) + 'demo1234' + String.fromCharCode(39) + ',name:' + String.fromCharCode(39) + 'Dr. Amir Tavakoli' + String.fromCharCode(39) + ',title:' + String.fromCharCode(39) + 'Federation Veterinarian' + String.fromCharCode(39) + ',role:' + String.fromCharCode(39) + 'vet' + String.fromCharCode(39) + ',phone:' + String.fromCharCode(39) + '+98 913 118 5562' + String.fromCharCode(39) + ',memberId:' + String.fromCharCode(39) + 'M-203' + String.fromCharCode(39) + '},' + NL +
  ' {u:' + String.fromCharCode(39) + 'rider' + String.fromCharCode(39) + ',p:' + String.fromCharCode(39) + 'demo1234' + String.fromCharCode(39) + ',name:' + String.fromCharCode(39) + 'Reza Aghamiri' + String.fromCharCode(39) + ',title:' + String.fromCharCode(39) + 'Licensed Rider, Gonbad-e Kavus' + String.fromCharCode(39) + ',role:' + String.fromCharCode(39) + 'rider' + String.fromCharCode(39) + ',phone:' + String.fromCharCode(39) + '+98 911 320 4417' + String.fromCharCode(39) + ',memberId:' + String.fromCharCode(39) + 'M-201' + String.fromCharCode(39) + '}' + NL +
  '];';
s = s.slice(0,usersStart) + newUsers + s.slice(usersEnd);
console.log('users replaced');

// 2) ROLE_LABEL
const rlStart = s.indexOf('var ROLE_LABEL={');
const rlEnd = s.indexOf('};', rlStart) + 2;
const Q = String.fromCharCode(39);
s = s.slice(0,rlStart) + 'var ROLE_LABEL={admin:'+Q+'Administrator'+Q+',manager:'+Q+'Manager'+Q+',vet:'+Q+'Veterinarian'+Q+',rider:'+Q+'Rider'+Q+'};' + s.slice(rlEnd);
console.log('role label replaced');

fs.writeFileSync('assets/app.js', s, 'utf8');
