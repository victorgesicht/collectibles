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

export function CartIcon({ className = 'h-4 w-4' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...baseProps}>
      <path d="M3.5 4.5h2l2.2 10.2a2 2 0 0 0 2 1.6h7.9a2 2 0 0 0 2-1.6l1.4-6.7H6.5" />
      <circle cx="10" cy="19.5" r="1.3" />
      <circle cx="17.5" cy="19.5" r="1.3" />
    </svg>
  )
}

export function MinusIcon({ className = 'h-4 w-4' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...baseProps}>
      <path d="M5 12h14" />
    </svg>
  )
}

export function PlusIcon({ className = 'h-4 w-4' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...baseProps}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  )
}

export function TrashIcon({ className = 'h-4 w-4' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...baseProps}>
      <path d="M4.5 7.5h15M9.5 7.5V5.5h5v2M7 7.5l1 12h8l1-12" />
      <path d="M10.5 11v5.5M13.5 11v5.5" />
    </svg>
  )
}

export function TruckIcon({ className = 'h-4 w-4' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...baseProps}>
      <path d="M3.5 6.5h10v10h-10zM13.5 10h4l3 3v3.5h-7" />
      <circle cx="7.5" cy="18" r="1.6" />
      <circle cx="17" cy="18" r="1.6" />
    </svg>
  )
}

export function LockIcon({ className = 'h-4 w-4' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...baseProps}>
      <rect x="5" y="10.5" width="14" height="9.5" rx="2" />
      <path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5" />
      <path d="M12 14.5v2" />
    </svg>
  )
}

export function MapPinIcon({ className = 'h-4 w-4' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...baseProps}>
      <path d="M12 21s6.5-5.6 6.5-10.5a6.5 6.5 0 0 0-13 0C5.5 15.4 12 21 12 21Z" />
      <circle cx="12" cy="10.5" r="2.2" />
    </svg>
  )
}

export function PhoneIcon({ className = 'h-4 w-4' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...baseProps}>
      <path d="M7 3.5h3l1.5 4-2 1.5a11 11 0 0 0 5.5 5.5l1.5-2 4 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 5 5.7 2 2 0 0 1 7 3.5Z" />
    </svg>
  )
}

export function MailIcon({ className = 'h-4 w-4' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...baseProps}>
      <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
      <path d="m4.5 7 7.5 6 7.5-6" />
    </svg>
  )
}

export function SparklesIcon({ className = 'h-4 w-4' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...baseProps}>
      <path d="M12 3.5 13.7 9l5.5 1.7-5.5 1.7L12 18l-1.7-5.6L4.8 10.7 10.3 9 12 3.5Z" />
      <path d="M19 16.5 19.8 19l2.5.8-2.5.8L19 23l-.8-2.4-2.5-.8 2.5-.8L19 16.5Z" />
    </svg>
  )
}

export function PackageIcon({ className = 'h-4 w-4' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...baseProps}>
      <path d="m12 3.5 8 4.3v8.4l-8 4.3-8-4.3V7.8l8-4.3Z" />
      <path d="m4.5 8 7.5 4 7.5-4M12 12v8.5" />
    </svg>
  )
}
