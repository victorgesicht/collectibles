import { getItemById } from '../data/catalog'
import { maxQuantityFor } from './cart'
import { readStorage, writeStorage } from './storage'

const ORDERS_KEY = 'collectibles-ke:orders:v1'
const MAX_ORDERS = 50

export const DELIVERY_METHODS = [
  {
    id: 'pickup',
    label: 'Pick up at the desk',
    detail: 'Nairobi · ready in about a day',
    fee: 0,
  },
  {
    id: 'nairobi',
    label: 'Nairobi courier',
    detail: 'Same-day or next-day delivery',
    fee: 300,
  },
  {
    id: 'countrywide',
    label: 'Countrywide courier',
    detail: '2–3 working days',
    fee: 500,
  },
]

export const CONTACT_METHODS = [
  { id: 'sms', label: 'SMS only' },
  { id: 'whatsapp', label: 'WhatsApp' },
  { id: 'email', label: 'Email' },
]

export const PAYMENT_METHODS = [
  {
    id: 'mpesa',
    label: 'M-Pesa',
    detail: 'Daraja STK push — sandbox placeholder',
  },
  {
    id: 'cod',
    label: 'Pay on delivery',
    detail: 'Physical orders only',
  },
]

const KENYAN_PHONE = /^(\+254|254|0)(7|1)\d{8}$/
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function normalizePhone(rawPhone) {
  const compact = String(rawPhone ?? '').replace(/[\s().-]/g, '')
  if (!KENYAN_PHONE.test(compact)) return null

  if (compact.startsWith('+254')) return compact
  if (compact.startsWith('254')) return `+${compact}`
  return `+254${compact.slice(1)}`
}

function createOrderId() {
  const cryptoObject = globalThis.crypto

  if (cryptoObject?.getRandomValues) {
    const bytes = new Uint8Array(5)
    cryptoObject.getRandomValues(bytes)
    const suffix = Array.from(bytes, (byte) =>
      byte.toString(16).padStart(2, '0'),
    )
      .join('')
      .toUpperCase()
    return `CK-${suffix}`
  }

  return `CK-${Date.now().toString(36).toUpperCase()}`
}

function getStoredOrders() {
  const orders = readStorage(ORDERS_KEY, [])
  return Array.isArray(orders) ? orders : []
}

export function getOrder(orderId) {
  return getStoredOrders().find((order) => order.id === orderId) ?? null
}

export function getOrders() {
  return getStoredOrders().sort(
    (left, right) => new Date(right.createdAt) - new Date(left.createdAt),
  )
}

export function createOrder({
  customer,
  deliveryId,
  paymentId,
  contactPreference,
  discreetPackaging,
  note,
  cartLines,
}) {
  const name = String(customer?.name ?? '')
    .trim()
    .replace(/\s+/g, ' ')
  const phone = normalizePhone(customer?.phone)
  const email = String(customer?.email ?? '')
    .trim()
    .toLowerCase()
  const city = String(customer?.city ?? '').trim()
  const address = String(customer?.address ?? '').trim()
  const cleanNote = String(note ?? '').trim()

  if (name.length < 2 || name.length > 80) {
    throw new Error('Please enter your name (2–80 characters).')
  }

  if (!phone) {
    throw new Error('Enter a valid Kenyan phone number, for example 0712 345 678.')
  }

  if (email && (email.length > 254 || !EMAIL_PATTERN.test(email))) {
    throw new Error('Enter a valid email address or leave it blank.')
  }

  if (!Array.isArray(cartLines) || cartLines.length === 0) {
    throw new Error('Your cart is empty. Add something first.')
  }

  const items = []
  const seen = new Set()

  for (const line of cartLines) {
    if (!line || typeof line.id !== 'string' || seen.has(line.id)) continue

    const item = getItemById(line.id)
    if (!item) continue

    const requestedQuantity = Number.isInteger(line.quantity)
      ? line.quantity
      : 1
    const quantity = Math.min(
      maxQuantityFor(item),
      Math.max(1, requestedQuantity),
    )

    seen.add(item.id)
    items.push({
      id: item.id,
      ref: item.ref,
      title: item.title,
      issue: item.issue,
      subtitle: item.subtitle,
      category: item.category,
      cover: item.cover,
      badge: item.badge,
      stock: item.stock,
      year: item.year,
      variant: item.variant,
      value: item.value,
      quantity,
      digital: Boolean(item.digital),
      delivery: item.delivery ?? null,
    })
  }

  if (items.length === 0) {
    throw new Error('No valid items were found in your cart.')
  }

  const hasPhysical = items.some((item) => !item.digital)
  const hasDigital = items.some((item) => item.digital)

  if (hasDigital && !email) {
    throw new Error('Add an email address so we can send your digital files.')
  }

  if (hasPhysical) {
    if (city.length < 2 || city.length > 60) {
      throw new Error('Enter the town or city for delivery.')
    }

    if (address.length < 5 || address.length > 200) {
      throw new Error('Enter a delivery address or pickup point (5–200 characters).')
    }
  }

  const deliveryMethod = DELIVERY_METHODS.find(
    (method) => method.id === deliveryId,
  )

  if (hasPhysical && !deliveryMethod) {
    throw new Error('Choose a delivery method.')
  }

  const paymentMethod = PAYMENT_METHODS.find(
    (method) => method.id === paymentId,
  )

  if (!paymentMethod) {
    throw new Error('Choose a payment method.')
  }

  if (paymentMethod.id === 'cod' && hasDigital) {
    throw new Error('Digital items need an M-Pesa payment before delivery.')
  }

  if (contactPreference && !CONTACT_METHODS.some((method) => method.id === contactPreference)) {
    throw new Error('Choose how we should contact you.')
  }

  if (cleanNote.length > 300) {
    throw new Error('Keep the delivery note under 300 characters.')
  }

  const subtotal = items.reduce(
    (total, item) => total + item.value * item.quantity,
    0,
  )
  const shipping = hasPhysical ? deliveryMethod.fee : 0
  const total = subtotal + shipping
  const now = new Date().toISOString()
  const order = {
    id: createOrderId(),
    createdAt: now,
    status: paymentMethod.id === 'mpesa' ? 'awaiting-payment' : 'confirmed',
    payment: {
      method: paymentMethod.id,
      label: paymentMethod.label,
      status: paymentMethod.id === 'mpesa' ? 'pending' : 'pay-on-delivery',
    },
    customer: {
      name,
      phone,
      email: email || null,
      city: hasPhysical ? city : null,
      address: hasPhysical ? address : null,
      contactPreference: contactPreference || 'sms',
    },
    delivery: {
      method: hasPhysical ? deliveryMethod.id : 'digital',
      label: hasPhysical ? deliveryMethod.label : 'Digital delivery',
      fee: shipping,
    },
    discreetPackaging: Boolean(discreetPackaging),
    note: cleanNote,
    items,
    subtotal,
    shipping,
    total,
    timeline: [
      {
        label: 'Order received',
        at: now,
      },
    ],
  }

  const storedOrders = getStoredOrders()
  const nextOrders = [...storedOrders, order].slice(-MAX_ORDERS)

  if (!writeStorage(ORDERS_KEY, nextOrders)) {
    throw new Error(
      'This browser could not save the order. Check that storage is enabled and try again.',
    )
  }

  return order
}
