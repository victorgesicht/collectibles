import { useMemo, useState } from 'react'
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  BookmarkIcon,
  CartIcon,
  CheckIcon,
  EyeIcon,
  EyeOffIcon,
  LockIcon,
  LogOutIcon,
  ShieldIcon,
  SparklesIcon,
} from '../components/Icons'
import { getItemById } from '../data/catalog'
import { PASSWORD_REQUIREMENT, isPasswordValid } from '../lib/auth'
import { formatDate, formatKes, getInitials } from '../lib/format'
import { getTradesForUser } from '../lib/trades'
import { useAuth } from '../state/auth-context'
import { useBinder } from '../state/binder-context'
import { useCart } from '../state/cart-context'
import { useToast } from '../state/toast-context'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const BENEFITS = [
  'Keep saved items and offers in one place.',
  'Pick up where you left off in this browser.',
  'Checkout still works without an account — this is optional.',
]

function FieldError({ id, children }) {
  return (
    <p id={id} className="mt-2 text-sm font-bold text-wine" role="alert">
      {children}
    </p>
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
        pushToast('Account ready. Welcome in.', { tone: 'success' })
      } else {
        await signIn({
          email: form.email,
          password: form.password,
        })
        pushToast('Welcome back.', { tone: 'success' })
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

  return (
    <div className="surface overflow-hidden rounded-4xl">
      <div
        className="grid grid-cols-2 gap-1 border-b border-ink/10 bg-ink-800 p-1.5"
        role="group"
        aria-label="Account access"
      >
        <button
          type="button"
          onClick={() => switchMode('create')}
          aria-pressed={isCreate}
          className={`rounded-2xl px-4 py-3 text-sm font-bold transition-colors ${
            isCreate
              ? 'bg-ink-900 text-brass shadow-sm'
              : 'text-muted hover:text-parchment'
          }`}
        >
          Create an account
        </button>
        <button
          type="button"
          onClick={() => switchMode('signin')}
          aria-pressed={!isCreate}
          className={`rounded-2xl px-4 py-3 text-sm font-bold transition-colors ${
            !isCreate
              ? 'bg-ink-900 text-brass shadow-sm'
              : 'text-muted hover:text-parchment'
          }`}
        >
          Sign in
        </button>
      </div>

      <div className="p-5 sm:p-7">
        <p className="eyebrow">
          {isCreate ? 'Optional account' : 'Welcome back'}
        </p>
        <h2
          id="account-form-title"
          className="display mt-3 text-3xl leading-tight text-parchment"
        >
          {isCreate ? 'Keep the good stuff together.' : 'Back to your shelf.'}
        </h2>
        <p className="mt-2 text-sm leading-6 text-muted">
          {isCreate
            ? 'A free local account for saved items and offers. Guest checkout never needs one.'
            : 'Sign in to see your saved items, offers and account details.'}
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
                className={`field ${errors.name ? '!border-wine' : ''}`}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? 'name-error' : undefined}
                placeholder="Amina Wanjiru"
              />
              {errors.name && (
                <FieldError id="name-error">{errors.name}</FieldError>
              )}
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
              className={`field ${errors.email ? '!border-wine' : ''}`}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? 'email-error' : undefined}
              placeholder="you@example.com"
            />
            {errors.email && (
              <FieldError id="email-error">{errors.email}</FieldError>
            )}
          </div>

          <div className="mb-4">
            <div className="mb-2 flex items-center justify-between gap-4">
              <label
                htmlFor="account-password"
                className="text-sm font-bold text-parchment"
              >
                Password
              </label>
              <button
                type="button"
                onClick={() => setShowPassword((current) => !current)}
                className="inline-flex min-h-8 items-center gap-1.5 text-xs font-bold text-muted transition-colors hover:text-brass"
                aria-pressed={showPassword}
                aria-label={
                  showPassword
                    ? 'Hide password fields'
                    : 'Show password fields'
                }
              >
                {showPassword ? (
                  <EyeOffIcon className="h-4 w-4" />
                ) : (
                  <EyeIcon className="h-4 w-4" />
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
              className={`field ${errors.password ? '!border-wine' : ''}`}
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
            {errors.password && (
              <FieldError id="password-error">{errors.password}</FieldError>
            )}
            {isCreate && !errors.password && (
              <p
                id="password-requirement"
                className="mt-2 text-xs leading-5 text-muted"
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
                className={`field ${errors.confirmPassword ? '!border-wine' : ''}`}
                aria-invalid={Boolean(errors.confirmPassword)}
                aria-describedby={
                  errors.confirmPassword
                    ? 'confirmPassword-error'
                    : undefined
                }
                placeholder="Repeat your password"
              />
              {errors.confirmPassword && (
                <FieldError id="confirmPassword-error">
                  {errors.confirmPassword}
                </FieldError>
              )}
            </div>
          )}

          {formError && (
            <p
              className="mb-4 rounded-2xl border border-wine/30 bg-wine/[0.06] px-3 py-2.5 text-sm font-bold leading-6 text-wine"
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
              ? 'Opening your account…'
              : isCreate
                ? 'Create my account'
                : 'Sign in'}
            {!pending && <ArrowRightIcon className="h-4 w-4" />}
          </button>

          <p className="mt-4 text-center text-xs leading-5 text-muted">
            Demo only · the account lives in this browser. Do not reuse an
            important password.
          </p>
        </form>
      </div>
    </div>
  )
}

function SignedInView({ user }) {
  const binder = useBinder()
  const cart = useCart()
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
    pushToast('Signed out. Saved items and your cart stay in this browser.')
  }

  return (
    <div className="container-page py-12 lg:py-20">
      <a href="#/" className="btn-ghost">
        <ArrowLeftIcon className="h-4 w-4" />
        Back to the shop
      </a>

      <div className="mt-6 flex flex-col gap-6 border-b border-ink/10 pb-8 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="eyebrow">
            <SparklesIcon className="h-4 w-4" />
            Your account
          </p>
          <h1 className="display mt-3 text-4xl leading-[1.02] text-parchment sm:text-5xl">
            Welcome back, {firstName}.
          </h1>
          <p className="mt-3 max-w-xl text-base leading-7 text-muted">
            Your saved items and offers live here. Checkout stays guest-first,
            so you can shop quietly whenever you like.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <a href="#/cart" className="btn-secondary">
            <CartIcon className="h-4 w-4" />
            Cart · {cart.count}
          </a>
          <button
            type="button"
            onClick={handleSignOut}
            className="btn-ghost"
          >
            <LogOutIcon className="h-4 w-4" />
            Sign out
          </button>
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[0.78fr_1.22fr] lg:gap-10">
        <aside className="space-y-5">
          <div className="surface overflow-hidden rounded-4xl">
            <div className="bg-brass/[0.06] p-6">
              <div className="flex items-center justify-between gap-4">
                <p className="eyebrow">Profile</p>
                <span className="chip bg-sage/10 text-sage">
                  <CheckIcon className="h-3.5 w-3.5" />
                  Active
                </span>
              </div>

              <div className="mt-6 flex items-center gap-4">
                <span className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-brass text-xl font-extrabold text-white">
                  {getInitials(user.name)}
                </span>
                <div className="min-w-0">
                  <p className="truncate font-display text-2xl font-semibold text-parchment">
                    {user.name}
                  </p>
                  <p className="mt-1 truncate text-sm text-muted">
                    {user.email}
                  </p>
                </div>
              </div>
            </div>

            <dl className="grid grid-cols-2 gap-4 p-6">
              <div>
                <dt className="text-xs font-bold uppercase tracking-[0.08em] text-muted">
                  Member since
                </dt>
                <dd className="mt-1 text-sm font-bold text-parchment">
                  {formatDate(user.createdAt)}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-bold uppercase tracking-[0.08em] text-muted">
                  Account no.
                </dt>
                <dd className="mt-1 font-mono text-xs text-parchment">
                  CK-{cardNumber}
                </dd>
              </div>
            </dl>
          </div>

          <div className="surface p-6">
            <div className="flex items-center justify-between gap-3">
              <h2 className="font-display text-xl font-semibold text-parchment">
                Saved items
              </h2>
              <span className="text-sm font-bold text-muted">
                {savedItems.length}
              </span>
            </div>
            <p className="mt-3 font-display text-3xl font-semibold text-parchment">
              {formatKes(totalValue)}
            </p>
            <p className="mt-1 text-xs text-muted">Combined demo value</p>

            {savedItems.length > 0 ? (
              <ul className="mt-4 space-y-2 border-t border-ink/10 pt-4">
                {savedItems.slice(0, 4).map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#/item/${item.id}`}
                      className="flex items-center justify-between gap-3 rounded-xl px-2 py-2 text-sm font-bold text-muted transition-colors hover:bg-ink-800 hover:text-brass"
                    >
                      <span className="truncate">{item.title}</span>
                      <span className="shrink-0 font-mono text-xs">
                        {item.ref.split('-').pop()}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-4 border-t border-ink/10 pt-4 text-sm leading-6 text-muted">
                Nothing saved yet. Tap the bookmark on any product.
              </p>
            )}

            <a href="#/binder" className="btn-secondary mt-4 w-full">
              <BookmarkIcon className="h-4 w-4" />
              Open saved items
            </a>
          </div>

          <div className="flex gap-3 rounded-2xl border border-ink/10 bg-ink-800/60 p-4">
            <ShieldIcon className="mt-0.5 h-4 w-4 shrink-0 text-sage" />
            <p className="text-xs leading-5 text-muted">
              Demo account: credentials, saved items and offers stay in this
              browser. Do not reuse an important password.
            </p>
          </div>
        </aside>

        <div className="space-y-6">
          <section
            className="surface p-6 sm:p-7"
            aria-labelledby="offers-heading"
          >
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="eyebrow">Offers</p>
                <h2
                  id="offers-heading"
                  className="display mt-2 text-3xl text-parchment"
                >
                  Your offers.
                </h2>
              </div>
              <span className="chip bg-ink-800 text-muted">
                {trades.length} total
              </span>
            </div>

            {trades.length > 0 ? (
              <ul className="mt-6 divide-y divide-ink/10">
                {trades.map((trade) => {
                  const item = getItemById(trade.itemId)

                  return (
                    <li key={trade.id} className="py-5 first:pt-0 last:pb-0">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="font-mono text-xs text-muted">
                          {trade.id}
                        </span>
                        <span className="chip bg-sage/10 text-sage">
                          {trade.status}
                        </span>
                      </div>

                      <a
                        href={item ? `#/item/${item.id}` : '#/'}
                        className="mt-2 inline-flex items-center gap-2 font-display text-xl font-semibold text-parchment transition-colors hover:text-brass"
                      >
                        {item ? item.title : 'Archived product'}
                        <ArrowRightIcon className="h-4 w-4 text-brass" />
                      </a>

                      <p className="mt-2 whitespace-pre-line border-l-2 border-brass/30 pl-3 text-sm leading-6 text-muted">
                        {trade.offer}
                      </p>

                      <p className="mt-2 text-xs text-muted">
                        {formatDate(trade.createdAt)}
                        {trade.note ? ` · ${trade.note}` : ''}
                      </p>
                    </li>
                  )
                })}
              </ul>
            ) : (
              <div className="mt-6 rounded-2xl border border-dashed border-ink/15 p-6">
                <p className="font-display text-xl font-semibold text-parchment">
                  No offers yet.
                </p>
                <p className="mt-1 text-sm leading-6 text-muted">
                  Open a product and use “Make an offer” if you want to talk. For
                  everything else, quiet checkout is faster.
                </p>
                <a href="#/" className="btn-secondary mt-4">
                  Browse the shop
                  <ArrowRightIcon className="h-4 w-4" />
                </a>
              </div>
            )}
          </section>

          <section className="surface p-6 sm:p-7">
            <p className="eyebrow">Quiet checkout</p>
            <h2 className="display mt-2 text-2xl text-parchment">
              Skip the account next time.
            </h2>
            <p className="mt-2 text-sm leading-6 text-muted">
              You never need an account to buy. Guest checkout is the default,
              takes about a minute and keeps the conversation to one SMS.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {BENEFITS.map((benefit) => (
                <span
                  key={benefit}
                  className="inline-flex items-center gap-1.5 rounded-full bg-sage/10 px-3 py-1.5 text-xs font-bold text-sage"
                >
                  <CheckIcon className="h-3.5 w-3.5" />
                  {benefit}
                </span>
              ))}
            </div>
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
        <ArrowLeftIcon className="h-4 w-4" />
        Back to the shop
      </a>

      <div className="mt-6 grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
        <div>
          <p className="eyebrow">
            <SparklesIcon className="h-4 w-4" />
            Optional account
          </p>
          <h1 className="display mt-3 text-[42px] leading-[0.98] text-parchment sm:text-5xl">
            A calm place for your shortlist.
          </h1>
          <p className="mt-5 max-w-md text-base leading-7 text-muted">
            An account is optional. Quiet checkout never requires one, but a
            free account keeps saved items and offers together in this browser.
          </p>

          <ul className="mt-8 space-y-4">
            {BENEFITS.map((benefit) => (
              <li
                key={benefit}
                className="flex items-start gap-3 text-sm font-bold leading-6 text-parchment/80"
              >
                <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-sage/10 text-sage">
                  <CheckIcon className="h-3.5 w-3.5" />
                </span>
                {benefit}
              </li>
            ))}
          </ul>

          <div className="mt-8 rounded-3xl border border-ink/10 bg-ink-900 p-5 shadow-card">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-brass/10 text-brass">
                  <LockIcon className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-display text-xl font-semibold text-parchment">
                    Prefer not to sign up?
                  </p>
                  <p className="text-sm text-muted">
                    Guest checkout is always open.
                  </p>
                </div>
              </div>
              <span className="chip bg-sage/10 text-sage">No calls</span>
            </div>
            <div className="mt-5 flex items-center justify-between border-t border-dashed border-ink/15 pt-3 text-xs font-bold text-muted">
              <span>No account</span>
              <span>No marketing</span>
            </div>
            <a
              href="#/"
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-brass transition-colors hover:text-brass-dark"
            >
              Shop quietly
              <ArrowRightIcon className="h-4 w-4" />
            </a>
          </div>

          <div className="mt-5 flex gap-3 rounded-2xl border border-ink/10 bg-ink-800/60 p-4">
            <ShieldIcon className="mt-0.5 h-4 w-4 shrink-0 text-sage" />
            <p className="text-xs leading-5 text-muted">
              Static preview. Accounts are kept in your browser with a salted
              password hash. There is no server and nothing is sent anywhere.
            </p>
          </div>
        </div>

        <div className="self-start lg:sticky lg:top-32">
          <AuthPanel />
          <p className="mt-4 text-center text-xs font-bold text-muted">
            One calm account · no fees · guest checkout always available
          </p>
        </div>
      </div>
    </div>
  )
}
