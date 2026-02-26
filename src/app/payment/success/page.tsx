import Link from 'next/link'
import { savePaymentResult } from '@/features/payments/server/savePaymentResult'

type PaymentSuccessSearchParams = {
  paymentKey?: string
  orderId?: string
  amount?: string
  paymentType?: string
}

type PaymentSuccessPageProps = {
  searchParams: Promise<PaymentSuccessSearchParams>
}

export default async function PaymentSuccessPage({
  searchParams,
}: PaymentSuccessPageProps): Promise<React.JSX.Element> {
  const { orderId, amount, paymentKey } = await searchParams

  // 결제 결과를 DB에 저장 (멱등성 보장 — 페이지 새로고침해도 중복 저장 안 됨)
  if (orderId && paymentKey && amount) {
    const result = await savePaymentResult({
      tossOrderId: orderId,
      paymentKey,
      amountKRW: Number(amount),
    })

    if (!result.success) {
      console.error('[PaymentSuccessPage] savePaymentResult error:', result.error)
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white px-6 py-24">
      <div className="w-full max-w-md space-y-8 text-center">
        <div className="space-y-3">
          <p className="text-[10px] uppercase tracking-[3px] text-black/40">Byredo</p>
          <h1 className="text-2xl font-bold uppercase tracking-[2px]">Payment Complete</h1>
          <p className="text-[11px] uppercase tracking-[1.6px] text-black/55">
            Thank you. Your order has been confirmed.
          </p>
        </div>

        <div className="border border-black/10 bg-[#fafafa] p-6 text-left space-y-3">
          {orderId && (
            <div className="flex justify-between text-[10px] uppercase tracking-[1.4px]">
              <span className="text-black/50">Order ID</span>
              <span className="font-medium text-black truncate ml-4 max-w-[220px]">{orderId}</span>
            </div>
          )}
          {amount && (
            <div className="flex justify-between text-[10px] uppercase tracking-[1.4px]">
              <span className="text-black/50">Amount</span>
              <span className="font-medium text-black">
                {Number(amount).toLocaleString('ko-KR')} KRW
              </span>
            </div>
          )}
          {paymentKey && (
            <div className="flex justify-between text-[10px] uppercase tracking-[1.4px]">
              <span className="text-black/50">Payment Key</span>
              <span className="font-medium text-black truncate ml-4 max-w-[180px]">{paymentKey}</span>
            </div>
          )}
        </div>

        <Link
          href="/shop"
          className="inline-block h-12 w-full bg-black text-center text-[11px] font-medium uppercase leading-[48px] tracking-[2.2px] text-white transition-opacity hover:opacity-80"
        >
          Continue Shopping
        </Link>
      </div>
    </main>
  )
}
