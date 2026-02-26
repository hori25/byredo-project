import { AdminShell } from '@/features/admin/components/AdminShell'
import {
  AdminDataTable,
  AdminPageSection,
  formatAdminDate,
  shortAdminId,
} from '@/features/admin/components/AdminDataTable'
import { listUsers } from '@/features/users/server/users.repository'
import { AdminGrantAdminModal } from '@/features/users/components/AdminGrantAdminModal'

export default async function AdminUsersPage() {
  let users: Awaited<ReturnType<typeof listUsers>> = []
  try {
    users = await listUsers()
  } catch (e) {
    console.error('[AdminUsersPage] listUsers failed:', e)
  }
  return (
    <AdminShell title="사용자 관리" description="profiles 테이블 기반 회원 목록 관리자 화면입니다.">
      <AdminPageSection title="회원 데이터 테이블" description="최근 생성 순으로 30개 조회">
        <div className="mb-4 flex justify-end">
          <AdminGrantAdminModal />
        </div>
        <AdminDataTable
          rows={users.map((row) => ({
            id: shortAdminId(row.id),
            email: row.email ?? '-',
            full_name: row.full_name ?? '-',
            role: row.role ?? 'customer',
            created_at: formatAdminDate(row.created_at),
          }))}
          emptyMessage="회원 데이터가 없습니다."
          columns={[
            { key: 'id', header: 'ID' },
            { key: 'email', header: '이메일' },
            { key: 'full_name', header: '이름' },
            { key: 'role', header: '권한' },
            { key: 'created_at', header: '생성일' },
          ]}
        />
      </AdminPageSection>
    </AdminShell>
  )
}
