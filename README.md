# Gorgan Horse Federation — Administration Panel (Demo)

A single-page demo of a studbook / federation management panel, refactored from a
single monolithic HTML file into a small, reusable project structure.

## Structure

```
tools/          (removed — build scratch)
assets/
  app.css       Design system + all component styles (shared by every page)
  shell.js      Injects the SVG icon sprite, login screen and app shell chrome
  app.js        Application engine: data store, permissions, router, 11 page renderers
*.html          One thin entry file per page (index + 11 modules)
```

Every page is a ~1 KB file that loads the same two scripts.
`shell.js` injects the
shared chrome, `app.js` boots, reads `window.GHF_PAGE` and renders the right module.
No page duplicates markup, styles or logic.

## Pages

| File | Module |
|------|--------|
| index.html | redirects to the signed-in workspace (or login) |
| dashboard.html | Dashboard |
| horses.html | Horse Registry |
| members.html | Members & Licences |
| events.html | Competitions |
| health.html | Health & Veterinary |
| finance.html | Finance & Invoicing |
| reports.html | Reports & Analytics |
| notifications.html | Notifications |
| audit.html | Audit Log |
| settings.html | Settings |
| portal.html | Member Portal |

## Demo accounts

Password for every account is `demo1234`:

| Username | Role |
|----------|------|
| admin | Administrator |
| registrar | Registrar |
| vet | Veterinarian |
| finance | Finance Officer |
| member | Member Portal |

## Running

It is a static site — open `index.html` in a browser, or serve the folder:

```
npx serve .
```

## Assets

- Fonts are loaded from jsDelivr (Fontsource Inter + Outfit, `@latest`).
- Icons are an inline SVG sprite (no icon-font request).
- All state persists to `localStorage` under the key `ghf-demo-v4`.

## Architecture notes

- `app.js` is wrapped in an IIFE and exposes a small `window.GHF` API
  (`go`, `render`, `login`, `logout`, `allowed`, `db`, `session`).
- Page navigation is in-app (`GHF.go(page)`) so no reload is needed; direct deep
  links still work because each module has its own HTML entry file.
- Role-based access is enforced by `NAV` (which modules a role sees) and
  `CAN` (which write-actions a role may perform).
