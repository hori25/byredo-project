'use client'

import { useEffect } from 'react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}): React.JSX.Element {
  useEffect(() => {
    console.error('Global error:', error)
  }, [error])

  return (
    <html lang="ko">
      <body className="bg-white text-neutral-900 antialiased">
        <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-4">
          <h1 className="text-2xl font-bold">문제가 발생했습니다</h1>
          <p className="max-w-md text-center text-neutral-600">
            예기치 않은 오류가 발생했습니다. 페이지를 새로고침하거나 아래 버튼을 눌러 주세요.
          </p>
          <button
            type="button"
            onClick={() => reset()}
            className="rounded-lg bg-neutral-900 px-6 py-3 text-sm font-medium text-white hover:bg-neutral-800 transition-colors"
          >
            다시 시도
          </button>
        </div>
      </body>
    </html>
  )
}
