'use client'

import { useEffect, useState } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import { useRouter } from 'next/navigation'
import {
  type GrantAdminActionState,
  grantAdminRoleByEmailAction,
} from '@/features/users/actions'

const GRANT_ADMIN_INITIAL_STATE: GrantAdminActionState = {
  status: 'idle',
  message: null,
}

export function AdminGrantAdminModal() {
  const [open, setOpen] = useState(false)
  const [state, formAction] = useFormState(grantAdminRoleByEmailAction, GRANT_ADMIN_INITIAL_STATE)
  const router = useRouter()

  useEffect(() => {
    if (state.status !== 'success') return

    router.refresh()
    const timer = window.setTimeout(() => {
      setOpen(false)
    }, 600)

    return () => window.clearTimeout(timer)
  }, [router, state.status])

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded-lg border border-black bg-black px-3 py-2 text-sm font-medium text-white hover:bg-white hover:text-black"
      >
        관리자 계정 추가
      </button>

      {open ? (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/40 p-4">
          <button
            type="button"
            aria-label="팝업 닫기"
            className="absolute inset-0"
            onClick={() => setOpen(false)}
          />

          <div className="relative w-full max-w-md rounded-xl border border-black/10 bg-white p-5 shadow-[0_12px_40px_rgba(0,0,0,0.14)]">
            <div className="mb-4">
              <h3 className="text-lg font-semibold tracking-tight">관리자 권한 부여</h3>
              <p className="mt-1 text-sm text-black/55">
                회원 이메일을 입력하면 `profiles.role`을 `admin`으로 변경합니다.
              </p>
            </div>

            <form action={formAction} className="space-y-4">
              <label className="block">
                <span className="mb-2 block text-xs font-medium text-black/55">이메일</span>
                <input
                  name="email"
                  type="email"
                  placeholder="admin@example.com"
                  required
                  className="h-11 w-full rounded-lg border border-black/10 px-3 text-sm outline-none focus:border-black"
                />
              </label>

              {state.message ? (
                <p
                  className={`text-sm ${
                    state.status === 'error' ? 'text-red-600' : 'text-emerald-700'
                  }`}
                >
                  {state.message}
                </p>
              ) : null}

              <div className="flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-lg border border-black/10 bg-[#fafafa] px-3 py-2 text-sm font-medium text-black hover:bg-white"
                >
                  취소
                </button>
                <SubmitButton />
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </>
  )
}

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-lg border border-black bg-black px-3 py-2 text-sm font-medium text-white hover:bg-white hover:text-black disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? '처리중...' : '관리자 권한 부여'}
    </button>
  )
}
