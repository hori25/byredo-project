import type { Metadata } from 'next'
import './globals.css'
import Script from 'next/script'
import { LenisProvider } from './LenisProvider'
import SplashSSR from './SplashSSR'
import { CustomCursor } from '@/components/CustomCursor'
import { PageTransition } from '@/components/PageTransition'

export const metadata: Metadata = {
  title: 'Byredo',
  description: 'Byredo - Premium Fragrance & Beauty',
  verification: {
    google: 'fF4QcooahxBJTeQINGeZsUViGDa3OiCIv9yX0hKBELk',
    other: {
      'naver-site-verification': '349c111aea08dbddc4b9d640b16a07c4e11dfe0e',
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}): React.JSX.Element {
  return (
    <html lang="en" className="bg-white">
      <body className="bg-white">
        <Script id="splash-boot" strategy="beforeInteractive">
          {`
            (function () {
              var html = document.documentElement;
              var prevHtmlOverflow = html.style.overflow;
              html.style.overflow = 'hidden';

              function lockBody() {
                var body = document.body;
                if (!body) return;
                var prevBodyOverflow = body.style.overflow;
                var prevBodyOverscroll = body.style.overscrollBehavior;
                body.style.overflow = 'hidden';
                body.style.overscrollBehavior = 'none';

                window.setTimeout(function () {
                  var el = document.getElementById('splash-ssr');
                  if (el && el.parentNode) el.parentNode.removeChild(el);
                  html.style.overflow = prevHtmlOverflow;
                  body.style.overflow = prevBodyOverflow;
                  body.style.overscrollBehavior = prevBodyOverscroll;
                }, 4000);
              }

              if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', lockBody, { once: true });
              } else {
                lockBody();
              }
            })();
          `}
        </Script>
        <SplashSSR />
        <CustomCursor />
        <LenisProvider>
          <PageTransition>{children}</PageTransition>
        </LenisProvider>
      </body>
    </html>
  )
}
