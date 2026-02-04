import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Shop - Byredo',
  description: 'Browse our collection of fragrances and beauty products',
}

// Product data matching the image
const products = [
  {
    id: 1,
    name: 'MOJAVE GHOST',
    category: 'EAU DE PARFUM',
    price: '420 €',
    size: '250 ml',
    sizeInfo: '+2 SIZE',
    image: '/images/products/shop_1.png',
    tryItFirst: true,
  },
  {
    id: 2,
    name: 'CASABLANCA LILY',
    category: 'PERFUME EXTRACT',
    price: '340 €',
    size: '',
    sizeInfo: '',
    image: '/images/products/shop_2.png',
    tryItFirst: true,
  },
  {
    id: 3,
    name: 'LA SÉLECTION BYREDO',
    category: 'TRAVEL SIZE',
    price: '129 €',
    size: '',
    sizeInfo: '',
    image: '/images/products/shop_3.png',
    tryItFirst: true,
  },
  {
    id: 4,
    name: 'BLACK SAFFRON',
    category: 'EAU DE PARFUM',
    price: '420 €',
    size: '250 ml',
    sizeInfo: '+2 SIZE',
    image: '/images/products/shop_4.png',
    tryItFirst: true,
  },
  {
    id: 5,
    name: 'BIBLIOTHÈQUE',
    category: 'EAU DE PARFUM',
    price: '185 €',
    size: '100 ml',
    sizeInfo: '+2 SIZE',
    image: '/images/products/shop_5.png',
    tryItFirst: true,
  },
  {
    id: 6,
    name: 'VANILLE ANTIQUE',
    category: 'NIGHT VEILS',
    price: '275 €',
    size: '75 ml',
    sizeInfo: '',
    image: '/images/products/shop_6.png',
    tryItFirst: true,
  },
  {
    id: 7,
    name: 'GYPSY WATER',
    category: 'EAU DE PARFUM',
    price: '185 €',
    size: '100 ml',
    sizeInfo: '+2 SIZE',
    image: '/images/products/shop_7.png',
    tryItFirst: true,
  },
  {
    id: 8,
    name: 'BOIS OBSCUR',
    category: 'NIGHT VEILS',
    price: '275 €',
    size: '75 ml',
    sizeInfo: '',
    image: '/images/products/shop_8.png',
    tryItFirst: true,
  },
]

export default function ShopPage(): React.JSX.Element {
  return (
    <div className="bg-white w-full">
      <Header />
      
      <main className="flex-1 w-full py-6 md:py-12 mt-[48px]">
        <div className="container-grid">
          {/* Product Grid - 2 columns on mobile, 4 columns on desktop */}
          {products.map((product) => (
            <div
              key={product.id}
              className="col-span-6 lg:col-span-3 mb-4 md:mb-8"
            >
              <Link
                href={`/shop/${product.name.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <div className="relative overflow-hidden bg-[#f5f5f5]">
                  {/* Try It First Badge and Cart Icon */}
                  <div className="absolute top-0 left-0 right-0 z-10 flex justify-between items-start p-2 md:p-3">
                    <div className="bg-white px-1.5 py-0.5 md:px-2 md:py-1 text-[7px] md:text-[9px] uppercase tracking-[0.3px] md:tracking-[0.5px] font-['Sk-Modernist',sans-serif] font-normal">
                      TRY-IT-FIRST
                    </div>
                    <button className="cursor-pointer bg-white rounded-full w-[18px] h-[18px] md:w-[22px] md:h-[22px] flex items-center justify-center" aria-label="Add to cart">
                      <svg width="12" height="12" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="md:w-[14px] md:h-[14px]">
                        <rect x="2" y="4.5" width="10" height="8.5" stroke="#333333" strokeWidth="1.1" fill="none" rx="1"/>
                        <rect x="4.5" y="1.5" width="5" height="3" stroke="#333333" strokeWidth="1.2" fill="none" rx="0.8"/>
                      </svg>
                    </button>
                  </div>

                  {/* Product Image */}
                  <div className="relative aspect-square w-full overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 50vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  </div>
                </div>
              </Link>

              {/* Product Info with Bookmark */}
              <div className="mt-2 md:mt-3 space-y-0.5 md:space-y-1">
                <p className="text-[7px] md:text-[9px] uppercase tracking-[0.3px] md:tracking-[0.5px] font-['Sk-Modernist',sans-serif] font-normal text-black">
                  {product.category}
                </p>
                <h3 className="text-[11px] md:text-[13px] font-['Sk-Modernist',sans-serif] font-bold uppercase tracking-[0.2px] md:tracking-[0.3px] text-black">
                  {product.name}
                </h3>
                <div className="flex items-center justify-between pt-0.5 md:pt-1">
                  <p className="text-[9px] md:text-[11px] font-['Sk-Modernist',sans-serif] font-normal text-black">{product.price}</p>
                  <div className="flex items-center gap-1.5 md:gap-2">
                    {product.size && (
                      <p className="text-[7px] md:text-[9px] font-['Sk-Modernist',sans-serif] font-normal text-black">{product.size} <span className="ml-0.5 md:ml-1">{product.sizeInfo}</span></p>
                    )}
                    <Image 
                      src="/images/mark.png" 
                      alt="Bookmark" 
                      width={9} 
                      height={9}
                      className="object-contain cursor-pointer md:w-[11px] md:h-[11px]"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  )
}
