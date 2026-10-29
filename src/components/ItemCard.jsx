import { getCategory } from '../data/catalog'
import { formatKes } from '../lib/format'
import { useBinder } from '../state/binder-context'
import { useToast } from '../state/toast-context'
import CoverArt from './CoverArt'
import { ArrowUpRightIcon, BookmarkIcon } from './Icons'

export default function ItemCard({ item }) {
  const binder = useBinder()
  const { pushToast } = useToast()
  const category = getCategory(item.category)
  const saved = binder.has(item.id)
  const fullTitle = item.issue ? `${item.title} ${item.issue}` : item.title

  const handleBinderToggle = () => {
    binder.toggle(item.id)
    pushToast(
      saved
        ? `${fullTitle} removed from your binder.`
        : `${fullTitle} added to your binder.`,
      { tone: saved ? 'default' : 'success' },
    )
  }

  return (
    <article className="group flex flex-col border border-parchment/10 bg-ink-900/70 transition duration-300 hover:border-brass/35 hover:shadow-plate">
      <div className="p-2.5 pb-0">
        <div className="relative overflow-hidden border border-parchment/[0.06] bg-ink-950">
          <CoverArt
            item={item}
            className="h-auto w-full transition-transform duration-500 ease-out group-hover:scale-[1.025]"
          />
          <span className="pointer-events-none absolute bottom-3 right-3 border border-parchment/15 bg-ink-950/85 px-2.5 py-1 font-mono text-[8px] uppercase tracking-[0.16em] text-parchment/80 backdrop-blur-sm">
            {item.condition}
          </span>
          <a
            href={`#/item/${item.id}`}
            className="absolute inset-0 z-10"
            aria-label={`View the record for ${fullTitle}`}
          />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between gap-3 font-mono text-[9px] uppercase tracking-[0.18em]">
          <span className="text-brass">{category.label}</span>
          <span className="text-muted">{item.year}</span>
        </div>

        <h3 className="mt-3 font-display text-[23px] leading-[1.1] tracking-[-0.025em] text-parchment">
          <a
            href={`#/item/${item.id}`}
            className="transition-colors hover:text-brass-light"
          >
            {item.title}
            {item.issue && (
              <span className="text-muted"> · {item.issue}</span>
            )}
          </a>
        </h3>

        <p className="mt-2 line-clamp-2 font-sans text-[13px] leading-6 text-muted">
          {item.subtitle}
        </p>

        <p className="mt-3 font-mono text-[8px] uppercase tracking-[0.14em] text-parchment/35">
          {item.gradeNote}
        </p>

        <div className="mt-auto">
          <div className="mt-5 flex items-end justify-between border-t border-parchment/10 pt-4">
            <div>
              <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-muted/60">
                Est. trade value
              </p>
              <p className="mt-1 font-display text-[17px] text-parchment">
                {formatKes(item.value)}
              </p>
            </div>
            <span className="mb-0.5 flex items-center gap-1.5 font-mono text-[8px] uppercase tracking-[0.14em] text-sage">
              <span className="h-1 w-1 rounded-full bg-sage" />
              Open
            </span>
          </div>

          <div className="mt-4 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={handleBinderToggle}
              aria-pressed={saved}
              className={`inline-flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.16em] transition-colors ${
                saved
                  ? 'text-brass'
                  : 'text-muted hover:text-parchment'
              }`}
            >
              <BookmarkIcon filled={saved} className="h-3.5 w-3.5" />
              {saved ? 'In binder' : 'Save'}
            </button>

            <a
              href={`#/item/${item.id}`}
              className="group/link inline-flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.16em] text-parchment/70 transition-colors hover:text-brass-light"
            >
              Record
              <ArrowUpRightIcon className="h-3.5 w-3.5 transition-transform duration-200 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
            </a>
          </div>
        </div>
      </div>
    </article>
  )
}
