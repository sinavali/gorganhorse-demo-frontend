# Gorgan Horse Federation - Administration Panel (Demo)

## CRITICAL - current state (read first)

The application engine `assets/app.js` (originally ~239 KB) was DESTROYED during a
refactor. A faulty Node build script read and rewrote the file and truncated it to
~2 KB. Recovery was attempted and FAILED:
- no git history existed at that time (git has since been initialised),
- no .bak / .orig copies,
- no VS Code local-history or backups,
- Recycle Bin empty,
- JetBrains local-history store contains no trace of this project.

`assets/app.js.broken-2kb` preserves the truncated remnant. `assets/app.js` is a
valid minimal stub. The interactive UI (11 modules, data store, permissions,
competition flows, reports) is NOT functional until the engine is rebuilt.

## What survived intact
- assets/i18n.js   fa-IR (default) + en-US, full RTL, Jalali/Shamsi + datepicker
- assets/print.css clean black-and-white print stylesheet
- assets/app.css   design system + RTL, responsive tables, tooltips, mobile
- assets/shell.js  icon sprite, login screen, shell chrome injection
- 12 thin HTML entry pages (index + 11 modules)

## Structure
assets/app.css, assets/i18n.js, assets/print.css, assets/shell.js, assets/app.js
Each page loads i18n.js -> shell.js -> app.js; app.js reads window.GHF_PAGE.

## Requirements the rebuilt engine must satisfy
1. Default fa-IR (RTL, Farsi) + en-US; complete localisation; Shamsi datepickers.
2. Styled (B/W) print output, never blank.
3. Fully responsive (mobile + tablet); responsive non-wrapping tables.
4. Email optional, phone required.
5. Full competition flows incl. Rider self-registration.
6. Reports: flexible/dynamic filters + sorting; page-number pagination everywhere.
7. Mini-profile on the sidebar user card.
8. Tooltips (question-mark-in-circle) on every action/column/button.
9. Admin is the superuser.
10. Four roles: Admin (superuser), Manager, Veterinarian, Rider (owns horses:
    add/edit/delete via own panel, each confirmed by manager/admin; competes).

## Demo accounts (password demo1234)
admin - manager - vet - rider
