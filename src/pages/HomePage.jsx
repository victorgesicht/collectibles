import CatalogSection from '../components/CatalogSection'
import CoverArt from '../components/CoverArt'
import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  CartIcon,
  CheckIcon,
  LockIcon,
  SparklesIcon,
  TruckIcon,
} from '../components/Icons'
import { CATALOG, CATEGORIES, getCategory } from '../data/catalog'
import { formatKes } from '../lib/format'
import { useCart } from '../state/cart-context'
import { useToast } from '../state/toast-context'

const featuredItem =
  CATALOG.find((item) => item.id === 'rimsticks-apex-pro') ?? CATALOG[0]

const QUIET_STEPS = [
  {
    title: 'Pick your gear',
    copy: 'Add what you need to the cart. No account, no forms to unlock the price.',
  },
  {
    title: 'Check out quietly',
    copy: 'Leave a name, phone and delivery point. Choose SMS only if you would rather not chat.',
  },
  {
    title: 'One message, then delivery',
    copy: 'We text once when it is moving. Discreet packaging is on by default.',
  },
]

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  })
}

function FeaturedPanel() {
  const category = getCategory(featuredItem.category)
  const cart = useCart()
  const { pushToast } = useToast()

  const handleAdd = () => {
    cart.add(featuredItem.id)
    pushToast(`${featuredItem.title} added to your cart.`, {
      tone: 'success',
    })
  }

  return (
    <aside className="relative animate-fade-up [animation-delay:120ms]">
      <div
        className="absolute -inset-5 rounded-[2.5rem] bg-brass/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="surface relative overflow-hidden rounded-4xl p-3">
        <div className="relative overflow-hidden rounded-3xl border border-ink/5 bg-ink-800">
          <CoverArt item={featuredItem} className="h-auto w-full" />
          <span className="absolute left-4 top-4 chip bg-white/90 text-brass shadow-sm backdrop-blur-sm">
            <SparklesIcon className="h-3.5 w-3.5" />
            Featured
          </span>
          <a
            href={`#/item/${featuredItem.id}`}
            className="absolute inset-0 z-10"
            aria-label={`View ${featuredItem.title}`}
          />
        </div>

        <div className="p-4 sm:p-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="chip bg-brass/10 text-brass">
              {category.label}
            </span>
            <span className="text-sm font-bold text-muted">
              {featuredItem.condition}
            </span>
          </div>

          <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-parchment">
            <a
              href={`#/item/${featuredItem.id}`}
              className="transition-colors hover:text-brass"
            >
              {featuredItem.title}
            </a>
          </h2>
          <p className="mt-1.5 text-sm leading-6 text-muted">
            {featuredItem.subtitle}
          </p>

          <div className="mt-5 flex flex-wrap items-end justify-between gap-3 border-t border-ink/10 pt-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.08em] text-muted">
                Price
              </p>
              <p className="mt-1 font-display text-2xl font-semibold text-parchment">
                {formatKes(featuredItem.value)}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleAdd}
                className="btn-primary !min-h-11 !px-4 !py-2 text-xs"
              >
                <CartIcon className="h-4 w-4" />
                Add to cart
              </button>
              <a
                href={`#/item/${featuredItem.id}`}
                className="btn-secondary !min-h-11 !px-4 !py-2 text-xs"
              >
                Details
                <ArrowUpRightIcon className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <p className="absolute -bottom-4 left-6 right-6 rounded-2xl border border-ink/10 bg-ink-900 px-4 py-2.5 text-center text-xs font-bold text-muted shadow-plate">
        Guest checkout · no account · no calls · demo pricing
      </p>
    </aside>
  )
}

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-ink/10">
        <div
          className="hero-grid pointer-events-none absolute inset-0"
          aria-hidden="true"
        />

        <div className="container-page relative grid gap-16 py-16 lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:gap-14 lg:py-24">
          <div className="animate-fade-up pb-4">
            <div className="flex items-center gap-3">
              <span className="h-px w-9 bg-brass/60" aria-hidden="true" />
              <p className="eyebrow">Nairobi · demo storefront</p>
            </div>

            <h1 className="display mt-5 text-[48px] leading-[0.98] text-parchment sm:text-6xl lg:text-[78px]">
              Good gear.
              <br />
              <span className="text-brass">No noise.</span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-muted sm:text-lg sm:leading-8">
              Rimsticks chairs, graphics cards, pre-owned M4 Macs, gaming gear
              and synthetic Kenyan wordlists. Pick what you need and check out
              quietly — no account, no calls, no haggling.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => scrollTo('index')}
                className="btn-primary"
              >
                Shop the demo drop
                <ArrowRightIcon className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => scrollTo('quiet-checkout')}
                className="btn-secondary"
              >
                How quiet checkout works
              </button>
            </div>

            <dl className="mt-10 grid max-w-lg grid-cols-3 overflow-hidden rounded-3xl border border-ink/10 bg-ink-900/70">
              <div className="p-4 sm:p-5">
                <dt className="text-xs font-bold uppercase tracking-[0.08em] text-muted">
                  Products
                </dt>
                <dd className="mt-1.5 font-display text-2xl font-semibold text-parchment">
                  {CATALOG.length}
                </dd>
              </div>
              <div className="border-x border-ink/10 p-4 sm:p-5">
                <dt className="text-xs font-bold uppercase tracking-[0.08em] text-muted">
                  Departments
                </dt>
                <dd className="mt-1.5 font-display text-2xl font-semibold text-parchment">
                  {CATEGORIES.length}
                </dd>
              </div>
              <div className="p-4 sm:p-5">
                <dt className="text-xs font-bold uppercase tracking-[0.08em] text-muted">
                  Checkout
                </dt>
                <dd className="mt-1.5 flex items-center gap-2 font-display text-xl font-semibold text-parchment">
                  Quiet
                  <span className="h-2 w-2 rounded-full bg-sage" />
                </dd>
              </div>
            </dl>

            <p className="mt-4 flex items-center gap-2 text-xs font-bold text-muted">
              <LockIcon className="h-3.5 w-3.5" />
              Demo prices only · nothing is charged · Daraja coming next
            </p>
          </div>

          <FeaturedPanel />
        </div>
      </section>

      <div className="border-b border-ink/10 bg-ink-900/50">
        <div className="container-page flex flex-wrap items-center gap-x-6 gap-y-3 py-4">
          <span className="shrink-0 text-xs font-extrabold uppercase tracking-[0.12em] text-muted">
            In this drop
          </span>
          <div className="flex flex-wrap items-center gap-2">
            {CATEGORIES.map((category) => (
              <button
                key={category.id}
                type="button"
                onClick={() => scrollTo('index')}
                className="rounded-full bg-ink-800 px-3 py-1.5 text-xs font-bold text-muted transition-colors hover:bg-brass/10 hover:text-brass"
              >
                {category.label}
              </button>
            ))}
          </div>
          <span className="ml-auto hidden items-center gap-2 text-xs font-bold text-sage lg:flex">
            <span className="h-2 w-2 rounded-full bg-sage" />
            All demo products ready to order
          </span>
        </div>
      </div>

      <CatalogSection />

      <section
        id="quiet-checkout"
        className="container-page scroll-mt-32 py-16 lg:py-24"
      >
        <div className="relative overflow-hidden rounded-4xl border border-brass/20 bg-ink-900 p-6 shadow-card sm:p-10 lg:p-14">
          <div
            className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-brass/10 blur-3xl"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-sage/10 blur-3xl"
            aria-hidden="true"
          />

          <div className="relative grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center lg:gap-16">
            <div>
              <p className="eyebrow">
                <LockIcon className="h-4 w-4" />
                Quiet checkout
              </p>
              <h2 className="display mt-3 text-4xl leading-[1.03] text-parchment sm:text-5xl">
                Don&apos;t want to talk?
                <br />
                <span className="text-brass">Good. Neither do we.</span>
              </h2>
              <p className="mt-5 max-w-xl text-base leading-7 text-muted">
                Some people want a chat. Most people want their order to just
                work. Guest checkout means no account, no follow-up calls and no
                back-and-forth. Leave your details, get a reference, and hear
                from us once when the order moves.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                <span className="chip bg-sage/10 text-sage">
                  <CheckIcon className="h-3.5 w-3.5" />
                  No account
                </span>
                <span className="chip bg-sage/10 text-sage">
                  <CheckIcon className="h-3.5 w-3.5" />
                  SMS only
                </span>
                <span className="chip bg-sage/10 text-sage">
                  <CheckIcon className="h-3.5 w-3.5" />
                  Discreet packaging
                </span>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href="#/cart" className="btn-primary">
                  Open your cart
                  <ArrowRightIcon className="h-4 w-4" />
                </a>
                <button
                  type="button"
                  onClick={() => scrollTo('index')}
                  className="btn-secondary"
                >
                  Keep browsing
                </button>
              </div>

              <p className="mt-5 flex items-start gap-2 text-xs leading-5 text-muted">
                <TruckIcon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brass" />
                M-Pesa through Daraja will be connected later. This demo never
                sends an STK push and never takes money.
              </p>
            </div>

            <ol className="space-y-3">
              {QUIET_STEPS.map((step, index) => (
                <li
                  key={step.title}
                  className="flex gap-4 rounded-2xl border border-ink/10 bg-ink-800/80 p-4 sm:p-5"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brass text-sm font-extrabold text-white">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="font-display text-xl font-semibold text-parchment">
                      {step.title}
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-muted">
                      {step.copy}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="container-page pb-16 lg:pb-24">
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="surface p-5">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-brass/10 text-brass">
              <TruckIcon className="h-5 w-5" />
            </span>
            <h2 className="mt-4 font-display text-xl font-semibold text-parchment">
              Nairobi, then everywhere
            </h2>
            <p className="mt-2 text-sm leading-6 text-muted">
              Same-day or next-day in Nairobi. Countrywide in two to three
              working days. Pickup is free.
            </p>
          </div>
          <div className="surface p-5">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-sage/10 text-sage">
              <CartIcon className="h-5 w-5" />
            </span>
            <h2 className="mt-4 font-display text-xl font-semibold text-parchment">
              A cart that behaves
            </h2>
            <p className="mt-2 text-sm leading-6 text-muted">
              Keep a shortlist, change quantities and check out when you are
              ready. Your cart stays in this browser.
            </p>
          </div>
          <div className="surface p-5">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-brass/10 text-brass">
              <LockIcon className="h-5 w-5" />
            </span>
            <h2 className="mt-4 font-display text-xl font-semibold text-parchment">
              Daraja next
            </h2>
            <p className="mt-2 text-sm leading-6 text-muted">
              The M-Pesa flow is already shaped. The next step is a server-side
              Daraja STK push — never a secret in the browser.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
