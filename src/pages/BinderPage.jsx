import ItemCard from '../components/ItemCard'
import { ArrowLeftIcon, ArrowRightIcon, BookmarkIcon } from '../components/Icons'
import { getItemById } from '../data/catalog'
import { formatKes } from '../lib/format'
import { useBinder } from '../state/binder-context'

export default function BinderPage() {
  const { ids } = useBinder()
  const items = ids
    .map((id) => getItemById(id))
    .filter((item) => item !== undefined)
  const totalValue = items.reduce((total, item) => total + item.value, 0)

  return (
    <div className="container-page py-12 lg:py-20">
      <a href="#/" className="btn-ghost">
        <ArrowLeftIcon className="h-4 w-4" />
        Back to the shop
      </a>

      <div className="mt-6 flex flex-col gap-8 border-b border-ink/10 pb-8 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="eyebrow">
            <BookmarkIcon className="h-4 w-4" />
            Saved for later
          </p>
          <h1 className="display mt-3 text-4xl leading-[1.02] text-parchment sm:text-5xl">
            Your shortlist.
          </h1>
          <p className="mt-4 max-w-xl text-base leading-7 text-muted">
            Keep the pieces you are thinking about in one calm place. Add them
            to the cart whenever you are ready — no account needed.
          </p>
        </div>

        <div className="flex items-center gap-8 rounded-3xl border border-ink/10 bg-ink-900 px-6 py-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.08em] text-muted">
              Items
            </p>
            <p className="mt-1 font-display text-2xl font-semibold text-parchment">
              {items.length}
            </p>
          </div>
          <span className="h-10 w-px bg-ink/10" aria-hidden="true" />
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.08em] text-muted">
              Demo value
            </p>
            <p className="mt-1 font-display text-2xl font-semibold text-parchment">
              {formatKes(totalValue)}
            </p>
          </div>
        </div>
      </div>

      {items.length > 0 ? (
        <>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {items.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-3 border-t border-ink/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted">
              Saved in this browser · prices are illustrative
            </p>
            <div className="flex flex-wrap gap-2">
              <a href="#/" className="btn-ghost">
                Keep browsing
              </a>
              <a href="#/cart" className="btn-primary">
                Open your cart
                <ArrowRightIcon className="h-4 w-4" />
              </a>
            </div>
          </div>
        </>
      ) : (
        <div className="mx-auto mt-10 max-w-xl rounded-4xl border border-dashed border-brass/30 bg-ink-900/60 px-6 py-16 text-center shadow-card">
          <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-brass/10 text-brass">
            <BookmarkIcon className="h-7 w-7" />
          </span>
          <h2 className="display mt-6 text-3xl text-parchment">
            A clean shortlist is a good start.
          </h2>
          <p className="mx-auto mt-3 max-w-md text-base leading-7 text-muted">
            Tap the bookmark on any product to keep it here while you browse.
            Your shortlist stays in this browser.
          </p>
          <a href="#/" className="btn-primary mt-7">
            Find something good
            <ArrowRightIcon className="h-4 w-4" />
          </a>
        </div>
      )}
    </div>
  )
}
