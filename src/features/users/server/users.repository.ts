import { createSupabaseAdminClient } from '@/lib/supabase/server'

export type AdminUserRow = {
  id: string
  email: string | null
  full_name?: string | null
  role?: string | null
  created_at?: string | null
}

export async function listUsers(): Promise<AdminUserRow[]> {
  const supabase = createSupabaseAdminClient()

  const { data, error } = await supabase
    .from('profiles')
    .select('id, email, full_name, role, created_at')
    .order('created_at', { ascending: false })
    .limit(30)

  if (error) {
    console.error('[listUsers]', error.message)
    return []
  }

  return (data ?? []) as AdminUserRow[]
}
