'use client'

import { usePathname } from 'next/navigation'
import SplashSSR from './SplashSSR'
import { CustomCursor } from '@/components/CustomCursor'
import { LenisProvider } from './LenisProvider'
import { PageTransition } from '@/components/PageTransition'

export function GlobalChrome({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isAdminRoute = pathname?.startsWith('/admin') ?? false

  return (
    <>
      {!isAdminRoute ? <SplashSSR /> : null}
      {!isAdminRoute ? <CustomCursor /> : null}
      <LenisProvider>
        <PageTransition>{children}</PageTransition>
      </LenisProvider>
    </>
  )
}

