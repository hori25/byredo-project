'use client'

import { useState, useEffect, useRef } from 'react'
import { useParams } from 'next/navigation'
import Header from '@/components/Header'
import dynamic from 'next/dynamic'

import Footer from '@/components/Footer'
import RelatedProducts from '@/components/RelatedProducts'

// Dynamically import 3D viewer to avoid SSR issues
const Model3DViewer = dynamic(() => import('@/components/Model3DViewer'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <p className="font-['Sk-Modernist',sans-serif] font-bold text-[18px] text-black uppercase">Loading 3D Model...</p>
    </div>
  ),
})

// Step content data
const stepContents = [
  {
    title: 'ROUGE CHAOTIQUE',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    showPrice: true,
    price: 280
  },
  {
    title: 'CHAOTIC PASSION',
    description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum cillum dolore.',
    showPrice: false
  },
  {
    title: 'DEEP RED INTENSITY',
    description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
    showPrice: false
  },
  {
    title: 'UNVEILED ESSENCE',
    description: 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt neque porro quisquam est qui dolorem ipsum quia dolor sit amet.',
    showPrice: false
  },
  {
    title: 'PURE CONCENTRATION',
    description: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident similique sunt.',
    showPrice: false
  },
  {
    title: 'THE FINAL NOTE',
    description: 'Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae itaque earum rerum hic tenetur a sapiente delectus.',
    showPrice: false
  }
]

export default function ProductPage(): React.JSX.Element {
  const params = useParams()
  const productId = params.product ? decodeURIComponent(params.product as string) : 'rouge-chaotique'
  
  const [wishlist, setWishlist] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  
  // Pin Effect States
  const sectionRef = useRef<HTMLDivElement>(null)
  const [scrollProgress, setScrollProgress] = useState<number>(0)
  const [currentStep, setCurrentStep] = useState<number>(0)

  useEffect(() => {
    const handleScroll = (): void => {
      if (!sectionRef.current) return

      const section = sectionRef.current
      const sectionTop = section.offsetTop
      const sectionHeight = section.offsetHeight
      const viewportHeight = window.innerHeight
      
      // 섹션의 시작점과 끝점
      const scrollStart = sectionTop
      const scrollEnd = sectionTop + sectionHeight - viewportHeight
      
      // 현재 스크롤 위치
      const scrollY = window.scrollY
      
      // 진행률 계산 (0 ~ 1)
      let progress = (scrollY - scrollStart) / (scrollEnd - scrollStart)
      progress = Math.max(0, Math.min(1, progress)) // 0~1 사이로 제한
      
      setScrollProgress(progress)
      
      // 6등분 단계 계산 (0~5)
      const step = Math.min(5, Math.floor(progress * 6))
      setCurrentStep(step)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // 초기 계산

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handlePurchase = (): void => {
    console.log('Purchase clicked')
    // Add purchase logic here
  }

  return (
    <div className="relative w-full">
      {/* Header - Fixed at top */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white">
        <Header 
          showPurchaseButton={currentStep > 0} 
          onPurchaseClick={handlePurchase}
        />
      </div>
      
      {/* Pin Effect Section */}
      <div 
        ref={sectionRef}
        className="relative w-full bg-white"
        style={{ height: '600vh' }}
      >
        {/* Sticky Content - 화면에 고정 */}
        <div className="sticky top-0 left-0 h-screen w-full flex">
          {/* Left Side - 3D Area - 50% */}
          <div className="relative bg-[#ececec] w-1/2 flex items-center justify-center">
            <Model3DViewer scrollProgress={scrollProgress} />
          </div>

          {/* Right Side - Product Info - 50% */}
          <div className="relative w-1/2 flex items-center justify-center px-[80px]">
            {/* All steps content - absolute positioned and overlaid */}
            {stepContents.map((content, index) => (
              <div
                key={index}
                className="absolute max-w-[500px] w-full transition-opacity duration-500"
                style={{
                  opacity: currentStep === index ? 1 : 0,
                  pointerEvents: currentStep === index ? 'auto' : 'none'
                }}
              >
                {/* Product Title */}
                <div className="flex flex-col font-['Sk-Modernist',sans-serif] font-bold justify-center leading-[0] not-italic text-[26px] text-black uppercase w-full mb-[60px]">
                  <p className="css-4hzbpn leading-[1.5]">{content.title}</p>
                </div>

                {/* Product Description */}
                <div className="flex flex-col font-['Sk-Modernist',sans-serif] font-normal justify-center leading-[0] not-italic text-[18px] text-black uppercase w-full mb-[90px]">
                  <p className="css-4hzbpn leading-[1.8]">{content.description}</p>
                </div>

                {/* Price, Wishlist, and Purchase Button - Only for Step 0 */}
                {content.showPrice && (
                  <>
                    {/* Price and Wishlist */}
                    <div className="flex items-center justify-between w-full mb-[25px]">
                      <div className="css-g0mm18 flex flex-col font-['Sk-Modernist',sans-serif] font-bold justify-center leading-[0] not-italic text-[18px] text-black uppercase">
                        <p className="css-ew64yg leading-[1.8]">${content.price}</p>
                      </div>
                      <button 
                        onClick={() => setWishlist(!wishlist)}
                        className="relative size-[24px] cursor-pointer hover:opacity-70 transition-all flex items-center justify-center"
                        aria-label="Add to wishlist"
                      >
                        {wishlist ? (
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z" fill="black"/>
                          </svg>
                        ) : (
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M3.25 10.03C3.25 7.33 5.62 5.25 8.4 5.25C9.833 5.25 11.095 5.922 12 6.792C12.905 5.922 14.166 5.25 15.6 5.25C18.38 5.25 20.75 7.33 20.75 10.03C20.75 11.88 19.961 13.506 18.868 14.882C17.778 16.254 16.35 17.419 14.984 18.366C14.461 18.728 13.934 19.061 13.45 19.307C12.997 19.538 12.475 19.75 12 19.75C11.525 19.75 11.004 19.538 10.55 19.307C10.0194 19.0265 9.5073 18.7122 9.017 18.366C7.65 17.419 6.223 16.254 5.132 14.882C4.039 13.506 3.25 11.88 3.25 10.03ZM8.4 6.75C6.32 6.75 4.75 8.28 4.75 10.03C4.75 11.433 5.346 12.74 6.306 13.948C7.268 15.158 8.563 16.227 9.871 17.133C10.366 17.476 10.831 17.767 11.231 17.971C11.659 18.189 11.907 18.25 12 18.25C12.093 18.25 12.341 18.189 12.77 17.97C13.2414 17.7215 13.6958 17.4419 14.13 17.133C15.437 16.227 16.732 15.159 17.694 13.948C18.654 12.74 19.25 11.433 19.25 10.03C19.25 8.28 17.68 6.75 15.6 6.75C14.406 6.75 13.29 7.463 12.595 8.369C12.525 8.46026 12.4349 8.53419 12.3317 8.58507C12.2285 8.63595 12.115 8.66241 12 8.66241C11.885 8.66241 11.7715 8.63595 11.6683 8.58507C11.5651 8.53419 11.475 8.46026 11.405 8.369C10.71 7.463 9.595 6.75 8.4 6.75Z" fill="black"/>
                          </svg>
                        )}
                      </button>
                    </div>

                    {/* Purchase Button */}
                    <button 
                      onClick={handlePurchase}
                      className="bg-black h-[48px] w-full hover:bg-gray-800 transition-colors cursor-pointer"
                    >
                      <div className="flex flex-col font-['Inter',sans-serif] font-medium justify-center leading-[0] not-italic text-[11px] text-center text-white tracking-[2.2px] uppercase">
                        <p className="css-4hzbpn leading-[16.5px]">ADD TO CART</p>
                      </div>
                    </button>
                  </>
                )}
              </div>
            ))}

            {/* Image Carousel Dots - Vertically Centered on the Right */}
            <div className="absolute right-[40px] top-1/2 translate-y-[-50%]">
              <div className="flex flex-col gap-[12px]">
                {stepContents.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      // Calculate target scroll position for this step
                      if (sectionRef.current) {
                        const section = sectionRef.current
                        const sectionTop = section.offsetTop
                        const sectionHeight = section.offsetHeight
                        const viewportHeight = window.innerHeight
                        const scrollEnd = sectionTop + sectionHeight - viewportHeight
                        
                        // Calculate scroll position for the step
                        const targetProgress = (index / 6) + (1 / 12) // Center of each step
                        const targetScroll = sectionTop + (scrollEnd - sectionTop) * targetProgress
                        
                        window.scrollTo({
                          top: targetScroll,
                          behavior: 'smooth'
                        })
                      }
                    }}
                    className="w-[8px] h-[8px] rounded-full transition-all cursor-pointer"
                    style={{
                      backgroundColor: currentStep === index ? '#000' : '#ccc',
                      transform: currentStep === index ? 'scale(1.2)' : 'scale(1)',
                    }}
                    aria-label={`View step ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      <RelatedProducts />
      
      {/* Footer */}
      <Footer className="mt-[0px]" />
    </div>
  )
}
