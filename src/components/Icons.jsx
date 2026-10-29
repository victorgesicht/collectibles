const baseProps = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': 'true',
  focusable: 'false',
}

export function SearchIcon({ className = 'h-4 w-4' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...baseProps}>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4.5 4.5" />
    </svg>
  )
}

export function BookmarkIcon({ className = 'h-4 w-4', filled = false }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      {...baseProps}
      fill={filled ? 'currentColor' : 'none'}
    >
      <path d="M6.5 4.5h11v16l-5.5-4-5.5 4v-16Z" />
    </svg>
  )
}

export function ArrowRightIcon({ className = 'h-4 w-4' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...baseProps}>
      <path d="M4.5 12h15" />
      <path d="m13.5 6 6 6-6 6" />
    </svg>
  )
}

export function ArrowLeftIcon({ className = 'h-4 w-4' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...baseProps}>
      <path d="M19.5 12h-15" />
      <path d="m10.5 6-6 6 6 6" />
    </svg>
  )
}

export function ArrowUpRightIcon({ className = 'h-4 w-4' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...baseProps}>
      <path d="M7 17 17 7" />
      <path d="M8.5 7H17v8.5" />
    </svg>
  )
}

export function MenuIcon({ className = 'h-5 w-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...baseProps}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  )
}

export function CloseIcon({ className = 'h-5 w-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...baseProps}>
      <path d="m6 6 12 12M18 6 6 18" />
    </svg>
  )
}

export function CheckIcon({ className = 'h-4 w-4' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...baseProps}>
      <path d="m5 12.5 4.5 4.5L19 7.5" />
    </svg>
  )
}

export function LogOutIcon({ className = 'h-4 w-4' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...baseProps}>
      <path d="M10 5H5.5v14H10" />
      <path d="M13.5 8.5 17 12l-3.5 3.5" />
      <path d="M8.5 12H17" />
    </svg>
  )
}

export function EyeIcon({ className = 'h-4 w-4' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...baseProps}>
      <path d="M3.5 12s3-5.5 8.5-5.5 8.5 5.5 8.5 5.5-3 5.5-8.5 5.5S3.5 12 3.5 12Z" />
      <circle cx="12" cy="12" r="2.5" />
    </svg>
  )
}

export function EyeOffIcon({ className = 'h-4 w-4' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...baseProps}>
      <path d="M4 4.5 20 20" />
      <path d="M9.75 6.85A9.8 9.8 0 0 1 12 6.5c5.5 0 8.5 5.5 8.5 5.5a14.6 14.6 0 0 1-2.2 2.8" />
      <path d="M6.5 9A14.7 14.7 0 0 0 3.5 12s3 5.5 8.5 5.5a9.6 9.6 0 0 0 3.1-.5" />
    </svg>
  )
}

export function ShieldIcon({ className = 'h-4 w-4' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...baseProps}>
      <path d="M12 3.5 19 6v5.5c0 4.4-3 7.3-7 9-4-1.7-7-4.6-7-9V6l7-2.5Z" />
      <path d="m8.75 12 2.25 2.25 4.25-4.5" />
    </svg>
  )
}
