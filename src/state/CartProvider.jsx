import { useCallback, useEffect, useMemo, useState } from 'react'
import { getItemById } from '../data/catalog'
import {
  CART_KEY,
  maxQuantityFor,
  readCart,
} from '../lib/cart'
import { writeStorage } from '../lib/storage'
import { CartContext } from './cart-context'

export default function CartProvider({ children }) {
  const [lines, setLines] = useState(readCart)

  useEffect(() => {
    writeStorage(CART_KEY, lines)
  }, [lines])

  const add = useCallback((id, quantity = 1) => {
    const item = getItemById(id)
    if (!item) return

    const amount = Math.max(1, Math.trunc(quantity) || 1)

    setLines((current) => {
      const existing = current.find((line) => line.id === id)
      const limit = maxQuantityFor(item)

      if (!existing) {
        return [...current, { id, quantity: Math.min(limit, amount) }]
      }

      return current.map((line) =>
        line.id === id
          ? {
              ...line,
              quantity: Math.min(limit, line.quantity + amount),
            }
          : line,
      )
    })
  }, [])

  const setQuantity = useCallback((id, quantity) => {
    const item = getItemById(id)
    if (!item) return

    const limit = maxQuantityFor(item)
    const nextQuantity = Math.min(limit, Math.max(0, Math.trunc(quantity)))

    setLines((current) => {
      if (nextQuantity === 0) {
        return current.filter((line) => line.id !== id)
      }

      return current.map((line) =>
        line.id === id ? { ...line, quantity: nextQuantity } : line,
      )
    })
  }, [])

  const remove = useCallback((id) => {
    setLines((current) => current.filter((line) => line.id !== id))
  }, [])

  const clear = useCallback(() => {
    setLines([])
  }, [])

  const detailedLines = useMemo(
    () =>
      lines
        .map((line) => {
          const item = getItemById(line.id)
          return item ? { ...item, quantity: line.quantity } : null
        })
        .filter(Boolean),
    [lines],
  )

  const count = detailedLines.reduce((total, line) => total + line.quantity, 0)
  const subtotal = detailedLines.reduce(
    (total, line) => total + line.value * line.quantity,
    0,
  )
  const hasPhysical = detailedLines.some((line) => !line.digital)
  const hasDigital = detailedLines.some((line) => line.digital)

  const value = useMemo(
    () => ({
      lines: detailedLines,
      count,
      subtotal,
      hasPhysical,
      hasDigital,
      add,
      setQuantity,
      remove,
      clear,
    }),
    [
      detailedLines,
      count,
      subtotal,
      hasPhysical,
      hasDigital,
      add,
      setQuantity,
      remove,
      clear,
    ],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
