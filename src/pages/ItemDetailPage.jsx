import { useCallback, useState } from 'react'
import CoverArt from '../components/CoverArt'
import ItemCard from '../components/ItemCard'
import TradeDialog from '../components/TradeDialog'
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  BookmarkIcon,
} from '../components/Icons'
import { CATALOG, getCategory } from '../data/catalog'
import { formatDate, formatKes } from '../lib/format'
import { useBinder } from '../state/binder-context'
import { useToast } from '../state/toast-context'

export default function ItemDetailPage({ item }) {
  const category = getCategory(item.category)
  const binder = useBinder()
  const { pushToast } = useToast()
  const [tradeOpen, setTradeOpen] = useState(false)
  const saved = binder.has(item.id)
  const fullTitle = item.issue ? `${item.title} ${item.issue}` : item.title

  const closeTrade = useCallback(() => setTradeOpen(false), [])

  const related = CATALOG.filter(
    (candidate) =>
      candidate.category === item.category && candidate.id !== item.id,
  ).slice(0, 3)

  const specs = [
    { label: 'Maker', value: item.maker },
    { label: 'Year', value: item.year },
    { label: 'Condition', value: item.condition },
    { label: 'Grade notes', value: item.gradeNote },
    ...item.specs,
  ]

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
    <>
      <div className="container-page py-8 lg:py-12">
        <a href="#/" className="btn-ghost">
          <ArrowLeftIcon className="h-3.5 w-3.5" />
          Back to the index
        </a>

        <div className="mt-8 grid gap-12 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] lg:gap-16">
          <div className="self-start lg:sticky lg:top-28">
            <div className="relative border border-parchment/15 bg-ink-900 p-3 shadow-shelf">
              <CoverArt item={item} className="h-auto w-full" />
              <span className="absolute right-6 top-6 rotate-[4deg] border border-brass/60 bg-ink-950/90 px-3 py-1.5 font-mono text-[8px] uppercase tracking-[0.18em] text-brass backdrop-blur-sm">
                Open for trade
              </span>
            </div>

            <div className="mt-3 grid grid-cols-3 border border-parchment/10 bg-ink-900/60">
              <div className="border-r border-parchment/10 px-4 py-4">
                <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-muted/60">
                  Reference
                </p>
                <p className="mt-1.5 font-mono text-[9px] tracking-[0.06em] text-parchment/80">
                  {item.ref}
                </p>
              </div>
              <div className="border-r border-parchment/10 px-4 py-4">
                <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-muted/60">
                  Accessioned
                </p>
                <p className="mt-1.5 font-mono text-[9px] tracking-[0.06em] text-parchment/80">
                  {formatDate(item.added)}
                </p>
              </div>
              <div className="px-4 py-4">
                <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-muted/60">
                  Status
                </p>
                <p className="mt-1.5 flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.06em] text-sage">
                  <span className="h-1 w-1 rounded-full bg-sage" />
                  Open
                </p>
              </div>
            </div>
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-3 font-mono text-[9px] uppercase tracking-[0.2em]">
              <a
                href="#/"
                className="text-brass transition-colors hover:text-brass-light"
              >
                {category.label}
              </a>
              <span className="h-3 w-px bg-parchment/20" aria-hidden="true" />
              <span className="text-muted">{item.ref}</span>
            </div>

            <h1 className="display mt-4 text-[42px] leading-[0.98] text-parchment sm:text-6xl">
              {item.title}
              {item.issue && (
                <span className="mt-2 block font-sans text-base font-normal uppercase tracking-[0.18em] text-muted sm:text-lg">
                  {item.issue}
                </span>
              )}
            </h1>

            <p className="mt-4 font-display text-xl italic text-brass-light/90">
              {item.subtitle}
            </p>

            <p className="mt-6 max-w-2xl font-sans text-sm leading-7 text-parchment/70">
              {item.description}
            </p>

            <div className="mt-8 flex flex-wrap gap-2">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="border border-parchment/10 px-2.5 py-1 font-mono text-[8px] uppercase tracking-[0.14em] text-muted"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-9 border-y border-parchment/10 py-6">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-muted/60">
                    Estimated trade value
                  </p>
                  <p className="mt-2 font-display text-4xl tracking-[-0.02em] text-parchment">
                    {formatKes(item.value)}
                  </p>
                  <p className="mt-2 font-mono text-[8px] uppercase tracking-[0.14em] text-muted/50">
                    {item.condition} · {item.gradeNote}
                  </p>
                </div>

                <div className="flex flex-col gap-2.5 sm:min-w-[224px]">
                  <button
                    type="button"
                    onClick={() => setTradeOpen(true)}
                    className="btn-primary w-full"
                  >
                    Propose a trade
                    <ArrowRightIcon className="h-3.5 w-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={handleBinderToggle}
                    aria-pressed={saved}
                    className={`btn-secondary w-full ${
                      saved ? '!border-brass/60 !text-brass' : ''
                    }`}
                  >
                    <BookmarkIcon filled={saved} className="h-3.5 w-3.5" />
                    {saved ? 'Saved to binder' : 'Save to binder'}
                  </button>
                </div>
              </div>
            </div>

            <section className="mt-9" aria-labelledby="record-details">
              <div className="flex items-baseline justify-between gap-4">
                <h2
                  id="record-details"
                  className="font-display text-2xl tracking-[-0.02em] text-parchment"
                >
                  The record
                </h2>
                <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-muted/50">
                  Verified at accession
                </span>
              </div>

              <dl className="mt-5 border-t border-parchment/10">
                {specs.map((spec) => (
                  <div
                    key={spec.label}
                    className="grid grid-cols-[0.8fr_1.2fr] gap-4 border-b border-parchment/10 py-3.5"
                  >
                    <dt className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted/60">
                      {spec.label}
                    </dt>
                    <dd className="font-sans text-[13px] leading-5 text-parchment/80">
                      {spec.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>

            <section className="mt-9 border border-brass/20 bg-brass/[0.035] p-5 sm:p-6">
              <p className="eyebrow">At the desk</p>
              <p className="mt-3 font-sans text-sm leading-7 text-parchment/80">
                {item.tradeNote}
              </p>
              <p className="mt-4 border-t border-brass/15 pt-4 font-mono text-[8px] uppercase leading-5 tracking-[0.12em] text-muted/60">
                Straight trades preferred · condition reports on request
              </p>
            </section>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="container-page border-t border-parchment/10 py-14 lg:py-20">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="eyebrow">Same shelf</p>
              <h2 className="display mt-3 text-3xl text-parchment sm:text-4xl">
                More from {category.label.toLowerCase()}.
              </h2>
            </div>
            <a href="#/" className="btn-ghost hidden sm:inline-flex">
              Full index
              <ArrowRightIcon className="h-3.5 w-3.5" />
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
