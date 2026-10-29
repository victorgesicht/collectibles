import { useCallback, useEffect, useMemo, useState } from 'react'
import { CATALOG } from '../data/catalog'
import { readStorage, writeStorage } from '../lib/storage'
import { BinderContext } from './binder-context'

const BINDER_KEY = 'collectibles-ke:binder:v1'
const VALID_IDS = new Set(CATALOG.map((item) => item.id))

function readBinder() {
  const stored = readStorage(BINDER_KEY, [])

  if (!Array.isArray(stored)) return []

  return [
    ...new Set(
      stored.filter((id) => typeof id === 'string' && VALID_IDS.has(id)),
    ),
  ]
}

export default function BinderProvider({ children }) {
  const [ids, setIds] = useState(readBinder)

  useEffect(() => {
    writeStorage(BINDER_KEY, ids)
  }, [ids])

  const has = useCallback((id) => ids.includes(id), [ids])

  const toggle = useCallback((id) => {
    setIds((current) =>
      current.includes(id)
        ? current.filter((savedId) => savedId !== id)
        : [...current, id],
    )
  }, [])

  const value = useMemo(
    () => ({ ids, count: ids.length, has, toggle }),
    [ids, has, toggle],
  )

  return (
    <BinderContext.Provider value={value}>{children}</BinderContext.Provider>
  )
}
