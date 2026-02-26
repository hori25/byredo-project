'use client'

import Image from 'next/image'
import Link from 'next/link'
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
} from '@tanstack/react-table'

export type AdminDataGridColumn = {
  key: string
  header: string
  type?: 'text' | 'image'
  className?: string
  cellClassName?: string
}

export type AdminDataGridRow = Record<string, string | number | null>

export function AdminDataGrid({
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
  const table = useReactTable({
    data: rows,
    columns: columns.map<ColumnDef<AdminDataGridRow>>((column) => ({
      accessorKey: column.key,
      header: column.header,
      cell: (info) => {
        const value = info.getValue<string | number | null>()
        if (column.type === 'image') {
          const src = typeof value === 'string' ? value : ''
          if (!src) {
            return (
              <div className="flex h-12 w-12 items-center justify-center rounded-md bg-neutral-100 text-[10px] text-neutral-400">
                없음
              </div>
            )
          }

          return (
            <div className="h-12 w-12 overflow-hidden rounded-md border border-neutral-200 bg-neutral-50">
              <Image
                src={src}
                alt={String(info.row.getValue('name') ?? 'product image')}
                width={48}
                height={48}
                className="h-full w-full object-cover"
              />
            </div>
          )
        }

        return value == null || value === '' ? '-' : String(value)
      },
      meta: {
        headerClassName: column.className ?? '',
        cellClassName: column.cellClassName ?? '',
      },
    })),
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="overflow-hidden rounded-lg border border-neutral-200 bg-white">
      <div className="overflow-x-auto">
        <table className="min-w-full table-fixed divide-y divide-neutral-200">
          <thead className="bg-neutral-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className={`whitespace-nowrap px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-neutral-500 ${
                      ((header.column.columnDef.meta as { headerClassName?: string } | undefined)
                        ?.headerClassName ?? '')
                    }`}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-neutral-200 bg-white">
            {table.getRowModel().rows.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-6 py-12 text-center text-sm text-neutral-500"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => {
                const rowLink =
                  rowLinkKey && typeof row.original[rowLinkKey] === 'string'
                    ? String(row.original[rowLinkKey])
                    : null

                return (
                  <tr
                    key={row.id}
                    data-row-href={rowLink ?? undefined}
                    className={`transition-colors hover:bg-neutral-50 ${
                      rowLink ? 'cursor-pointer' : ''
                    }`}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className={`px-6 py-4 text-sm text-neutral-700 ${
                          rowLink ? 'cursor-pointer' : ''
                        } ${
                          ((cell.column.columnDef.meta as { cellClassName?: string } | undefined)
                            ?.cellClassName ?? '')
                        }`}
                      >
                        {rowLink ? (
                          <Link
                            href={rowLink}
                            className="block -mx-6 -my-4 px-6 py-4 focus:outline-none"
                          >
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </Link>
                        ) : (
                          flexRender(cell.column.columnDef.cell, cell.getContext())
                        )}
                      </td>
                    ))}
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
