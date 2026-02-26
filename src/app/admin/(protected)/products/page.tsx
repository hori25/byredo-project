import { AdminShell } from '@/features/admin/components/AdminShell'
import Link from 'next/link'
import {
  AdminDataTable,
  AdminPageSection,
  formatAdminCurrency,
  formatAdminDate,
  shortAdminId,
} from '@/features/admin/components/AdminDataTable'
import { listProducts } from '@/features/products/server/products.repository'

export default async function AdminProductsPage() {
  const products = await listProducts()
  return (
    <AdminShell
      title="상품 관리"
      description="products 테이블 데이터를 조회하는 관리자 전용 목록 화면입니다."
    >
      <AdminPageSection
        title="상품 데이터 테이블"
        description="최근 생성 순으로 20개 조회"
        rightSlot={
          <div className="flex items-center gap-2">
            <Link
              href="/admin/products/new"
              className="rounded-lg border border-black/10 bg-[#fafafa] px-3 py-2 text-sm font-medium text-black hover:bg-white"
            >
              상품 추가
            </Link>
            {products[0] ? (
              <Link
                href={`/admin/products/${products[0].id}/edit`}
                className="rounded-lg border border-black bg-black px-3 py-2 text-sm font-medium text-white hover:bg-white hover:text-black"
              >
                첫 상품 수정
              </Link>
            ) : null}
          </div>
        }
      >
        <AdminDataTable
          columns={[
            { key: 'image', header: '사진', type: 'image', className: 'w-[88px]', cellClassName: 'w-[88px]' },
            { key: 'id', header: 'ID' },
            { key: 'name', header: '상품명' },
            { key: 'price', header: '가격' },
            { key: 'status', header: '상태' },
            { key: 'created_at', header: '생성일' },
          ]}
          rows={products.map((row) => ({
            __href: `/admin/products/${row.id}/edit`,
            image: row.image ?? '',
            id: shortAdminId(row.id),
            name: row.name ?? '-',
            price: formatAdminCurrency(row.price),
            status: row.is_active ? 'active' : 'inactive',
            created_at: formatAdminDate(row.created_at),
          }))}
          emptyMessage="상품 데이터가 없습니다."
          rowLinkKey="__href"
        />
      </AdminPageSection>
    </AdminShell>
  )
}
