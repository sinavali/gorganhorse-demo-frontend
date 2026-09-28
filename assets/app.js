
(function(){
'use strict';
/* ============================== UTILITIES ============================== */
var $=function(s,r){return (r||document).querySelector(s);};
var $$=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s));};
function esc(v){return String(v==null?'':v).replace(/[&<>"']/g,function(c){return({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c];});}
var NF=new Intl.NumberFormat('en-US');
function n(v){var I=window.I18N;return I?I.num(v):NF.format(Math.round(Number(v)||0));}
function K(v){v=Number(v)||0;return v>=1e9?(v/1e9).toFixed(2)+'B':v>=1e6?(v/1e6).toFixed(1)+'M':v>=1e3?(v/1e3).toFixed(1)+'K':NF.format(v);}
function IRT(v){return n(v)+' IRT';}
function ini(s){return String(s||'').trim().split(/\s+/).slice(0,2).map(function(w){return w[0];}).join('').toUpperCase();}
function ic(name,cls){return '<svg class="ic'+(cls?' '+cls:'')+'"><use href="#'+name+'"/></svg>';}
function cv(n){return getComputedStyle(document.documentElement).getPropertyValue(n).trim();}
function uid(p){return p+'-'+Math.random().toString(36).slice(2,7).toUpperCase();}
function today(){return new Date().toISOString().slice(0,10);}
function nowISO(){var I=window.I18N;return I?I.fmtDateTime(new Date().toISOString().slice(0,16)):new Date().toISOString().slice(0,16).replace('T',' ');}
function daysTo(d){return Math.round((new Date(d)-new Date(today()))/86400000);}
function rel(d){var x=daysTo(d);if(x===0)return'Today';if(x===1)return'Tomorrow';if(x===-1)return'Yesterday';return x>0?'in '+x+' days':Math.abs(x)+' days ago';}
function sum(a,f){return a.reduce(function(t,x){return t+(f?f(x):x);},0);}
function by(k,d){return function(a,b){var x=a[k],y=b[k];if(typeof x==='number'&&typeof y==='number')return (x-y)*(d||1);return String(x).localeCompare(String(y))*(d||1);};}
function group(a,f){var o={};a.forEach(function(x){var k=f(x);(o[k]=o[k]||[]).push(x);});return o;}
function uniq(a){return a.filter(function(v,i){return a.indexOf(v)===i;});}
function clamp(v,a,b){return Math.max(a,Math.min(b,v));}

