import CatalogSection from '../components/CatalogSection'
import CoverArt from '../components/CoverArt'
import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  BookmarkIcon,
} from '../components/Icons'
import { CATALOG, CATEGORIES, getCategory } from '../data/catalog'
import { formatDate, formatKes } from '../lib/format'

const featuredItem =
  CATALOG.find((item) => item.id === 'thinkpad-701c') ?? CATALOG[0]

const STEPS = [
  {
    number: '01',
    title: 'Catalogue with care',
    copy: 'Condition notes, provenance and a reference number for every piece. If it has a story, it goes in the record.',
  },
  {
    number: '02',
    title: 'Trade in the open',
    copy: 'No auctions and no mystery boxes. Add pieces to your binder and bring a straight offer to the desk.',
  },
  {
    number: '03',
    title: 'Keep it circulating',
    copy: 'The best collections are not sealed away. We move good pieces on to shelves where they will be used, played and read.',
  },
]

function scrollToIndex() {
  document
    .getElementById('index')
    ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function FeaturedPanel() {
  const category = getCategory(featuredItem.category)

  return (
    <aside className="relative animate-fade-up [animation-delay:120ms]">
      <div
        className="absolute -inset-6 rounded-full bg-brass/[0.045] blur-3xl"
        aria-hidden="true"
      />

      <div className="relative">
        <div className="flex items-center justify-between border border-b-0 border-parchment/15 bg-ink-800 px-4 py-3 font-mono text-[8px] uppercase tracking-[0.2em] text-muted">
          <span className="flex items-center gap-2">
            <span className="h-1 w-1 rounded-full bg-brass" />
            Featured acquisition
          </span>
          <span className="text-parchment/70">{featuredItem.ref}</span>
        </div>

        <div className="relative border border-parchment/15 bg-ink-900/95 p-4 shadow-shelf sm:p-5">
          <span className="absolute -top-3 right-4 z-10 rotate-[5deg] border border-brass/60 bg-ink-950 px-3 py-1.5 font-mono text-[8px] uppercase tracking-[0.18em] text-brass">
            Open for trade
          </span>

          <div className="grid gap-4 sm:grid-cols-[0.82fr_1fr] sm:gap-5">
            <div className="relative mx-auto w-full max-w-[230px] border border-parchment/10 sm:mx-0 sm:max-w-none">
              <CoverArt item={featuredItem} className="h-auto w-full" />
              <a
                href={`#/item/${featuredItem.id}`}
                className="absolute inset-0 z-10"
                aria-label={`View the record for ${featuredItem.title}`}
              />
            </div>

            <div className="flex min-w-0 flex-col">
              <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-brass">
                {category.label} / {featuredItem.year}
              </p>

              <h2 className="mt-3 font-display text-[28px] leading-[1.05] tracking-[-0.03em] text-parchment">
                <a
                  href={`#/item/${featuredItem.id}`}
                  className="transition-colors hover:text-brass-light"
                >
                  {featuredItem.title}
                </a>
              </h2>
              <p className="mt-1.5 font-sans text-xs leading-5 text-muted">
                {featuredItem.subtitle}
              </p>

              <p className="mt-4 line-clamp-3 font-sans text-xs leading-5 text-parchment/60">
                {featuredItem.description}
              </p>

              <div className="mt-auto pt-5">
                <div className="flex items-end justify-between gap-3 border-t border-dashed border-parchment/15 pt-4">
                  <div>
                    <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-muted/60">
                      Est. value
                    </p>
                    <p className="mt-1 font-display text-[17px] text-parchment">
                      {formatKes(featuredItem.value)}
                    </p>
                  </div>

                  <a
                    href={`#/item/${featuredItem.id}`}
                    className="group inline-flex items-center gap-1.5 pb-0.5 font-mono text-[9px] uppercase tracking-[0.16em] text-brass transition-colors hover:text-brass-light"
                  >
                    Record
                    <ArrowUpRightIcon className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-dashed border-parchment/15 pt-3 font-mono text-[8px] uppercase tracking-[0.14em] text-muted/60">
            <span>Accessioned {formatDate(featuredItem.added)}</span>
            <span>{featuredItem.condition}</span>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-parchment/10">
        <div className="hero-grid pointer-events-none absolute inset-0" aria-hidden="true" />

        <div className="container-page relative grid gap-14 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16 lg:py-24">
          <div className="animate-fade-up">
            <div className="flex items-center gap-3">
              <span className="h-px w-9 bg-brass/60" aria-hidden="true" />
              <p className="eyebrow">Nairobi, Kenya · A trading library</p>
            </div>

            <h1 className="display mt-6 text-[46px] leading-[0.96] text-parchment sm:text-6xl lg:text-[76px]">
              A library for things{' '}
              <span className="italic text-brass-light">worth keeping</span>.
            </h1>

            <p className="mt-7 max-w-xl font-sans text-[15px] leading-8 text-muted sm:text-base">
              Comics, cartridges, vintage machines and the parts that keep them
              alive. Catalogued in Nairobi, graded honestly and open for trade.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={scrollToIndex}
                className="btn-primary"
              >
                Browse the index
                <ArrowRightIcon className="h-3.5 w-3.5" />
              </button>
              <a href="#/account" className="btn-secondary">
                Open a collector card
              </a>
            </div>

            <dl className="mt-12 grid max-w-lg grid-cols-3 border-y border-parchment/10">
              <div className="py-5 pr-4">
                <dt className="font-mono text-[8px] uppercase tracking-[0.18em] text-muted/60">
                  Catalogued
                </dt>
                <dd className="mt-2 font-display text-2xl text-parchment">
                  {String(CATALOG.length).padStart(2, '0')}
                </dd>
              </div>
              <div className="border-x border-parchment/10 px-5 py-5">
                <dt className="font-mono text-[8px] uppercase tracking-[0.18em] text-muted/60">
                  Departments
                </dt>
                <dd className="mt-2 font-display text-2xl text-parchment">
                  {String(CATEGORIES.length).padStart(2, '0')}
                </dd>
              </div>
              <div className="py-5 pl-5">
                <dt className="font-mono text-[8px] uppercase tracking-[0.18em] text-muted/60">
                  Trade desk
                </dt>
                <dd className="mt-2 flex items-center gap-2 font-display text-2xl text-parchment">
                  Open
                  <span className="h-1.5 w-1.5 rounded-full bg-sage" />
                </dd>
              </div>
            </dl>

            <p className="mt-4 flex items-center gap-2 font-mono text-[8px] uppercase tracking-[0.16em] text-muted/50">
              <BookmarkIcon className="h-3 w-3" />
              Save pieces to a local binder · no fees
            </p>
          </div>

          <FeaturedPanel />
        </div>
      </section>

      <div className="border-b border-parchment/10 bg-ink-900/40">
        <div className="container-page flex flex-wrap items-center gap-x-5 gap-y-3 py-4 sm:flex-nowrap sm:justify-between">
          <span className="shrink-0 font-mono text-[8px] uppercase tracking-[0.2em] text-muted/80">
            Departments
          </span>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 sm:flex-nowrap sm:gap-8">
            {CATEGORIES.map((category, index) => (
              <span
                key={category.id}
                className="flex items-center gap-5 font-mono text-[9px] uppercase tracking-[0.18em] text-parchment/70 sm:gap-8"
              >
                {index > 0 && (
                  <span className="hidden h-3 w-px bg-parchment/15 sm:block" aria-hidden="true" />
                )}
                {category.label}
              </span>
            ))}
          </div>
          <span className="hidden shrink-0 items-center gap-2 font-mono text-[8px] uppercase tracking-[0.16em] text-sage lg:flex">
            <span className="h-1 w-1 rounded-full bg-sage" />
            All pieces open for trade
          </span>
        </div>
      </div>

      <CatalogSection />

      <section className="border-y border-parchment/10 bg-ink-900/40">
        <div className="container-page grid gap-12 py-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20 lg:py-24">
          <div className="self-start lg:sticky lg:top-28">
            <p className="eyebrow">The circulation desk</p>
            <h2 className="display mt-4 text-4xl leading-[1.05] text-parchment sm:text-5xl">
              Kept like a library.
              <br />
              <span className="italic text-brass-light">
                Traded like a market.
              </span>
            </h2>
            <p className="mt-5 max-w-md font-sans text-sm leading-7 text-muted">
              A good collection is a living thing. The library keeps the record
              straight, the grades honest and the pieces moving on to their next
              shelf.
            </p>
            <a href="#/account" className="btn-secondary mt-8">
              Apply for a card
              <ArrowRightIcon className="h-3.5 w-3.5" />
            </a>
          </div>

          <ol className="border-y border-parchment/10">
            {STEPS.map((step) => (
              <li
                key={step.number}
                className="grid gap-4 border-b border-parchment/10 py-7 last:border-b-0 sm:grid-cols-[72px_1fr] sm:gap-6 sm:py-9"
              >
                <span className="font-display text-2xl italic text-brass/70">
                  {step.number}
                </span>
                <div>
                  <h3 className="font-display text-2xl tracking-[-0.02em] text-parchment sm:text-[28px]">
                    {step.title}
                  </h3>
                  <p className="mt-3 max-w-lg font-sans text-sm leading-7 text-muted">
                    {step.copy}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="container-page py-16 lg:py-24">
        <div className="relative overflow-hidden border border-brass/25 bg-ink-900 px-6 py-12 sm:px-10 lg:px-16 lg:py-16">
          <svg
            viewBox="0 0 240 240"
            className="pointer-events-none absolute -right-8 -top-10 h-72 w-72 text-brass/[0.09]"
            aria-hidden="true"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          >
            <path d="M120 14 210 66v108l-90 52-90-52V66l90-52Z" />
            <path d="M120 52 174 83v72l-54 31-54-31V83l54-31Z" />
            <path d="M72 108h96M72 120h96M90 134h60" />
          </svg>

          <div className="relative max-w-2xl">
            <p className="eyebrow">An open invitation</p>
            <h2 className="display mt-4 text-4xl leading-[1.02] text-parchment sm:text-5xl lg:text-6xl">
              Put your shelf{' '}
              <span className="italic text-brass-light">on the record.</span>
            </h2>
            <p className="mt-5 max-w-xl font-sans text-sm leading-7 text-muted">
              Open a collector card to keep a binder, draft trade requests and
              hold your place at the desk. No fees, no noise, no sealed
              mystery boxes.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#/account" className="btn-primary">
                Create your card
                <ArrowRightIcon className="h-3.5 w-3.5" />
              </a>
              <a href="#/binder" className="btn-secondary">
                See your binder
              </a>
            </div>
            <p className="mt-6 font-mono text-[8px] uppercase tracking-[0.16em] text-muted/80">
              Local preview · Accounts and binders stay in this browser
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
