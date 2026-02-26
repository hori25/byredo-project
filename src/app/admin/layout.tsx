import type { ReactNode } from 'react'

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <style>{`
        #splash-ssr {
          display: none !important;
        }
        html,
        body {
          overflow-y: auto !important;
          overflow-x: auto !important;
          height: auto !important;
          overscroll-behavior: auto !important;
        }
        html.lenis,
        body.lenis,
        body.lenis-smooth,
        body.lenis-stopped,
        body.lenis-scrolling {
          overflow: auto !important;
          height: auto !important;
        }
        html, body, body * {
          cursor: auto !important;
        }
        .custom-cursor {
          display: none !important;
        }
      `}</style>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function () {
              try {
                var el = document.getElementById('splash-ssr');
                if (el && el.parentNode) el.parentNode.removeChild(el);
                document.documentElement.style.overflow = '';
                document.documentElement.classList.remove('lenis');
                if (document.body) {
                  document.body.style.overflow = '';
                  document.body.style.overscrollBehavior = '';
                  document.body.classList.remove('lenis', 'lenis-smooth', 'lenis-stopped', 'lenis-scrolling');
                }
              } catch (e) {}
            })();
          `,
        }}
      />
      {children}
    </>
  )
}
