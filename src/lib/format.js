const numberFormatter = new Intl.NumberFormat('en-KE', {
  maximumFractionDigits: 0,
})

const dateFormatter = new Intl.DateTimeFormat('en-KE', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
})

const dateTimeFormatter = new Intl.DateTimeFormat('en-KE', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
})

export function formatKes(value) {
  return `KSh ${numberFormatter.format(value)}`
}

export function formatPhone(phone) {
  if (!phone) return ''

  const match = String(phone).match(/^\+254(\d{3})(\d{3})(\d{3})$/)
  if (!match) return phone

  return `+254 ${match[1]} ${match[2]} ${match[3]}`
}

export function maskPhone(phone) {
  if (!phone) return ''

  const match = String(phone).match(/^\+254(\d{3})(\d{3})(\d{3})$/)
  if (!match) return '•••••••••'

  return `+254 ${match[1].slice(0, 1)}•• ••• ${match[3]}`
}

export function maskEmail(email) {
  if (!email) return ''

  const [name, domain] = String(email).split('@')
  if (!name || !domain) return '•••@•••'

  return `${name.slice(0, 2)}•••@${domain}`
}

export function formatDateTime(value) {
  if (!value) return ''

  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return ''

  return dateTimeFormatter.format(date)
}

export function formatDate(value) {
  if (!value) return ''

  const date =
    typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value)
      ? new Date(`${value}T12:00:00`)
      : new Date(value)

  if (Number.isNaN(date.getTime())) return ''

  return dateFormatter.format(date)
}

export function getInitials(name) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join('')
}
