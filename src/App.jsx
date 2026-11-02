import { useEffect } from 'react'
import Footer from './components/Footer'
import NavBar from './components/NavBar'
import { getItemById } from './data/catalog'
import useHashRoute from './hooks/useHashRoute'
import AccountPage from './pages/AccountPage'
import BinderPage from './pages/BinderPage'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'
import HomePage from './pages/HomePage'
import ItemDetailPage from './pages/ItemDetailPage'
import NotFoundPage from './pages/NotFoundPage'
import OrderPage from './pages/OrderPage'

const SITE_NAME = 'Collectibles Kenya'

function getPageTitle(route, item) {
  if (route.page === 'item' && item) {
    return `${item.title}${item.issue ? ` · ${item.issue}` : ''} — ${SITE_NAME}`
  }

  if (route.page === 'cart') return `Your Cart — ${SITE_NAME}`
  if (route.page === 'checkout') return `Quiet Checkout — ${SITE_NAME}`
  if (route.page === 'order') return `Order ${route.id ?? ''} — ${SITE_NAME}`
  if (route.page === 'binder') return `Saved Items — ${SITE_NAME}`
  if (route.page === 'account') return `Account — ${SITE_NAME}`
  if (route.page === 'home') {
    return `${SITE_NAME} — Good gear, quietly delivered`
  }

  return `Page Not Found — ${SITE_NAME}`
}

const NOINDEX_PAGES = new Set(['cart', 'checkout', 'order', 'account'])

export default function App() {
  const route = useHashRoute()
  const item = route.page === 'item' ? getItemById(route.id) : null

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [route.page, route.id])

  useEffect(() => {
    document.title = getPageTitle(route, item)

    const robots = document.querySelector('meta[name="robots"]')
    if (robots) {
      robots.setAttribute(
        'content',
        NOINDEX_PAGES.has(route.page)
          ? 'noindex, nofollow'
          : 'index, follow',
      )
    }
  }, [route, item])

  const handleSkipToContent = (event) => {
    event.preventDefault()
    document.getElementById('main-content')?.focus()
  }

  let pageContent

  if (route.page === 'home') {
    pageContent = <HomePage />
  } else if (route.page === 'cart') {
    pageContent = <CartPage />
  } else if (route.page === 'checkout') {
    pageContent = <CheckoutPage />
  } else if (route.page === 'order') {
    pageContent = <OrderPage orderId={route.id} />
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
        className="sr-only z-[80] rounded-full bg-brass px-4 py-3 text-sm font-bold text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
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
