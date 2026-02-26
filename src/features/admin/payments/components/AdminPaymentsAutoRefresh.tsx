'use client'

import { useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'

const REFRESH_DEBOUNCE_MS = 1500

export function AdminPaymentsAutoRefresh() {
  const router = useRouter()
  const lastRefreshRef = useRef(0)

  useEffect(() => {
    const refresh = () => {
      const now = Date.now()
      if (now - lastRefreshRef.current < REFRESH_DEBOUNCE_MS) return
      lastRefreshRef.current = now
      router.refresh()
    }

    const onVisibilityChange = () => {
      if (document.visibilityState === 'visible') refresh()
    }

    window.addEventListener('focus', refresh)
    document.addEventListener('visibilitychange', onVisibilityChange)

    return () => {
      window.removeEventListener('focus', refresh)
      document.removeEventListener('visibilitychange', onVisibilityChange)
    }
  }, [router])

  return null
}
