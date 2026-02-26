import { AdminShell } from '@/features/admin/components/AdminShell'
import { AdminProductFormPage } from '@/features/products/components/AdminProductFormPage'
import { createProductAction } from '@/features/products/actions'

export default function AdminProductCreatePage() {
  return (
    <AdminShell title="상품 추가" description="신규 상품 등록 UI 페이지">
      <AdminProductFormPage mode="create" action={createProductAction} />
    </AdminShell>
  )
}
