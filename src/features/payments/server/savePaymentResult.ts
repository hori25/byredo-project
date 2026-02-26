'use server'

import { revalidatePath } from 'next/cache'
import { createSupabaseAdminClient } from '@/lib/supabase/server'
import { SHOP_PRODUCTS } from '@/features/shop/catalog'

type SavePaymentResultParams = {
  tossOrderId: string
  paymentKey: string
  amountKRW: number
}

type SavePaymentResultReturn = {
  success: boolean
  error?: string
}

/**
 * orderId 포맷: `byredo-{product-slug}-{timestamp}`
 * 예: byredo-mojave-ghost-1735000000000
 */
function resolveProductName(orderId: string): string {
  const slug = orderId
    .replace(/^byredo-/, '')
    .replace(/-\d{10,}$/, '')

  return SHOP_PRODUCTS.find((p) => p.slug === slug)?.name ?? orderId
}

/**
 * 토스페이먼츠 결제 성공 후 orders + payments 테이블에 저장합니다.
 * 멱등성 보장: toss_order_id 중복 시 이미 저장된 것으로 간주하고 성공 반환.
 * 서비스 롤 키를 사용하므로 RLS를 우회합니다.
 */
export async function savePaymentResult({
  tossOrderId,
  paymentKey,
  amountKRW,
}: SavePaymentResultParams): Promise<SavePaymentResultReturn> {
  const supabase = createSupabaseAdminClient()

  // 멱등성 체크: 이미 저장된 결제인지 확인
  const { data: existing } = await supabase
    .from('orders')
    .select('id')
    .eq('toss_order_id', tossOrderId)
    .maybeSingle()

  if (existing) {
    revalidatePath('/admin/payments')
    revalidatePath('/admin')
    return { success: true }
  }

  const productName = resolveProductName(tossOrderId)

  // 주문 생성 (익명 사용자 허용 - user_id nullable)
  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert({
      product_name: productName,
      quantity: 1,
      total_amount: amountKRW,
      toss_order_id: tossOrderId,
    })
    .select('id')
    .single()

  if (orderError ?? !order) {
    console.error('[savePaymentResult] order insert failed:', orderError?.message)
    return { success: false, error: orderError?.message ?? 'Failed to create order' }
  }

  // 결제 기록 생성
  const { error: paymentError } = await supabase
    .from('payments')
    .insert({
      order_id: order.id,
      amount: amountKRW,
      status: 'paid',
      provider: 'toss-payments',
      payment_key: paymentKey,
      toss_order_id: tossOrderId,
    })

  if (paymentError) {
    console.error('[savePaymentResult] payment insert failed:', paymentError.message)
    return { success: false, error: paymentError.message }
  }

  revalidatePath('/admin/payments')
  revalidatePath('/admin')
  return { success: true }
}
