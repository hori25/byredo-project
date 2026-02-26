'use client'

import Link from 'next/link'
import type { ReactNode } from 'react'
import type { AdminUserRow } from '@/features/users/server/users.repository'
import type { AdminDashboardData } from '@/features/admin/dashboard/server/dashboard.repository'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faUsers,
  faBox,
  faCreditCard,
  faSearch,
  faPlus,
  faPenToSquare,
} from '@fortawesome/free-solid-svg-icons'

export function AdminDashboardWorkspace({
  data,
  users,
}: {
  data: AdminDashboardData
  users: AdminUserRow[]
}) {
  return (
    <div className="space-y-8">
      <SectionCard
        icon={faUsers}
        title="회원 관리"
        subtitle="관리자 계정 권한 부여 및 회원 상태 확인"
        toolbar={
          <>
            <div className="relative min-w-[240px] flex-1">
              <FontAwesomeIcon
                icon={faSearch}
                className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400"
              />
              <input
                type="search"
                placeholder="이메일 또는 이름 검색"
                className="w-full rounded-lg border border-neutral-300 bg-white py-2.5 pl-10 pr-4 text-sm text-black placeholder:text-neutral-400 focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
              />
            </div>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-lg bg-black px-4 py-2.5 text-sm font-medium text-white transition hover:bg-neutral-800"
            >
              <FontAwesomeIcon icon={faPlus} className="h-3.5 w-3.5" />
              관리자 계정 추가
            </button>
          </>
        }
      >
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-neutral-200">
                {['이름', '이메일', '권한', '생성일'].map((h) => (
                  <th
                    key={h}
                    className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-neutral-500"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {users.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-sm text-neutral-500">
                    회원 데이터가 없습니다.
                  </td>
                </tr>
              ) : (
                users.slice(0, 8).map((u) => (
                  <tr key={u.id} className="transition-colors hover:bg-neutral-50">
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-black">
                      {u.full_name ?? '-'}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-600">
                      {u.email ?? '-'}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          u.role === 'admin'
                            ? 'bg-black text-white'
                            : 'bg-neutral-100 text-neutral-700'
                        }`}
                      >
                        {u.role ?? 'customer'}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-500">
                      {formatDate(u.created_at)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </SectionCard>

      <SectionCard
        icon={faBox}
        title="상품 관리"
        subtitle="상품 리스트 확인 및 상품 추가/수정 페이지 이동"
        toolbar={
          <>
            <Link
              href="/admin/products/new"
              className="inline-flex items-center gap-2 rounded-lg border border-neutral-300 bg-white px-4 py-2.5 text-sm font-medium text-black transition hover:bg-neutral-50"
            >
              <FontAwesomeIcon icon={faPlus} className="h-3.5 w-3.5" />
              상품 추가
            </Link>
            <Link
              href="/admin/products/sample/edit"
              className="inline-flex items-center gap-2 rounded-lg bg-black px-4 py-2.5 text-sm font-medium text-white transition hover:bg-neutral-800"
            >
              <FontAwesomeIcon icon={faPenToSquare} className="h-3.5 w-3.5" />
              상품 수정 UI
            </Link>
          </>
        }
      >
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-neutral-200">
                {['상품명', '가격', '상태', '생성일', 'ID'].map((h) => (
                  <th
                    key={h}
                    className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-neutral-500"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {data.recentProducts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-sm text-neutral-500">
                    상품 데이터가 없습니다.
                  </td>
                </tr>
              ) : (
                data.recentProducts.map((p) => (
                  <tr key={p.id} className="transition-colors hover:bg-neutral-50">
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-black">
                      {p.name}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-600">
                      {formatCurrency(p.price)}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          p.is_active ? 'bg-black text-white' : 'bg-neutral-100 text-neutral-700'
                        }`}
                      >
                        {p.is_active ? 'active' : 'inactive'}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-500">
                      {formatDate(p.created_at)}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-500">
                      {shortId(p.id)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </SectionCard>

      <SectionCard
        icon={faCreditCard}
        title="결제 관리"
        subtitle="결제 데이터 테이블 (추후 Toss Payments 연동 예정)"
      >
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-neutral-200">
                {['상태', '금액', 'PG', '주문ID', '결제키', '생성일'].map((h) => (
                  <th
                    key={h}
                    className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-neutral-500"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {data.recentPayments.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-sm text-neutral-500">
                    결제 데이터가 없습니다.
                  </td>
                </tr>
              ) : (
                data.recentPayments.map((payment) => (
                  <tr key={payment.id} className="transition-colors hover:bg-neutral-50">
                    <td className="whitespace-nowrap px-6 py-4">
                      <span className="inline-flex rounded-full bg-neutral-100 px-2.5 py-0.5 text-xs font-medium text-neutral-700">
                        {payment.status}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-700">
                      {formatCurrency(payment.amount)}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-600">
                      {payment.provider ?? '-'}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-500">
                      {shortId(payment.order_id)}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-500">
                      {shortId(payment.payment_key)}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-500">
                      {formatDate(payment.created_at)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </div>
  )
}

function SectionCard({
  icon,
  title,
  subtitle,
  toolbar,
  children,
}: {
  icon: typeof faUsers
  title: string
  subtitle: string
  toolbar?: ReactNode
  children: ReactNode
}) {
  return (
    <section className="overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm">
      <div className="border-b border-neutral-200 px-6 py-5">
        <div className="flex items-center gap-2">
          <FontAwesomeIcon icon={icon} className="h-4 w-4 text-black" />
          <h2 className="text-lg font-bold text-black">{title}</h2>
        </div>
        <p className="mt-2 text-sm text-neutral-500">{subtitle}</p>
        {toolbar ? <div className="mt-4 flex flex-wrap items-center gap-3">{toolbar}</div> : null}
      </div>
      {children}
    </section>
  )
}

function shortId(value: string | null | undefined) {
  if (!value) return '-'
  return `${value.slice(0, 8)}...`
}

function formatDate(value: string | null | undefined) {
  if (!value) return '-'
  const d = new Date(value)
  if (Number.isNaN(d.getTime())) return value
  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(d)
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat('ko-KR', {
    style: 'currency',
    currency: 'KRW',
    maximumFractionDigits: 0,
  }).format(value)
}
