'use client'

import { useCallback, useState } from 'react'
import { loadTossPayments, ANONYMOUS } from '@tosspayments/tosspayments-sdk'
import { env } from '@/lib/env'

/** EUR → KRW 테스트용 환율 (토스페이먼츠 일반결제는 KRW만 지원) */
const EUR_TO_KRW = 1500

type RequestPaymentParams = {
  amountEUR: number
  orderId: string
  orderName: string
}

type UseTossPaymentResult = {
  requestPayment: (params: RequestPaymentParams) => Promise<void>
  isRequesting: boolean
  error: string | null
  clearError: () => void
}

export function useTossPayment(): UseTossPaymentResult {
  const [isRequesting, setIsRequesting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const requestPayment = useCallback(async ({
    amountEUR,
    orderId,
    orderName,
  }: RequestPaymentParams): Promise<void> => {
    setIsRequesting(true)
    setError(null)

    try {
      const tossPayments = await loadTossPayments(env.tossClientKey())
      const payment = tossPayments.payment({ customerKey: ANONYMOUS })

      await payment.requestPayment({
        method: 'CARD',
        amount: {
          currency: 'KRW',
          value: Math.round(amountEUR * EUR_TO_KRW),
        },
        orderId,
        orderName,
        successUrl: `${window.location.origin}/payment/success`,
        failUrl: `${window.location.origin}/payment/fail`,
        card: {
          flowMode: 'DEFAULT',
          useEscrow: false,
          useCardPoint: false,
          useAppCardOnly: false,
        },
      })
    } catch (err) {
      const message = err instanceof Error ? err.message : '결제 요청 중 오류가 발생했습니다.'
      setError(message)
      throw err
    } finally {
      setIsRequesting(false)
    }
  }, [])

  const clearError = useCallback(() => setError(null), [])

  return { requestPayment, isRequesting, error, clearError }
}
