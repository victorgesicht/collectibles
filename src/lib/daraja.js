export const DARAJA_CONNECTED = false

export const DARAJA_NOTICE =
  'Daraja is not connected in this demo. No money will move and no STK push will be sent.'

export async function initiateDarajaPayment({ phone, amount, orderId }) {
  if (!phone || !orderId || !Number.isFinite(amount) || amount <= 0) {
    throw new Error('A phone number, order reference and amount are required.')
  }

  if (!DARAJA_CONNECTED) {
    return {
      provider: 'daraja',
      status: 'pending',
      orderId,
      amount,
      message: DARAJA_NOTICE,
      requestedAt: new Date().toISOString(),
    }
  }

  throw new Error(
    'Daraja is not wired to a server yet. Add a server-side STK push endpoint before enabling payments.',
  )
}
