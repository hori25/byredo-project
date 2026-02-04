import Link from 'next/link'

type LinkButtonProps = {
  href: string
  label: string
  className?: string
}

export function LinkButton({ href, label, className = '' }: LinkButtonProps): React.JSX.Element {
  return (
    <Link 
      href={href} 
      className={`flex items-center gap-2 group hover:opacity-80 transition-opacity ${className}`}
    >
      <span className="text-[8px] uppercase tracking-wider">{label}</span>
      <div className="w-5 h-5 bg-black transition-transform group-hover:translate-x-1" />
    </Link>
  )
}

type SectionTitleProps = {
  children: React.ReactNode
  align?: 'left' | 'center' | 'right'
  size?: 'small' | 'medium' | 'large'
  className?: string
}

export function SectionTitle({ 
  children, 
  align = 'left', 
  size = 'large',
  className = '' 
}: SectionTitleProps): React.JSX.Element {
  const sizeClasses = {
    small: 'text-[60px]',
    medium: 'text-[85px]',
    large: 'text-[120px] md:text-[200px]',
  }

  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  }

  return (
    <h2 
      className={`font-medium uppercase tracking-tight leading-none ${sizeClasses[size]} ${alignClasses[align]} ${className}`}
    >
      {children}
    </h2>
  )
}

type ProductCardProps = {
  imageSrc: string
  alt: string
  href?: string
  className?: string
}

export function ProductCard({ imageSrc, alt, href, className = '' }: ProductCardProps): React.JSX.Element {
  const content = (
    <div className={`relative aspect-[3/4] overflow-hidden bg-gray-100 cursor-pointer group ${className}`}>
      <img
        src={imageSrc}
        alt={alt}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
    </div>
  )

  if (href) {
    return <Link href={href}>{content}</Link>
  }

  return content
}
