import { useEffect } from 'react'
import Footer from './components/Footer'
import NavBar from './components/NavBar'
import { getItemById } from './data/catalog'
import useHashRoute from './hooks/useHashRoute'
import AccountPage from './pages/AccountPage'
import BinderPage from './pages/BinderPage'
import HomePage from './pages/HomePage'
import ItemDetailPage from './pages/ItemDetailPage'
import NotFoundPage from './pages/NotFoundPage'

const SITE_NAME = 'Collectibles Kenya'

function getPageTitle(route, item) {
  if (route.page === 'item' && item) {
    return `${item.title}${item.issue ? ` ${item.issue}` : ''} — ${SITE_NAME}`
  }

  if (route.page === 'binder') return `Your Binder — ${SITE_NAME}`
  if (route.page === 'account') return `Collector Cards — ${SITE_NAME}`
  if (route.page === 'home') {
    return `${SITE_NAME} — The Trading Library`
  }

  return `Record Not Found — ${SITE_NAME}`
}

export default function App() {
  const route = useHashRoute()
  const item = route.page === 'item' ? getItemById(route.id) : null

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [route.page, route.id])

  useEffect(() => {
    document.title = getPageTitle(route, item)
  }, [route, item])

  const handleSkipToContent = (event) => {
    event.preventDefault()
    document.getElementById('main-content')?.focus()
  }

  let pageContent

  if (route.page === 'home') {
    pageContent = <HomePage />
  } else if (route.page === 'binder') {
    pageContent = <BinderPage />
  } else if (route.page === 'account') {
    pageContent = <AccountPage />
  } else if (route.page === 'item' && item) {
    pageContent = <ItemDetailPage item={item} />
  } else {
    pageContent = <NotFoundPage />
  }

  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main-content"
        onClick={handleSkipToContent}
        className="sr-only z-[80] bg-brass px-4 py-3 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-950 focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>

      <NavBar page={route.page} />

      <main id="main-content" tabIndex={-1} className="flex-1">
        {pageContent}
      </main>

      <Footer />
    </div>
  )
}
