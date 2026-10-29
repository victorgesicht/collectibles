import { useMemo, useState } from 'react'
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  BookmarkIcon,
  CheckIcon,
  EyeIcon,
  EyeOffIcon,
  LogOutIcon,
  ShieldIcon,
} from '../components/Icons'
import { getItemById } from '../data/catalog'
import { PASSWORD_REQUIREMENT, isPasswordValid } from '../lib/auth'
import { formatDate, formatKes, getInitials } from '../lib/format'
import { getTradesForUser } from '../lib/trades'
import { useAuth } from '../state/auth-context'
import { useBinder } from '../state/binder-context'
import { useToast } from '../state/toast-context'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const BENEFITS = [
  'Keep a binder of pieces worth chasing.',
  'Log straight offers at the trade desk.',
  'Pick up where you left off on any page.',
]

function CollectorCardPreview() {
  return (
    <div
      className="relative mt-10 w-full max-w-md overflow-hidden border border-brass/25 bg-ink-900 p-5 shadow-shelf"
      aria-hidden="true"
    >
      <div className="absolute -right-14 -top-14 h-44 w-44 rounded-full bg-brass/[0.07] blur-2xl" />

      <div className="relative flex items-center justify-between">
        <span className="flex items-center gap-2 font-mono text-[8px] uppercase tracking-[0.18em] text-parchment/70">
          <span className="h-1.5 w-1.5 rotate-45 border border-brass" />
          Collectibles Kenya
        </span>
        <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-muted">
          No. 0001
        </span>
      </div>

      <div className="relative mt-14 flex items-end justify-between gap-6">
        <div>
          <p className="font-display text-3xl leading-none text-parchment">
            Collector
          </p>
          <p className="mt-2 font-display text-3xl italic leading-none text-brass-light">
            in good standing
          </p>
        </div>
        <span className="grid h-14 w-14 shrink-0 place-items-center border border-brass/40 font-display text-lg text-brass">
          CK
        </span>
      </div>

      <div className="relative mt-10 flex items-center justify-between border-t border-dashed border-parchment/20 pt-3 font-mono text-[8px] uppercase tracking-[0.16em] text-muted">
        <span>Nairobi · Kenya</span>
        <span className="text-sage">Open for trade</span>
      </div>
    </div>
  )
}

function AuthPanel() {
  const [mode, setMode] = useState('create')
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [errors, setErrors] = useState({})
  const [formError, setFormError] = useState('')
  const [pending, setPending] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const { signIn, signUp } = useAuth()
  const { pushToast } = useToast()

  const isCreate = mode === 'create'

  const switchMode = (nextMode) => {
    if (nextMode === mode) return

    setMode(nextMode)
    setErrors({})
    setFormError('')
    setShowPassword(false)
    setForm((current) => ({
      ...current,
      password: '',
      confirmPassword: '',
    }))
  }

  const handleFieldChange = (event) => {
    const { name, value } = event.target

    setForm((current) => ({ ...current, [name]: value }))
    setErrors((current) => ({ ...current, [name]: '' }))
    setFormError('')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (pending) return

    const nextErrors = {}

    if (isCreate && form.name.trim().length < 2) {
      nextErrors.name = 'Please enter your full name.'
    }

    if (!EMAIL_PATTERN.test(form.email.trim())) {
      nextErrors.email = 'Enter a valid email address.'
    }

    if (isCreate && !isPasswordValid(form.password)) {
      nextErrors.password = PASSWORD_REQUIREMENT
    }

    if (isCreate && form.confirmPassword !== form.password) {
      nextErrors.confirmPassword = 'The passwords do not match.'
    }

    if (!isCreate && form.password.length === 0) {
      nextErrors.password = 'Enter your password.'
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      return
    }

    setFormError('')
    setPending(true)

    try {
      if (isCreate) {
        await signUp({
          name: form.name,
          email: form.email,
          password: form.password,
        })
        pushToast('Your collector card is ready. Welcome to the library.', {
          tone: 'success',
        })
      } else {
        await signIn({
          email: form.email,
          password: form.password,
        })
        pushToast('Welcome back. The desk is open.', { tone: 'success' })
      }
    } catch (error) {
      setFormError(
        error instanceof Error
          ? error.message
          : 'Something went wrong. Please try again.',
      )
      setPending(false)
    }
  }

  const fieldError = (field) =>
    errors[field] ? (
      <p
        id={`${field}-error`}
        className="mt-2 font-sans text-xs leading-5 text-[#e7b1a9]"
      >
        {errors[field]}
      </p>
    ) : null

  return (
    <div className="border border-parchment/15 bg-ink-900/70 shadow-shelf">
      <div
        className="grid grid-cols-2 border-b border-parchment/10"
        role="group"
        aria-label="Account access"
      >
        <button
          type="button"
          onClick={() => switchMode('create')}
          aria-pressed={isCreate}
          className={`border-r border-parchment/10 px-4 py-4 font-mono text-[9px] uppercase tracking-[0.18em] transition-colors ${
            isCreate
              ? 'bg-ink-800 text-brass'
              : 'text-muted hover:bg-ink-800/50 hover:text-parchment'
          }`}
        >
          Create a card
        </button>
        <button
          type="button"
          onClick={() => switchMode('signin')}
          aria-pressed={!isCreate}
          className={`px-4 py-4 font-mono text-[9px] uppercase tracking-[0.18em] transition-colors ${
            !isCreate
              ? 'bg-ink-800 text-brass'
              : 'text-muted hover:bg-ink-800/50 hover:text-parchment'
          }`}
        >
          Sign in
        </button>
      </div>

      <div className="p-5 sm:p-7">
        <p className="eyebrow">
          {isCreate ? 'New membership' : 'Returning collector'}
        </p>
        <h2
          id="account-form-title"
          className="mt-3 font-display text-[30px] leading-tight text-parchment"
        >
          {isCreate ? 'Open a collector card.' : 'Back to the desk.'}
        </h2>
        <p className="mt-2 font-sans text-sm leading-6 text-muted">
          {isCreate
            ? 'A local library card for your binder and trade requests. No fees, no newsletters.'
            : 'Sign in to open your binder, trade desk and saved records.'}
        </p>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="mt-6"
          aria-labelledby="account-form-title"
        >
          {isCreate && (
            <div className="mb-4">
              <label htmlFor="account-name" className="field-label">
                Full name
              </label>
              <input
                id="account-name"
                name="name"
                type="text"
                autoComplete="name"
                value={form.name}
                onChange={handleFieldChange}
                className={`field ${errors.name ? '!border-wine/70' : ''}`}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? 'name-error' : undefined}
                placeholder="Amina Wanjiru"
              />
              {fieldError('name')}
            </div>
          )}

          <div className="mb-4">
            <label htmlFor="account-email" className="field-label">
              Email
            </label>
            <input
              id="account-email"
              name="email"
              type="email"
              autoComplete="email"
              value={form.email}
              onChange={handleFieldChange}
              className={`field ${errors.email ? '!border-wine/70' : ''}`}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? 'email-error' : undefined}
              placeholder="you@example.com"
            />
            {fieldError('email')}
          </div>

          <div className="mb-4">
            <div className="mb-2 flex items-center justify-between gap-4">
              <label
                htmlFor="account-password"
                className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted"
              >
                Password
              </label>
              <button
                type="button"
                onClick={() => setShowPassword((current) => !current)}
                className="inline-flex items-center gap-1.5 font-mono text-[8px] uppercase tracking-[0.14em] text-muted transition-colors hover:text-brass"
                aria-pressed={showPassword}
                aria-label={
                  showPassword
                    ? 'Hide password fields'
                    : 'Show password fields'
                }
              >
                {showPassword ? (
                  <EyeOffIcon className="h-3.5 w-3.5" />
                ) : (
                  <EyeIcon className="h-3.5 w-3.5" />
                )}
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            <input
              id="account-password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete={isCreate ? 'new-password' : 'current-password'}
              value={form.password}
              onChange={handleFieldChange}
              className={`field ${errors.password ? '!border-wine/70' : ''}`}
              aria-invalid={Boolean(errors.password)}
              aria-describedby={
                errors.password
                  ? 'password-error'
                  : isCreate
                    ? 'password-requirement'
                    : undefined
              }
              placeholder="Minimum 8 characters"
            />
            {fieldError('password')}
            {isCreate && !errors.password && (
              <p
                id="password-requirement"
                className="mt-2 font-mono text-[8px] uppercase leading-5 tracking-[0.08em] text-muted/80"
              >
                {PASSWORD_REQUIREMENT}
              </p>
            )}
          </div>

          {isCreate && (
            <div className="mb-4">
              <label htmlFor="account-confirm" className="field-label">
                Confirm password
              </label>
              <input
                id="account-confirm"
                name="confirmPassword"
                type={showPassword ? 'text' : 'password'}
                autoComplete="new-password"
                value={form.confirmPassword}
                onChange={handleFieldChange}
                className={`field ${
                  errors.confirmPassword ? '!border-wine/70' : ''
                }`}
                aria-invalid={Boolean(errors.confirmPassword)}
                aria-describedby={
                  errors.confirmPassword
                    ? 'confirmPassword-error'
                    : undefined
                }
                placeholder="Repeat your password"
              />
              {fieldError('confirmPassword')}
            </div>
          )}

          {formError && (
            <p
              className="mb-4 border border-wine/50 bg-wine/10 px-3 py-2.5 font-sans text-xs leading-5 text-[#e7b1a9]"
              role="alert"
            >
              {formError}
            </p>
          )}

          <button
            type="submit"
            disabled={pending}
            className="btn-primary w-full disabled:cursor-wait disabled:opacity-60"
          >
            {pending
              ? 'Opening the desk…'
              : isCreate
                ? 'Create my card'
                : 'Sign in'}
            {!pending && <ArrowRightIcon className="h-3.5 w-3.5" />}
          </button>

          <p className="mt-4 text-center font-mono text-[8px] uppercase leading-5 tracking-[0.1em] text-muted/80">
            Preview mode · the card is stored in this browser only
          </p>
        </form>
      </div>
    </div>
  )
}

function SignedInView({ user }) {
  const binder = useBinder()
  const { signOut } = useAuth()
  const { pushToast } = useToast()

  const savedItems = binder.ids
    .map((id) => getItemById(id))
    .filter((item) => item !== undefined)
  const totalValue = savedItems.reduce((total, item) => total + item.value, 0)
  const trades = useMemo(() => getTradesForUser(user.id), [user.id])
  const firstName = user.name.split(' ')[0]
  const cardNumber = user.id.replace(/-/g, '').slice(0, 8).toUpperCase()

  const handleSignOut = () => {
    signOut()
    pushToast('Signed out. Your binder stays in this browser.')
  }

  return (
    <div className="container-page py-12 lg:py-20">
      <a href="#/" className="btn-ghost">
        <ArrowLeftIcon className="h-3.5 w-3.5" />
        Back to the index
      </a>

      <div className="mt-8 flex flex-col gap-6 border-b border-parchment/10 pb-8 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="eyebrow">Collector card / Active</p>
          <h1 className="display mt-4 text-4xl leading-[1.02] text-parchment sm:text-5xl">
            Welcome back, {firstName}.
          </h1>
          <p className="mt-4 max-w-lg font-sans text-sm leading-7 text-muted">
            Your desk is open. Keep the binder close, log an offer or step back
            into the index.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <a href="#/binder" className="btn-secondary">
            Open binder
          </a>
          <button
            type="button"
            onClick={handleSignOut}
            className="btn-ghost !border !border-parchment/15 !px-4 !py-3 hover:!border-brass/50"
          >
            <LogOutIcon className="h-3.5 w-3.5" />
            Sign out
          </button>
        </div>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12">
        <aside>
          <div className="relative overflow-hidden border border-brass/30 bg-ink-900 p-6 shadow-shelf">
            <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-brass/[0.06] blur-3xl" />

            <div className="relative flex items-center justify-between gap-4">
              <p className="eyebrow">Collector card</p>
              <span className="flex items-center gap-1.5 font-mono text-[8px] uppercase tracking-[0.14em] text-sage">
                <span className="h-1 w-1 rounded-full bg-sage" />
                Active
              </span>
            </div>

            <div className="relative mt-8 flex items-center gap-4">
              <span className="grid h-16 w-16 shrink-0 place-items-center border border-brass/40 bg-brass/[0.04] font-display text-2xl text-brass">
                {getInitials(user.name)}
              </span>
              <div className="min-w-0">
                <p className="truncate font-display text-2xl leading-tight text-parchment">
                  {user.name}
                </p>
                <p className="mt-1 truncate font-mono text-[9px] tracking-[0.06em] text-muted">
                  {user.email}
                </p>
              </div>
            </div>

            <dl className="relative mt-8 grid grid-cols-2 gap-6 border-t border-dashed border-parchment/20 pt-5">
              <div>
                <dt className="font-mono text-[8px] uppercase tracking-[0.16em] text-muted">
                  Member since
                </dt>
                <dd className="mt-1.5 font-sans text-[13px] text-parchment/80">
                  {formatDate(user.createdAt)}
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[8px] uppercase tracking-[0.16em] text-muted">
                  Card no.
                </dt>
                <dd className="mt-1.5 font-mono text-[10px] tracking-[0.08em] text-parchment/80">
                  CK-{cardNumber}
                </dd>
              </div>
            </dl>

            <div className="relative mt-8 flex items-center justify-between border-t border-dashed border-parchment/20 pt-3 font-mono text-[8px] uppercase tracking-[0.16em] text-muted">
              <span>Nairobi · Kenya</span>
              <span className="text-sage">Open for trade</span>
            </div>
          </div>

          <div className="mt-4 border border-parchment/10 bg-ink-900/60 p-5">
            <div className="flex items-center justify-between gap-4">
              <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-brass">
                Binder
              </p>
              <p className="font-mono text-[9px] text-muted">
                {String(savedItems.length).padStart(2, '0')} pieces
              </p>
            </div>

            <p className="mt-4 font-display text-3xl text-parchment">
              {formatKes(totalValue)}
            </p>
            <p className="mt-1 font-mono text-[8px] uppercase tracking-[0.14em] text-muted/80">
              Combined estimated value
            </p>

            {savedItems.length > 0 ? (
              <ul className="mt-5 space-y-2 border-t border-parchment/10 pt-4">
                {savedItems.slice(0, 3).map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#/item/${item.id}`}
                      className="flex items-center justify-between gap-3 font-sans text-xs text-parchment/70 transition-colors hover:text-brass-light"
                    >
                      <span className="truncate">{item.title}</span>
                      <span className="shrink-0 font-mono text-[8px] text-muted">
                        {item.ref.split('-').pop()}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-5 border-t border-parchment/10 pt-4 font-sans text-xs leading-5 text-muted">
                Nothing saved yet. Add a piece from the index.
              </p>
            )}

            <a href="#/binder" className="btn-ghost mt-5">
              <BookmarkIcon className="h-3.5 w-3.5" />
              Open the full binder
            </a>
          </div>

          <div className="mt-4 flex gap-3 border border-parchment/10 bg-ink-950/40 p-4">
            <ShieldIcon className="mt-0.5 h-4 w-4 shrink-0 text-muted" />
            <p className="font-sans text-[11px] leading-5 text-muted/80">
              Preview account: credentials, binder and offers live only in this
              browser. Do not reuse an important password.
            </p>
          </div>
        </aside>

        <div>
          <section aria-labelledby="trade-desk-heading">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="eyebrow">Trade desk</p>
                <h2
                  id="trade-desk-heading"
                  className="mt-3 font-display text-3xl text-parchment"
                >
                  Your open requests.
                </h2>
              </div>
              <span className="border border-parchment/15 px-2.5 py-1 font-mono text-[8px] uppercase tracking-[0.14em] text-muted">
                {trades.length} total
              </span>
            </div>

            {trades.length > 0 ? (
              <ul className="mt-6 border-t border-parchment/10">
                {trades.map((trade) => {
                  const item = getItemById(trade.itemId)

                  return (
                    <li
                      key={trade.id}
                      className="border-b border-parchment/10 py-5"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex flex-wrap items-center gap-2.5">
                          <span className="font-mono text-[8px] uppercase tracking-[0.14em] text-muted/80">
                            {trade.id}
                          </span>
                          <span className="border border-sage/25 bg-sage/[0.06] px-2 py-0.5 font-mono text-[7px] uppercase tracking-[0.14em] text-sage">
                            {trade.status}
                          </span>
                        </div>
                        <time
                          dateTime={trade.createdAt}
                          className="font-mono text-[8px] uppercase tracking-[0.12em] text-muted"
                        >
                          {formatDate(trade.createdAt)}
                        </time>
                      </div>

                      <a
                        href={item ? `#/item/${item.id}` : '#/'}
                        className="mt-2 inline-flex items-center gap-2 font-display text-xl text-parchment transition-colors hover:text-brass-light"
                      >
                        {item ? item.title : 'Archived record'}
                        {item?.issue && (
                          <span className="font-sans text-xs uppercase tracking-[0.14em] text-muted">
                            {item.issue}
                          </span>
                        )}
                        <ArrowRightIcon className="h-3.5 w-3.5 text-brass" />
                      </a>

                      <p className="mt-3 whitespace-pre-line border-l border-brass/30 pl-3 font-sans text-[13px] leading-6 text-muted">
                        {trade.offer}
                      </p>

                      {trade.note && (
                        <p className="mt-2 pl-3 font-mono text-[8px] uppercase leading-5 tracking-[0.08em] text-muted/80">
                          Note · {trade.note}
                        </p>
                      )}
                    </li>
                  )
                })}
              </ul>
            ) : (
              <div className="mt-6 border border-dashed border-parchment/15 p-7">
                <p className="font-display text-2xl text-parchment">
                  No offers at the desk.
                </p>
                <p className="mt-2 max-w-sm font-sans text-sm leading-6 text-muted">
                  Find something worth keeping, open its record and propose a
                  trade. Straight offers get the best replies.
                </p>
                <a href="#/" className="btn-secondary mt-5">
                  Browse the index
                  <ArrowRightIcon className="h-3.5 w-3.5" />
                </a>
              </div>
            )}
          </section>

          <section
            className="mt-10 border border-parchment/10 bg-ink-900/40 p-6"
            aria-labelledby="desk-note-heading"
          >
            <p className="eyebrow">House note</p>
            <h2
              id="desk-note-heading"
              className="mt-3 font-display text-2xl text-parchment"
            >
              How the desk works.
            </h2>
            <ul className="mt-5 space-y-3">
              {[
                'Every offer is a draft saved under your card.',
                'Condition notes and provenance come first.',
                'No fees, no auctions and no sealed mystery boxes.',
              ].map((line) => (
                <li
                  key={line}
                  className="flex items-start gap-3 font-sans text-[13px] leading-6 text-muted"
                >
                  <CheckIcon className="mt-1 h-3.5 w-3.5 shrink-0 text-brass" />
                  {line}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  )
}

export default function AccountPage() {
  const { user } = useAuth()

  if (user) {
    return <SignedInView user={user} />
  }

  return (
    <div className="container-page py-12 lg:py-20">
      <a href="#/" className="btn-ghost">
        <ArrowLeftIcon className="h-3.5 w-3.5" />
        Back to the index
      </a>

      <div className="mt-8 grid gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:gap-20">
        <div>
          <p className="eyebrow">Collector cards</p>
          <h1 className="display mt-4 text-[42px] leading-[0.98] text-parchment sm:text-5xl">
            Your shelf,{' '}
            <span className="italic text-brass-light">on the record.</span>
          </h1>
          <p className="mt-5 max-w-md font-sans text-sm leading-7 text-muted">
            A collector card keeps your binder and trade requests in one place.
            No fees, no newsletters — just a quiet corner of the library that
            remembers what you are chasing.
          </p>

          <ul className="mt-8 space-y-4">
            {BENEFITS.map((benefit) => (
              <li
                key={benefit}
                className="flex items-start gap-3 font-sans text-sm leading-6 text-parchment/75"
              >
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center border border-brass/30 text-brass">
                  <CheckIcon className="h-3 w-3" />
                </span>
                {benefit}
              </li>
            ))}
          </ul>

          <CollectorCardPreview />

          <div className="mt-6 flex max-w-md gap-3 border border-parchment/10 bg-ink-950/40 p-4">
            <ShieldIcon className="mt-0.5 h-4 w-4 shrink-0 text-muted" />
            <p className="font-sans text-[11px] leading-5 text-muted/80">
              This is a static preview. Accounts are kept in your browser with a
              salted password hash — there is no server and nothing is sent
              anywhere.
            </p>
          </div>
        </div>

        <div className="self-start lg:sticky lg:top-28">
          <AuthPanel />
          <p className="mt-4 text-center font-mono text-[8px] uppercase tracking-[0.1em] text-muted/80">
            One card · one shelf · no account fees
          </p>
        </div>
      </div>
    </div>
  )
}
