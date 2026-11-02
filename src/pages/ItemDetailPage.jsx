import { useCallback, useState } from 'react'
import CoverArt from '../components/CoverArt'
import ItemCard from '../components/ItemCard'
import TradeDialog from '../components/TradeDialog'
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  BookmarkIcon,
  CartIcon,
  CheckIcon,
  LockIcon,
  MinusIcon,
  PackageIcon,
  PlusIcon,
  TruckIcon,
} from '../components/Icons'
import { CATALOG, getCategory } from '../data/catalog'
import { maxQuantityFor } from '../lib/cart'
import { formatDate, formatKes } from '../lib/format'
import { useBinder } from '../state/binder-context'
import { useCart } from '../state/cart-context'
import { useToast } from '../state/toast-context'

export default function ItemDetailPage({ item }) {
  const category = getCategory(item.category)
  const binder = useBinder()
  const cart = useCart()
  const { pushToast } = useToast()
  const [tradeOpen, setTradeOpen] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const saved = binder.has(item.id)
  const maxQuantity = maxQuantityFor(item)
  const inCart =
    cart.lines.find((line) => line.id === item.id)?.quantity ?? 0
  const remaining = Math.max(0, maxQuantity - inCart)
  const fullTitle = item.issue ? `${item.title} · ${item.issue}` : item.title

  const closeTrade = useCallback(() => setTradeOpen(false), [])

  const related = CATALOG.filter(
    (candidate) =>
      candidate.category === item.category && candidate.id !== item.id,
  ).slice(0, 3)

  const specs = [
    { label: 'Maker', value: item.maker },
    { label: 'Year', value: item.year },
    { label: 'Condition', value: item.condition },
    { label: 'Notes', value: item.gradeNote },
    ...item.specs,
  ]

  const handleBinderToggle = () => {
    binder.toggle(item.id)
    pushToast(
      saved
        ? `${fullTitle} removed from saved items.`
        : `${fullTitle} saved for later.`,
      { tone: saved ? 'default' : 'success' },
    )
  }

  const handleAddToCart = () => {
    if (remaining === 0) {
      pushToast(
        item.digital
          ? 'This demo licence is limited to one copy.'
          : `That is the demo limit of ${maxQuantity} for this item.`,
      )
      return
    }

    const amount = Math.min(quantity, remaining)
    cart.add(item.id, amount)
    pushToast(
      `${amount === 1 ? 'One' : amount} ${fullTitle} added to your cart.`,
      { tone: 'success' },
    )
  }

  const handleBuyQuietly = () => {
    if (remaining > 0) {
      cart.add(item.id, Math.min(quantity, remaining))
    }

    window.location.hash = '#/checkout'
  }

  return (
    <>
      <div className="container-page py-8 lg:py-12">
        <a href="#/" className="btn-ghost">
          <ArrowLeftIcon className="h-4 w-4" />
          Back to the shop
        </a>

        <div className="mt-6 grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-14">
          <div className="self-start lg:sticky lg:top-32">
            <div className="surface overflow-hidden rounded-4xl p-3">
              <div className="relative overflow-hidden rounded-3xl border border-ink/5 bg-ink-800">
                <CoverArt item={item} className="h-auto w-full" />
                <span className="absolute left-4 top-4 chip bg-white/90 text-brass shadow-sm backdrop-blur-sm">
                  Demo product
                </span>
              </div>
            </div>

            <div className="mt-3 grid grid-cols-3 overflow-hidden rounded-2xl border border-ink/10 bg-ink-900">
              <div className="border-r border-ink/10 p-4">
                <p className="text-xs font-bold uppercase tracking-[0.08em] text-muted">
                  Reference
                </p>
                <p className="mt-1 font-mono text-xs text-parchment">
                  {item.ref}
                </p>
              </div>
              <div className="border-r border-ink/10 p-4">
                <p className="text-xs font-bold uppercase tracking-[0.08em] text-muted">
                  Listed
                </p>
                <p className="mt-1 text-sm font-bold text-parchment">
                  {formatDate(item.added)}
                </p>
              </div>
              <div className="p-4">
                <p className="text-xs font-bold uppercase tracking-[0.08em] text-muted">
                  Stock
                </p>
                <p className="mt-1 flex items-center gap-1.5 text-sm font-bold text-sage">
                  <span className="h-1.5 w-1.5 rounded-full bg-sage" />
                  {item.digital ? 'Digital' : 'Available'}
                </p>
              </div>
            </div>
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="chip bg-brass/10 text-brass">
                {category.label}
              </span>
              <span className="chip bg-ink-800 text-muted">{item.year}</span>
              <span className="chip bg-sage/10 text-sage">{item.stock}</span>
            </div>

            <h1 className="display mt-4 text-[42px] leading-[0.98] text-parchment sm:text-6xl">
              {item.title}
            </h1>
            <p className="mt-2 font-display text-2xl font-medium text-brass">
              {item.issue}
            </p>
            <p className="mt-3 text-base leading-7 text-muted">
              {item.subtitle}
            </p>

            <p className="mt-6 max-w-2xl text-base leading-8 text-parchment/80">
              {item.description}
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-ink-800 px-3 py-1 text-xs font-bold text-muted"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-8 rounded-3xl border border-ink/10 bg-ink-900 p-5 shadow-card sm:p-6">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.08em] text-muted">
                    Price
                  </p>
                  <p className="mt-1 font-display text-4xl font-semibold text-parchment">
                    {formatKes(item.value)}
                  </p>
                  <p className="mt-1 text-sm text-muted">
                    {item.condition} · {item.gradeNote}
                  </p>
                </div>

                {!item.digital && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-muted">Qty</span>
                    <button
                      type="button"
                      onClick={() =>
                        setQuantity((current) => Math.max(1, current - 1))
                      }
                      className="grid h-10 w-10 place-items-center rounded-full border border-ink/15 text-parchment transition-colors hover:border-brass/50 hover:text-brass"
                      aria-label="Reduce quantity"
                    >
                      <MinusIcon className="h-4 w-4" />
                    </button>
                    <span
                      className="min-w-8 text-center font-display text-lg font-semibold text-parchment"
                      aria-live="polite"
                    >
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        setQuantity((current) =>
                          Math.min(maxQuantity, current + 1),
                        )
                      }
                      disabled={quantity >= maxQuantity}
                      className="grid h-10 w-10 place-items-center rounded-full border border-ink/15 text-parchment transition-colors hover:border-brass/50 hover:text-brass disabled:cursor-not-allowed disabled:opacity-35"
                      aria-label="Increase quantity"
                    >
                      <PlusIcon className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>

              {inCart > 0 && (
                <p className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-sage/10 px-3 py-1 text-xs font-bold text-sage">
                  <CheckIcon className="h-3.5 w-3.5" />
                  {inCart} already in your cart
                </p>
              )}

              <div className="mt-5 grid gap-2.5 sm:grid-cols-2">
                {remaining === 0 ? (
                  <a href="#/cart" className="btn-primary">
                    <CartIcon className="h-4 w-4" />
                    View your cart
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    className="btn-primary"
                  >
                    <CartIcon className="h-4 w-4" />
                    Add to cart
                  </button>
                )}
                <button
                  type="button"
                  onClick={handleBuyQuietly}
                  className="btn-secondary"
                >
                  Buy quietly
                  <ArrowRightIcon className="h-4 w-4" />
                </button>
              </div>

              <div className="mt-3 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={handleBinderToggle}
                  aria-pressed={saved}
                  className={`inline-flex min-h-[44px] items-center gap-2 rounded-full px-3 text-sm font-bold transition-colors ${
                    saved ? 'text-brass' : 'text-muted hover:text-brass'
                  }`}
                >
                  <BookmarkIcon filled={saved} className="h-4 w-4" />
                  {saved ? 'Saved for later' : 'Save for later'}
                </button>
                <span className="h-4 w-px bg-ink/15" aria-hidden="true" />
                <button
                  type="button"
                  onClick={() => setTradeOpen(true)}
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-full px-3 text-sm font-bold text-muted transition-colors hover:text-brass"
                >
                  Prefer to talk? Make an offer
                </button>
              </div>

              <p className="mt-4 flex items-start gap-2 border-t border-ink/10 pt-4 text-xs leading-5 text-muted">
                <LockIcon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-sage" />
                Quiet checkout: no account, no calls and no haggling. This demo
                does not take payment.
              </p>
            </div>

            <section className="mt-8" aria-labelledby="details-heading">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <h2
                  id="details-heading"
                  className="font-display text-2xl font-semibold text-parchment"
                >
                  What you get
                </h2>
                <span className="text-xs font-bold text-muted">
                  Checked before listing
                </span>
              </div>

              <dl className="mt-4 overflow-hidden rounded-2xl border border-ink/10 bg-ink-900">
                {specs.map((spec, index) => (
                  <div
                    key={spec.label}
                    className={`grid grid-cols-[0.8fr_1.2fr] gap-4 px-4 py-3.5 sm:px-5 ${
                      index < specs.length - 1
                        ? 'border-b border-ink/10'
                        : ''
                    }`}
                  >
                    <dt className="text-sm font-bold text-muted">
                      {spec.label}
                    </dt>
                    <dd className="text-sm leading-6 text-parchment/80">
                      {spec.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>

            <section className="mt-8 rounded-3xl border border-brass/20 bg-brass/[0.04] p-5 sm:p-6">
              <p className="eyebrow">
                <PackageIcon className="h-4 w-4" />
                Good to know
              </p>
              <p className="mt-3 text-sm leading-7 text-parchment/80">
                {item.tradeNote}
              </p>
              <div className="mt-4 flex flex-wrap gap-4 border-t border-brass/15 pt-4 text-xs font-bold text-muted">
                <span className="flex items-center gap-1.5">
                  <TruckIcon className="h-3.5 w-3.5 text-brass" />
                  {item.delivery ?? 'Nairobi same-day · Countrywide 2–3 days'}
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckIcon className="h-3.5 w-3.5 text-sage" />
                  Demo product · price is illustrative
                </span>
              </div>
            </section>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="container-page border-t border-ink/10 py-14 lg:py-20">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow">More to see</p>
              <h2 className="display mt-3 text-3xl text-parchment sm:text-4xl">
                More from {category.label.toLowerCase()}.
              </h2>
            </div>
            <a href="#/" className="btn-ghost hidden sm:inline-flex">
              Full catalogue
              <ArrowRightIcon className="h-4 w-4" />
            </a>
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((relatedItem) => (
              <ItemCard key={relatedItem.id} item={relatedItem} />
            ))}
          </div>
        </section>
      )}

      {tradeOpen && <TradeDialog item={item} onClose={closeTrade} />}
    </>
  )
}
