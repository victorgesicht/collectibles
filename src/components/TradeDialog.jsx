import { useEffect, useRef, useState } from 'react'
import { formatKes } from '../lib/format'
import { createTrade } from '../lib/trades'
import { useAuth } from '../state/auth-context'
import { CheckIcon, CloseIcon } from './Icons'

export default function TradeDialog({ item, onClose }) {
  const dialogRef = useRef(null)
  const { user } = useAuth()
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
          : 'The trade could not be saved.',
      )
    }
  }

  return (
    <dialog
      ref={dialogRef}
      onClick={handleBackdropClick}
      className="w-[calc(100%-2rem)] max-w-xl border border-parchment/20 bg-ink-900 p-0 text-parchment shadow-shelf backdrop:bg-ink-950/85 backdrop:backdrop-blur-sm"
      aria-labelledby="trade-dialog-title"
    >
      <div className="flex items-center justify-between border-b border-parchment/10 px-5 py-4">
        <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-brass">
          Trade desk / {item.ref}
        </p>
        <button
          type="button"
          onClick={() => dialogRef.current?.close()}
          className="grid h-8 w-8 place-items-center border border-parchment/15 text-muted transition-colors hover:border-brass/50 hover:text-parchment"
          aria-label="Close the trade desk"
        >
          <CloseIcon className="h-4 w-4" />
        </button>
      </div>

      <div className="max-h-[75vh] overflow-y-auto p-5 sm:p-6">
        {receipt ? (
          <div>
            <span className="grid h-12 w-12 place-items-center border border-sage/40 bg-sage/10 text-sage">
              <CheckIcon className="h-5 w-5" />
            </span>
            <h2
              id="trade-dialog-title"
              className="mt-5 font-display text-3xl leading-tight text-parchment"
            >
              Request logged.
            </h2>
            <p className="mt-3 font-sans text-sm leading-7 text-muted">
              Your offer for {item.title} is now at the desk. Reference{' '}
              <span className="font-mono text-[11px] text-brass">
                {receipt.id}
              </span>
              .
            </p>

            <div className="mt-5 border border-parchment/10 bg-ink-950/60 p-4">
              <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-muted">
                Offer on file
              </p>
              <p className="mt-2 whitespace-pre-line font-sans text-sm leading-6 text-parchment/80">
                {receipt.offer}
              </p>
            </div>

            <p className="mt-4 font-mono text-[8px] uppercase leading-5 tracking-[0.12em] text-muted/80">
              Preview mode · requests are stored in this browser
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => dialogRef.current?.close()}
                className="btn-primary flex-1"
              >
                Back to the record
              </button>
              <a
                href="#/account"
                onClick={() => dialogRef.current?.close()}
                className="btn-secondary flex-1"
              >
                Open my desk
              </a>
            </div>
          </div>
        ) : !user ? (
          <div>
            <p className="eyebrow">Library cards</p>
            <h2
              id="trade-dialog-title"
              className="mt-3 font-display text-3xl leading-tight text-parchment"
            >
              Bring something to the table.
            </h2>
            <p className="mt-3 font-sans text-sm leading-7 text-muted">
              Trades are handled through a collector card. Open one to save a
              binder, log offers and keep the desk in one place.
            </p>

            <div className="mt-5 flex items-center justify-between gap-4 border-y border-parchment/10 py-4">
              <div>
                <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-muted">
                  You are viewing
                </p>
                <p className="mt-1 font-display text-lg text-parchment">
                  {item.title}
                  {item.issue ? ` · ${item.issue}` : ''}
                </p>
              </div>
              <p className="shrink-0 font-display text-base text-brass">
                {formatKes(item.value)}
              </p>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a
                href="#/account"
                onClick={() => dialogRef.current?.close()}
                className="btn-primary flex-1"
              >
                Open a collector card
              </a>
              <button
                type="button"
                onClick={() => dialogRef.current?.close()}
                className="btn-secondary flex-1"
              >
                Not now
              </button>
            </div>
          </div>
        ) : (
          <div>
            <p className="eyebrow">Make an offer</p>
            <h2
              id="trade-dialog-title"
              className="mt-3 font-display text-3xl leading-tight text-parchment"
            >
              What are you bringing?
            </h2>
            <p className="mt-3 font-sans text-sm leading-7 text-muted">
              Describe the piece, its condition and anything included. Straight
              offers work best at this desk.
            </p>

            <div className="mt-5 flex items-center justify-between gap-4 border-y border-parchment/10 py-4">
              <p className="font-display text-lg text-parchment">
                {item.title}
                {item.issue ? ` · ${item.issue}` : ''}
              </p>
              <p className="shrink-0 font-mono text-[9px] uppercase tracking-[0.14em] text-muted">
                {item.ref}
              </p>
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
                placeholder="A boxed Commodore 64C, tested with the original PSU, plus a spare keyboard…"
                className="field resize-none"
                aria-describedby="trade-offer-hint"
              />
              <div
                id="trade-offer-hint"
                className="mt-2 flex justify-between font-mono text-[8px] uppercase tracking-[0.12em] text-muted/80"
              >
                <span>Minimum 12 characters</span>
                <span>{offer.length} / 500</span>
              </div>

              <label
                htmlFor="trade-note"
                className="field-label mt-5 block"
              >
                Note to the desk <span className="normal-case">(optional)</span>
              </label>
              <input
                id="trade-note"
                type="text"
                value={note}
                onChange={(event) => setNote(event.target.value)}
                maxLength="240"
                placeholder="Timing, shipping or a question"
                className="field"
              />

              {error && (
                <p
                  className="mt-4 border border-wine/50 bg-wine/10 px-3 py-2.5 font-sans text-xs leading-5 text-[#e7b1a9]"
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
                Send to the desk
              </button>
              <p className="mt-3 text-center font-mono text-[8px] uppercase tracking-[0.12em] text-muted/80">
                Preview mode · offers are stored in this browser
              </p>
            </form>
          </div>
        )}
      </div>
    </dialog>
  )
}
