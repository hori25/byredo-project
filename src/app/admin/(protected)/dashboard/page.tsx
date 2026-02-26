import { AdminShell } from '@/features/admin/components/AdminShell'
import { AdminDashboardWorkspace } from '@/features/admin/dashboard/components/AdminDashboardWorkspace'
import {
  FALLBACK_DASHBOARD_DATA,
  getAdminDashboardData,
} from '@/features/admin/dashboard/server/dashboard.repository'
import { listUsers } from '@/features/users/server/users.repository'
import type { AdminUserRow } from '@/features/users/server/users.repository'

export default async function AdminDashboardPage() {
  let data = FALLBACK_DASHBOARD_DATA
  let users: AdminUserRow[] = []
  try {
    ;[data, users] = await Promise.all([getAdminDashboardData(), listUsers()])
  } catch (e) {
    console.error('[AdminDashboardPage] getAdminDashboardData failed:', e)
  }

  return (
    <AdminShell
      title="관리자 대시보드"
      description="시스템 관리 및 모니터링"
    >
      <AdminDashboardWorkspace data={data} users={users} />
    </AdminShell>
  )
}
