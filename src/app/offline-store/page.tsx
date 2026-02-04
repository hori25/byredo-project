'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Header from '@/components/Header'

gsap.registerPlugin(ScrollTrigger)

const stores = [
  {
    id: 1,
    image: '/images/offline/offline5.jpg',
    title: 'SEOUL FLAGSHIP',
    description: 'Gangnam-gu, Seoul\nKorea'
  },
  {
    id: 2,
    image: '/images/offline/offline6.jpg',
    title: 'TOKYO SHIBUYA',
    description: 'Shibuya District\nTokyo, Japan'
  },
  {
    id: 3,
    image: '/images/offline/offline7.jpg',
    title: 'NEW YORK SOHO',
    description: 'Manhattan, New York\nUnited States'
  },
  {
    id: 4,
    image: '/images/offline/offline8.jpg',
    title: 'PARIS MARAIS',
    description: 'Le Marais, Paris\nFrance'
  },
  {
    id: 5,
    image: '/images/offline/offline9.jpg',
    title: 'LONDON MAYFAIR',
    description: 'Mayfair District\nLondon, United Kingdom'
  },
  {
    id: 6,
    image: '/images/offline/offline7.jpg',
    title: 'MILAN CENTRO',
    description: 'Centro Storico, Milan\nItaly'
  }
]

export default function OfflineStorePage(): React.JSX.Element {
  const router = useRouter()
  const sectionRef = useRef<HTMLDivElement>(null)
  const horizontalRef = useRef<HTMLDivElement>(null)
  const [currentStore, setCurrentStore] = useState(1)

  useEffect(() => {
    const section = sectionRef.current
    const horizontal = horizontalRef.current
    
    if (!section || !horizontal) return

    // Calculate the horizontal scroll distance
    const scrollWidth = horizontal.scrollWidth - window.innerWidth + 70 // +70 for padding adjustment
    
    // Create the horizontal scroll animation
    const scrollTween = gsap.to(horizontal, {
      x: -scrollWidth,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: () => `+=${scrollWidth}`,
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          // Update current store based on scroll progress
          const progress = self.progress
          const storeIndex = Math.min(
            Math.floor(progress * stores.length) + 1,
            stores.length
          )
          setCurrentStore(storeIndex)
        }
      }
    })

    return () => {
      scrollTween.scrollTrigger?.kill()
      scrollTween.kill()
    }
  }, [])

  const handleStoreClick = (storeId: number): void => {
    router.push('/offline-store/detail')
  }

  return (
    <div className="relative w-full bg-white" style={{ overflowX: 'hidden' }}>
      {/* Header - Fixed positioned */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white">
        <Header />
      </div>
      
      {/* Spacer for header */}
      <div style={{ height: '48px' }} />
      
      {/* Pinned Section with Horizontal Scroll */}
      <div ref={sectionRef} className="relative w-full bg-white" style={{ height: '100vh', overflowX: 'hidden' }}>
        <div 
          ref={horizontalRef}
          className="absolute top-0 left-0 h-full flex items-center"
          style={{ paddingLeft: '40px', paddingRight: '40px', willChange: 'transform' }}
        >
          {stores.map((store, index) => (
            <div
              key={store.id}
              onClick={() => handleStoreClick(store.id)}
              className="flex flex-col items-start cursor-pointer group"
              style={{
                width: '500px',
                marginLeft: index === 0 ? '0' : '30px',
                flexShrink: 0
              }}
            >
              {/* Store Image */}
              <div className="w-[500px] h-[500px] relative overflow-hidden bg-white mb-[20px]">
                <img
                  alt={store.title}
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                  src={store.image}
                />
              </div>

              {/* Store Title */}
              <p className="font-['Sk-Modernist',sans-serif] font-bold text-[22px] text-black tracking-[1px] uppercase leading-[22px] mb-[8px]">
                {store.title}
              </p>

              {/* Store Description */}
              <p className="font-['Sk-Modernist',sans-serif] font-normal text-[14px] text-black tracking-[1px] uppercase leading-[18px] whitespace-pre-line">
                {store.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom Text Bar - Fixed to viewport */}
        <div className="fixed bottom-0 left-0 right-0 h-auto pb-[30px] px-[40px] flex items-center justify-between pointer-events-none z-40">
          {/* Scroll Indicator */}
          <div className="flex flex-col justify-center">
            <p className="font-['Sk-Modernist',sans-serif] font-bold text-[26px] text-black tracking-[1px] uppercase leading-[26px]">
              (SCROLL)
            </p>
          </div>

          {/* Store Counter */}
          <div className="flex flex-col justify-center">
            <p className="font-['Sk-Modernist',sans-serif] font-bold text-[26px] text-black tracking-[1px] uppercase leading-[26px]">
              STORE - {String(currentStore).padStart(2, '0')}
            </p>
          </div>
        </div>
      </div>
      
      {/* Spacer for scrolling */}
      <div style={{ height: '50vh' }} />
    </div>
  )
}
