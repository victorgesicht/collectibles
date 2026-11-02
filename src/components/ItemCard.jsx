import { getCategory } from '../data/catalog'
import { maxQuantityFor } from '../lib/cart'
import { formatKes } from '../lib/format'
import { useBinder } from '../state/binder-context'
import { useCart } from '../state/cart-context'
import { useToast } from '../state/toast-context'
import CoverArt from './CoverArt'
import {
  ArrowUpRightIcon,
  BookmarkIcon,
  CartIcon,
  CheckIcon,
} from './Icons'

export default function ItemCard({ item }) {
  const binder = useBinder()
  const cart = useCart()
  const { pushToast } = useToast()
  const category = getCategory(item.category)
  const saved = binder.has(item.id)
  const inCart = cart.lines.find((line) => line.id === item.id)?.quantity ?? 0
  const atLimit = inCart >= maxQuantityFor(item)
  const fullTitle = item.issue ? `${item.title} · ${item.issue}` : item.title

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
    if (atLimit) {
      pushToast(
        item.digital
          ? 'This demo licence is limited to one copy.'
          : `That is the demo limit of ${maxQuantityFor(item)} for this item.`,
      )
      return
    }

    cart.add(item.id)
    pushToast(`${fullTitle} added to your cart.`, { tone: 'success' })
  }

  return (
    <article className="group flex flex-col overflow-hidden rounded-3xl border border-ink/10 bg-ink-900 shadow-card transition duration-300 hover:-translate-y-1 hover:border-brass/30 hover:shadow-lift">
      <div className="p-3 pb-0">
        <div className="relative overflow-hidden rounded-2xl border border-ink/5 bg-ink-800">
          <CoverArt
            item={item}
            className="h-auto w-full transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />
          <div className="pointer-events-none absolute left-3 top-3 flex flex-col items-start gap-2">
            {item.badge && (
              <span className="chip bg-white/90 text-brass shadow-sm backdrop-blur-sm">
                {item.badge}
              </span>
            )}
            {inCart > 0 && (
              <span className="chip bg-sage text-white shadow-sm">
                <CheckIcon className="h-3.5 w-3.5" />
                In cart
              </span>
            )}
          </div>
          <a
            href={`#/item/${item.id}`}
            className="absolute inset-0 z-10"
            aria-label={`View ${fullTitle}`}
          />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between gap-3">
          <span className="chip bg-brass/10 text-brass">{category.label}</span>
          <span className="text-xs font-bold text-muted">{item.year}</span>
        </div>

        <h3 className="mt-3 font-display text-[22px] font-semibold leading-tight text-parchment">
          <a
            href={`#/item/${item.id}`}
            className="transition-colors hover:text-brass"
          >
            {item.title}
            {item.issue && (
              <span className="text-muted"> · {item.issue}</span>
            )}
          </a>
        </h3>

        <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted">
          {item.subtitle}
        </p>

        <p className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-sage">
          <span className="h-1.5 w-1.5 rounded-full bg-sage" />
          {item.stock}
        </p>

        <div className="mt-auto">
          <div className="mt-5 flex items-end justify-between gap-3 border-t border-ink/10 pt-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.08em] text-muted">
                Price
              </p>
              <p className="mt-1 font-display text-2xl font-semibold text-parchment">
                {formatKes(item.value)}
              </p>
            </div>
            <a
              href={`#/item/${item.id}`}
              className="group/link inline-flex items-center gap-1.5 pb-1 text-xs font-bold text-muted transition-colors hover:text-brass"
            >
              Details
              <ArrowUpRightIcon className="h-3.5 w-3.5 transition-transform duration-200 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
            </a>
          </div>

          <div className="mt-4 flex items-center gap-2">
            <button
              type="button"
              onClick={handleAddToCart}
              className="btn-primary flex-1 !min-h-11 !px-3.5 !py-2 text-xs"
            >
              <CartIcon className="h-4 w-4" />
              {inCart > 0 ? `Add another · ${inCart}` : 'Add to cart'}
            </button>
            <button
              type="button"
              onClick={handleBinderToggle}
              aria-pressed={saved}
              aria-label={
                saved
                  ? `Remove ${fullTitle} from saved items`
                  : `Save ${fullTitle} for later`
              }
              className={`grid h-11 w-11 shrink-0 place-items-center rounded-full border-2 transition-colors ${
                saved
                  ? 'border-brass bg-brass/10 text-brass'
                  : 'border-ink/10 text-muted hover:border-brass/40 hover:text-brass'
              }`}
            >
              <BookmarkIcon filled={saved} className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}
