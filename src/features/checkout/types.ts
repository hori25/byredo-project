import type { ShopProduct } from '@/features/shop/catalog'

export type CheckoutLineItem = {
  product: ShopProduct
  quantity: number
}

export type CheckoutSessionDraft = {
  productSlug: string
  quantity: number
}

export type PaymentProvider = 'toss-payments'

export type PaymentPreparationPayload = {
  orderId: string
  customerId?: string
  amount: number
  currency: string
  items: Array<{
    name: string
    quantity: number
    unitPrice: number
  }>
}

