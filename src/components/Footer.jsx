import { CATEGORIES } from '../data/catalog'
import Brand from './Brand'
import { ArrowRightIcon, LockIcon } from './Icons'

export default function Footer() {
  return (
    <footer className="no-print mt-20 border-t border-ink/10 bg-ink-900/60">
      <div className="container-page py-12 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_0.8fr_0.8fr] lg:gap-16">
          <div>
            <Brand />
            <p className="mt-5 max-w-sm text-sm leading-7 text-muted">
              A friendly demo storefront for gaming chairs, GPUs, pre-owned M4
              Macs, gaming gear and synthetic Kenyan wordlists. Built to feel
              calm from first click to checkout.
            </p>
            <p className="mt-5 inline-flex items-center gap-2 rounded-full bg-brass/10 px-3 py-1.5 text-xs font-bold text-brass">
              <LockIcon className="h-3.5 w-3.5" />
              Guest checkout · no account, no calls
            </p>
          </div>

          <div>
            <h2 className="eyebrow">Shop</h2>
            <ul className="mt-4 space-y-2.5">
              <li>
                <a
                  href="#/"
                  className="group inline-flex items-center gap-2 text-sm font-bold text-muted transition-colors hover:text-brass"
                >
                  All products
                  <ArrowRightIcon className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
                </a>
              </li>
              <li>
                <a
                  href="#/cart"
                  className="group inline-flex items-center gap-2 text-sm font-bold text-muted transition-colors hover:text-brass"
                >
                  Your cart
                  <ArrowRightIcon className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
                </a>
              </li>
              <li>
                <a
                  href="#/checkout"
                  className="group inline-flex items-center gap-2 text-sm font-bold text-muted transition-colors hover:text-brass"
                >
                  Quiet checkout
                  <ArrowRightIcon className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
                </a>
              </li>
              <li>
                <a
                  href="#/binder"
                  className="group inline-flex items-center gap-2 text-sm font-bold text-muted transition-colors hover:text-brass"
                >
                  Saved items
                  <ArrowRightIcon className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="eyebrow">Departments</h2>
            <ul className="mt-4 space-y-2.5">
              {CATEGORIES.map((category) => (
                <li
                  key={category.id}
                  className="text-sm font-bold text-muted"
                >
                  {category.label}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-ink/10 pt-6 text-xs leading-5 text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Collectibles Kenya · Demo store</p>
          <p>
            No real payments yet · Daraja integration is next · Data stays in
            this browser
          </p>
        </div>
      </div>
    </footer>
  )
}
