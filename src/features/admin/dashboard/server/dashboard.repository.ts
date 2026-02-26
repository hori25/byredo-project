import { createSupabaseServerClient } from '@/lib/supabase/server'

export type DashboardProduct = {
  id: string
  created_at: string
  name: string
  price: number
  is_active: boolean
}

export type DashboardOrder = {
  id: string
  created_at: string
  user_id: string
  product_id: string
  quantity: number
  total_amount: number
}

export type DashboardPayment = {
  id: string
  created_at: string
  order_id: string
  amount: number
  status: 'pending' | 'paid' | 'refunded' | 'canceled'
  provider: string | null
  payment_key: string | null
}

export type AdminDashboardData = {
  counts: {
    products: number
    orders: number
    payments: number
  }
  recentProducts: DashboardProduct[]
  recentOrders: DashboardOrder[]
  recentPayments: DashboardPayment[]
}

export const FALLBACK_DASHBOARD_DATA: AdminDashboardData = {
  counts: { products: 0, orders: 0, payments: 0 },
  recentProducts: [],
  recentOrders: [],
  recentPayments: [],
}

export async function getAdminDashboardData(): Promise<AdminDashboardData> {
  const supabase = await createSupabaseServerClient()

  const [productsCountResult, ordersCountResult, paymentsCountResult, productsResult, ordersResult, paymentsResult] =
    await Promise.all([
      supabase.from('products').select('*', { count: 'exact', head: true }),
      supabase.from('orders').select('*', { count: 'exact', head: true }),
      supabase.from('payments').select('*', { count: 'exact', head: true }),
      supabase
        .from('products')
        .select('id, created_at, name, price, is_active')
        .order('created_at', { ascending: false })
        .limit(8),
      supabase
        .from('orders')
        .select('id, created_at, user_id, product_id, quantity, total_amount')
        .order('created_at', { ascending: false })
        .limit(8),
      supabase
        .from('payments')
        .select('id, created_at, order_id, amount, status, provider, payment_key')
        .order('created_at', { ascending: false })
        .limit(8),
    ])

  if (productsResult.error) {
    console.error('[getAdminDashboardData:products]', productsResult.error.message)
  }
  if (ordersResult.error) {
    console.error('[getAdminDashboardData:orders]', ordersResult.error.message)
  }
  if (paymentsResult.error) {
    console.error('[getAdminDashboardData:payments]', paymentsResult.error.message)
  }

  return {
    counts: {
      products: productsCountResult.count ?? 0,
      orders: ordersCountResult.count ?? 0,
      payments: paymentsCountResult.count ?? 0,
    },
    recentProducts: ((productsResult.data ?? []) as DashboardProduct[]),
    recentOrders: ((ordersResult.data ?? []) as DashboardOrder[]),
    recentPayments: ((paymentsResult.data ?? []) as DashboardPayment[]),
  }
}

