import { createSupabaseServerClient } from '@/lib/supabase/server'
import { createSupabaseAdminClient } from '@/lib/supabase/server'

export type ProductRow = {
  id: string
  created_at: string
  name: string
  description: string | null
  price: number
  is_active: boolean
  slug: string
  category: string | null
  image: string | null
  size: string | null
  size_info: string | null
  try_it_first: boolean
  display_order: number
}

export async function listProducts() {
  const supabase = await createSupabaseServerClient()
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('display_order', { ascending: true })
    .order('created_at', { ascending: false })
    .limit(50)

  if (error) {
    console.error('[listProducts]', error.message)
    return []
  }

  return (data ?? []) as ProductRow[]
}

export async function listPublicShopProducts() {
  const supabase = await createSupabaseServerClient()
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('is_active', true)
    .order('display_order', { ascending: true })
    .order('created_at', { ascending: false })

  if (error) {
    console.error('[listPublicShopProducts]', error.message)
    return []
  }

  return (data ?? []) as ProductRow[]
}

export async function getProductByIdAdmin(id: string) {
  const supabase = createSupabaseAdminClient()
  const { data, error } = await supabase.from('products').select('*').eq('id', id).maybeSingle()

  if (error) {
    console.error('[getProductByIdAdmin]', error.message)
    return null
  }

  return (data as ProductRow | null) ?? null
}

export async function createProductAdmin(input: Omit<ProductRow, 'id' | 'created_at'>) {
  const supabase = createSupabaseAdminClient()
  const { data, error } = await supabase.from('products').insert(input).select('*').single()

  if (error) {
    throw new Error(error.message)
  }

  return data as ProductRow
}

export async function updateProductAdmin(
  id: string,
  input: Partial<Omit<ProductRow, 'id' | 'created_at'>>,
) {
  const supabase = createSupabaseAdminClient()
  const { data, error } = await supabase.from('products').update(input).eq('id', id).select('*').single()

  if (error) {
    throw new Error(error.message)
  }

  return data as ProductRow
}
