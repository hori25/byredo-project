import { AdminShell } from '@/features/admin/components/AdminShell'
import {
  AdminDataTable,
  AdminPageSection,
  formatAdminCurrency,
  formatAdminDate,
  shortAdminId,
} from '@/features/admin/components/AdminDataTable'
import { listOrders } from '@/features/orders/server/orders.repository'

export default async function AdminOrdersPage() {
  const orders = await listOrders()
  return (
    <AdminShell title="주문 관리" description="orders 테이블 데이터를 조회하는 관리자 전용 화면입니다.">
      <AdminPageSection title="주문 데이터 테이블" description="최근 생성 순으로 20개 조회">
        <AdminDataTable
          rows={orders.map((row) => ({
            id: shortAdminId(row.id),
            user_id: shortAdminId(row.user_id),
            product_id: shortAdminId(row.product_id),
            quantity: String(row.quantity ?? '-'),
            total_amount: formatAdminCurrency(row.total_amount),
            created_at: formatAdminDate(row.created_at),
          }))}
          emptyMessage="주문 데이터가 없습니다."
          columns={[
            { key: 'id', header: '주문ID' },
            { key: 'user_id', header: '사용자' },
            { key: 'product_id', header: '상품' },
            { key: 'quantity', header: '수량' },
            { key: 'total_amount', header: '총액' },
            { key: 'created_at', header: '생성일' },
          ]}
        />
      </AdminPageSection>
    </AdminShell>
  )
}
