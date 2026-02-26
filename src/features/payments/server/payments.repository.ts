import { createSupabaseServerClient } from '@/lib/supabase/server'

export async function listPayments() {
  const supabase = await createSupabaseServerClient()
  const { data, error } = await supabase
    .from('payments')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(20)

  if (error) {
    console.error('[listPayments]', error.message)
    return []
  }

  return data ?? []
}
