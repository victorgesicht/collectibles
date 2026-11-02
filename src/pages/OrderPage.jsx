import CoverArt from '../components/CoverArt'
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckIcon,
  LockIcon,
  MailIcon,
  MapPinIcon,
  PackageIcon,
  PhoneIcon,
  ShieldIcon,
  TruckIcon,
} from '../components/Icons'
import { DARAJA_CONNECTED, DARAJA_NOTICE } from '../lib/daraja'
import {
  formatDateTime,
  formatKes,
  maskEmail,
  maskPhone,
} from '../lib/format'
import { CONTACT_METHODS, getOrder } from '../lib/orders'

const CONTACT_LABELS = Object.fromEntries(
  CONTACT_METHODS.map((method) => [method.id, method.label]),
)

export default function OrderPage({ orderId }) {
  const order = getOrder(orderId)

  if (!order) {
    return (
      <div className="container-page py-16 lg:py-24">
        <div className="mx-auto max-w-xl rounded-4xl border border-dashed border-brass/30 bg-ink-900/70 px-6 py-16 text-center shadow-card">
          <h1 className="display text-4xl text-parchment">
            We could not find that order.
          </h1>
          <p className="mx-auto mt-3 max-w-md text-base leading-7 text-muted">
            Orders live only in the browser where they were placed. If you
            cleared storage or opened this on another device, the demo order is
            gone.
          </p>
          <a href="#/" className="btn-primary mt-7">
            Back to the shop
            <ArrowRightIcon className="h-4 w-4" />
          </a>
        </div>
      </div>
    )
  }

  const awaitingPayment = order.status === 'awaiting-payment'
  const demoPending = awaitingPayment && !DARAJA_CONNECTED

  return (
    <div className="container-page py-12 lg:py-20">
      <a href="#/" className="btn-ghost no-print">
        <ArrowLeftIcon className="h-4 w-4" />
        Back to the shop
      </a>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
        <div>
          <div className="surface overflow-hidden">
            <div className="bg-brass/[0.06] p-6 sm:p-8">
              <span className="grid h-14 w-14 place-items-center rounded-full bg-sage/10 text-sage">
                <CheckIcon className="h-6 w-6" />
              </span>
              <p className="eyebrow mt-5">
                {awaitingPayment ? 'Order received' : 'Order confirmed'}
              </p>
              <h1 className="display mt-2 text-4xl leading-tight text-parchment sm:text-5xl">
                {demoPending
                  ? 'Saved. No payment taken.'
                  : awaitingPayment
                    ? 'Saved. Payment is pending.'
                    : 'You are all set.'}
              </h1>
              <p className="mt-3 max-w-xl text-base leading-7 text-muted">
                {demoPending
                  ? DARAJA_NOTICE
                  : awaitingPayment
                    ? 'Daraja is connected, but the payment has not been confirmed yet. This page will show the update once the callback arrives.'
                    : 'This demo order is confirmed for pay on delivery. Keep the reference below and we will keep the rest quiet.'}
              </p>
              <p className="mt-5 inline-flex flex-wrap items-center gap-2 rounded-full bg-ink-900 px-4 py-2 text-sm font-bold text-parchment">
                Order reference
                <span className="font-mono text-base text-brass">
                  {order.id}
                </span>
              </p>
            </div>

            <div className="grid gap-6 p-6 sm:grid-cols-2 sm:p-8">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-muted">
                  Placed
                </p>
                <p className="mt-1 text-sm font-bold text-parchment">
                  {formatDateTime(order.createdAt)}
                </p>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-muted">
                  Payment
                </p>
                <p className="mt-1 text-sm font-bold text-parchment">
                  {order.payment.label} ·{' '}
                  {demoPending
                    ? 'Demo only'
                    : awaitingPayment
                      ? 'Pending'
                      : 'Pay on delivery'}
                </p>
              </div>
            </div>
          </div>

          <div className="surface mt-5 p-6 sm:p-8">
            <div className="flex items-center justify-between gap-3">
              <h2 className="font-display text-2xl font-semibold text-parchment">
                What you ordered
              </h2>
              <span className="chip bg-sage/10 text-sage">
                {order.items.length}{' '}
                {order.items.length === 1 ? 'item' : 'items'}
              </span>
            </div>

            <ul className="mt-5 divide-y divide-ink/10">
              {order.items.map((item) => (
                <li key={item.id} className="flex items-center gap-4 py-4">
                  <span className="w-14 shrink-0 overflow-hidden rounded-xl border border-ink/10">
                    <CoverArt item={item} className="h-auto w-full" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-bold text-parchment">
                      {item.title}
                      {item.issue ? ` · ${item.issue}` : ''}
                    </span>
                    <span className="block text-xs text-muted">
                      Qty {item.quantity}
                      {item.digital ? ' · Digital download' : ''}
                    </span>
                  </span>
                  <span className="shrink-0 text-sm font-bold text-parchment">
                    {formatKes(item.value * item.quantity)}
                  </span>
                </li>
              ))}
            </ul>

            <dl className="mt-5 space-y-2.5 border-t border-ink/10 pt-5 text-sm">
              <div className="flex items-center justify-between gap-4">
                <dt className="text-muted">Subtotal</dt>
                <dd className="font-bold text-parchment">
                  {formatKes(order.subtotal)}
                </dd>
              </div>
              <div className="flex items-center justify-between gap-4">
                <dt className="text-muted">Delivery</dt>
                <dd className="font-bold text-parchment">
                  {order.shipping === 0
                    ? 'Free'
                    : formatKes(order.shipping)}
                </dd>
              </div>
              <div className="flex items-center justify-between gap-4 border-t border-ink/10 pt-4">
                <dt className="font-bold text-parchment">Total</dt>
                <dd className="font-display text-2xl font-semibold text-parchment">
                  {formatKes(order.total)}
                </dd>
              </div>
            </dl>
          </div>
        </div>

        <aside className="space-y-5 lg:sticky lg:top-28">
          <div className="surface p-6">
            <h2 className="font-display text-2xl font-semibold text-parchment">
              Delivery details
            </h2>

            <dl className="mt-5 space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <PhoneIcon className="mt-0.5 h-4 w-4 shrink-0 text-brass" />
                <div>
                  <dt className="text-xs font-bold uppercase tracking-[0.12em] text-muted">
                    Phone
                  </dt>
                  <dd className="mt-0.5 font-bold text-parchment">
                    {maskPhone(order.customer.phone)}
                  </dd>
                </div>
              </div>

              {order.customer.email && (
                <div className="flex items-start gap-3">
                  <MailIcon className="mt-0.5 h-4 w-4 shrink-0 text-brass" />
                  <div>
                    <dt className="text-xs font-bold uppercase tracking-[0.12em] text-muted">
                      Email
                    </dt>
                    <dd className="mt-0.5 font-bold text-parchment">
                      {maskEmail(order.customer.email)}
                    </dd>
                  </div>
                </div>
              )}

              <div className="flex items-start gap-3">
                <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0 text-brass" />
                <div>
                  <dt className="text-xs font-bold uppercase tracking-[0.12em] text-muted">
                    Delivery
                  </dt>
                  <dd className="mt-0.5 font-bold text-parchment">
                    {order.delivery.label}
                  </dd>
                  {order.customer.city && (
                    <dd className="mt-1 text-muted">
                      {order.customer.address}, {order.customer.city}
                    </dd>
                  )}
                  {!order.customer.city && (
                    <dd className="mt-1 text-muted">
                      Digital files go to the email above.
                    </dd>
                  )}
                </div>
              </div>

              <div className="flex items-start gap-3">
                <TruckIcon className="mt-0.5 h-4 w-4 shrink-0 text-brass" />
                <div>
                  <dt className="text-xs font-bold uppercase tracking-[0.12em] text-muted">
                    Contact
                  </dt>
                  <dd className="mt-0.5 font-bold text-parchment">
                    {CONTACT_LABELS[order.customer.contactPreference] ??
                      'SMS only'}
                  </dd>
                  <dd className="mt-1 text-muted">
                    {order.discreetPackaging
                      ? 'Discreet packaging requested'
                      : 'Standard packaging'}
                  </dd>
                </div>
              </div>

              {order.note && (
                <div className="flex items-start gap-3">
                  <PackageIcon className="mt-0.5 h-4 w-4 shrink-0 text-brass" />
                  <div>
                    <dt className="text-xs font-bold uppercase tracking-[0.12em] text-muted">
                      Note
                    </dt>
                    <dd className="mt-0.5 whitespace-pre-line text-muted">
                      {order.note}
                    </dd>
                  </div>
                </div>
              )}
            </dl>
          </div>

          <div className="surface p-6">
            <div className="flex items-start gap-3">
              <LockIcon className="mt-0.5 h-4 w-4 shrink-0 text-sage" />
              <div>
                <h2 className="font-display text-xl font-semibold text-parchment">
                  Payment
                </h2>
                <p className="mt-1 text-sm leading-6 text-muted">
                  {demoPending
                    ? DARAJA_NOTICE
                    : awaitingPayment
                      ? 'We will update this order when Daraja confirms the payment.'
                      : 'Pay the rider when your order arrives.'}
                </p>
              </div>
            </div>
          </div>

          <div className="surface p-6">
            <h2 className="font-display text-2xl font-semibold text-parchment">
              Order timeline
            </h2>
            <ol className="mt-4 space-y-4">
              {order.timeline.map((entry) => (
                <li key={`${entry.label}-${entry.at}`} className="flex gap-3">
                  <span className="mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-sage/10 text-sage">
                    <CheckIcon className="h-3.5 w-3.5" />
                  </span>
                  <span>
                    <span className="block text-sm font-bold text-parchment">
                      {entry.label}
                    </span>
                    <span className="block text-xs text-muted">
                      {formatDateTime(entry.at)}
                    </span>
                  </span>
                </li>
              ))}
              <li className="flex gap-3">
                <span className="mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brass/10 text-brass">
                  <TruckIcon className="h-3.5 w-3.5" />
                </span>
                <span>
                  <span className="block text-sm font-bold text-parchment">
                    {demoPending
                      ? 'M-Pesa not connected'
                      : awaitingPayment
                        ? 'Awaiting M-Pesa'
                        : 'Ready for delivery'}
                  </span>
                  <span className="block text-xs text-muted">
                    {demoPending
                      ? 'No payment was taken in this demo'
                      : awaitingPayment
                        ? 'We will update this order when Daraja confirms'
                        : 'We will pack this with no price on the label'}
                  </span>
                </span>
              </li>
            </ol>
          </div>

          <div className="flex flex-wrap gap-3 no-print">
            <button
              type="button"
              onClick={() => window.print()}
              className="btn-secondary flex-1"
            >
              <ShieldIcon className="h-4 w-4" />
              Print receipt
            </button>
            <a href="#/" className="btn-primary flex-1">
              Keep shopping
              <ArrowRightIcon className="h-4 w-4" />
            </a>
          </div>

          <p className="text-center text-xs leading-5 text-muted">
            Demo order · saved in this browser only
          </p>
        </aside>
      </div>
    </div>
  )
}
