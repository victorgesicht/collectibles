import { useEffect, useState } from 'react'

function parseHash(hash) {
  const path = hash.replace(/^#/, '').split('?')[0]
  const segments = path.split('/').filter(Boolean)

  return {
    path: path || '/',
    page: segments[0] || 'home',
    id: segments[1] || null,
  }
}

export default function useHashRoute() {
  const [route, setRoute] = useState(() => parseHash(window.location.hash))

  useEffect(() => {
    const handleHashChange = () => {
      setRoute(parseHash(window.location.hash))
    }

    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  return route
}
