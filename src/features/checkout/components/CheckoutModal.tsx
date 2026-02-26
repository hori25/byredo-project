'use client'

import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import type { ShopProduct } from '@/features/shop/catalog'
import { formatShopCurrency } from '@/features/shop/catalog'
import CheckoutOrderSummary from '@/features/checkout/components/CheckoutOrderSummary'
import CheckoutQuantityControl from '@/features/checkout/components/CheckoutQuantityControl'
import { buildPaymentPreparationPayload, calculateOrderTotal } from '@/features/checkout/lib/checkout'

type CheckoutModalProps = {
  isOpen: boolean
  onClose: () => void
  product: ShopProduct
}

const PAD = 'p-4 md:p-5'

export default function CheckoutModal({
  isOpen,
  onClose,
  product,
}: CheckoutModalProps): React.JSX.Element | null {
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    if (!isOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  useEffect(() => {
    if (isOpen) setQuantity(1)
  }, [isOpen, product.slug])

  const lineItems = useMemo(() => [{ product, quantity }], [product, quantity])
  const totalAmount = calculateOrderTotal(lineItems)
  const paymentDraft = buildPaymentPreparationPayload({
    orderId: `draft-${product.slug}`,
    items: lineItems,
  })

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center p-3 md:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="checkout-modal-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/55 backdrop-blur-[2px]"
        onClick={onClose}
        aria-label="Close checkout modal"
      />

      <div
        className="relative z-10 w-full overflow-hidden border border-black/15 bg-white shadow-[0_24px_80px_rgba(0,0,0,0.18)]"
        style={{ maxWidth: '1200px' }}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-20 flex h-9 w-9 shrink-0 items-center justify-center border border-black/15 bg-white text-[11px] uppercase tracking-[2px] text-black/70 transition-colors hover:bg-black hover:text-white"
          aria-label="Close"
        >
          X
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          <section className="border-b border-black/10 bg-[#efefef] md:border-b-0 md:border-r md:border-black/10">
            <div className={`border-b border-black/10 ${PAD}`}>
              <p className="text-[10px] uppercase tracking-[2px] text-black/60">Checkout</p>
              <h2 id="checkout-modal-title" className="mt-3 text-2xl font-bold uppercase tracking-[1.2px] md:text-3xl">
                {product.name}
              </h2>
              <p className="mt-2 text-[10px] uppercase tracking-[1.6px] text-black/50">{product.category}</p>
            </div>

            <div className={PAD}>
              <div className="border border-black/10 bg-white p-4">
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#e7e7e7]">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 40vw"
                    priority
                  />
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3 border-t border-black/10 pt-4 text-[10px] uppercase tracking-[1.4px] text-black/65">
                  <div>
                    <p>Unit Price</p>
                    <p className="mt-1 text-sm font-bold tracking-[1px] text-black">
                      {formatShopCurrency(product.price, product.currency)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p>Quantity</p>
                    <div className="mt-2 flex justify-end">
                      <CheckoutQuantityControl value={quantity} onChange={setQuantity} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-white">
            <div className={`border-b border-black/10 ${PAD}`}>
              <div>
                <p className="text-[10px] uppercase tracking-[2px] text-black/60">Order Review</p>
                <p className="mt-2 text-xs uppercase tracking-[1.4px] text-black/55">
                  Payment integration will be connected later.
                </p>
              </div>
            </div>

            <div className={`space-y-4 ${PAD}`}>
              <CheckoutOrderSummary product={product} quantity={quantity} total={totalAmount} />

              <details className="border border-black/10 bg-[#fafafa] p-4">
                <summary className="cursor-pointer text-[10px] uppercase tracking-[1.6px] text-black/60">
                  Draft Payment Payload
                </summary>
                <pre className="mt-3 max-h-[160px] overflow-auto whitespace-pre-wrap text-[10px] leading-5 text-black/75">
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
      </div>
    </div>
  )
}
