import ItemCard from '../components/ItemCard'
import { BookmarkIcon } from '../components/Icons'
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
      <div className="flex flex-col gap-8 border-b border-parchment/10 pb-8 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="eyebrow">Collector file / Binder</p>
          <h1 className="display mt-4 text-4xl leading-[1.02] text-parchment sm:text-5xl">
            Your binder.
          </h1>
          <p className="mt-4 max-w-lg font-sans text-sm leading-7 text-muted">
            A shortlist of pieces worth bringing to the desk. Save what catches
            your eye, then open a record when you are ready to talk.
          </p>
        </div>

        <div className="flex items-center gap-8 border border-parchment/10 bg-ink-900/60 px-6 py-4">
          <div>
            <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-muted/60">
              Pieces
            </p>
            <p className="mt-1.5 font-display text-2xl text-parchment">
              {String(items.length).padStart(2, '0')}
            </p>
          </div>
          <span className="h-9 w-px bg-parchment/10" aria-hidden="true" />
          <div>
            <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-muted/60">
              Combined value
            </p>
            <p className="mt-1.5 font-display text-2xl text-parchment">
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

          <div className="mt-8 flex flex-col gap-3 border-t border-parchment/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-mono text-[8px] uppercase tracking-[0.14em] text-muted/50">
              Binder saved in this browser · values are indicative
            </p>
            <a href="#/" className="btn-ghost">
              Keep browsing the index
            </a>
          </div>
        </>
      ) : (
        <div className="mt-10 flex flex-col items-center border border-dashed border-parchment/15 px-6 py-20 text-center">
          <span className="grid h-14 w-14 place-items-center border border-brass/30 bg-brass/[0.04] text-brass">
            <BookmarkIcon className="h-5 w-5" />
          </span>
          <h2 className="mt-6 font-display text-3xl text-parchment">
            An empty binder is a clean start.
          </h2>
          <p className="mt-3 max-w-md font-sans text-sm leading-7 text-muted">
            Add a comic, a cartridge or a stubborn old machine to keep it close
            while you browse. Your shortlist stays in this browser.
          </p>
          <a href="#/" className="btn-primary mt-7">
            Browse the index
          </a>
        </div>
      )}
    </div>
  )
}
