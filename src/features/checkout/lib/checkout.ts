import type { CheckoutLineItem, PaymentPreparationPayload } from '@/features/checkout/types'

export function calculateLineTotal(unitPrice: number, quantity: number): number {
  return unitPrice * quantity
}

export function calculateOrderTotal(items: CheckoutLineItem[]): number {
  return items.reduce((sum, item) => sum + calculateLineTotal(item.product.price, item.quantity), 0)
}

export function buildPaymentPreparationPayload(
  params: {
    orderId: string
    customerId?: string
    items: CheckoutLineItem[]
  },
): PaymentPreparationPayload {
  const { orderId, customerId, items } = params

  return {
    orderId,
    customerId,
    amount: calculateOrderTotal(items),
    currency: items[0]?.product.currency ?? 'EUR',
    items: items.map((item) => ({
      name: item.product.name,
      quantity: item.quantity,
      unitPrice: item.product.price,
    })),
  }
}

