import { AdminShell } from '@/features/admin/components/AdminShell'
import { AdminProductFormPage } from '@/features/products/components/AdminProductFormPage'
import { getProductByIdAdmin } from '@/features/products/server/products.repository'
import { updateProductAction } from '@/features/products/actions'
import { notFound } from 'next/navigation'

export default async function AdminProductEditPage({
  params,
}: {
  params: { id: string } | Promise<{ id: string }>
}) {
  const { id } = await params
  const product = await getProductByIdAdmin(id)

  if (!product) {
    notFound()
  }

  return (
    <AdminShell title="상품 수정" description="상품 수정 UI 페이지">
      <AdminProductFormPage
        mode="edit"
        productId={id}
        initialProduct={product}
        action={updateProductAction.bind(null, id)}
      />
    </AdminShell>
  )
}
