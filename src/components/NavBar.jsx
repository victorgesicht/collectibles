import { useEffect, useState } from 'react'
import { useAuth } from '../state/auth-context'
import { useBinder } from '../state/binder-context'
import { useCart } from '../state/cart-context'
import { getInitials } from '../lib/format'
import Brand from './Brand'
import {
  CartIcon,
  CloseIcon,
  MenuIcon,
  SparklesIcon,
} from './Icons'

function CountBadge({ count, label }) {
  if (count === 0) return null

  return (
    <span
      className="grid h-5 min-w-5 place-items-center rounded-full bg-brass px-1.5 text-[11px] font-extrabold text-white"
      aria-label={`${count} ${label}`}
    >
      {count}
    </span>
  )
}

export default function NavBar({ page }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const { user } = useAuth()
  const binder = useBinder()
  const cart = useCart()

  const isShopActive = page === 'home' || page === 'item'
  const isSavedActive = page === 'binder'
  const isCartActive = page === 'cart' || page === 'checkout' || page === 'order'
  const isAccountActive = page === 'account'

  useEffect(() => {
    const closeMenu = () => setMenuOpen(false)
    window.addEventListener('hashchange', closeMenu)
    return () => window.removeEventListener('hashchange', closeMenu)
  }, [])

  useEffect(() => {
    if (!menuOpen) return undefined

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)
  const linkClass = (active) =>
    `rounded-full px-4 py-2 text-sm font-bold transition-colors ${
      active
        ? 'bg-brass/10 text-brass'
        : 'text-muted hover:bg-ink-800 hover:text-parchment'
    }`

  return (
    <header className="no-print sticky top-0 z-40">
      <div className="bg-parchment px-4 py-2 text-center text-xs font-bold text-ink-950 sm:text-sm">
        Demo store · demo products and prices · no account needed · Daraja
        checkout coming soon
      </div>

      <div className="border-b border-ink/10 bg-ink-950/90 backdrop-blur-md">
        <div className="container-page flex h-[74px] items-center justify-between gap-4">
          <Brand onClick={closeMenu} />

          <nav
            className="hidden items-center gap-1 md:flex"
            aria-label="Primary navigation"
          >
            <a
              href="#/"
              aria-current={isShopActive ? 'page' : undefined}
              className={linkClass(isShopActive)}
            >
              Shop
            </a>
            <a
              href="#/binder"
              aria-current={isSavedActive ? 'page' : undefined}
              className={`inline-flex items-center gap-2 ${linkClass(isSavedActive)}`}
            >
              Saved
              <CountBadge count={binder.count} label="saved items" />
            </a>
            <a
              href="#/cart"
              aria-current={isCartActive ? 'page' : undefined}
              className={`inline-flex items-center gap-2 ${linkClass(isCartActive)}`}
            >
              <CartIcon className="h-4 w-4" />
              Cart
              <CountBadge count={cart.count} label="items in cart" />
            </a>
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            {user ? (
              <a
                href="#/account"
                aria-current={isAccountActive ? 'page' : undefined}
                className="group flex items-center gap-3 rounded-full border border-ink/10 bg-ink-900 px-3 py-2 transition-colors hover:border-brass/40"
              >
                <span className="grid h-9 w-9 place-items-center rounded-full bg-brass/10 text-sm font-extrabold text-brass">
                  {getInitials(user.name)}
                </span>
                <span className="flex max-w-[120px] flex-col text-left">
                  <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-muted">
                    Account
                  </span>
                  <span className="truncate text-sm font-bold text-parchment">
                    {user.name}
                  </span>
                </span>
              </a>
            ) : (
              <a href="#/account" className="btn-primary !min-h-10 !px-4 !py-2">
                Sign in
              </a>
            )}
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((current) => !current)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 text-parchment transition-colors hover:border-brass/50 hover:text-brass md:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>

        {menuOpen && (
          <div
            id="mobile-navigation"
            className="border-t border-ink/10 bg-ink-950 px-5 pb-6 pt-4 md:hidden"
          >
            <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
              <a
                href="#/"
                onClick={closeMenu}
                aria-current={isShopActive ? 'page' : undefined}
                className={linkClass(isShopActive)}
              >
                Shop
              </a>
              <a
                href="#/binder"
                onClick={closeMenu}
                aria-current={isSavedActive ? 'page' : undefined}
                className={`inline-flex items-center justify-between ${linkClass(isSavedActive)}`}
              >
                Saved
                <CountBadge count={binder.count} label="saved items" />
              </a>
              <a
                href="#/cart"
                onClick={closeMenu}
                aria-current={isCartActive ? 'page' : undefined}
                className={`inline-flex items-center justify-between ${linkClass(isCartActive)}`}
              >
                <span className="inline-flex items-center gap-2">
                  <CartIcon className="h-4 w-4" />
                  Cart
                </span>
                <CountBadge count={cart.count} label="items in cart" />
              </a>
              <a
                href="#/account"
                onClick={closeMenu}
                aria-current={isAccountActive ? 'page' : undefined}
                className={linkClass(isAccountActive)}
              >
                {user ? 'My account' : 'Sign in'}
              </a>
            </nav>

            <a
              href="#/checkout"
              onClick={closeMenu}
              className="btn-primary mt-4 w-full"
            >
              <SparklesIcon className="h-4 w-4" />
              Quiet checkout
            </a>
          </div>
        )}
      </div>
    </header>
  )
}
