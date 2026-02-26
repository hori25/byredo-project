import { notFound } from 'next/navigation'
import CheckoutPageClient from '@/features/checkout/components/CheckoutPageClient'
import { getShopProductBySlug } from '@/features/shop/catalog'

type CheckoutPageProps = {
  params: Promise<{
    product: string
  }>
}

export default async function CheckoutPage({
  params,
}: CheckoutPageProps): Promise<React.JSX.Element> {
  const { product: productSlug } = await params
  const product = getShopProductBySlug(decodeURIComponent(productSlug))

  if (!product) {
    notFound()
  }

  return <CheckoutPageClient product={product} />
}

