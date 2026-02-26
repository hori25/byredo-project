import { NextResponse } from 'next/server'
import { listPublicShopProducts } from '@/features/products/server/products.repository'
import { toShopProduct } from '@/features/shop/catalog'

export async function GET() {
  try {
    const rows = await listPublicShopProducts()
    const products = rows.map((row) =>
      toShopProduct({
        id: row.id,
        slug: row.slug,
        name: row.name,
        category: row.category,
        price: row.price,
        image: row.image,
        size: row.size,
        size_info: row.size_info,
        try_it_first: row.try_it_first,
      }),
    )

    return NextResponse.json({ products })
  } catch (error) {
    console.error('[GET /api/shop-products]', error)
    return NextResponse.json({ products: [] }, { status: 500 })
  }
}

