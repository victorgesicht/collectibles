import { useEffect, useRef, useState } from 'react'
import { formatKes } from '../lib/format'
import { createTrade } from '../lib/trades'
import { useAuth } from '../state/auth-context'
import { useCart } from '../state/cart-context'
import { CheckIcon, CloseIcon } from './Icons'

export default function TradeDialog({ item, onClose }) {
  const dialogRef = useRef(null)
  const { user } = useAuth()
  const cart = useCart()
  const [offer, setOffer] = useState('')
  const [note, setNote] = useState('')
  const [error, setError] = useState('')
  const [receipt, setReceipt] = useState(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return undefined

    if (!dialog.open) dialog.showModal()

    const handleClose = () => onClose()
    dialog.addEventListener('close', handleClose)

    return () => {
      dialog.removeEventListener('close', handleClose)
      if (dialog.open) dialog.close()
    }
  }, [onClose])

  const handleBackdropClick = (event) => {
    if (event.target === dialogRef.current) {
      dialogRef.current.close()
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setError('')

    try {
      const trade = createTrade({
        userId: user?.id,
        itemId: item.id,
        offer,
        note,
      })
      setReceipt(trade)
    } catch (tradeError) {
      setError(
        tradeError instanceof Error
          ? tradeError.message
          : 'The offer could not be saved.',
      )
    }
  }

  return (
    <dialog
      ref={dialogRef}
      onClick={handleBackdropClick}
      className="w-[calc(100%-2rem)] max-w-xl overflow-hidden rounded-4xl border border-ink/10 bg-ink-900 p-0 text-parchment shadow-shelf backdrop:bg-parchment/60 backdrop:backdrop-blur-sm"
      aria-labelledby="trade-dialog-title"
    >
      <div className="flex items-center justify-between border-b border-ink/10 px-5 py-4">
        <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-brass">
          Make an offer · {item.ref}
        </p>
        <button
          type="button"
          onClick={() => dialogRef.current?.close()}
          className="grid h-9 w-9 place-items-center rounded-full border border-ink/10 text-muted transition-colors hover:border-brass/40 hover:text-brass"
          aria-label="Close the offer dialog"
        >
          <CloseIcon className="h-4 w-4" />
        </button>
      </div>

      <div className="max-h-[75vh] overflow-y-auto p-5 sm:p-6">
        {receipt ? (
          <div>
            <span className="grid h-12 w-12 place-items-center rounded-full bg-sage/10 text-sage">
              <CheckIcon className="h-5 w-5" />
            </span>
            <h2
              id="trade-dialog-title"
              className="display mt-5 text-3xl leading-tight text-parchment"
            >
              Offer saved.
            </h2>
            <p className="mt-3 text-base leading-7 text-muted">
              Your offer for {item.title} is saved. Reference{' '}
              <span className="font-mono text-sm text-brass">
                {receipt.id}
              </span>
              .
            </p>

            <div className="mt-5 rounded-2xl border border-ink/10 bg-ink-800 p-4">
              <p className="text-xs font-bold uppercase tracking-[0.1em] text-muted">
                Offer on file
              </p>
              <p className="mt-2 whitespace-pre-line text-sm leading-6 text-parchment/80">
                {receipt.offer}
              </p>
            </div>

            <p className="mt-4 text-xs leading-5 text-muted">
              Preview mode · offers stay in this browser
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => dialogRef.current?.close()}
                className="btn-primary flex-1"
              >
                Back to the product
              </button>
              <a
                href="#/account"
                onClick={() => dialogRef.current?.close()}
                className="btn-secondary flex-1"
              >
                Open my account
              </a>
            </div>
          </div>
        ) : !user ? (
          <div>
            <p className="eyebrow">Offers</p>
            <h2
              id="trade-dialog-title"
              className="display mt-3 text-3xl leading-tight text-parchment"
            >
              Prefer to skip the chat?
            </h2>
            <p className="mt-3 text-base leading-7 text-muted">
              Offers use a free account so we can keep the thread in one place.
              If you would rather not engage at all, quiet checkout is the
              faster route.
            </p>

            <div className="mt-5 flex items-center justify-between gap-4 rounded-2xl border border-ink/10 bg-ink-800 p-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.1em] text-muted">
                  You are viewing
                </p>
                <p className="mt-1 font-display text-lg font-semibold text-parchment">
                  {item.title}
                  {item.issue ? ` · ${item.issue}` : ''}
                </p>
              </div>
              <p className="shrink-0 font-display text-lg font-semibold text-brass">
                {formatKes(item.value)}
              </p>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a
                href="#/checkout"
                onClick={() => {
                  cart.add(item.id)
                  dialogRef.current?.close()
                }}
                className="btn-primary flex-1"
              >
                Quiet checkout
              </a>
              <a
                href="#/account"
                onClick={() => dialogRef.current?.close()}
                className="btn-secondary flex-1"
              >
                Create an account
              </a>
            </div>
          </div>
        ) : (
          <div>
            <p className="eyebrow">Make an offer</p>
            <h2
              id="trade-dialog-title"
              className="display mt-3 text-3xl leading-tight text-parchment"
            >
              What are you bringing?
            </h2>
            <p className="mt-3 text-base leading-7 text-muted">
              Describe the piece, its condition and anything included. Friendly,
              clear offers get the best replies.
            </p>

            <div className="mt-5 flex items-center justify-between gap-4 rounded-2xl border border-ink/10 bg-ink-800 p-4">
              <p className="font-display text-lg font-semibold text-parchment">
                {item.title}
                {item.issue ? ` · ${item.issue}` : ''}
              </p>
              <p className="shrink-0 font-mono text-xs text-muted">{item.ref}</p>
            </div>

            <form onSubmit={handleSubmit} className="mt-5">
              <label htmlFor="trade-offer" className="field-label">
                Your offer
              </label>
              <textarea
                id="trade-offer"
                value={offer}
                onChange={(event) => setOffer(event.target.value)}
                rows="4"
                maxLength="500"
                required
                placeholder="A tested GTX 1660 Super plus cash, or a fair price…"
                className="field resize-none"
                aria-describedby="trade-offer-hint"
              />
              <div
                id="trade-offer-hint"
                className="mt-2 flex justify-between text-xs font-bold text-muted"
              >
                <span>Minimum 12 characters</span>
                <span>{offer.length} / 500</span>
              </div>

              <label
                htmlFor="trade-note"
                className="field-label mt-5 block"
              >
                Note (optional)
              </label>
              <input
                id="trade-note"
                type="text"
                value={note}
                onChange={(event) => setNote(event.target.value)}
                maxLength="240"
                placeholder="Timing, condition or a question"
                className="field"
              />

              {error && (
                <p
                  className="mt-4 rounded-2xl border border-wine/30 bg-wine/[0.06] px-3 py-2.5 text-sm font-bold leading-6 text-wine"
                  role="alert"
                >
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={offer.trim().length < 12}
                className="btn-primary mt-5 w-full disabled:cursor-not-allowed disabled:opacity-40"
              >
                Save the offer
              </button>
              <p className="mt-3 text-center text-xs leading-5 text-muted">
                Preview mode · offers stay in this browser
              </p>
            </form>
          </div>
        )}
      </div>
    </dialog>
  )
}
