# Collectibles Kenya

A friendly demo storefront for gaming chairs, graphics cards, pre-owned M4 Macs, gaming gear and synthetic Kenyan wordlists. Built as a static React site with a calm catalogue, a cart, guest B2C checkout and a Daraja/M-Pesa integration point.

## Run it

```bash
npm install
npm run dev
npm run build
npm run preview
npm run lint
```

The production build is written to `dist/` and served as plain static files. Vite uses a relative base, so it works at a domain root or a sub-path.

## Pages

- **Shop** (`#/`) — hero, featured product, searchable/filterable demo catalogue and quiet checkout explainer.
- **Product** (`#/item/:id`) — product story, specs, quantity, add to cart, “Buy quietly”, save and an optional offer dialog.
- **Cart** (`#/cart`) — quantities, removal and subtotal.
- **Quiet checkout** (`#/checkout`) — guest B2C checkout with SMS-first contact, delivery choice, discreet packaging and M-Pesa/pay-on-delivery selection.
- **Order** (`#/order/:id`) — receipt, masked contact details, totals, timeline and print view.
- **Saved items** (`#/binder`) — local shortlist with add-to-cart actions.
- **Account** (`#/account`) — optional local account for saved items and offers; never required for checkout.

## Demo catalogue

- Rimsticks gaming chairs.
- New and pre-owned GPUs.
- Pre-owned M4 MacBook Pro and MacBook Air.
- Two synthetic Kenyan wordlist datasets (10M and 1M generated records). No personal data is included.
- Rimsticks gaming mouse and XXL desk mat.

All products, prices and stock are illustrative. Nothing is charged.

## Quiet checkout and Daraja

Guest checkout is the main B2C path: no account, no calls, no haggling. The order form collects only what is needed for delivery and stores the order in this browser.

`src/lib/daraja.js` is a deliberately disconnected placeholder. It never sends an STK push and never takes payment. When Daraja is added:

- Put consumer key, secret, passkey and shortcode on a server, never in this client.
- Call Daraja from a trusted server endpoint and return only a safe status to the browser.
- Verify and reconcile callbacks server-side before marking an order paid.
- Replace local order storage with an authenticated backend.

## Security notes

- Fonts are self-hosted; the app makes no third-party font requests.
- `public/_headers` contains CSP, HSTS, COOP/CORP, clickjacking and permissions policies for Netlify-style hosts.
- Accounts, saved items, carts and orders use `localStorage`; this is a demo, not production auth or storage.
- Passwords are salted and hashed with PBKDF2 via Web Crypto, but client-side auth can still be bypassed. Do not use real credentials or real personal data.
- Order totals are recomputed from `src/data/catalog.js` instead of trusting stored cart values.
- Checkout and order routes are marked `noindex, nofollow`.

See [SECURITY.md](./SECURITY.md) for the audit summary and deferred work.

## Project structure

```text
src/
  assets/fonts/   Self-hosted Baloo 2, Nunito and DM Mono files
  components/     UI, product cards, artwork and navigation
  data/           Demo catalogue and categories
  hooks/          Hash-based routing
  lib/            Formatting, storage, auth, trades, cart, orders and Daraja placeholder
  pages/          Shop, product, cart, checkout, order, saved, account and 404
  state/          Auth, binder, cart and toast providers
```

## Deployment

- Serve `dist/` over HTTPS.
- Apply `public/_headers` on Netlify or translate the rules to your host. The CSP assumes self-hosted assets only.
- Replace the demo auth, order storage and payment adapter before accepting real orders.
