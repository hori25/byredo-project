export type ShopProduct = {
  id: number | string
  slug: string
  name: string
  category: string
  price: number
  currency: 'EUR'
  priceLabel: string
  size: string
  sizeInfo: string
  image: string
  tryItFirst: boolean
}

export const SHOP_PRODUCTS: ShopProduct[] = [
  {
    id: 1,
    slug: 'mojave-ghost',
    name: 'MOJAVE GHOST',
    category: 'EAU DE PARFUM',
    price: 420,
    currency: 'EUR',
    priceLabel: '420 €',
    size: '250 ml',
    sizeInfo: '+2 SIZE',
    image: '/images/products/shop_1.png',
    tryItFirst: true,
  },
  {
    id: 2,
    slug: 'casablanca-lily',
    name: 'CASABLANCA LILY',
    category: 'PERFUME EXTRACT',
    price: 340,
    currency: 'EUR',
    priceLabel: '340 €',
    size: '',
    sizeInfo: '',
    image: '/images/products/shop_2.png',
    tryItFirst: true,
  },
  {
    id: 3,
    slug: 'la-selection-byredo',
    name: 'LA SÉLECTION BYREDO',
    category: 'TRAVEL SIZE',
    price: 129,
    currency: 'EUR',
    priceLabel: '129 €',
    size: '',
    sizeInfo: '',
    image: '/images/products/shop_3.png',
    tryItFirst: true,
  },
  {
    id: 4,
    slug: 'black-saffron',
    name: 'BLACK SAFFRON',
    category: 'EAU DE PARFUM',
    price: 420,
    currency: 'EUR',
    priceLabel: '420 €',
    size: '250 ml',
    sizeInfo: '+2 SIZE',
    image: '/images/products/shop_4.png',
    tryItFirst: true,
  },
  {
    id: 5,
    slug: 'bibliotheque',
    name: 'BIBLIOTHÈQUE',
    category: 'EAU DE PARFUM',
    price: 185,
    currency: 'EUR',
    priceLabel: '185 €',
    size: '100 ml',
    sizeInfo: '+2 SIZE',
    image: '/images/products/shop_5.png',
    tryItFirst: true,
  },
  {
    id: 6,
    slug: 'vanille-antique',
    name: 'VANILLE ANTIQUE',
    category: 'NIGHT VEILS',
    price: 275,
    currency: 'EUR',
    priceLabel: '275 €',
    size: '75 ml',
    sizeInfo: '',
    image: '/images/products/shop_6.png',
    tryItFirst: true,
  },
  {
    id: 7,
    slug: 'gypsy-water',
    name: 'GYPSY WATER',
    category: 'EAU DE PARFUM',
    price: 185,
    currency: 'EUR',
    priceLabel: '185 €',
    size: '100 ml',
    sizeInfo: '+2 SIZE',
    image: '/images/products/shop_7.png',
    tryItFirst: true,
  },
  {
    id: 8,
    slug: 'bois-obscur',
    name: 'BOIS OBSCUR',
    category: 'NIGHT VEILS',
    price: 275,
    currency: 'EUR',
    priceLabel: '275 €',
    size: '75 ml',
    sizeInfo: '',
    image: '/images/products/shop_8.png',
    tryItFirst: true,
  },
]

export function getShopProductBySlug(slug: string): ShopProduct | undefined {
  return SHOP_PRODUCTS.find((product) => product.slug === slug)
}

export function toShopProduct(input: {
  id: string
  slug: string
  name: string
  category: string | null
  price: number
  image: string | null
  size: string | null
  size_info: string | null
  try_it_first: boolean
}): ShopProduct {
  return {
    id: input.id,
    slug: input.slug,
    name: input.name,
    category: input.category ?? 'PRODUCT',
    price: input.price,
    currency: 'EUR',
    priceLabel: `${input.price} €`,
    size: input.size ?? '',
    sizeInfo: input.size_info ?? '',
    image: input.image ?? '/images/products/shop_1.png',
    tryItFirst: input.try_it_first,
  }
}

export function formatShopCurrency(amount: number, currency: 'EUR' = 'EUR'): string {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount)
}
