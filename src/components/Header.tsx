'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { imgVector } from "@/components/svg-idh1o"

interface HeaderProps {
  showPurchaseButton?: boolean
  onPurchaseClick?: () => void
}

export default function Header({ showPurchaseButton = false, onPurchaseClick }: HeaderProps): React.JSX.Element {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  // Trigger animation when showPurchaseButton changes
  useEffect(() => {
    if (showPurchaseButton) {
      setIsAnimating(true)
      const timer = setTimeout(() => setIsAnimating(false), 500)
      return () => clearTimeout(timer)
    }
  }, [showPurchaseButton])

  return (
    <div 
      className="fixed bg-white h-[48px] md:h-[48px] left-0 right-0 overflow-clip top-0 w-full z-50 backdrop-blur-sm bg-opacity-95 border-b border-black/5 transition-all duration-500"
      style={{
        transform: isAnimating ? 'translateY(-48px)' : 'translateY(0)',
        animation: isAnimating ? 'headerSlideDown 0.5s ease-out forwards' : 'none'
      }}
      data-name="header"
    >
      <div className="container-grid h-full relative">
        {/* Logo */}
        <div className="absolute h-[18px] md:h-[21px] left-1/2 top-[15px] md:top-[14px] translate-x-[-50%] w-[85px] md:w-[100px]" data-name="Vector">
          <img alt="" className="block max-w-none size-full" src={imgVector} />
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:block">
          <Link href="/shop">
            <p className="absolute css-ew64yg font-['Sk-Modernist',sans-serif] font-normal leading-[9px] left-[10px] not-italic text-[11px] text-black top-[20px] cursor-pointer hover:opacity-60 transition-opacity uppercase tracking-normal whitespace-nowrap">
              shop
            </p>
          </Link>
          <Link href="/offline-store">
            <p className="absolute css-ew64yg font-['Sk-Modernist',sans-serif] font-normal leading-[9px] left-[63px] not-italic text-[11px] text-black top-[20px] cursor-pointer hover:opacity-60 transition-opacity uppercase tracking-normal whitespace-nowrap">
              offline-store
            </p>
          </Link>
          {showPurchaseButton ? (
            <button 
              onClick={onPurchaseClick}
              className="absolute bg-black h-[28.5px] right-[10px] top-[10px] px-[20px] hover:bg-gray-800 transition-all duration-300 cursor-pointer animate-fade-in"
              style={{ animationDelay: '0.2s', opacity: 0, animationFillMode: 'forwards' }}
            >
              <p className="font-['Inter',sans-serif] font-medium leading-[16.5px] not-italic text-[11px] text-center text-white tracking-[2.2px] uppercase">
                PURCHASE
              </p>
            </button>
          ) : (
            <>
              <p className="absolute css-ew64yg font-['Sk-Modernist',sans-serif] font-normal leading-[9px] right-[10px] not-italic text-[11px] text-black top-[20px] cursor-pointer hover:opacity-60 transition-opacity uppercase tracking-normal whitespace-nowrap">
                join
              </p>
              <p className="absolute css-ew64yg font-['Sk-Modernist',sans-serif] font-normal leading-[9px] right-[59px] not-italic text-[11px] text-black top-[20px] cursor-pointer hover:opacity-60 transition-opacity uppercase tracking-normal whitespace-nowrap">
                login
              </p>
              <p className="absolute css-ew64yg font-['Sk-Modernist',sans-serif] font-normal leading-[9px] right-[115px] not-italic text-[11px] text-black top-[20px] cursor-pointer hover:opacity-60 transition-opacity uppercase tracking-normal whitespace-nowrap">
                mypage
              </p>
            </>
          )}
        </div>

        {/* Mobile Hamburger Menu Button */}
        <button
          className="md:hidden absolute left-[10px] top-[17px] w-[18px] h-[13px] flex flex-col justify-between items-center z-50"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`w-full h-[1px] bg-black transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-[6px]' : ''}`} />
          <span className={`w-full h-[1px] bg-black transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`} />
          <span className={`w-full h-[1px] bg-black transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-[6px]' : ''}`} />
        </button>

        {/* Mobile Navigation Menu */}
        <div
          className={`md:hidden fixed left-0 top-[48px] w-full bg-white border-t border-gray-200 transition-all duration-300 ${
            isMenuOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
          }`}
        >
          <nav className="flex flex-col py-4">
            <Link href="/shop" onClick={() => setIsMenuOpen(false)}>
              <p className="px-6 py-3 font-['Sk-Modernist',sans-serif] font-normal text-[13px] text-black hover:bg-gray-50 transition-colors uppercase tracking-normal">
                shop
              </p>
            </Link>
            <Link href="/offline-store" onClick={() => setIsMenuOpen(false)}>
              <p className="px-6 py-3 font-['Sk-Modernist',sans-serif] font-normal text-[13px] text-black hover:bg-gray-50 transition-colors uppercase tracking-normal">
                offline-store
              </p>
            </Link>
            <p className="px-6 py-3 font-['Sk-Modernist',sans-serif] font-normal text-[13px] text-black hover:bg-gray-50 transition-colors cursor-pointer uppercase tracking-normal">
              mypage
            </p>
            <p className="px-6 py-3 font-['Sk-Modernist',sans-serif] font-normal text-[13px] text-black hover:bg-gray-50 transition-colors cursor-pointer uppercase tracking-normal">
              login
            </p>
            <p className="px-6 py-3 font-['Sk-Modernist',sans-serif] font-normal text-[13px] text-black hover:bg-gray-50 transition-colors cursor-pointer uppercase tracking-normal">
              join
            </p>
          </nav>
        </div>
      </div>
    </div>
  )
}
