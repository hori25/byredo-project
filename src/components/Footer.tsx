 'use client'

import { imgVector1 } from "@/components/svg-idh1o"
import Reveal from '@/components/Reveal'

interface FooterProps {
  className?: string
}

export default function Footer({ className }: FooterProps): React.JSX.Element {
  return (
    <div className={`container-grid pb-[20px] bg-white relative z-20 ${className || 'pt-[400px]'}`}>
      <div className="col-span-12">
        <Reveal className="w-full h-[294px] relative mb-[28px]" data-name="Vector">
          <img alt="" className="block max-w-none size-full" src={imgVector1} />
        </Reveal>
        <div className="grid grid-cols-2 gap-[30px] text-[12px]">
          <div className="space-y-[10px]">
            <p className="capitalize css-ew64yg font-['Sk-Modernist',sans-serif] font-medium leading-none not-italic text-black">
              Horace Ortiz
            </p>
            <p className="capitalize css-ew64yg font-['Sk-Modernist',sans-serif] font-medium leading-none not-italic text-black">
              Gladys.Romaguera10@gmail.com
            </p>
            <p className="capitalize css-ew64yg font-['Sk-Modernist',sans-serif] font-medium leading-none not-italic text-black">
              59362
            </p>
          </div>
          <div className="space-y-[10px] text-right">
            <p className="capitalize css-ew64yg font-['Sk-Modernist',sans-serif] font-medium leading-none not-italic text-black">
              BYREDO all right rseerved
            </p>
            <p className="capitalize css-ew64yg font-['Sk-Modernist',sans-serif] font-medium leading-none not-italic text-black">
              Fri Jan 14 2039 16:54:41 GMT+0900
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
