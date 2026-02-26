import { AdminShell } from '@/features/admin/components/AdminShell'
import {
  AdminDataTable,
  AdminPageSection,
  formatAdminCurrency,
  formatAdminDate,
  shortAdminId,
} from '@/features/admin/components/AdminDataTable'
import { AdminPaymentsAutoRefresh } from '@/features/admin/payments/components/AdminPaymentsAutoRefresh'
import { listPayments } from '@/features/payments/server/payments.repository'

export const dynamic = 'force-dynamic'

export default async function AdminPaymentsPage() {
  const payments = await listPayments()
  return (
    <AdminShell title="결제 관리" description="payments 테이블 데이터를 조회하는 관리자 전용 화면입니다.">
      <AdminPaymentsAutoRefresh />
      <AdminPageSection title="결제 데이터 테이블" description="최근 생성 순으로 20개 조회">
        <AdminDataTable
          rows={payments.map((row) => ({
            id: shortAdminId(row.id),
            order_id: shortAdminId(row.order_id),
            status: row.status ?? '-',
            amount: formatAdminCurrency(row.amount),
            provider: row.provider ?? '-',
            payment_key: shortAdminId(row.payment_key ?? null),
            created_at: formatAdminDate(row.created_at),
          }))}
          emptyMessage="결제 데이터가 없습니다."
          columns={[
            { key: 'id', header: '결제ID' },
            { key: 'order_id', header: '주문ID' },
            { key: 'status', header: '상태' },
            { key: 'amount', header: '금액' },
            { key: 'provider', header: 'PG' },
            { key: 'payment_key', header: '결제키' },
            { key: 'created_at', header: '생성일' },
          ]}
        />
      </AdminPageSection>
    </AdminShell>
  )
}
