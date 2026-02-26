import Image from 'next/image'
import type { ShopProduct } from '@/features/shop/catalog'
import { formatShopCurrency } from '@/features/shop/catalog'

type CheckoutOrderSummaryProps = {
  product: ShopProduct
  quantity: number
  total: number
}

export default function CheckoutOrderSummary({
  product,
  quantity,
  total,
}: CheckoutOrderSummaryProps): React.JSX.Element {
  return (
    <section className="border border-black/15 bg-white">
      <div className="flex items-center justify-between border-b border-black/10 p-4">
        <p className="text-[10px] uppercase tracking-[1.8px] text-black/60">Order Summary</p>
        <p className="text-[10px] uppercase tracking-[1.8px] text-black/60">1 Item</p>
      </div>

      <div className="border-b border-black/10 p-4">
        <div className="flex gap-4 border border-black/10 bg-[#f5f5f5] p-4">
          <div className="relative h-24 w-24 shrink-0 overflow-hidden bg-[#ebebeb]">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              sizes="96px"
            />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[10px] uppercase tracking-[1.6px] text-black/50">{product.category}</p>
            <h2 className="mt-2 text-sm font-bold uppercase tracking-[1.2px] text-black md:text-base">
              {product.name}
            </h2>
            <div className="mt-3 flex items-center justify-between text-xs uppercase tracking-[1.2px] text-black/80">
              <span>Qty {quantity}</span>
              <span className="font-medium">{formatShopCurrency(product.price, product.currency)}</span>
            </div>
          </div>
        </div>
      </div>

      <dl className="text-xs uppercase tracking-[1.4px] text-black md:text-sm">
        <div className="flex items-center justify-between gap-4 border-b border-black/10 px-4 py-3">
          <dt className="text-black/60">Product Name</dt>
          <dd className="max-w-[60%] text-right font-medium">{product.name}</dd>
        </div>
        <div className="flex items-center justify-between gap-4 border-b border-black/10 px-4 py-3">
          <dt className="text-black/60">Quantity</dt>
          <dd className="font-bold">{quantity}</dd>
        </div>
        <div className="flex items-center justify-between gap-4 border-b border-black/10 px-4 py-3">
          <dt className="text-black/60">Unit Price</dt>
          <dd className="font-medium">{formatShopCurrency(product.price, product.currency)}</dd>
        </div>
        <div className="flex items-center justify-between gap-4 bg-[#f8f8f8] px-4 py-3">
          <dt className="text-black/60">Total Payment Amount</dt>
          <dd className="text-right text-lg font-bold tracking-[1px] md:text-xl">
            {formatShopCurrency(total, product.currency)}
          </dd>
        </div>
      </dl>
    </section>
  )
}
