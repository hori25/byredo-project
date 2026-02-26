import Link from 'next/link'

type PaymentFailSearchParams = {
  code?: string
  message?: string
  orderId?: string
}

type PaymentFailPageProps = {
  searchParams: Promise<PaymentFailSearchParams>
}

export default async function PaymentFailPage({
  searchParams,
}: PaymentFailPageProps): Promise<React.JSX.Element> {
  const { code, message, orderId } = await searchParams

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white px-6 py-24">
      <div className="w-full max-w-md space-y-8 text-center">
        <div className="space-y-3">
          <p className="text-[10px] uppercase tracking-[3px] text-black/40">Byredo</p>
          <h1 className="text-2xl font-bold uppercase tracking-[2px]">Payment Failed</h1>
          <p className="text-[11px] uppercase tracking-[1.6px] text-black/55">
            Your payment could not be completed. Please try again.
          </p>
        </div>

        {(code ?? message ?? orderId) && (
          <div className="border border-black/10 bg-[#fafafa] p-6 text-left space-y-3">
            {orderId && (
              <div className="flex justify-between text-[10px] uppercase tracking-[1.4px]">
                <span className="text-black/50">Order ID</span>
                <span className="font-medium text-black">{orderId}</span>
              </div>
            )}
            {code && (
              <div className="flex justify-between text-[10px] uppercase tracking-[1.4px]">
                <span className="text-black/50">Error Code</span>
                <span className="font-medium text-black">{code}</span>
              </div>
            )}
            {message && (
              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-[1.4px] text-black/50">Message</span>
                <p className="text-[11px] text-black/70">{message}</p>
              </div>
            )}
          </div>
        )}

        <div className="flex flex-col gap-3">
          <Link
            href="/shop"
            className="inline-block h-12 w-full bg-black text-center text-[11px] font-medium uppercase leading-[48px] tracking-[2.2px] text-white transition-opacity hover:opacity-80"
          >
            Return to Shop
          </Link>
          <button
            type="button"
            onClick={() => window.history.back()}
            className="h-12 w-full border border-black/20 text-[11px] font-medium uppercase tracking-[2.2px] text-black/70 transition-colors hover:border-black hover:text-black"
          >
            Try Again
          </button>
        </div>
      </div>
    </main>
  )
}
