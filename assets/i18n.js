/* ============================================================================
   GHF i18n + Jalali (Shamsi) engine + custom accessible datepicker
   Exposes window.I18N. Default culture: fa-IR (RTL). Also: en-US (LTR).
   No jQuery, no native <input type=date> — a bespoke popover calendar.
   ============================================================================ */
(function(){
'use strict';

/* ------------------------------ dictionaries ------------------------------ */
var FA = {
  'Dashboard':'داشبورد','Horse Registry':'دفتر نژاد','Members & Licences':'اعضا و پروانه‌ها',
  'Competitions':'مسابقات','Health & Veterinary':'بهداشت و دامپزشکی','Finance & Invoicing':'مالی و صورت‌حساب',
  'Reports & Analytics':'گزارش‌ها و تحلیل','Notifications':'اعلان‌ها','Audit Log':'گزارش رویدادها',
  'Settings':'تنظیمات','My Portal':'پنل من','Panel':'پنل','Operations':'عملیات','Insights':'تحلیل‌ها','System':'سیستم',
  'Administrator':'مدیر ارشد','Manager':'مدیر','Veterinarian':'دامپزشک','Rider':'سوارکار',
  'Admin workspace':'محیط مدیر ارشد','Manager workspace':'محیط مدیر','Veterinarian workspace':'محیط دامپزشک','Rider workspace':'محیط سوارکار',
  'Sign in':'ورود','Sign out':'خروج','Username':'نام کاربری','Password':'گذرواژه','Keep me signed in':'مرا وارد نگه دار',
  'Demo accounts':'حساب‌های نمونه','Quick find':'جستجوی سریع','Search horses, members, events, invoices…':'جستجوی اسب، عضو، رویداد، صورت‌حساب…',
  'Register horse':'ثبت اسب','New':'جدید','Add':'افزودن','Edit':'ویرایش','Delete':'حذف','View':'مشاهده',
  'Save':'ذخیره','Cancel':'انصراف','Close':'بستن','Confirm':'تأیید','Reset':'بازنشانی','Apply':'اعمال',
  'Export CSV':'خروجی CSV','Print':'چاپ','Download':'دانلود','Filter':'فیلتر','Filters':'فیلترها','Clear':'پاک‌سازی',
  'Search':'جستجو','Sort':'چرتکه','Sort by':'چرتکه بر اساس','Ascending':'صعودی','Descending':'نزولی',
  'Page':'صفحه','of':'از','Rows per page':'ردیف در صفحه','Previous':'قبلی','Next':'بعدی','First':'اول','Last':'آخر',
  'No results':'نتیجه‌ای یافت نشد','Loading…':'در حال بارگذاری…','Name':'نام','Phone':'تلفن','Email':'ایمیل',
  'Role':'نقش','Region':'منطقه','Status':'وضعیت','Tier':'سطح','Licence':'پروانه','Valid until':'معتبر تا',
  'Horses':'اسب‌ها','Dues':'بدهی','Joined':'عضویت','Actions':'عملیات','Date':'تاریخ','Type':'نوع','Amount':'مبلغ',
  'Total':'جمع','Owner':'مالک','Breed':'نژاد','Sex':'جنسیت','Colour':'رنگ','Year of birth':'سال تولد',
  'Microchip':'ریزتراشه','Discipline':'رشته','Sire':'پدر','Dam':'مادر','Stable':'اصطبل',
  'DNA verification':'تأیید ژنتیک','Insurance':'بیمه','Active':'فعال','None':'ندارد','Verified':'تأییدشده','Pending':'در انتظار',
  'Approved':'تأییدشده','Rejected':'ردشده','Suspended':'تعلیق‌شده','Completed':'انجام‌شده','Cancelled':'لغوشده',
  'Draft':'پیش‌نویس','Open':'باز','Closed':'بسته','Paid':'پرداخت‌شده','Unpaid':'پرداخت‌نشده','Overdue':'معوق',
  'Due Soon':'نزدیک سررسید','Quarantine':'قرنطینه','Income':'درآمد','Expense':'هزینه','Settled':'تسویه‌شده',
  'Add member':'افزودن عضو','Add event':'افزودن رویداد','Add record':'افزودن سابقه','Add transaction':'افزودن تراکنش',
  'New invoice':'صورت‌حساب جدید','Review':'بررسی','Approve':'تأیید','Reject':'رد','Suspend':'تعلیق','Activate':'فعال‌سازی',
  'Renew':'تمدید','Transfer':'انتقال','Reprint passport':'چاپ مجدد شناسنامه','Print passport':'چاپ شناسنامه',
  'Log veterinary record':'ثبت سابقه دامپزشکی','Register for competition':'ثبت‌نام در مسابقه','My entries':'ثبت‌نام‌های من',
  'Competition calendar':'تقویم مسابقات','What can I do here?':'چه کاری می‌توانم انجام دهم؟',
  'Organisation profile':'مشخصات سازمان','My profile':'مشخصات من','Preferences':'ترجیحات','Appearance':'ظاهر',
  'Density':'تراکم','Compact':'فشرده','Comfortable':'راحت','Theme':'پوسته','Language':'زبان','Accent':'رنگ اصلی',
  'Dark':'تیره','Light':'روشن','Notifications centre':'مرکز اعلان‌ها','Mark all read':'علامت‌گذاری همه به‌عنوان خوانده‌شده',
  'Profile':'نمایه','Account':'حساب','Today':'امروز','Tomorrow':'فردا','Yesterday':'دیروز',
  'Sign-in failed — invalid username or password.':'ورود ناموفق — نام کاربری یا گذرواژه نادرست است.',
  'Username is required.':'نام کاربری الزامی است.','Password is required.':'گذرواژه الزامی است.',
  'Phone number is required.':'شماره تلفن الزامی است.','Enter a valid phone number.':'شماره تلفن معتبر وارد کنید.',
  'Email (optional)':'ایمیل (اختیاری)','Enter a valid email or leave blank.':'ایمیل معتبر وارد کنید یا خالی بگذارید.',
  'Sign out of the panel?':'از پنل خارج می‌شوید؟','Your demo data stays saved in this browser.':'داده‌های نمونه در این مرورگر ذخیره می‌ماند.',
  'Period':'بازه','From':'از','To':'تا','Module':'ماژول','Category':'دسته','Method':'روش','All':'همه',
  'Results':'نتایج','Entries':'شرکت‌کنندگان','Start list':'لیست شروع','Fees':'هزینه‌ها','Publish':'انتشار',
  'Open entries':'بازکردن ثبت‌نام','Close entries':'بستن ثبت‌نام','Add entry':'افزودن شرکت‌کننده','Remove':'حذف',
  'Pay fee':'پرداخت هزینه','Fee paid':'هزینه پرداخت‌شده','Fee due':'هزینه معوق','Place':'رتبه',
  'This field is required.':'این فیلد الزامی است.',
  'Enter a valid email address.':'یک آدرس ایمیل معتبر وارد کنید.',
  'Please correct the highlighted fields.':'لطفاً فیلدهای مشخص‌شده را اصلاح کنید.',
  'workspace':'محیط کاری',
  'That module is not available for your role.':'این ماژول برای نقش شما در دسترس نیست.',
  'Season':'فصل',
  'Welcome back':'خوش آمدید',
  'All figures are live demo data.':'تمام ارقام داده‌های نمونه زنده هستند.',
  'Expenditure':'هزینه‌ها',
  'Registrations trend':'روند ثبت‌نام‌ها',
  'Members by role':'اعضا بر اساس نقش',
  'Studbook of registered horses.':'دفتر نژاد اسب‌های ثبت‌شده.',
  'Licence holders, riders and officials.':'دارندگان پروانه، سوارکاران و مسئولان.',
  'Calendar, entries, results and start lists.':'تقویم، شرکت‌کنندگان، نتایج و لیست‌های شروع.',
  'Fee':'هزینه',
  'Horse':'اسب',
  'Enter results':'ثبت نتایج',
  'Vaccinations, check-ups and compliance.':'واکسیناسیون، معاینات و انطباق.',
  'Vet':'دامپزشک',
  'Complete':'تکمیل',
  'Ledger, invoices and dues.':'دفتر کل، صورت‌حساب‌ها و بدهی‌ها.',
  'Transactions':'تراکنش‌ها',
  'Invoices':'صورت‌حساب‌ها',
  'Invoice':'صورت‌حساب',
  'Member':'عضو',
  'Mark paid':'علامت‌گذاری به‌عنوان پرداخت‌شده',
  'Registrations processed':'ثبت‌نام‌های پردازش‌شده',
  'Competition entries':'ورودی‌های مسابقات',
  'Active members':'اعضای فعال',
  'Revenue (M IRT)':'درآمد (میلیون تومان)',
  'Horses by region':'اسب‌ها بر اساس منطقه',
  'Revenue by region':'درآمد بر اساس منطقه',
  'Flexible filters, sorting and pagination across all datasets.':'فیلترهای انعطاف‌پذیر، مرتب‌سازی و صفحه‌بندی در تمام داده‌ها.',
  'Metric':'شاخص',
  'indicators':'شاخص',
  'System and workflow alerts.':'هشدارهای سیستم و گردش کار.',
  'Unread':'خوانده‌نشده',
  'Read':'خوانده‌شده',
  'Every action is recorded.':'تمام عملیات ثبت می‌شوند.',
  'Organisation, preferences and data.':'سازمان، ترجیحات و داده‌ها.',
  'Backup':'پشتیبان‌گیری',
  'Reset demo data':'بازنشانی داده‌های نمونه',
  'Pending approval requests':'درخواست‌های در انتظار تأیید',
  'Requested by':'درخواست‌کننده',
  'Details':'جزئیات',
  'Pay':'پرداخت',
  'Add horse':'افزودن اسب',
  'open':'باز',
  'Event':'رویداد',
  'Result':'نتیجه',
  'Due':'سررسید',
  'Your role cannot perform this action.':'نقش شما مجاز به انجام این عملیات نیست.',
  'You can only edit your own horses.':'شما تنها می‌توانید اسب‌های خود را ویرایش کنید.',
  'Delete horse?':'حذف اسب؟',
  'Delete horse':'حذف اسب',
  'Request submitted for approval.':'درخواست جهت تأیید ارسال شد.',
  'Horse deleted.':'اسب حذف شد.',
  'Studbook passport':'شناسنامه دفتر نژاد',
  'You have no horses to enter.':'شما اسبی برای ثبت‌نام ندارید.',
  'Entry':'ورودی',
  'Entry submitted for approval.':'ثبت‌نام جهت تأیید ارسال شد.',
  'Issued':'صادرشده',
  'Indicator':'شاخص',
  'Value':'مقدار',
  'Studbook entries':'ورودی‌های دفتر نژاد',
  'Members':'اعضا',
  'Clear audit log?':'پاک‌سازی گزارش رویدادها؟',
  'Reset demo data?':'بازنشانی داده‌های نمونه؟',
  'All changes will be lost.':'تمام تغییرات از دست خواهند رفت.',
  'Demo data reset.':'داده‌های نمونه بازنشانی شد.',
  'All dues paid.':'تمام بدهی‌ها پرداخت شد.',
  'Password reset':'بازنشانی گذرواژه',
  'For this demo build, please use one of the four pre-configured demonstration accounts on the sign-in screen.':'برای این نسخه نمونه، لطفاً از یکی از چهار حساب pre-configured در صفحه ورود استفاده کنید.',
  'Help & Keyboard Shortcuts':'راهنما و کلیدهای میانبر',
  'Open command palette':'بازکردن پالت دستورات',
  'Close modal / overlay':'بستن پنجره / لایه',
  'Filter records instantly':'فیلتر آنی سوابق',
  'Role-based access control':'کنترل دسترسی بر اساس نقش',
  'Role Access Summary':'خلاصه دسترسی نقش‌ها',
  'Request approved.':'درخواست تأیید شد.',
  'Request rejected.':'درخواست رد شد.',
  'Sign out?':'خروج از حساب؟',
  'New approval request':'درخواست تأیید جدید',
  'Edit horse':'ویرایش اسب',
  'Register':'ثبت',
  'horse':'اسب',
  'Saved.':'ذخیره شد.',
  'Edit member':'ویرایش عضو',
  'Email is optional.':'ایمیل اختیاری است.',
  'Edit event':'ویرایش رویداد',
  'Edit record':'ویرایش سابقه',
  'Edit transaction':'ویرایش تراکنش',
  'Invoice created.':'صورت‌حساب ایجاد شد.',
  'Health records':'سوابق بهداشتی',
  'No records':'سابقی یافت نشد',
  'No notifications':'اعلانی وجود ندارد',
  'Competition':'مسابقه',
  'No results found':'نتیجه‌ای یافت نشد',
  'Navigation':'مسیریابی',
  'Action':'عملیات',
  'Sign-in failed — invalid username or password.':'ورود ناموفق — نام کاربری یا گذرواژه نادرست است.',
  'Signed in':'وارد شدید',
  'Credentials filled':'اطلاعات حساب درج شد',
  'Organisation profile updated.':'مشخصات سازمان به‌روزرسانی شد.'
};
var DICT = { 'fa-IR': FA, 'en-US': {} };
var RTL_LANGS = { 'fa-IR': true };
var CAL = { 'fa-IR': 'jalali', 'en-US': 'gregorian' };

/* --------------------------- Jalali <-> Gregorian --------------------------- */
function div(a,b){return ~~(a/b);}
function mod(a,b){return a-~~(a/b)*b;}
function jalCal(jy){
  var breaks=[-61,9,38,199,426,686,756,818,1111,1181,1210,1635,2060,2097,2192,2262,2324,2394,2456,3178];
  var bl=breaks.length, gy=jy+621, leapJ=-14, jp=breaks[0], jm, jump, leap, n, i;
  for(i=1;i<bl;i+=1){jm=breaks[i];jump=jm-jp;if(jy<jm)break;leapJ=leapJ+div(jump,33)*8+div(mod(jump,33),4);jp=jm;}
  n=jy-jp;
  leapJ=leapJ+div(n,33)*8+div(mod(n,33)+3,4);
  if(mod(jump,33)===4&&jump-n===4)leapJ+=1;
  var leapG=div(gy,4)-div((div(gy,100)+1)*3,4)-150;
  var march=20+leapJ-leapG;
  if(jump-n<6)n=n-jump+div(jump+4,33)*33;
  leap=mod(mod(n+1,33)-1,4);
  if(leap===-1)leap=4;
  return {leap:leap, gy:gy, march:march};
}
function g2d(gy,gm,gd){var d=div((gy+div(gm-8,6)+100100)*1461,4)+div(153*mod(gm+9,12)+2,5)+gd-34840408;d=d-div(div(gy+100100+div(gm-8,6),100)*3,4)+752;return d;}
function d2g(jdn){var j=4*jdn+139361631;j=j+div(div(4*jdn+183187720,146097)*3,4)*4-3908;var i=div(mod(j,1461),4)*5+308;var gd=div(mod(i,153),5)+1;var gm=mod(div(i,153),12)+1;var gy=div(j,1461)-100100+div(8-gm,6);return {gy:gy,gm:gm,gd:gd};}
function j2d(jy,jm,jd){var r=jalCal(jy);return g2d(r.gy,3,r.march)+(jm-1)*31-div(jm,7)*(jm-7)+jd-1;}
function d2j(jdn){var gy=d2g(jdn).gy, jy=gy-621, r=jalCal(jy), jdn1f=g2d(gy,3,r.march), k=jdn-jdn1f, jm, jd;
  if(k>=0){if(k<=185){jm=1+div(k,31);jd=mod(k,31)+1;return {jy:jy,jm:jm,jd:jd};}k-=186;}
  else{jy-=1;k+=179;if(r.leap===1)k+=1;}
  jm=7+div(k,30);jd=mod(k,30)+1;return {jy:jy,jm:jm,jd:jd};}
function toJalaali(gy,gm,gd){return d2j(g2d(gy,gm,gd));}
function toGregorian(jy,jm,jd){return d2g(j2d(jy,jm,jd));}
function isLeapJ(jy){return jalCal(jy).leap===0;}
function jMonthLen(jy,jm){if(jm<=6)return 31;if(jm<=11)return 30;return isLeapJ(jy)?30:29;}

var J_MONTHS=['فروردین','اردیبهشت','خرداد','تیر','مرداد','شهریور','مهر','آبان','آذر','دی','بهمن','اسفند'];
var J_MONTHS_SHORT=['فرو','ارد','خرد','تیر','مرد','شهر','مهر','آبا','آذر','دی','بهم','اسف'];
var J_WEEK=['ش','ی','د','س','چ','پ','ج'];
var J_WEEK_LONG=['شنبه','یک‌شنبه','دوشنبه','سه‌شنبه','چهارشنبه','پنج‌شنبه','جمعه'];
var G_MONTHS=['January','February','March','April','May','June','July','August','September','October','November','December'];
var G_WEEK=['S','M','T','W','T','F','S'];

/* -------------------------------- state ---------------------------------- */
var lang = 'fa-IR';
try { var sv=localStorage.getItem('ghf-lang'); if(sv&&DICT[sv])lang=sv; } catch(e){}
function dict(){return DICT[lang]||{};}
function t(key){ if(key==null)return ''; var d=dict(); return (d[key]!=null?d[key]:(DICT['fa-IR'][key]!=null&&lang==='fa-IR'?DICT['fa-IR'][key]:key)); }
function dir(){return RTL_LANGS[lang]?'rtl':'ltr';}
function isRTL(){return !!RTL_LANGS[lang];}
var FA_DIGITS=['۰','۱','۲','۳','۴','۵','۶','۷','۸','۹'];
function toFaDigits(s){return String(s).replace(/[0-9]/g,function(d){return FA_DIGITS[+d];});}
function num(v){var s=new Intl.NumberFormat('en-US').format(Math.round(Number(v)||0));return isRTL()?toFaDigits(s):s;}
function pad2(x){return (x<10?'0':'')+x;}
function isoToParts(iso){var m=/^(\d{4})-(\d{2})-(\d{2})/.exec(String(iso||''));if(!m)return null;return {gy:+m[1],gm:+m[2],gd:+m[3]};}
function fmtDate(iso){var p=isoToParts(iso);if(!p)return iso||'';if(CAL[lang]==='jalali'){var j=toJalaali(p.gy,p.gm,p.gd);var s=j.jy+'/'+pad2(j.jm)+'/'+pad2(j.jd);return isRTL()?toFaDigits(s):s;}var s=p.gy+'/'+pad2(p.gm)+'/'+pad2(p.gd);return s;}
function fmtDateLong(iso){var p=isoToParts(iso);if(!p)return iso||'';if(CAL[lang]==='jalali'){var j=toJalaali(p.gy,p.gm,p.gd);var s=j.jd+' '+J_MONTHS[j.jm-1]+' '+j.jy;return isRTL()?toFaDigits(s):s;}return p.gd+' '+G_MONTHS[p.gm-1]+' '+p.gy;}
function fmtDateTime(iso){var s=String(iso||'');var m=/^(\d{4}-\d{2}-\d{2})[ T](\d{2}:\d{2})/.exec(s);if(!m)return fmtDate(s);return fmtDate(m[1])+' — '+(isRTL()?toFaDigits(m[2]):m[2]);}
function todayISO(){var d=new Date();return d.getFullYear()+'-'+pad2(d.getMonth()+1)+'-'+pad2(d.getDate());}

/* ------------------------------ datepicker ------------------------------- */
var OPEN=null;
function closePicker(){ if(OPEN){ OPEN.remove(); OPEN=null; document.removeEventListener('mousedown',onDocDown,true); } }
function onDocDown(e){ if(OPEN && !OPEN.contains(e.target) && e.target!==OPEN._input){ closePicker(); } }
function buildPicker(input){
  closePicker();
  var rect=input.getBoundingClientRect();
  var pop=document.createElement('div');
  pop.className='ghf-dp'+(isRTL()?' rtl':'');
  pop.setAttribute('role','dialog');
  pop.dir=dir();
  pop._input=input;
  var cur=isoToParts(input.value)||isoToParts(todayISO());
  var j=toJalaali(cur.gy,cur.gm,cur.gd);
  var view={jy:j.jy,jm:j.jm};
  function render(){
    var len=jMonthLen(view.jy,view.jm);
    var firstG=toGregorian(view.jy,view.jm,1);
    var firstDow=(new Date(firstG.gy,firstG.gm-1,firstG.gd)).getDay(); // 0 Sun..6 Sat
    // Iranian week starts Saturday: map to 0..6 with Sat=0
    var startCol=(firstDow+1)%7;
    var today=todayISO(), tj=toJalaali(+today.slice(0,4),+today.slice(5,7),+today.slice(8,10));
    var sel=isoToParts(input.value);
    var sj=sel?toJalaali(sel.gy,sel.gm,sel.gd):null;
    var cells='';
    for(var i=0;i<startCol;i++)cells+='<span class="ghf-dp-d empty"></span>';
    for(var d=1;d<=len;d++){
      var cls='ghf-dp-d';
      if(sj&&sj.jy===view.jy&&sj.jm===view.jm&&sj.jd===d)cls+=' sel';
      if(tj.jy===view.jy&&tj.jm===view.jm&&tj.jd===d)cls+=' today';
      cells+='<button type="button" class="'+cls+'" data-d="'+d+'">'+(isRTL()?toFaDigits(d):d)+'</button>';
    }
    pop.innerHTML=
      '<div class="ghf-dp-head">'+
        '<button type="button" class="ghf-dp-nav" data-nav="prev-y" title="'+t('Previous')+'">«</button>'+
        '<button type="button" class="ghf-dp-nav" data-nav="prev-m" title="'+t('Previous')+'">‹</button>'+
        '<div class="ghf-dp-title">'+t2Month(view.jm)+' '+ (isRTL()?toFaDigits(view.jy):view.jy)+'</div>'+
        '<button type="button" class="ghf-dp-nav" data-nav="next-m" title="'+t('Next')+'">›</button>'+
        '<button type="button" class="ghf-dp-nav" data-nav="next-y" title="'+t('Next')+'">»</button>'+
      '</div>'+
      '<div class="ghf-dp-week">'+J_WEEK.map(function(w){return '<span>'+w+'</span>';}).join('')+'</div>'+
      '<div class="ghf-dp-grid">'+cells+'</div>'+
      '<div class="ghf-dp-foot"><button type="button" class="ghf-dp-today">'+t('Today')+'</button>'+
      '<button type="button" class="ghf-dp-clear">'+t('Clear')+'</button></div>';
  }
  function t2Month(m){return J_MONTHS[m-1];}
  render();
  document.body.appendChild(pop);
  var top=rect.bottom+window.scrollY+6, left=rect.left+window.scrollX;
  if(left+pop.offsetWidth>window.innerWidth-8)left=window.innerWidth-pop.offsetWidth-8;
  if(left<8)left=8;
  pop.style.top=top+'px'; pop.style.left=left+'px';
  OPEN=pop;
  setTimeout(function(){document.addEventListener('mousedown',onDocDown,true);},0);
  pop.addEventListener('click',function(e){
    var nav=e.target.closest('[data-nav]');
    if(nav){var k=nav.dataset.nav;
      if(k==='prev-m'){view.jm--;if(view.jm<1){view.jm=12;view.jy--;}}
      else if(k==='next-m'){view.jm++;if(view.jm>12){view.jm=1;view.jy++;}}
      else if(k==='prev-y'){view.jy--;}else if(k==='next-y'){view.jy++;}
      render();return;}
    if(e.target.closest('.ghf-dp-today')){setISO(todayISO());return;}
    if(e.target.closest('.ghf-dp-clear')){input.value='';input.dispatchEvent(new Event('change',{bubbles:true}));closePicker();return;}
    var d=e.target.closest('[data-d]');
    if(d){var g=toGregorian(view.jy,view.jm,+d.dataset.d);setISO(g.gy+'-'+pad2(g.gm)+'-'+pad2(g.gd));return;}
  });
  function setISO(iso){input.value=iso;input.dispatchEvent(new Event('change',{bubbles:true}));input.dispatchEvent(new Event('input',{bubbles:true}));closePicker();}
}
function attachDatePickers(root){
  var els=(root||document).querySelectorAll('[data-datepicker], input[type=date]');
  Array.prototype.forEach.call(els,function(inp){
    if(inp._ghfDp)return; inp._ghfDp=true;
    if(inp.type==='date')inp.type='text';
    inp.autocomplete='off';
    inp.readOnly=true;
    inp.classList.add('ghf-dp-input');
    inp.addEventListener('focus',function(){buildPicker(inp);});
    inp.addEventListener('click',function(){buildPicker(inp);});
  });
}

/* --------------------------- runtime translation ------------------------- */
var APPLYING=false;
function trText(node){
  var raw=node.nodeValue; if(!raw)return;
  var trimmed=raw.trim(); if(!trimmed)return;
  var mapped=t(trimmed);
  if(mapped!==trimmed){ node.nodeValue=raw.replace(trimmed,mapped); }
}
function translate(root){
  if(lang==='en-US')return;
  if(APPLYING)return; APPLYING=true;
  try{
    var iw=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,null);
    var batch=[],n;
    while((n=iw.nextNode()))batch.push(n);
    batch.forEach(trText);
    var els=(root.querySelectorAll?root.querySelectorAll('[placeholder],[title],[data-tip]'):[]);
    Array.prototype.forEach.call(els,function(el){
      if(el.hasAttribute('placeholder')){var p=el.getAttribute('placeholder');var m=t(p);if(m!==p)el.setAttribute('placeholder',m);}
      if(el.hasAttribute('title')){var ti=el.getAttribute('title');var m2=t(ti);if(m2!==ti)el.setAttribute('title',m2);}
      if(el.hasAttribute('data-tip')){var dt=el.getAttribute('data-tip');var m3=t(dt);if(m3!==dt)el.setAttribute('data-tip',m3);}
    });
  } finally { APPLYING=false; }
}
var obs=new MutationObserver(function(muts){
  if(APPLYING)return;
  var roots=[];
  muts.forEach(function(m){ if(m.type==='childList'){Array.prototype.forEach.call(m.addedNodes,function(n){if(n.nodeType===1)roots.push(n);else if(n.nodeType===3)trText(n);});}});
  if(roots.length){roots.forEach(function(r){translate(r);attachDatePickers(r);});}
});
function startObserver(){obs.observe(document.body,{childList:true,subtree:true});}

/* --------------------------------- api ----------------------------------- */
function setLang(l){
  if(!DICT[l])return;
  lang=l;
  try{localStorage.setItem('ghf-lang',l);}catch(e){}
  document.documentElement.lang=l;
  document.documentElement.dir=dir();
  document.documentElement.setAttribute('data-lang',l);
  document.documentElement.classList.toggle('rtl',isRTL());
  closePicker();
  translate(document.body);
  attachDatePickers(document.body);
  window.dispatchEvent(new CustomEvent('ghf:langchange',{detail:{lang:l,dir:dir()}}));
}
function init(){
  document.documentElement.lang=lang;
  document.documentElement.dir=dir();
  document.documentElement.setAttribute('data-lang',lang);
  document.documentElement.classList.toggle('rtl',isRTL());
  startObserver();
  translate(document.body);
  attachDatePickers(document.body);
}
window.I18N={
  get lang(){return lang;}, setLang:setLang, t:t, dir:dir, isRTL:isRTL,
  num:num, toFaDigits:toFaDigits, fmtDate:fmtDate, fmtDateLong:fmtDateLong, fmtDateTime:fmtDateTime,
  today:todayISO, toJalaali:toJalaali, toGregorian:toGregorian,
  mountDatePickers:attachDatePickers, translate:translate, init:init, langs:['fa-IR','en-US']
};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init); else init();
})();