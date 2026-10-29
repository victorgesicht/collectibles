# Collectibles Kenya

A dark, library-inspired trading catalogue for comics, games, vintage computers and parts. Built as a fully static React site with a searchable index, item records, a local binder and a preview collector-card flow.

## Run it

```bash
npm install
npm run dev
npm run build
npm run preview
npm run lint
```

The production build is written to `dist/` and is served as plain static files. Vite uses a relative base, so it works at a domain root or a sub-path (for example GitHub Pages).

## Pages

- **Index** (`#/`) — hero, featured acquisition, searchable/filterable catalogue and trade-desk notes.
- **Record** (`#/item/:id`) — condition notes, specs, estimated value, binder action and trade dialog.
- **Binder** (`#/binder`) — locally saved pieces and their combined estimated value.
- **Collector cards** (`#/account`) — create/sign in, profile card, binder summary and logged trade requests.

## Account and trade preview

This repository is a static showcase, not a backend. Accounts, sessions, binders and trade requests are stored in `localStorage` under the `collectibles-ke:*` namespace. Passwords are salted and hashed with PBKDF2 via the Web Crypto API before storage, but client-side auth is still **not** production authentication.

Before using real accounts or private data, replace `src/lib/auth.js` and `src/lib/trades.js` with calls to a trusted backend or auth provider. The UI and state providers are intentionally isolated so that swap can happen without redesigning the pages.

## Project structure

```text
src/
  components/     UI, catalogue cards, archive artwork and navigation
  data/           Catalogue records and category metadata
  hooks/          Hash-based routing
  lib/            Formatting, local storage, auth and trade persistence
  pages/          Home, item detail, binder, account and 404
  state/          Auth, binder and toast providers
```

## Deployment notes

- `public/_headers` includes baseline security headers and immutable asset caching for Netlify-style hosts. Other hosts can ignore it or translate the rules.
- Fonts are loaded from Google Fonts. Self-host them if the deployment requires a strict third-party content policy.
- Update the catalogue in `src/data/catalog.js`; cards, filters, counts and records are all derived from that file.
