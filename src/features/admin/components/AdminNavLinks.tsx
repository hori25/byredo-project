'use client'

import {
  faChartLine,
  faUsers,
  faBox,
  faClipboardList,
  faCreditCard,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems: Array<{ href: string; label: string; subtitle?: string; icon: typeof faChartLine }> = [
  { href: '/admin/dashboard', label: '대시보드', subtitle: 'Admin panel', icon: faChartLine },
  { href: '/admin/users', label: '사용자 관리', icon: faUsers },
  { href: '/admin/products', label: '상품 관리', icon: faBox },
  { href: '/admin/orders', label: '주문 관리', icon: faClipboardList },
  { href: '/admin/payments', label: '결제 관리', icon: faCreditCard },
]

export function AdminNavLinks() {
  const pathname = usePathname()

  return (
    <nav className="space-y-0.5">
      {navItems.map((item) => {
        const active =
          pathname === item.href ||
          (item.href !== '/admin/dashboard' && pathname?.startsWith(item.href))

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`group relative flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all ${
              active
                ? 'bg-black text-white shadow-sm'
                : 'text-neutral-600 hover:bg-neutral-200 hover:text-black'
            }`}
          >
            <div
              className={`flex h-5 w-5 shrink-0 items-center justify-center ${
                active ? 'text-white' : 'text-neutral-500 group-hover:text-black'
              }`}
            >
              <FontAwesomeIcon icon={item.icon} className="h-4 w-4" />
            </div>
            <div className="min-w-0 flex-1">
              <span className="block truncate">{item.label}</span>
              {item.subtitle && active && (
                <span className="block truncate text-xs text-neutral-300">{item.subtitle}</span>
              )}
            </div>
            {active && (
              <span className="absolute right-3 h-1.5 w-1.5 shrink-0 rounded-full bg-white" />
            )}
          </Link>
        )
      })}
    </nav>
  )
}
