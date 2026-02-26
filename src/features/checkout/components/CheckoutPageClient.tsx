'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import type { ShopProduct } from '@/features/shop/catalog'
import { formatShopCurrency } from '@/features/shop/catalog'
import CheckoutOrderSummary from '@/features/checkout/components/CheckoutOrderSummary'
import CheckoutQuantityControl from '@/features/checkout/components/CheckoutQuantityControl'
import { buildPaymentPreparationPayload, calculateOrderTotal } from '@/features/checkout/lib/checkout'

type CheckoutPageClientProps = {
  product: ShopProduct
}

export default function CheckoutPageClient({
  product,
}: CheckoutPageClientProps): React.JSX.Element {
  const [quantity, setQuantity] = useState(1)

  const lineItems = [{ product, quantity }]
  const totalAmount = calculateOrderTotal(lineItems)
  const paymentDraft = buildPaymentPreparationPayload({
    orderId: `draft-${product.slug}`,
    items: lineItems,
  })

  return (
    <div className="min-h-screen bg-white text-black">
      <Header />

      <main className="px-4 pb-16 pt-24 md:px-8 md:pb-20 md:pt-28">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 overflow-hidden border border-black/15 bg-white md:min-h-[680px] md:grid-cols-2">
          <section className="relative border-b border-black/10 bg-[#efefef] p-5 md:border-b-0 md:border-r md:border-black/10 md:p-10">
            <div className="mb-5 flex items-center justify-between">
              <p className="text-[10px] uppercase tracking-[2px] text-black/60">Checkout</p>
              <Link
                href={`/shop/${product.slug}`}
                className="text-[10px] uppercase tracking-[2px] text-black/60 transition-opacity hover:opacity-60"
              >
                Back to Product
              </Link>
            </div>

            <div className="flex h-full flex-col justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-[1.8px] text-black/50">{product.category}</p>
                <h1 className="mt-3 max-w-[18ch] text-2xl font-bold uppercase leading-tight tracking-[1.2px] md:text-4xl">
                  {product.name}
                </h1>
                <p className="mt-4 text-xs uppercase tracking-[1.5px] text-black/60 md:text-sm">
                  Review item details before payment activation.
                </p>
              </div>

              <div className="mt-8 border border-black/10 bg-white p-3 md:mt-10 md:p-4">
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#e8e8e8]">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                </div>
                <div className="mt-3 flex items-center justify-between text-xs uppercase tracking-[1.4px] text-black/70">
                  <span>Unit Price</span>
                  <span className="font-bold text-black">
                    {formatShopCurrency(product.price, product.currency)}
                  </span>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-white p-5 md:p-10">
            <div className="mb-6 flex items-end justify-between border-b border-black/10 pb-4">
              <div>
                <p className="text-[10px] uppercase tracking-[1.8px] text-black/60">Payment Panel</p>
                <h2 className="mt-2 text-xl font-bold uppercase tracking-[1.2px] md:text-2xl">
                  Order Review
                </h2>
              </div>
              <p className="text-[10px] uppercase tracking-[1.8px] text-black/50">Monochrome Layout</p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between gap-4 rounded-none border border-black/10 bg-[#fafafa] p-4">
                <div>
                  <p className="text-[10px] uppercase tracking-[1.6px] text-black/60">Quantity</p>
                  <p className="mt-2 text-xs uppercase tracking-[1.2px] text-black/70">
                    Update quantity before payment.
                  </p>
                </div>
                <CheckoutQuantityControl value={quantity} onChange={setQuantity} />
              </div>

              <CheckoutOrderSummary product={product} quantity={quantity} total={totalAmount} />

              <div className="space-y-3 border border-dashed border-black/20 bg-[#f7f7f7] p-4">
                <p className="text-[10px] uppercase tracking-[1.6px] text-black/60">
                  Future Integration Notes
                </p>
                <ul className="space-y-2 text-xs uppercase tracking-[1.2px] text-black/70 md:text-sm">
                  <li>Supabase: store checkout session, customer profile, and order state.</li>
                  <li>Toss Payments: send validated server payload for payment initiation.</li>
                  <li>Route Handler: verify product price and quantity before request.</li>
                </ul>
              </div>

              <details className="border border-black/10 bg-[#fcfcfc] p-4">
                <summary className="cursor-pointer text-[10px] uppercase tracking-[1.6px] text-black/60">
                  Draft Payment Payload Preview
                </summary>
                <pre className="mt-3 overflow-x-auto whitespace-pre-wrap text-[10px] leading-5 text-black/75 md:text-xs">
{JSON.stringify(paymentDraft, null, 2)}
                </pre>
              </details>

              <button
                type="button"
                disabled
                className="h-12 w-full cursor-not-allowed bg-black text-[11px] font-medium uppercase tracking-[2.2px] text-white opacity-70"
              >
                Payment Coming Soon
              </button>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}
