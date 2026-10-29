import { useEffect, useState } from 'react'
import { useAuth } from '../state/auth-context'
import { useBinder } from '../state/binder-context'
import { getInitials } from '../lib/format'
import Brand from './Brand'
import { CloseIcon, MenuIcon } from './Icons'

function BinderCount({ count }) {
  if (count === 0) return null

  return (
    <span className="font-mono text-[9px] text-brass" aria-hidden="true">
      [{String(count).padStart(2, '0')}]
    </span>
  )
}

export default function NavBar({ page }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const { user } = useAuth()
  const { count } = useBinder()

  const isIndexActive = page === 'home' || page === 'item'
  const isBinderActive = page === 'binder'
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

  return (
    <header className="sticky top-0 z-40 border-b border-parchment/10 bg-ink-950/85 backdrop-blur-md">
      <div className="container-page flex h-[72px] items-center justify-between gap-6">
        <Brand onClick={closeMenu} />

        <nav
          className="hidden items-center gap-8 md:flex"
          aria-label="Primary navigation"
        >
          <a
            href="#/"
            aria-current={isIndexActive ? 'page' : undefined}
            className={`font-mono text-[10px] uppercase tracking-[0.2em] transition-colors ${
              isIndexActive
                ? 'text-brass'
                : 'text-muted hover:text-parchment'
            }`}
          >
            Index
          </a>
          <a
            href="#/binder"
            aria-current={isBinderActive ? 'page' : undefined}
            className={`flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] transition-colors ${
              isBinderActive
                ? 'text-brass'
                : 'text-muted hover:text-parchment'
            }`}
          >
            Binder
            <BinderCount count={count} />
          </a>
        </nav>

        <div className="hidden items-center gap-5 md:flex">
          {user ? (
            <a
              href="#/account"
              aria-current={isAccountActive ? 'page' : undefined}
              className="group flex items-center gap-3"
            >
              <span
                className={`grid h-9 w-9 place-items-center border font-mono text-[10px] tracking-[0.1em] transition-colors ${
                  isAccountActive
                    ? 'border-brass text-brass'
                    : 'border-parchment/20 text-parchment/70 group-hover:border-brass/60 group-hover:text-brass'
                }`}
              >
                {getInitials(user.name)}
              </span>
              <span className="flex flex-col gap-1">
                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted">
                  My card
                </span>
                <span className="max-w-[140px] truncate font-sans text-xs text-parchment">
                  {user.name}
                </span>
              </span>
            </a>
          ) : (
            <a href="#/account" className="btn-primary !px-4 !py-2.5">
              Open a card
            </a>
          )}
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((current) => !current)}
          className="inline-flex h-11 w-11 items-center justify-center border border-parchment/15 text-parchment transition-colors hover:border-brass/60 hover:text-brass md:hidden"
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
          className="border-t border-parchment/10 bg-ink-950 px-5 pb-6 pt-5 md:hidden"
        >
          <nav className="flex flex-col" aria-label="Mobile navigation">
            <a
              href="#/"
              onClick={closeMenu}
              aria-current={isIndexActive ? 'page' : undefined}
              className={`flex items-center justify-between border-b border-parchment/10 py-4 font-mono text-[11px] uppercase tracking-[0.2em] ${
                isIndexActive ? 'text-brass' : 'text-parchment'
              }`}
            >
              Index
              <span className="font-mono text-[9px] text-muted">01</span>
            </a>
            <a
              href="#/binder"
              onClick={closeMenu}
              aria-current={isBinderActive ? 'page' : undefined}
              className={`flex items-center justify-between border-b border-parchment/10 py-4 font-mono text-[11px] uppercase tracking-[0.2em] ${
                isBinderActive ? 'text-brass' : 'text-parchment'
              }`}
            >
              <span className="flex items-center gap-2">
                Binder <BinderCount count={count} />
              </span>
              <span className="font-mono text-[9px] text-muted">02</span>
            </a>
            <a
              href="#/account"
              onClick={closeMenu}
              aria-current={isAccountActive ? 'page' : undefined}
              className={`flex items-center justify-between py-4 font-mono text-[11px] uppercase tracking-[0.2em] ${
                isAccountActive ? 'text-brass' : 'text-parchment'
              }`}
            >
              {user ? 'My collector card' : 'Collector cards'}
              <span className="font-mono text-[9px] text-muted">03</span>
            </a>
          </nav>

          {user ? (
            <div className="mt-4 flex items-center gap-3 border border-parchment/10 bg-ink-900 p-4">
              <span className="grid h-10 w-10 place-items-center border border-brass/40 font-mono text-[11px] text-brass">
                {getInitials(user.name)}
              </span>
              <div className="min-w-0">
                <p className="truncate font-sans text-sm text-parchment">
                  {user.name}
                </p>
                <p className="truncate font-mono text-[9px] uppercase tracking-[0.16em] text-muted">
                  {user.email}
                </p>
              </div>
            </div>
          ) : (
            <a
              href="#/account"
              onClick={closeMenu}
              className="btn-primary mt-4 w-full"
            >
              Open a collector card
            </a>
          )}
        </div>
      )}
    </header>
  )
}
