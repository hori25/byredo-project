'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import type { User } from '@supabase/supabase-js'
import { imgVector } from "@/components/svg-idh1o"
import AuthModal, { LoginFormValues, SignupFormValues } from '@/components/AuthModal'
import { createSupabaseBrowserClient } from '@/lib/supabase/client'

interface HeaderProps {
  showPurchaseButton?: boolean
  onPurchaseClick?: () => void
  onLoginSubmit?: (values: LoginFormValues) => Promise<void> | void
  onSignupSubmit?: (values: SignupFormValues) => Promise<void> | void
}

export default function Header({
  showPurchaseButton = false,
  onPurchaseClick,
  onLoginSubmit,
  onSignupSubmit,
}: HeaderProps): React.JSX.Element {
  const [supabase] = useState(() => createSupabaseBrowserClient())
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [authModalView, setAuthModalView] = useState<'login' | 'signup'>('signup')
  const [authUser, setAuthUser] = useState<User | null>(null)

  // Trigger animation when showPurchaseButton changes
  useEffect(() => {
    if (showPurchaseButton) {
      setIsAnimating(true)
      const timer = setTimeout(() => setIsAnimating(false), 500)
      return () => clearTimeout(timer)
    }
  }, [showPurchaseButton])

  // Track scroll position
  useEffect(() => {
    const handleScroll = (): void => {
      const scrollPosition = window.scrollY
      setIsScrolled(scrollPosition > 50)
    }

    // Set initial state
    handleScroll()

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    let isMounted = true

    const loadSession = async (): Promise<void> => {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (isMounted) {
        setAuthUser(session?.user ?? null)
      }
    }

    void loadSession()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setAuthUser(session?.user ?? null)
    })

    return () => {
      isMounted = false
      subscription.unsubscribe()
    }
  }, [supabase])

  const openAuthModal = (view: 'login' | 'signup'): void => {
    setAuthModalView(view)
    setIsAuthModalOpen(true)
    setIsMenuOpen(false)
  }

  const handleLogin = async (values: LoginFormValues): Promise<void> => {
    if (onLoginSubmit) {
      await onLoginSubmit(values)
      setIsAuthModalOpen(false)
      return
    }

    const { error } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    })

    if (error) {
      throw new Error(error.message)
    }

    setIsAuthModalOpen(false)
  }

  const handleSignup = async (values: SignupFormValues): Promise<void> => {
    if (onSignupSubmit) {
      await onSignupSubmit(values)
      setIsAuthModalOpen(false)
      return
    }

    const { error } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
      options: {
        data: {
          name: values.name,
          full_name: values.name,
        },
      },
    })

    if (error) {
      throw new Error(error.message)
    }

    setIsAuthModalOpen(false)
  }

  const handleLogout = async (): Promise<void> => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error('Failed to sign out:', error.message)
      return
    }

    setIsMenuOpen(false)
  }

  return (
    <>
      <div 
        className={`fixed h-[48px] md:h-[48px] left-0 right-0 overflow-clip top-0 w-full z-50 transition-all duration-500 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-md border-b border-black/10' 
            : 'bg-transparent'
        }`}
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
              {authUser ? (
                <button
                  type="button"
                  onClick={() => void handleLogout()}
                  className="absolute border-0 bg-transparent p-0 css-ew64yg font-['Sk-Modernist',sans-serif] font-normal leading-[9px] right-[10px] not-italic text-[11px] text-black top-[20px] cursor-pointer hover:opacity-60 transition-opacity uppercase tracking-normal whitespace-nowrap"
                >
                  logout
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => openAuthModal('signup')}
                    className="absolute border-0 bg-transparent p-0 css-ew64yg font-['Sk-Modernist',sans-serif] font-normal leading-[9px] right-[10px] not-italic text-[11px] text-black top-[20px] cursor-pointer hover:opacity-60 transition-opacity uppercase tracking-normal whitespace-nowrap"
                  >
                    join
                  </button>
                  <button
                    type="button"
                    onClick={() => openAuthModal('login')}
                    className="absolute border-0 bg-transparent p-0 css-ew64yg font-['Sk-Modernist',sans-serif] font-normal leading-[9px] right-[59px] not-italic text-[11px] text-black top-[20px] cursor-pointer hover:opacity-60 transition-opacity uppercase tracking-normal whitespace-nowrap"
                  >
                    login
                  </button>
                </>
              )}
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
            {authUser ? (
              <button
                type="button"
                onClick={() => void handleLogout()}
                className="border-0 bg-transparent px-6 py-3 text-left font-['Sk-Modernist',sans-serif] font-normal text-[13px] text-black hover:bg-gray-50 transition-colors cursor-pointer uppercase tracking-normal"
              >
                logout
              </button>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => openAuthModal('login')}
                  className="border-0 bg-transparent px-6 py-3 text-left font-['Sk-Modernist',sans-serif] font-normal text-[13px] text-black hover:bg-gray-50 transition-colors cursor-pointer uppercase tracking-normal"
                >
                  login
                </button>
                <button
                  type="button"
                  onClick={() => openAuthModal('signup')}
                  className="border-0 bg-transparent px-6 py-3 text-left font-['Sk-Modernist',sans-serif] font-normal text-[13px] text-black hover:bg-gray-50 transition-colors cursor-pointer uppercase tracking-normal"
                >
                  join
                </button>
              </>
            )}
          </nav>
        </div>
      </div>
      </div>

      <AuthModal
        isOpen={isAuthModalOpen}
        initialView={authModalView}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSubmit={handleLogin}
        onSignupSubmit={handleSignup}
      />
    </>
  )
}
