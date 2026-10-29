import { readStorage, writeStorage } from './storage'

const TRADES_KEY = 'collectibles-ke:trades:v1'

function getTrades() {
  const trades = readStorage(TRADES_KEY, [])
  return Array.isArray(trades) ? trades : []
}

export function getTradesForUser(userId) {
  return getTrades()
    .filter((trade) => trade.userId === userId)
    .sort((left, right) => new Date(right.createdAt) - new Date(left.createdAt))
}

export function createTrade({ userId, itemId, offer, note }) {
  const cleanOffer = offer.trim()
  const cleanNote = note.trim()

  if (!userId) {
    throw new Error('Open a collector card before proposing a trade.')
  }

  if (cleanOffer.length < 12) {
    throw new Error('Tell the desk a little more about what you are offering.')
  }

  const trade = {
    id: `TD-${Date.now().toString(36).toUpperCase()}`,
    userId,
    itemId,
    offer: cleanOffer,
    note: cleanNote,
    status: 'Open',
    createdAt: new Date().toISOString(),
  }

  if (!writeStorage(TRADES_KEY, [...getTrades(), trade])) {
    throw new Error(
      'This browser could not save your trade. Check that storage is enabled.',
    )
  }

  return trade
}
