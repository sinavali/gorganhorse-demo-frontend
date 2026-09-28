# Gorgan Horse Federation - Administration Panel (Demo)

A standalone, dependency-free front-end demo of a studbook / federation
management panel. Static site: open `index.html` or serve the folder.

## Structure

```
assets/
  app.css    design system + RTL, responsive tables, tooltips, datepicker, print
  i18n.js    fa-IR (default) + en-US, RTL, Jalali/Shamsi calendar + datepicker
  shell.js   icon sprite, login screen, app-shell chrome injection
  app.js     application engine (data store, permissions, router, 11 renderers)
  print.css  clean black-and-white print stylesheet
index.html + 11 module pages (each ~1 KB)
```

Each page loads `i18n.js` -> `shell.js` -> `app.js`; `app.js` reads
`window.GHF_PAGE` and renders the module. No page duplicates markup/style/logic.

## Pages
index.html (login/entry), dashboard, horses, members, events, health, finance,
reports, notifications, audit, settings, portal.

## Demo accounts (password: demo1234)
| Username | Role |
|----------|------|
| admin | Administrator (superuser) |
| manager | Manager (registry) |
| vet | Veterinarian |
| rider | Rider (member portal) |

## Roles (4)
- **Admin** - superuser, full access to every module and action.
- **Manager** - registrar: horses, members, events, health, finance, reports, audit, settings.
- **Veterinarian** - dashboard, horses, health, events, notifications.
- **Rider** - own portal only: manages own horses (add/edit/delete, each requiring
  manager/admin approval), registers for competitions, pays dues, tracks invoices.

## Features implemented
- Full i18n: default **fa-IR** with RTL + Farsi, switchable to **en-US** (LTR).
- Custom **Jalali (Shamsi)** datepicker (no jQuery, no native `input[type=date]`).
- Persisted state in `localStorage` (key `ghf-demo-v5`).
- Styled black-and-white **print** output (passports, invoices, reports) - never blank.
- Responsive mobile/tablet layout; tables scroll with non-wrapping cells.
- Tooltips (question-mark-in-circle) on actions, columns and buttons.
- **Competition flows**: Rider self-registration with manager/admin approval.
- **Reports**: flexible dynamic filters (module/region/status/metric) + sorting +
  numbered pagination.
- Numbered pagination on all list views.
- Mini-profile on the sidebar user card (click to expand: role, phone, email, licence).
- Phone required, email optional in member forms.
- Rider horse add/edit/delete route through an approvals queue (see Settings/Notifications).

## Running
```
npx serve .
```
Or just open `index.html` in a browser.

## Notes
- Fonts: Fontsource Inter + Outfit via jsDelivr (`@latest`); Farsi Vazirmatn.
- Exposes `window.GHF` = { go, render, login, logout, allowed, db, session, page }.
- This engine was fully rebuilt from scratch (the original monolithic app.js was
  lost during refactor); it is functionally complete and verified by static checks
  and a headless DOM-stub smoke test covering login, all four roles and all 11 pages.
