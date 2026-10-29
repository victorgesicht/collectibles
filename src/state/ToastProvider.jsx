import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { ToastContext } from './toast-context'

export default function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])
  const timers = useRef(new Map())
  const nextId = useRef(0)

  const dismiss = useCallback((id) => {
    const timer = timers.current.get(id)

    if (timer) {
      window.clearTimeout(timer)
      timers.current.delete(id)
    }

    setToasts((current) => current.filter((toast) => toast.id !== id))
  }, [])

  const pushToast = useCallback((message, options = {}) => {
    const id = (nextId.current += 1)
    const toast = {
      id,
      message,
      tone: options.tone ?? 'default',
    }

    setToasts((current) => [...current.slice(-2), toast])

    const timer = window.setTimeout(
      () => {
        timers.current.delete(id)
        setToasts((current) => current.filter((item) => item.id !== id))
      },
      options.duration ?? 3600,
    )

    timers.current.set(id, timer)
    return id
  }, [])

  useEffect(() => {
    const activeTimers = timers.current

    return () => {
      activeTimers.forEach((timer) => window.clearTimeout(timer))
      activeTimers.clear()
    }
  }, [])

  const value = useMemo(
    () => ({ pushToast, dismiss }),
    [pushToast, dismiss],
  )

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        className="pointer-events-none fixed inset-x-0 bottom-6 z-[70] flex flex-col items-center gap-2 px-4"
        aria-live="polite"
        aria-atomic="false"
      >
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="pointer-events-auto flex max-w-md items-center gap-3 border border-brass/30 bg-ink-800 px-4 py-3 text-sm text-parchment shadow-shelf animate-fade-up"
            role="status"
          >
            <span
              className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                toast.tone === 'success' ? 'bg-sage' : 'bg-brass'
              }`}
              aria-hidden="true"
            />
            <p className="leading-snug">{toast.message}</p>
            <button
              type="button"
              onClick={() => dismiss(toast.id)}
              className="ml-2 shrink-0 font-mono text-xs uppercase tracking-[0.16em] text-muted transition-colors hover:text-parchment"
            >
              Close
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}
