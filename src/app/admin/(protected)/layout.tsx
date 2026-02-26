import type { ReactNode } from 'react'
import { requireAdmin } from '@/features/admin/auth/lib/admin-guard'

export default async function AdminProtectedLayout({
  children,
}: {
  children: ReactNode
}) {
  await requireAdmin()

  return children
}
