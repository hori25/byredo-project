'use client'

import { useId } from 'react'

type CheckoutQuantityControlProps = {
  value: number
  onChange: (next: number) => void
}

export default function CheckoutQuantityControl({
  value,
  onChange,
}: CheckoutQuantityControlProps): React.JSX.Element {
  const inputId = useId()
  const clamp = (next: number): number => Math.max(1, Math.floor(next || 1))

  return (
    <div
      className="grid h-11 shrink-0 overflow-hidden border border-black/20 bg-white !tracking-normal"
      style={{ gridTemplateColumns: '48px 92px 48px' }}
    >
      <button
        type="button"
        onClick={() => onChange(clamp(value - 1))}
        className="grid h-11 place-items-center border-r border-black/10 bg-[#f4f4f4] text-[18px] leading-none text-black transition-colors hover:bg-black hover:text-white !tracking-normal"
        aria-label="Decrease quantity"
      >
        -
      </button>
      <label
        htmlFor={inputId}
        className="relative flex h-11 cursor-text items-center justify-center bg-white px-3 text-center"
      >
        <span className="pointer-events-none text-[13px] font-medium leading-none tabular-nums text-black !tracking-normal">
          {String(value).padStart(3, '0')}
        </span>
        <input
          id={inputId}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          value={value}
          onChange={(event) => {
            const digitsOnly = event.target.value.replace(/\D/g, '')
            if (!digitsOnly) return
            onChange(clamp(Number(digitsOnly)))
          }}
          onBlur={(event) => {
            const digitsOnly = event.target.value.replace(/\D/g, '')
            onChange(clamp(Number(digitsOnly)))
          }}
          className="absolute inset-0 opacity-0"
          aria-label="Quantity"
        />
      </label>
      <button
        type="button"
        onClick={() => onChange(clamp(value + 1))}
        className="grid h-11 place-items-center border-l border-black/10 bg-[#f4f4f4] text-[18px] leading-none text-black transition-colors hover:bg-black hover:text-white !tracking-normal"
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  )
}
