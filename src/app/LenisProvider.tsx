 'use client'
 
import Lenis from 'lenis'
import { usePathname } from 'next/navigation'
import { type PropsWithChildren, useEffect, useRef } from 'react'
 
 export function LenisProvider({
   children,
}: PropsWithChildren): React.JSX.Element {
  const pathname = usePathname()
  const isAdminRoute = pathname?.startsWith('/admin') ?? false
  const lenisRef = useRef<Lenis | null>(null)
  const rafIdRef = useRef<number | null>(null)

  useEffect(() => {
    if (isAdminRoute) {
      if (rafIdRef.current != null) {
        window.cancelAnimationFrame(rafIdRef.current)
      }
      rafIdRef.current = null
      lenisRef.current?.destroy()
      lenisRef.current = null
      document.documentElement.classList.remove('lenis')
      document.body.classList.remove('lenis', 'lenis-smooth', 'lenis-stopped', 'lenis-scrolling')
      return
    }

    const prefersReducedMotion =
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false
 
     if (prefersReducedMotion) {
       return
     }
 
     const lenis = new Lenis({
       smoothWheel: true,
      syncTouch: true,
       lerp: 0.1,
     })
 
     lenisRef.current = lenis
 
     const raf = (time: number): void => {
       lenis.raf(time)
       rafIdRef.current = window.requestAnimationFrame(raf)
     }
 
     rafIdRef.current = window.requestAnimationFrame(raf)
 
     return () => {
       if (rafIdRef.current != null) {
         window.cancelAnimationFrame(rafIdRef.current)
       }
       rafIdRef.current = null
 
       lenisRef.current?.destroy()
       lenisRef.current = null
     }
  }, [isAdminRoute])
 
  return <>{children}</>
}
