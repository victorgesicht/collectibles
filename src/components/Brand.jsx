export default function Brand({ compact = false, onClick }) {
  return (
    <a
      href="#/"
      onClick={onClick}
      className="group inline-flex items-center gap-3"
    >
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-brass text-white shadow-plate transition-transform duration-300 group-hover:-rotate-3">
        <svg
          viewBox="0 0 32 32"
          className="h-6 w-6"
          aria-hidden="true"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M7 11h18l-1.7 15H8.7L7 11Z" />
          <path d="M12 11V9a4 4 0 0 1 8 0v2" />
          <path d="M12 17h8" strokeOpacity="0.75" />
        </svg>
      </span>

      <span className="flex min-w-0 flex-col leading-none">
        <span className="truncate font-display text-xl font-bold tracking-[-0.02em] text-parchment">
          Collectibles <span className="text-brass">Kenya</span>
        </span>
        {!compact && (
          <span className="mt-1.5 text-xs font-bold text-muted">
            Good gear, quietly delivered
          </span>
        )}
      </span>
    </a>
  )
}
