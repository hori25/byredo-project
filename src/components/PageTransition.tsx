'use client'

import { AnimatePresence, motion, useIsPresent } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { ReactNode, useEffect, useRef, useState } from 'react'

interface PageTransitionProps {
  children: ReactNode
}

interface PageTransitionLayerProps {
  children: ReactNode
  isAnimating: boolean
}

function PageTransitionLayer({
  children,
  isAnimating,
}: PageTransitionLayerProps): React.JSX.Element {
  const isPresent = useIsPresent()

  return (
    <motion.div
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: 0 }}
      transition={{
        duration: 0.5,
        ease: [0.22, 0.61, 0.36, 1],
      }}
      style={{
        position: isAnimating || !isPresent ? 'fixed' : 'relative',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100%',
        minHeight: '100vh',
        backgroundColor: 'white',
        overflow: isAnimating || !isPresent ? 'auto' : 'visible',
        zIndex: isPresent ? 2 : 1,
      }}
    >
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0 }}
        exit={{ opacity: 0.4 }}
        transition={{ duration: 0.4, ease: [0.22, 0.61, 0.36, 1] }}
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'black',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />
      <div style={{ position: 'relative', zIndex: 2 }}>{children}</div>
    </motion.div>
  )
}

export function PageTransition({ children }: PageTransitionProps): React.JSX.Element {
  const pathname = usePathname()
  const isAdminRoute = pathname?.startsWith('/admin') ?? false
  const [isAnimating, setIsAnimating] = useState(false)
  const isFirstRender = useRef(true)

  useEffect(() => {
    if (isAdminRoute) {
      setIsAnimating(false)
      return
    }

    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    setIsAnimating(true)
    const timer = window.setTimeout(() => {
      setIsAnimating(false)
    }, 500)

    return () => {
      window.clearTimeout(timer)
    }
  }, [isAdminRoute, pathname])

  if (isAdminRoute) {
    return <>{children}</>
  }

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <AnimatePresence mode="sync" initial={false}>
        <PageTransitionLayer key={pathname} isAnimating={isAnimating}>
          {children}
        </PageTransitionLayer>
      </AnimatePresence>
      {isAnimating && (
        <style jsx global>{`
          body {
            overflow: hidden !important;
            overscroll-behavior: none !important;
          }
        `}</style>
      )}
    </div>
  )
}
