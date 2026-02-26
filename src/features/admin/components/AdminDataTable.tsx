import type { ReactNode } from 'react'
import { AdminDataGrid, type AdminDataGridColumn, type AdminDataGridRow } from '@/features/admin/components/AdminDataGrid'

export function AdminPageSection({
  title,
  description,
  rightSlot,
  children,
}: {
  title: string
  description?: string
  rightSlot?: ReactNode
  children: ReactNode
}) {
  return (
    <section className="rounded-xl border border-neutral-200 bg-white shadow-sm transition-shadow hover:shadow-md">
      <div className="flex flex-col gap-3 border-b border-neutral-100 px-6 py-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-lg font-bold tracking-tight text-neutral-900">{title}</h2>
          {description ? <p className="mt-1 text-sm text-neutral-500">{description}</p> : null}
        </div>
        {rightSlot ? <div>{rightSlot}</div> : null}
      </div>
      <div className="p-6">{children}</div>
    </section>
  )
}

export function AdminStatsGrid({
  items,
}: {
  items: Array<{ label: string; value: string | number }>
}) {
  return (
    <section className="grid gap-4 md:grid-cols-3">
      {items.map((item) => (
        <div
          key={item.label}
          className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm"
        >
          <p className="text-xs font-medium text-neutral-500 uppercase tracking-wider">{item.label}</p>
          <p className="mt-2 text-3xl font-bold tracking-tight text-neutral-900">{item.value}</p>
        </div>
      ))}
    </section>
  )
}

export function AdminDataTable({
  columns,
  rows,
  emptyMessage,
  rowLinkKey,
}: {
  columns: AdminDataGridColumn[]
  rows: AdminDataGridRow[]
  emptyMessage: string
  rowLinkKey?: string
}) {
  return (
    <AdminDataGrid
      columns={columns}
      rows={rows}
      emptyMessage={emptyMessage}
      rowLinkKey={rowLinkKey}
    />
  )
}

export function formatAdminDate(value: string | null | undefined) {
  if (!value) return '-'
  const d = new Date(value)
  if (Number.isNaN(d.getTime())) return value
  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(d)
}

export function formatAdminCurrency(value: number | string | null | undefined) {
  if (value == null) return '-'
  const num = typeof value === 'number' ? value : Number(value)
  if (Number.isNaN(num)) return String(value)
  return new Intl.NumberFormat('ko-KR', {
    style: 'currency',
    currency: 'KRW',
    maximumFractionDigits: 0,
  }).format(num)
}

export function shortAdminId(value: string | null | undefined) {
  if (!value) return '-'
  return `${value.slice(0, 8)}...`
}
