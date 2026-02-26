'use client'

import { motion, type HTMLMotionProps } from 'framer-motion'
import React, { forwardRef, useEffect, useMemo, useRef, useState } from 'react'

export type RevealProps = Omit<
  HTMLMotionProps<'div'>,
  'children' | 'initial' | 'animate' | 'whileInView' | 'viewport' | 'transition'
> & {
  children: React.ReactNode
  /**
   * Seconds. Use `index * 0.15` for stagger.
   */
  delay?: number
  /**
   * Reveal once when entering the viewport.
   */
  once?: boolean
  /**
   * Viewport amount (0~1). Higher means more of the element must be visible.
   */
  amount?: number
}

const DEFAULT_EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1]

const Reveal = forwardRef<HTMLDivElement, RevealProps>(function Reveal(
  { children, className, delay = 0, once = true, amount = 0.25, style, ...rest },
  ref
): React.JSX.Element {
  const localRef = useRef<HTMLDivElement | null>(null)
  const [isRevealed, setIsRevealed] = useState(false)

  const normalizedAmount = useMemo((): number => {
    if (Number.isNaN(amount)) return 0.25
    return Math.min(1, Math.max(0, amount))
  }, [amount])

  useEffect(() => {
    if (isRevealed) return

    const prefersReducedMotion =
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false

    if (prefersReducedMotion) {
      setIsRevealed(true)
      return
    }

    const el = localRef.current
    if (!el) return

    let rafId: number | null = null
    let disconnected = false

    const revealNow = (): void => {
      if (disconnected) return
      setIsRevealed(true)
    }

    const checkInViewFallback = (): void => {
      const target = localRef.current
      if (!target) return

      const rect = target.getBoundingClientRect()
      const viewportHeight = window.innerHeight || 0
      if (viewportHeight <= 0 || rect.height <= 0) return

      const visibleTop = Math.max(rect.top, 0)
      const visibleBottom = Math.min(rect.bottom, viewportHeight)
      const visibleHeight = Math.max(0, visibleBottom - visibleTop)
      const ratio = visibleHeight / rect.height

      if (ratio >= normalizedAmount) {
        revealNow()
      }
    }

    // IntersectionObserver (primary)
    const observer =
      typeof IntersectionObserver !== 'undefined'
        ? new IntersectionObserver(
            (entries) => {
              const entry = entries[0]
              if (!entry) return
              if (entry.isIntersecting) {
                revealNow()
              }
            },
            { threshold: normalizedAmount }
          )
        : null

    if (observer) {
      observer.observe(el)
    }

    // Scroll/resize fallback (handles edge cases when IO is unreliable)
    const scheduleFallbackCheck = (): void => {
      if (rafId != null) return
      rafId = window.requestAnimationFrame(() => {
        rafId = null
        checkInViewFallback()
      })
    }

    window.addEventListener('scroll', scheduleFallbackCheck, { passive: true })
    window.addEventListener('resize', scheduleFallbackCheck)
    scheduleFallbackCheck()

    return () => {
      disconnected = true
      if (observer) observer.disconnect()
      window.removeEventListener('scroll', scheduleFallbackCheck)
      window.removeEventListener('resize', scheduleFallbackCheck)
      if (rafId != null) {
        window.cancelAnimationFrame(rafId)
      }
    }
  }, [isRevealed, normalizedAmount])

  return (
    <motion.div
      ref={(node) => {
        localRef.current = node
        if (typeof ref === 'function') {
          ref(node)
        } else if (ref && 'current' in ref) {
          ref.current = node
        }
      }}
      className={className}
      style={{
        willChange: 'transform, opacity, clip-path',
        ...style,
      }}
      initial={{
        opacity: 0,
        y: 24,
        clipPath: 'inset(0% 0% 100% 0%)',
      }}
      animate={
        isRevealed
          ? { opacity: 1, y: 0, clipPath: 'inset(0% 0% 0% 0%)' }
          : { opacity: 0, y: 24, clipPath: 'inset(0% 0% 100% 0%)' }
      }
      transition={{
        duration: 0.8,
        delay,
        ease: DEFAULT_EASE,
      }}
      {...rest}
    >
      {children}
    </motion.div>
  )
})

export default Reveal

