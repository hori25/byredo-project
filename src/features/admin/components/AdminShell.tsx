'use client'

import type { ReactNode } from 'react'
import { signOutAdminAction } from '@/features/admin/auth/actions'
import { AdminNavLinks } from '@/features/admin/components/AdminNavLinks'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt, faBolt, faTimes, faDownload, faPlus, faBell } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'

export function AdminShell({
  title,
  description,
  children,
  headerActions,
}: {
  title: string
  description?: string
  children: ReactNode
  headerActions?: ReactNode
}) {
  return (
    <div className="flex h-screen w-full bg-white text-neutral-900">
      {/* Sidebar */}
      <aside className="hidden w-[280px] shrink-0 flex-col border-r border-neutral-200 bg-neutral-50 md:flex">
        <div className="flex h-16 items-center justify-between border-b border-neutral-200 px-5">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-black text-white">
              <FontAwesomeIcon icon={faBolt} className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm font-semibold text-black">Byredo Admin</p>
              <p className="text-xs text-neutral-500">Energy Management</p>
            </div>
          </div>
          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded-md text-neutral-500 hover:bg-neutral-200 hover:text-black transition-colors"
            aria-label="Close sidebar"
          >
            <FontAwesomeIcon icon={faTimes} className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-3 py-5">
          <AdminNavLinks />
        </div>

        <div className="border-t border-neutral-200 p-4">
          <div className="flex items-center gap-3 rounded-lg bg-neutral-100 p-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-black text-sm font-bold text-white">
              LG
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-black">Admin</p>
              <p className="truncate text-xs text-neutral-500">System Administrator</p>
            </div>
            <form action={signOutAdminAction}>
              <button
                type="submit"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-neutral-500 hover:bg-neutral-200 hover:text-black transition-colors"
                title="Sign out"
              >
                <FontAwesomeIcon icon={faSignOutAlt} className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex flex-1 flex-col overflow-hidden bg-white">
        <header className="flex min-h-[72px] flex-wrap items-center justify-between gap-4 border-b border-neutral-200 bg-white px-8 py-4">
          <div>
            <h1 className="text-2xl font-bold text-black">{title}</h1>
            {description && (
              <p className="mt-0.5 text-sm text-neutral-500">{description}</p>
            )}
          </div>
          <div className="flex items-center gap-3">
            {headerActions ?? (
              <>
                <button
                  type="button"
                  className="flex items-center gap-2 rounded-lg border border-neutral-300 bg-white px-4 py-2.5 text-sm font-medium text-black hover:bg-neutral-50 transition-colors"
                >
                  <FontAwesomeIcon icon={faDownload} className="h-4 w-4" />
                  데이터 내보내기
                </button>
                <Link
                  href="/admin/products"
                  className="flex items-center gap-2 rounded-lg bg-black px-4 py-2.5 text-sm font-medium text-white hover:bg-neutral-800 transition-colors"
                >
                  <FontAwesomeIcon icon={faPlus} className="h-4 w-4" />
                  새로 만들기
                </Link>
                <button
                  type="button"
                  className="relative flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-300 bg-white text-black hover:bg-neutral-50 transition-colors"
                  aria-label="알림"
                >
                  <FontAwesomeIcon icon={faBell} className="h-5 w-5" />
                  <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-black text-[10px] font-bold text-white">
                    3
                  </span>
                </button>
              </>
            )}
          </div>
        </header>

        <div className="flex-1 overflow-y-auto bg-neutral-50/50 p-8">
          <div className="mx-auto max-w-[1400px]">
            {children}
          </div>
        </div>
      </main>
    </div>
  )
}
