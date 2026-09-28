import fs from "node:fs";
const NL = String.fromCharCode(10);
const Q = String.fromCharCode(39);
let s = fs.readFileSync("assets/app.js", "utf8");

// --- A) i18n-aware helpers: n, K, IRT, today, nowISO, rel ---
// replace function n()
const nStart = s.indexOf("function n(v){");
const nEnd = s.indexOf(NL, nStart);
s = s.slice(0, nStart) + "function n(v){var I=window.I18N;return I?I.num(v):NF.format(Math.round(Number(v)||0));}" + s.slice(nEnd);

// replace today() and nowISO() and rel() to use I18N formatting where useful
s = s.replace("function nowISO(){return new Date().toISOString().slice(0,16).replace(\u0027T\u0027,\u0027 \u0027);}",
  "function nowISO(){var I=window.I18N;return I?I.fmtDateTime(new Date().toISOString().slice(0,16)):new Date().toISOString().slice(0,16).replace(\u0027T\u0027,\u0027 \u0027);}");

// add helper functions after clamp() definition
const clampStart = s.indexOf("function clamp(v,a,b){");
const clampEnd = s.indexOf(NL, clampStart);
const helpers = clampEnd >= 0 ? (NL +
"/* i18n helpers */" + NL +
"function T(k){var I=window.I18N;return I?I.t(k):k;}" + NL +
"function L(){return window.I18N?window.I18N.lang:\u0027en-US\u0027;}" + NL +
"function fdate(iso){var I=window.I18N;return I?I.fmtDate(iso):(iso||\u0027\u0027);}" + NL +
"function fdateL(iso){var I=window.I18N;return I?I.fmtDateLong(iso):(iso||\u0027\u0027);}" + NL +
"function qtip(text){return \u0027<span class=\"qmark\" data-tip=\"\u0027+esc(text)+\u0027\"></span>\u0027;}" + NL +
"function tipBtn(label,tip,attrs){return \u0027<button \u0027+(attrs||\u0027\u0027)+\u0027 data-tip=\"\u0027+esc(tip)+\u0027\">\u0027+label+\u0027</button>\u0027;}" + NL) : "";
s = s.slice(0, clampEnd) + helpers + s.slice(clampEnd);

fs.writeFileSync("assets/app.js", s, "utf8");
console.log("stage A done");
