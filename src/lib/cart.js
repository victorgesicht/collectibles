import { CATALOG, getItemById } from '../data/catalog'
import { readStorage } from './storage'

export const CART_KEY = 'collectibles-ke:cart:v1'
export const MAX_PHYSICAL_QTY = 3
export const MAX_DIGITAL_QTY = 1

const VALID_IDS = new Set(CATALOG.map((item) => item.id))

export function maxQuantityFor(item) {
  return item.digital ? MAX_DIGITAL_QTY : MAX_PHYSICAL_QTY
}

export function readCart() {
  const stored = readStorage(CART_KEY, [])

  if (!Array.isArray(stored)) return []

  const merged = new Map()

  for (const entry of stored) {
    if (!entry || typeof entry.id !== 'string' || !VALID_IDS.has(entry.id)) {
      continue
    }

    const item = getItemById(entry.id)
    const quantity = Number.isInteger(entry.quantity) ? entry.quantity : 1
    const limit = maxQuantityFor(item)
    const nextQuantity = Math.min(
      limit,
      (merged.get(entry.id) ?? 0) + Math.max(1, quantity),
    )

    merged.set(entry.id, nextQuantity)
  }

  return Array.from(merged, ([id, quantity]) => ({ id, quantity }))
}
