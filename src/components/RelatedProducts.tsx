'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'

// Product data matching the design names and prices
const RELATED_PRODUCTS = [
  { id: 1, name: "BAL D'AFRIQUE", price: 210, image: '/images/products/shop_1.png' },
  { id: 2, name: 'MOJAVE GHOST', price: 210, image: '/images/products/shop_4.png' },
  { id: 3, name: 'GYPSY WATER', price: 210, image: '/images/products/shop_3.png' },
  { id: 4, name: 'BLANCHE', price: 210, image: '/images/products/shop_2.png' },
  { id: 5, name: "ROSE OF NO MAN'S LAND", price: 210, image: '/images/products/shop_5.png' },
  { id: 6, name: 'BIBLIOTHÈQUE', price: 210, image: '/images/products/shop_6.png' },
]

export default function RelatedProducts() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  // Show 3 items at a time
  const itemsPerPage = 3
  const maxIndex = Math.max(0, RELATED_PRODUCTS.length - itemsPerPage)

  const nextSlide = () => {
    if (currentIndex < maxIndex && !isAnimating) {
      setIsAnimating(true)
      setCurrentIndex(prev => prev + 1)
      setTimeout(() => setIsAnimating(false), 500)
    }
  }

  const prevSlide = () => {
    if (currentIndex > 0 && !isAnimating) {
      setIsAnimating(true)
      setCurrentIndex(prev => prev - 1)
      setTimeout(() => setIsAnimating(false), 500)
    }
  }

  return (
    <section 
      ref={sectionRef}
      className={`w-full bg-white py-[100px] overflow-hidden transition-all duration-1000 ease-out transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[50px]'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-[20px] relative">
        {/* Title */}
        <h2 className="text-[32px] font-['Sk-Modernist',sans-serif] font-bold mb-[60px] uppercase tracking-[-0.5px] leading-[1.1] text-[#1b1b1b]">
          Your Bracelet, Your Brilliance: Compare Pavé Styles
        </h2>

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Buttons - Absolute positioned to center of images approximately */}
          {/* Left Button */}
          <button 
            onClick={prevSlide}
            disabled={currentIndex === 0}
            className={`absolute left-[-24px] top-[calc(50%-40px)] z-10 w-[48px] h-[48px] bg-white flex items-center justify-center shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] transition-all duration-300 ${
              currentIndex === 0 ? 'opacity-30 cursor-default' : 'opacity-100 hover:scale-105 cursor-pointer'
            }`}
            aria-label="Previous slide"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          {/* Right Button */}
          <button 
            onClick={nextSlide}
            disabled={currentIndex >= maxIndex}
            className={`absolute right-[-24px] top-[calc(50%-40px)] z-10 w-[48px] h-[48px] bg-white flex items-center justify-center shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] transition-all duration-300 ${
              currentIndex >= maxIndex ? 'opacity-30 cursor-default' : 'opacity-100 hover:scale-105 cursor-pointer'
            }`}
            aria-label="Next slide"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 18L15 12L9 6" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          {/* Slides Track */}
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)` }}
            >
              {RELATED_PRODUCTS.map((product) => (
                <div key={product.id} className="w-1/3 flex-shrink-0 px-[4px]">
                  <div className="group cursor-pointer">
                    {/* Image Container - Aspect Square */}
                    <div className="relative w-full aspect-square bg-[#f5f5f5] mb-[20px] overflow-hidden">
                      <Image 
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-contain transition-transform duration-700 group-hover:scale-105 mix-blend-multiply"
                      />
                    </div>
                    
                    {/* Product Info - Centered */}
                    <div className="text-center">
                      <h3 className="font-['Sk-Modernist',sans-serif] font-bold text-[14px] uppercase tracking-[1.4px] mb-[8px] text-[#1b1b1b]">
                        {product.name}
                      </h3>
                      <p className="font-['Sk-Modernist',sans-serif] font-normal text-[14px] text-[#666666] tracking-[0.64px]">
                        ${product.price}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
