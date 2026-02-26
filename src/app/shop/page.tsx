'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { SHOP_PRODUCTS, type ShopProduct } from '@/features/shop/catalog'

export default function ShopPage(): React.JSX.Element {
  const [products, setProducts] = useState<ShopProduct[]>(SHOP_PRODUCTS)

  useEffect(() => {
    let active = true

    const load = async () => {
      try {
        const res = await fetch('/api/shop-products', { cache: 'no-store' })
        if (!res.ok) return
        const json = (await res.json()) as { products?: ShopProduct[] }
        if (active && Array.isArray(json.products) && json.products.length > 0) {
          setProducts(json.products)
        }
      } catch (error) {
        console.error('[ShopPage] failed to load products:', error)
      }
    }

    void load()

    return () => {
      active = false
    }
  }, [])

  return (
    <div className="bg-white w-full">
      <Header />
      
      <main className="flex-1 w-full py-6 md:py-12 pt-[60px] md:pt-[72px]">
        <div className="container-grid">
          {/* Product Grid - 2 columns on mobile, 4 columns on desktop */}
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              className="col-span-6 lg:col-span-3 mb-4 md:mb-8"
              initial={{ opacity: 0, y: 40, clipPath: 'inset(0% 0% 100% 0%)' }}
              animate={{ opacity: 1, y: 0, clipPath: 'inset(0% 0% 0% 0%)' }}
              transition={{
                duration: 0.6,
                delay: 0.3 + (index * 0.1), // 더 빠르게
                ease: [0.25, 0.1, 0.25, 1]
              }}
              style={{ willChange: 'transform, opacity, clip-path' }}
            >
              <Link
                href={`/shop/${product.slug}`}
              >
                <div className="relative overflow-hidden bg-[#f5f5f5]">
                  {/* Try It First Badge and Cart Icon */}
                  <div className="absolute top-0 left-0 right-0 z-10 flex justify-between items-start p-2 md:p-3">
                    {product.tryItFirst ? (
                      <div className="bg-white px-1.5 py-0.5 md:px-2 md:py-1 text-[7px] md:text-[9px] uppercase tracking-[0.3px] md:tracking-[0.5px] font-['Sk-Modernist',sans-serif] font-normal">
                        TRY-IT-FIRST
                      </div>
                    ) : <div />}
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
                  <p className="text-[9px] md:text-[11px] font-['Sk-Modernist',sans-serif] font-normal text-black">{product.priceLabel}</p>
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
            </motion.div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  )
}
