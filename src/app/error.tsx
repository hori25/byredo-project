'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}): React.JSX.Element {
  useEffect(() => {
    console.error('App error:', error)
  }, [error])

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-4">
      <h1 className="text-xl font-bold text-neutral-900">문제가 발생했습니다</h1>
      <p className="max-w-md text-center text-sm text-neutral-600">
        일시적인 오류가 발생했습니다. 아래 버튼으로 다시 시도해 주세요.
      </p>
      <button
        type="button"
        onClick={() => reset()}
        className="rounded-lg bg-neutral-900 px-6 py-3 text-sm font-medium text-white hover:bg-neutral-800 transition-colors"
      >
        다시 시도
      </button>
    </div>
  )
}
