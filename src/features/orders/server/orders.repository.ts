import { createSupabaseServerClient } from '@/lib/supabase/server'

export async function listOrders() {
  const supabase = await createSupabaseServerClient()
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(20)

  if (error) {
    console.error('[listOrders]', error.message)
    return []
  }

  return data ?? []
}
