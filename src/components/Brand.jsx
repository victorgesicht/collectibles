export default function Brand({ compact = false, onClick }) {
  return (
    <a
      href="#/"
      onClick={onClick}
      className="group inline-flex items-center gap-3"
    >
      <span className="relative flex h-10 w-10 shrink-0 items-center justify-center border border-brass/35 bg-ink-900 transition-colors duration-300 group-hover:border-brass/70">
        <svg
          viewBox="0 0 32 32"
          className="h-6 w-6 text-brass"
          aria-hidden="true"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.1"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M16 3.75 26 9.5v13L16 28.25 6 22.5v-13L16 3.75Z" />
          <path d="M10.75 12.25h10.5M10.75 16h10.5M13.25 19.75h5.5" />
        </svg>
        <span
          className="absolute right-1 top-1 h-1 w-1 bg-brass"
          aria-hidden="true"
        />
      </span>

      <span className="flex min-w-0 flex-col leading-none">
        <span className="truncate font-display text-[17px] font-semibold tracking-[-0.025em] text-parchment">
          Collectibles <span className="text-brass">Kenya</span>
        </span>
        {!compact && (
          <span className="mt-1.5 font-mono text-[8px] uppercase tracking-[0.3em] text-muted">
            A trading library
          </span>
        )}
      </span>
    </a>
  )
}
