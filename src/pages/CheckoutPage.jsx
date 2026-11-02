import { useState } from 'react'
import CoverArt from '../components/CoverArt'
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  LockIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  ShieldIcon,
  TruckIcon,
} from '../components/Icons'
import { DARAJA_CONNECTED, DARAJA_NOTICE, initiateDarajaPayment } from '../lib/daraja'
import { formatKes } from '../lib/format'
import {
  CONTACT_METHODS,
  DELIVERY_METHODS,
  PAYMENT_METHODS,
  createOrder,
} from '../lib/orders'
import { useCart } from '../state/cart-context'
import { useToast } from '../state/toast-context'

const PHONE_PATTERN = /^(\+254|254|0)(7|1)\d{8}$/
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function FieldError({ id, children }) {
  return (
    <p id={id} className="mt-2 text-sm font-bold text-wine" role="alert">
      {children}
    </p>
  )
}

function Section({ step, title, description, children }) {
  return (
    <section className="surface p-5 sm:p-7">
      <div className="flex items-start gap-4">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brass/10 font-display text-base font-semibold text-brass">
          {step}
        </span>
        <div>
          <h2 className="font-display text-2xl font-semibold text-parchment">
            {title}
          </h2>
          {description && (
            <p className="mt-1 text-sm leading-6 text-muted">{description}</p>
          )}
        </div>
      </div>
      <div className="mt-6">{children}</div>
    </section>
  )
}

export default function CheckoutPage() {
  const cart = useCart()
  const { pushToast } = useToast()
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    address: '',
    note: '',
    deliveryId: 'nairobi',
    paymentId: 'mpesa',
    contactPreference: 'sms',
    discreetPackaging: true,
  })
  const [errors, setErrors] = useState({})
  const [formError, setFormError] = useState('')
  const [pending, setPending] = useState(false)

  const delivery = DELIVERY_METHODS.find(
    (method) => method.id === form.deliveryId,
  )
  const shipping = cart.hasPhysical ? (delivery?.fee ?? 0) : 0
  const total = cart.subtotal + shipping

  if (cart.lines.length === 0) {
    return (
      <div className="container-page py-16 lg:py-24">
        <div className="mx-auto max-w-xl rounded-4xl border border-dashed border-brass/30 bg-ink-900/70 px-6 py-16 text-center shadow-card">
          <h1 className="display text-4xl text-parchment">
            Nothing to check out yet.
          </h1>
          <p className="mx-auto mt-3 max-w-md text-base leading-7 text-muted">
            Add a piece to the cart first, then come back for the quiet
            checkout.
          </p>
          <a href="#/" className="btn-primary mt-7">
            Browse the demo shop
            <ArrowRightIcon className="h-4 w-4" />
          </a>
        </div>
      </div>
    )
  }

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target

    setForm((current) => ({
      ...current,
      [name]: type === 'checkbox' ? checked : value,
    }))
    setErrors((current) => ({ ...current, [name]: '' }))
    setFormError('')
  }

  const validate = () => {
    const nextErrors = {}
    const compactPhone = form.phone.replace(/[\s().-]/g, '')

    if (form.name.trim().length < 2) {
      nextErrors.name = 'Please enter your name.'
    }

    if (!PHONE_PATTERN.test(compactPhone)) {
      nextErrors.phone = 'Use a Kenyan number, for example 0712 345 678.'
    }

    if (form.email.trim() && !EMAIL_PATTERN.test(form.email.trim())) {
      nextErrors.email = 'Enter a valid email address or leave it blank.'
    }

    if (cart.hasDigital && !form.email.trim()) {
      nextErrors.email = 'Add an email so we can send the download link.'
    }

    if (form.contactPreference === 'email' && !form.email.trim()) {
      nextErrors.email = 'Add an email or choose SMS instead.'
    }

    if (cart.hasPhysical) {
      if (form.city.trim().length < 2) {
        nextErrors.city = 'Tell us the town or city.'
      }

      if (form.address.trim().length < 5) {
        nextErrors.address = 'Add a delivery address or pickup point.'
      }
    }

    if (form.paymentId === 'cod' && cart.hasDigital) {
      nextErrors.paymentId = 'Digital items need M-Pesa before delivery.'
    }

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (pending) return

    if (!validate()) {
      setFormError('Please check the highlighted details and try again.')
      return
    }

    setFormError('')
    setPending(true)

    try {
      const order = createOrder({
        customer: {
          name: form.name,
          phone: form.phone,
          email: form.email,
          city: form.city,
          address: form.address,
        },
        deliveryId: form.deliveryId,
        paymentId: form.paymentId,
        contactPreference: form.contactPreference,
        discreetPackaging: form.discreetPackaging,
        note: form.note,
        cartLines: cart.lines.map((line) => ({
          id: line.id,
          quantity: line.quantity,
        })),
      })

      if (order.payment.method === 'mpesa') {
        await initiateDarajaPayment({
          phone: order.customer.phone,
          amount: order.total,
          orderId: order.id,
        })
      }

      cart.clear()
      pushToast('Order received. No payment was taken in this demo.', {
        tone: 'success',
      })
      window.location.hash = `#/order/${order.id}`
    } catch (error) {
      setFormError(
        error instanceof Error
          ? error.message
          : 'The order could not be placed. Please try again.',
      )
      setPending(false)
    }
  }

  return (
    <div className="container-page py-12 lg:py-20">
      <a href="#/cart" className="btn-ghost">
        <ArrowLeftIcon className="h-4 w-4" />
        Back to cart
      </a>

      <div className="mt-6 max-w-2xl">
        <p className="eyebrow">Quiet checkout</p>
        <h1 className="display mt-3 text-4xl text-parchment sm:text-5xl">
          Done talking. Let&apos;s deliver.
        </h1>
        <p className="mt-3 text-base leading-7 text-muted">
          Guest checkout only. No account, no calls and no haggling. We only
          use these details to get your order to you.
        </p>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          <Section
            step="1"
            title="How do we reach you?"
            description="SMS is our default. We will not add you to a list."
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="checkout-name" className="field-label">
                  Full name
                </label>
                <input
                  id="checkout-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={form.name}
                  onChange={handleChange}
                  className={`field ${errors.name ? '!border-wine' : ''}`}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                  placeholder="Amina Wanjiru"
                />
                {errors.name && <FieldError id="name-error">{errors.name}</FieldError>}
              </div>

              <div>
                <label htmlFor="checkout-phone" className="field-label">
                  Phone number
                </label>
                <div className="relative">
                  <PhoneIcon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                  <input
                    id="checkout-phone"
                    name="phone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    value={form.phone}
                    onChange={handleChange}
                    className={`field pl-10 ${errors.phone ? '!border-wine' : ''}`}
                    aria-invalid={Boolean(errors.phone)}
                    aria-describedby={errors.phone ? 'phone-error' : undefined}
                    placeholder="0712 345 678"
                  />
                </div>
                {errors.phone && (
                  <FieldError id="phone-error">{errors.phone}</FieldError>
                )}
              </div>

              <div>
                <label htmlFor="checkout-email" className="field-label">
                  Email {cart.hasDigital ? '(required)' : '(optional)'}
                </label>
                <div className="relative">
                  <MailIcon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                  <input
                    id="checkout-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={form.email}
                    onChange={handleChange}
                    className={`field pl-10 ${errors.email ? '!border-wine' : ''}`}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                    placeholder="you@example.com"
                  />
                </div>
                {errors.email && (
                  <FieldError id="email-error">{errors.email}</FieldError>
                )}
              </div>
            </div>

            <fieldset className="mt-5">
              <legend className="field-label">Contact preference</legend>
              <div className="flex flex-wrap gap-2">
                {CONTACT_METHODS.map((method) => (
                  <label
                    key={method.id}
                    className={`cursor-pointer rounded-full border-2 px-4 py-2 text-sm font-bold transition-colors ${
                      form.contactPreference === method.id
                        ? 'border-brass bg-brass text-white'
                        : 'border-ink/10 bg-ink-800 text-muted hover:border-brass/40'
                    }`}
                  >
                    <input
                      type="radio"
                      name="contactPreference"
                      value={method.id}
                      checked={form.contactPreference === method.id}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    {method.label}
                  </label>
                ))}
              </div>
            </fieldset>
          </Section>

          {cart.hasPhysical && (
            <Section
              step="2"
              title="Where is it going?"
              description="Choose a pickup point or tell us where to meet the courier."
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="checkout-city" className="field-label">
                    Town or city
                  </label>
                  <div className="relative">
                    <MapPinIcon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                    <input
                      id="checkout-city"
                      name="city"
                      type="text"
                      autoComplete="address-level2"
                      value={form.city}
                      onChange={handleChange}
                      className={`field pl-10 ${errors.city ? '!border-wine' : ''}`}
                      aria-invalid={Boolean(errors.city)}
                      aria-describedby={errors.city ? 'city-error' : undefined}
                      placeholder="Nairobi"
                    />
                  </div>
                  {errors.city && (
                    <FieldError id="city-error">{errors.city}</FieldError>
                  )}
                </div>

                <div>
                  <label htmlFor="checkout-address" className="field-label">
                    Address or pickup point
                  </label>
                  <input
                    id="checkout-address"
                    name="address"
                    type="text"
                    autoComplete="street-address"
                    value={form.address}
                    onChange={handleChange}
                    className={`field ${errors.address ? '!border-wine' : ''}`}
                    aria-invalid={Boolean(errors.address)}
                    aria-describedby={
                      errors.address ? 'address-error' : undefined
                    }
                    placeholder="Building, street or pickup station"
                  />
                  {errors.address && (
                    <FieldError id="address-error">{errors.address}</FieldError>
                  )}
                </div>
              </div>

              <fieldset className="mt-5">
                <legend className="field-label">Delivery method</legend>
                <div className="space-y-2.5">
                  {DELIVERY_METHODS.map((method) => (
                    <label
                      key={method.id}
                      className={`flex cursor-pointer items-start gap-3 rounded-2xl border-2 p-4 transition-colors ${
                        form.deliveryId === method.id
                          ? 'border-brass bg-brass/[0.05]'
                          : 'border-ink/10 bg-ink-800 hover:border-brass/40'
                      }`}
                    >
                      <input
                        type="radio"
                        name="deliveryId"
                        value={method.id}
                        checked={form.deliveryId === method.id}
                        onChange={handleChange}
                        className="mt-1 accent-brass"
                      />
                      <span className="flex min-w-0 flex-1 flex-wrap items-center justify-between gap-2">
                        <span>
                          <span className="block text-sm font-bold text-parchment">
                            {method.label}
                          </span>
                          <span className="mt-0.5 block text-sm text-muted">
                            {method.detail}
                          </span>
                        </span>
                        <span className="text-sm font-bold text-brass">
                          {method.fee === 0
                            ? 'Free'
                            : formatKes(method.fee)}
                        </span>
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>
            </Section>
          )}

          <Section
            step={cart.hasPhysical ? '3' : '2'}
            title="Payment"
            description="Daraja will be connected later. For now this is a safe demo."
          >
            <div className="space-y-2.5">
              {PAYMENT_METHODS.map((method) => {
                const disabled = method.id === 'cod' && cart.hasDigital

                return (
                  <label
                    key={method.id}
                    className={`flex items-start gap-3 rounded-2xl border-2 p-4 transition-colors ${
                      disabled
                        ? 'cursor-not-allowed border-ink/10 bg-ink-800 opacity-55'
                        : form.paymentId === method.id
                          ? 'cursor-pointer border-brass bg-brass/[0.05]'
                          : 'cursor-pointer border-ink/10 bg-ink-800 hover:border-brass/40'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentId"
                      value={method.id}
                      checked={form.paymentId === method.id}
                      onChange={handleChange}
                      disabled={disabled}
                      className="mt-1 accent-brass"
                    />
                    <span>
                      <span className="block text-sm font-bold text-parchment">
                        {method.label}
                      </span>
                      <span className="mt-0.5 block text-sm text-muted">
                        {disabled
                          ? 'Not available for digital items'
                          : method.detail}
                      </span>
                    </span>
                  </label>
                )
              })}
            </div>

            <div className="mt-4 flex items-start gap-3 rounded-2xl bg-ink-800 p-4">
              <LockIcon className="mt-0.5 h-4 w-4 shrink-0 text-sage" />
              <p className="text-sm leading-6 text-muted">{DARAJA_NOTICE}</p>
            </div>
            {errors.paymentId && (
              <FieldError id="payment-error">{errors.paymentId}</FieldError>
            )}
          </Section>

          <Section
            step={cart.hasPhysical ? '4' : '3'}
            title="Keep it quiet"
            description="The less noise, the better."
          >
            <label className="flex cursor-pointer items-start gap-3 rounded-2xl border-2 border-ink/10 bg-ink-800 p-4">
              <input
                type="checkbox"
                name="discreetPackaging"
                checked={form.discreetPackaging}
                onChange={handleChange}
                className="mt-1 accent-brass"
              />
              <span>
                <span className="block text-sm font-bold text-parchment">
                  Discreet packaging
                </span>
                <span className="mt-0.5 block text-sm text-muted">
                  Plain outer box and no price on the label.
                </span>
              </span>
            </label>

            <div className="mt-4">
              <label htmlFor="checkout-note" className="field-label">
                Delivery note (optional)
              </label>
              <textarea
                id="checkout-note"
                name="note"
                value={form.note}
                onChange={handleChange}
                rows="3"
                maxLength="300"
                placeholder="Gate code, best time or a pickup request"
                className="field resize-none"
              />
              <p className="mt-2 text-right text-xs text-muted">
                {form.note.length} / 300
              </p>
            </div>
          </Section>

          {formError && (
            <p
              className="rounded-2xl border border-wine/30 bg-wine/[0.06] px-4 py-3 text-sm font-bold leading-6 text-wine"
              role="alert"
            >
              {formError}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="submit"
              disabled={pending}
              className="btn-primary flex-1 disabled:cursor-wait disabled:opacity-60"
            >
              <LockIcon className="h-4 w-4" />
              {pending
                ? 'Placing your order…'
                : form.paymentId === 'mpesa' && !DARAJA_CONNECTED
                  ? 'Place demo order'
                  : form.paymentId === 'mpesa'
                    ? 'Place order · M-Pesa'
                    : 'Place order · Pay on delivery'}
            </button>
            <a href="#/cart" className="btn-secondary">
              Back to cart
            </a>
          </div>

          <p className="text-center text-xs leading-5 text-muted">
            Demo checkout. Details stay in this browser and no money moves.
          </p>
        </form>

        <aside className="surface p-5 sm:p-6 lg:sticky lg:top-28">
          <div className="flex items-center justify-between gap-3">
            <h2 className="font-display text-2xl font-semibold text-parchment">
              Your order
            </h2>
            <span className="chip bg-sage/10 text-sage">
              {cart.count} {cart.count === 1 ? 'item' : 'items'}
            </span>
          </div>

          <ul className="mt-5 space-y-4">
            {cart.lines.map((line) => (
              <li key={line.id} className="flex items-center gap-3">
                <span className="w-12 shrink-0 overflow-hidden rounded-xl border border-ink/10">
                  <CoverArt item={line} className="h-auto w-full" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-bold text-parchment">
                    {line.title}
                  </span>
                  <span className="block text-xs text-muted">
                    Qty {line.quantity}
                    {line.digital ? ' · Digital' : ''}
                  </span>
                </span>
                <span className="shrink-0 text-sm font-bold text-parchment">
                  {formatKes(line.value * line.quantity)}
                </span>
              </li>
            ))}
          </ul>

          <dl className="mt-5 space-y-2.5 border-t border-ink/10 pt-5 text-sm">
            <div className="flex items-center justify-between gap-4">
              <dt className="text-muted">Subtotal</dt>
              <dd className="font-bold text-parchment">
                {formatKes(cart.subtotal)}
              </dd>
            </div>
            <div className="flex items-center justify-between gap-4">
              <dt className="text-muted">Delivery</dt>
              <dd className="font-bold text-parchment">
                {cart.hasPhysical
                  ? shipping === 0
                    ? 'Free pickup'
                    : formatKes(shipping)
                  : 'Free · digital'}
              </dd>
            </div>
          </dl>

          <div className="mt-5 flex items-end justify-between gap-4 border-t border-ink/10 pt-5">
            <p className="text-sm font-bold text-muted">Total</p>
            <p className="font-display text-3xl font-semibold text-parchment">
              {formatKes(total)}
            </p>
          </div>

          <div className="mt-5 space-y-3 rounded-2xl bg-ink-800 p-4">
            <p className="flex items-start gap-2.5 text-sm leading-6 text-muted">
              <ShieldIcon className="mt-0.5 h-4 w-4 shrink-0 text-sage" />
              No account is created. Your details are not sent anywhere.
            </p>
            <p className="flex items-start gap-2.5 text-sm leading-6 text-muted">
              <TruckIcon className="mt-0.5 h-4 w-4 shrink-0 text-sage" />
              {cart.hasPhysical
                ? 'We pack, then send one SMS when the order is moving.'
                : 'Your download link arrives by email after payment.'}
            </p>
          </div>
        </aside>
      </div>
    </div>
  )
}
