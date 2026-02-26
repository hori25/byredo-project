import Link from 'next/link'
import { signInAdminWithPasswordAction } from '@/features/admin/auth/actions'
import { getAdminAuthErrorMessage } from '@/features/admin/auth/lib/auth-errors'

type AdminLoginPageProps = {
  searchParams?: {
    error?: string
    redirectTo?: string
  }
}

export default function AdminLoginPage({ searchParams }: AdminLoginPageProps) {
  const errorMessage = getAdminAuthErrorMessage(searchParams?.error)
  const redirectTo =
    searchParams?.redirectTo?.startsWith('/admin') === true
      ? searchParams.redirectTo
      : '/admin'

  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-100 px-4">
      <div className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-semibold text-zinc-900">Admin Login</h1>
        <p className="mt-2 text-sm text-zinc-600">
          Supabase Auth(이메일/비밀번호)로 관리자 인증을 진행합니다.
        </p>

        {errorMessage ? (
          <div className="mt-6 rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">
            {errorMessage}
          </div>
        ) : null}

        <form action={signInAdminWithPasswordAction} className="mt-6 space-y-4">
          <input type="hidden" name="redirectTo" value={redirectTo} />

          <div>
            <label
              htmlFor="email"
              className="mb-1 block text-sm font-medium text-zinc-700"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm outline-none ring-0 placeholder:text-zinc-400 focus:border-zinc-900"
              placeholder="admin@example.com"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-1 block text-sm font-medium text-zinc-700"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm outline-none ring-0 placeholder:text-zinc-400 focus:border-zinc-900"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800"
          >
            Sign in as Admin
          </button>
        </form>

        <Link
          href="/"
          className="mt-6 inline-flex rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700"
        >
          Back to Store
        </Link>
      </div>
    </main>
  )
}
