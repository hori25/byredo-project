import { createSupabaseServerClient } from '@/lib/supabase/server'

export type AdminOrderRow = {
  id: string
  created_at: string
  user_id: string | null
  product_id: string | null
  product_name: string | null
  quantity: number | null
  total_amount: number | null
  toss_order_id: string | null
}

export async function listOrders(): Promise<AdminOrderRow[]> {
  const supabase = await createSupabaseServerClient()
  const { data, error } = await supabase
    .from('orders')
    .select('id, created_at, user_id, product_id, product_name, quantity, total_amount, toss_order_id')
    .order('created_at', { ascending: false })
    .limit(20)

  if (error) {
    console.error('[listOrders]', error.message)
    return []
  }

  return (data ?? []) as AdminOrderRow[]
}
