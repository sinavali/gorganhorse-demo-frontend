import fs from 'node:fs';

/* ---------- 1. PRINT STYLESHEET (clean B/W) ---------- */
const printCss = `
/* ============================================================
   GHF print stylesheet - clean, legible, black & white
   ============================================================ */
@media print {
  :root { --ink:#000; --line:#9aa5a0; }
  html,body { background:#fff !important; color:#000 !important; font-size:11pt; }
  #side,#top,#toasts,#ov,#drw,#mw,#palW,#palOv,#printHost,.no-print,
  .btn,.btn-i,.chip,.pager,.ghf-dp,[data-action]{ display:none !important; }
  #shell.on { display:block !important; }
  #main { margin:0 !important; padding:0 !important; }
  #content { padding:0 !important; max-width:100% !important; }
  .panel,.card,.stat { border:1px solid #000 !important; box-shadow:none !important; background:#fff !important; break-inside:avoid; }
  h1,h2,h3,.dsp { color:#000 !important; }
  table.tb { width:100% !important; border-collapse:collapse !important; }
  table.tb th, table.tb td { border:1px solid #000 !important; padding:5px 7px !important; color:#000 !important; background:#fff !important; }
  table.tb thead th { background:#e8e8e8 !important; font-weight:700 !important; }
  .badge { border:1px solid #000 !important; color:#000 !important; background:#fff !important; }
  a { color:#000 !important; text-decoration:underline; }
  .mut { color:#333 !important; }
  svg { max-width:100%; }
}
/* on-screen print preview sheet */
#printArea{ background:#fff; color:#111; }
#printArea h1{ font-family:'Outfit','Vazirmatn',sans-serif; }
#printArea table{ width:100%; border-collapse:collapse; font-size:12px; }
#printArea th,#printArea td{ border:1px solid #cbd3ce; padding:6px 8px; text-align:start; }
#printArea thead th{ background:#f1f4f2; font-weight:700; }
#printArea .ghf-print-head{ display:flex; align-items:center; gap:12px; border-bottom:2px solid #158055; padding-bottom:10px; margin-bottom:14px; }
#printArea .ghf-print-seal{ width:46px; height:46px; border-radius:10px; background:#158055; color:#fff; display:grid; place-items:center; font-weight:700; font-family:'Outfit',sans-serif; }
#printArea .ghf-print-foot{ margin-top:16px; border-top:1px solid #cbd3ce; padding-top:8px; font-size:10.5px; color:#555; }
`;
fs.writeFileSync('assets/print.css', printCss, 'utf8');
console.log('print.css written: ' + printCss.length);

/* ---------- 2. APPEND ENHANCEMENTS TO app.css ---------- */
const add = `
/* ============================================================
   GHF enhancements: RTL, responsive tables, tooltips, datepicker,
   mini-profile, mobile/tablet responsiveness.
   ============================================================ */
/* ---- fonts: Persian ---- */
@font-face{font-family:'Vazirmatn';font-style:normal;font-weight:400;font-display:swap;src:url(https://cdn.jsdelivr.net/gh/rastikerdar/vazirmatn@v33.003/fonts/webfonts/Vazirmatn-Regular.woff2) format('woff2');}
@font-face{font-family:'Vazirmatn';font-style:normal;font-weight:600;font-display:swap;src:url(https://cdn.jsdelivr.net/gh/rastikerdar/vazirmatn@v33.003/fonts/webfonts/Vazirmatn-SemiBold.woff2) format('woff2');}
@font-face{font-family:'Vazirmatn';font-style:normal;font-weight:700;font-display:swap;src:url(https://cdn.jsdelivr.net/gh/rastikerdar/vazirmatn@v33.003/fonts/webfonts/Vazirmatn-Bold.woff2) format('woff2');}
html[data-lang="fa-IR"] body{font-family:'Vazirmatn','Inter',system-ui,sans-serif;}
html[data-lang="fa-IR"] h1,html[data-lang="fa-IR"] h2,html[data-lang="fa-IR"] h3,html[data-lang="fa-IR"] h4,html[data-lang="fa-IR"] .dsp{font-family:'Vazirmatn','Outfit',sans-serif;}

/* ---- RTL ---- */
html.rtl{direction:rtl;}
html.rtl #side{inset-inline-end:auto;inset-inline-start:0;left:auto;right:0;}
html.rtl #main{margin-left:0;margin-right:var(--sidew,272px);}
html.rtl #topIn,html.rtl #content{direction:rtl;}
html.rtl .row,html.rtl .grid{direction:rtl;}
html.rtl .jend{justify-content:flex-start;}
html.rtl .mut,html.rtl .i11,html.rtl .i12,html.rtl .i13{text-align:start;}
html.rtl #drw{inset-inline-end:0;inset-inline-start:auto;transform:translateX(-100%);}
html.rtl #drw.on{transform:none;}
html.rtl .tb th,html.rtl .tb td{text-align:right;}
html.rtl input,html.rtl select,html.rtl textarea{direction:rtl;}
html.rtl [type=email],html.rtl [type=tel],html.rtl [inputmode=numeric]{direction:ltr;text-align:right;}
html.rtl .ghf-dp{text-align:right;}
@media(max-width:1023px){
  html.rtl #main{margin-right:0;}
  html.rtl #side{transform:translateX(100%);}
  html.rtl #side.open{transform:none;}
}

/* ---- responsive tables: never wrap, scroll instead ---- */
.tw{width:100%;overflow-x:auto;-webkit-overflow-scrolling:touch;border-radius:var(--r);}
table.tb{width:100%;border-collapse:collapse;min-width:640px;}
table.tb th,table.tb td{white-space:nowrap;text-overflow:ellipsis;overflow:hidden;max-width:280px;}
table.tb td.wrap,table.tb th.wrap{white-space:normal;}
@media(max-width:760px){
  table.tb{min-width:520px;font-size:12px;}
  table.tb th,table.tb td{padding:8px 9px;}
}

/* ---- responsive shell tweaks ---- */
@media(max-width:1180px){ #content{padding:18px;} }
@media(max-width:760px){
  #content{padding:13px;}
  .pad{padding:14px;}
  .grid.c4,.grid.c3,.grid.c2{grid-template-columns:1fr;}
  .main31,.main13{grid-template-columns:1fr;}
  h2.dsp{font-size:19px !important;}
  .btn{padding:8px 11px;}
}

/* ---- tooltips (question-mark in a circle + generic) ---- */
.qmark{display:inline-flex;align-items:center;justify-content:center;width:14px;height:14px;border-radius:50%;border:1px solid currentColor;font-size:9.5px;font-weight:700;line-height:1;cursor:help;opacity:.55;vertical-align:middle;margin-inline-start:5px;}
.qmark:hover{opacity:1;background:currentColor;}
.qmark:hover::after{color:var(--surface);}
.qmark::before{content:'?';}
[data-tip]{position:relative;}
[data-tip]:hover::after{content:attr(data-tip);position:absolute;bottom:calc(100% + 8px);inset-inline-start:50%;transform:translateX(-50%);background:#0d1a14;color:#fff;font-size:11.5px;font-weight:500;line-height:1.45;padding:7px 10px;border-radius:8px;white-space:normal;width:max-content;max-width:250px;z-index:9000;box-shadow:var(--shadow-lg);pointer-events:none;text-align:center;}
[data-tip]:hover::before{content:'';position:absolute;bottom:calc(100% + 3px);inset-inline-start:50%;transform:translateX(-50%);border:5px solid transparent;border-top-color:#0d1a14;z-index:9001;pointer-events:none;}
[data-tip-pos="bottom"]:hover::after{bottom:auto;top:calc(100% + 8px);}
[data-tip-pos="bottom"]:hover::before{bottom:auto;top:calc(100% + 3px);border-top-color:transparent;border-bottom-color:#0d1a14;}

/* ---- Jalali datepicker ---- */
.ghf-dp-input{background-image:none !important;cursor:pointer;}
.ghf-dp{position:absolute;z-index:9999;width:288px;background:var(--surface);border:1px solid var(--border-2);border-radius:14px;box-shadow:var(--shadow-lg);padding:10px;font-size:13px;}
.ghf-dp-head{display:flex;align-items:center;gap:2px;margin-bottom:6px;}
.ghf-dp-title{flex:1;text-align:center;font-weight:700;font-size:13.5px;}
.ghf-dp-nav{border:0;background:transparent;cursor:pointer;font-size:17px;line-height:1;padding:5px 8px;border-radius:8px;color:var(--muted);}
.ghf-dp-nav:hover{background:var(--surface-3);color:var(--text);}
.ghf-dp-week{display:grid;grid-template-columns:repeat(7,1fr);gap:2px;margin-bottom:3px;}
.ghf-dp-week span{text-align:center;font-size:10.5px;font-weight:700;color:var(--muted);padding:3px 0;}
.ghf-dp-grid{display:grid;grid-template-columns:repeat(7,1fr);gap:2px;}
.ghf-dp-d{border:0;background:transparent;cursor:pointer;padding:7px 0;border-radius:9px;font-size:12.5px;color:var(--text);}
.ghf-dp-d:hover{background:var(--brand-soft);}
.ghf-dp-d.today{outline:1.5px solid var(--brand);outline-offset:-1.5px;font-weight:700;}
.ghf-dp-d.sel{background:var(--brand);color:#fff;font-weight:700;}
.ghf-dp-d.empty{pointer-events:none;}
.ghf-dp-foot{display:flex;justify-content:space-between;gap:8px;margin-top:8px;padding-top:8px;border-top:1px solid var(--border);}
.ghf-dp-today,.ghf-dp-clear{border:0;background:transparent;cursor:pointer;font-size:12px;font-weight:600;color:var(--brand);padding:5px 9px;border-radius:8px;}
.ghf-dp-today:hover,.ghf-dp-clear:hover{background:var(--brand-soft);}

/* ---- sidebar mini-profile ---- */
#sideUser{cursor:pointer;transition:background .15s;}
#sideUser:hover{background:rgba(255,255,255,.09);}
.sideProf{padding:0 16px 12px;}
.sideProf .sp-body{margin-top:8px;display:grid;grid-template-columns:1fr;gap:4px;font-size:11px;color:var(--side-muted);border-top:1px solid rgba(255,255,255,.08);padding-top:8px;}
.sideProf .sp-body b{color:rgba(255,255,255,.9);font-weight:600;}
.sideProf .sp-row{display:flex;justify-content:space-between;gap:8px;}
.sp-toggle{display:grid;place-items:center;width:22px;height:22px;border-radius:7px;background:rgba(255,255,255,.08);color:#fff;cursor:pointer;transition:transform .2s;}
#sideUser.expanded .sp-toggle{transform:rotate(180deg);}

/* ---- language switcher ---- */
.langsw{display:inline-flex;border:1px solid var(--border);border-radius:10px;overflow:hidden;}
.langsw button{border:0;background:transparent;cursor:pointer;padding:6px 10px;font-size:12px;font-weight:600;color:var(--muted);}
.langsw button.on{background:var(--brand);color:#fff;}

/* ---- report filter builder ---- */
.flt{display:flex;gap:8px;align-items:end;flex-wrap:wrap;margin-bottom:10px;}
.flt .fld{display:flex;flex-direction:column;gap:4px;min-width:150px;}
.flt .fld label{font-size:11px;font-weight:600;color:var(--muted);}
.flt-saved{display:flex;gap:6px;flex-wrap:wrap;}
th.sortable{cursor:pointer;user-select:none;}
th.sortable:hover{background:var(--surface-3);}
th .sortind{font-size:9px;opacity:.5;margin-inline-start:4px;}
th.sortable.on .sortind{opacity:1;color:var(--brand);}
`;
let css = fs.readFileSync('assets/app.css','utf8');
if(!css.includes('GHF enhancements')){ css += add; fs.writeFileSync('assets/app.css', css, 'utf8'); }
console.log('app.css now: ' + fs.statSync('assets/app.css').size);
