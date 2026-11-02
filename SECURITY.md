# Security notes

Collectibles Kenya is a static demo storefront. It has no backend, no accounts server and no payment processing. The notes below describe what is protected in the demo and what must be added before it can handle real orders or personal data.

## What is in place

- **No secrets in the client.** There are no API keys, Daraja credentials or payment secrets in the source. `src/lib/daraja.js` is deliberately disconnected and never contacts Safaricom.
- **No third-party requests.** Fonts are self-hosted under `src/assets/fonts/`. The app does not load fonts, analytics, pixels or scripts from third parties.
- **Content Security Policy.** `public/_headers` sets a restrictive CSP for self-hosted assets, plus HSTS, COOP/CORP, clickjacking, referrer and permissions policies. These rules apply on hosts that support `_headers` (for example Netlify or Cloudflare Pages); configure equivalent headers if you deploy elsewhere.
- **No HTML injection sink.** The app does not use `dangerouslySetInnerHTML`, `eval` or `new Function`. User-entered notes and offers are rendered as text by React.
- **Password handling.** Local demo passwords use PBKDF2-HMAC-SHA-256 with 150,000 iterations, a random 16-byte salt and a constant-time hash comparison. Passwords are never written to storage.
- **Input checks.** Checkout validates Kenyan phone numbers, email shape, address lengths, quantities and payment/contact choices. Order totals are recalculated from the catalogue rather than trusted from storage.
- **Order references.** Order IDs use `crypto.getRandomValues` when available.
- **Minimised display.** The order receipt masks the phone number and email by default.
- **Dependency check.** `npm audit --omit=dev` reports no runtime vulnerabilities. Advisories in dev-only build/lint tooling are tracked separately and are not shipped to the browser bundle.

## Demo-only limits

These are accepted limits for a static demo, not a production security model:

- Accounts, sessions, saved items, carts and orders live in `localStorage`. Anyone with access to the browser profile can read or edit them, and a session can be forged. Do not use real credentials or real personal data.
- The customer name, phone, email and address are stored locally in order records. They are masked in the UI but remain readable in browser storage.
- Checkout has no server-side validation, rate limiting, bot protection, stock reservation or order ownership checks.
- Account sign-up has no email verification, password reset, lockout or breach-password check.
- There is no privacy policy, retention schedule or delete-my-data flow.

## Before enabling Daraja or real orders

1. Move consumer key, consumer secret, passkey and shortcode to a server-side secret store. Never bundle them in this client.
2. Create a server endpoint that validates the cart, quantities, delivery fee and total before starting an STK push.
3. Verify Daraja callbacks server-side, validate the amount and order reference, and make payment updates idempotent.
4. Store orders in a real database with access control. Return only the current customer’s order to that customer.
5. Add authentication, session expiry, CSRF protection for cookie sessions, rate limiting and audit logging.
6. Add stock reservation and idempotency keys so retries cannot double-charge or oversell.
7. Add email/SMS verification, a privacy policy, data retention rules and a delete flow.
8. Restrict digital download links to paid, authenticated customers and expire them.
9. Add monitoring and an incident-response contact before launch.

## Reporting

This is a demo project. If you find a security issue in the repository, open an issue at <https://github.com/victorgesicht/collectibles/issues> without including exploit details or real personal data. Do not test against a deployment holding real customer data.
