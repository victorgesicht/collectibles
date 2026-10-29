import { CATEGORIES } from '../data/catalog'
import Brand from './Brand'
import { ArrowRightIcon } from './Icons'

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-parchment/10 bg-ink-900/50">
      <div className="container-page py-14 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr_1fr] lg:gap-16">
          <div>
            <Brand />
            <p className="mt-6 max-w-sm font-sans text-sm leading-7 text-muted">
              An independent trading library for comics, games, vintage
              machines and the parts that keep them alive.
            </p>
            <p className="mt-5 font-mono text-[9px] uppercase tracking-[0.24em] text-parchment/50">
              Nairobi, Kenya · Open for trade
            </p>
          </div>

          <div>
            <h2 className="eyebrow">The library</h2>
            <ul className="mt-5 space-y-3">
              <li>
                <a
                  href="#/"
                  className="group inline-flex items-center gap-2 font-sans text-sm text-parchment/80 transition-colors hover:text-brass-light"
                >
                  Browse the index
                  <ArrowRightIcon className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
                </a>
              </li>
              <li>
                <a
                  href="#/binder"
                  className="group inline-flex items-center gap-2 font-sans text-sm text-parchment/80 transition-colors hover:text-brass-light"
                >
                  Your binder
                  <ArrowRightIcon className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
                </a>
              </li>
              <li>
                <a
                  href="#/account"
                  className="group inline-flex items-center gap-2 font-sans text-sm text-parchment/80 transition-colors hover:text-brass-light"
                >
                  Collector cards
                  <ArrowRightIcon className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="eyebrow">Departments</h2>
            <ul className="mt-5 space-y-3">
              {CATEGORIES.map((category) => (
                <li
                  key={category.id}
                  className="font-sans text-sm text-parchment/80"
                >
                  {category.label}
                </li>
              ))}
            </ul>
            <p className="mt-6 max-w-[220px] font-mono text-[9px] leading-5 tracking-[0.08em] text-muted/60">
              Grades and values are indicative. Terms are confirmed at the
              desk.
            </p>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-parchment/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted/70">
            © {new Date().getFullYear()} Collectibles Kenya
          </p>
          <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-muted/50">
            Preview accounts and binders are kept in this browser
          </p>
        </div>
      </div>
    </footer>
  )
}
