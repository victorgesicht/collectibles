const numberFormatter = new Intl.NumberFormat('en-KE', {
  maximumFractionDigits: 0,
})

const dateFormatter = new Intl.DateTimeFormat('en-KE', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
})

export function formatKes(value) {
  return `KSh ${numberFormatter.format(value)}`
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
