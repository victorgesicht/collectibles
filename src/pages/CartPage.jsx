import CoverArt from '../components/CoverArt'
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CartIcon,
  MinusIcon,
  PlusIcon,
  TrashIcon,
  TruckIcon,
} from '../components/Icons'
import { maxQuantityFor } from '../lib/cart'
import { formatKes } from '../lib/format'
import { useCart } from '../state/cart-context'

export default function CartPage() {
  const cart = useCart()

  if (cart.lines.length === 0) {
    return (
      <div className="container-page py-16 lg:py-24">
        <a href="#/" className="btn-ghost">
          <ArrowLeftIcon className="h-4 w-4" />
          Back to the shop
        </a>

        <div className="mx-auto mt-12 max-w-xl rounded-4xl border border-dashed border-brass/30 bg-ink-900/70 px-6 py-16 text-center shadow-card">
          <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-brass/10 text-brass">
            <CartIcon className="h-7 w-7" />
          </span>
          <h1 className="display mt-6 text-4xl text-parchment">
            Your cart is taking a nap.
          </h1>
          <p className="mx-auto mt-3 max-w-md text-base leading-7 text-muted">
            Add a chair, a GPU or a quiet little upgrade and it will show up
            here. No account needed.
          </p>
          <a href="#/" className="btn-primary mt-7">
            Find something good
            <ArrowRightIcon className="h-4 w-4" />
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="container-page py-12 lg:py-20">
      <div className="flex flex-col gap-6 border-b border-ink/10 pb-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="eyebrow">Your cart</p>
          <h1 className="display mt-3 text-4xl text-parchment sm:text-5xl">
            Let&apos;s get this packed.
          </h1>
          <p className="mt-3 max-w-xl text-base leading-7 text-muted">
            {cart.count} {cart.count === 1 ? 'item' : 'items'} ready. Check out
            as a guest — no account, no calls or haggling.
          </p>
        </div>

        <a href="#/" className="btn-ghost">
          <ArrowLeftIcon className="h-4 w-4" />
          Keep shopping
        </a>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
        <div className="space-y-4">
          {cart.lines.map((line) => {
            const limit = maxQuantityFor(line)

            return (
              <article
                key={line.id}
                className="surface flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:p-5"
              >
                <a
                  href={`#/item/${line.id}`}
                  className="block w-full max-w-[112px] shrink-0 overflow-hidden rounded-2xl border border-ink/10"
                  aria-label={`Open ${line.title}`}
                >
                  <CoverArt item={line} className="h-auto w-full" />
                </a>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="chip bg-brass/10 text-brass">
                      {line.digital ? 'Digital' : 'Physical'}
                    </span>
                    {line.badge && (
                      <span className="chip bg-sage/10 text-sage">
                        {line.badge}
                      </span>
                    )}
                  </div>

                  <a
                    href={`#/item/${line.id}`}
                    className="mt-2 block font-display text-xl font-semibold leading-tight text-parchment transition-colors hover:text-brass-dark"
                  >
                    {line.title}
                    {line.issue ? ` · ${line.issue}` : ''}
                  </a>
                  <p className="mt-1 text-sm leading-6 text-muted">
                    {line.digital
                      ? 'Instant download after payment'
                      : line.stock}
                  </p>

                  <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          cart.setQuantity(line.id, line.quantity - 1)
                        }
                        className="grid h-10 w-10 place-items-center rounded-full border border-ink/15 text-parchment transition-colors hover:border-brass/50 hover:text-brass"
                        aria-label={`Reduce quantity for ${line.title}`}
                      >
                        <MinusIcon className="h-4 w-4" />
                      </button>
                      <span
                        className="min-w-8 text-center font-display text-lg font-semibold text-parchment"
                        aria-live="polite"
                      >
                        {line.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          cart.setQuantity(line.id, line.quantity + 1)
                        }
                        disabled={line.quantity >= limit}
                        className="grid h-10 w-10 place-items-center rounded-full border border-ink/15 text-parchment transition-colors hover:border-brass/50 hover:text-brass disabled:cursor-not-allowed disabled:opacity-35"
                        aria-label={`Increase quantity for ${line.title}`}
                      >
                        <PlusIcon className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="flex items-center gap-4">
                      <p className="font-display text-xl font-semibold text-parchment">
                        {formatKes(line.value * line.quantity)}
                      </p>
                      <button
                        type="button"
                        onClick={() => cart.remove(line.id)}
                        className="inline-flex items-center gap-1.5 text-sm font-bold text-muted transition-colors hover:text-wine"
                      >
                        <TrashIcon className="h-4 w-4" />
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            )
          })}

          <div className="flex flex-wrap items-center justify-between gap-3 px-1 pt-1">
            <button
              type="button"
              onClick={cart.clear}
              className="text-sm font-bold text-muted transition-colors hover:text-wine"
            >
              Clear the cart
            </button>
            <span className="text-sm text-muted">
              Demo prices · nothing is charged
            </span>
          </div>
        </div>

        <aside className="surface p-6 lg:sticky lg:top-28">
          <h2 className="font-display text-2xl font-semibold text-parchment">
            Order summary
          </h2>

          <dl className="mt-5 space-y-3 text-sm">
            <div className="flex items-center justify-between gap-4">
              <dt className="text-muted">Subtotal</dt>
              <dd className="font-bold text-parchment">
                {formatKes(cart.subtotal)}
              </dd>
            </div>
            <div className="flex items-center justify-between gap-4">
              <dt className="text-muted">Delivery</dt>
              <dd className="text-right font-bold text-parchment">
                {cart.hasPhysical ? 'At checkout' : 'Digital · free'}
              </dd>
            </div>
          </dl>

          <div className="mt-5 flex items-end justify-between gap-4 border-t border-ink/10 pt-5">
            <div>
              <p className="text-sm font-bold text-muted">Total</p>
              <p className="text-xs text-muted">Delivery added next</p>
            </div>
            <p className="font-display text-3xl font-semibold text-parchment">
              {formatKes(cart.subtotal)}
            </p>
          </div>

          <a href="#/checkout" className="btn-primary mt-6 w-full">
            Continue to quiet checkout
            <ArrowRightIcon className="h-4 w-4" />
          </a>

          <div className="mt-5 space-y-3 rounded-2xl bg-ink-800 p-4">
            <p className="flex items-start gap-2.5 text-sm leading-6 text-muted">
              <TruckIcon className="mt-0.5 h-4 w-4 shrink-0 text-sage" />
              Nairobi same-day or next-day. Countrywide in 2–3 days.
            </p>
            <p className="flex items-start gap-2.5 text-sm leading-6 text-muted">
              <CartIcon className="mt-0.5 h-4 w-4 shrink-0 text-sage" />
              Guest checkout. No account and no marketing.
            </p>
          </div>

          <p className="mt-4 text-center text-xs leading-5 text-muted">
            M-Pesa via Daraja is coming next. This demo does not take payment.
          </p>
        </aside>
      </div>
    </div>
  )
}
