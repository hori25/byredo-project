'use client'

import { useState } from 'react'
import { imgLogoSvg, imgVector1 } from "@/components/svg-5756i"
import Footer from '@/components/Footer'

const imgFrame24 = "/figma/1c0f415909d84a88c2d6c966e7a021ea8e33e445.png"
const imgFrame25 = "/figma/00cd31a34451d5e20090a0d1366f5dc6337efab9.png"

const STORE_ADDRESS = '123 Rue de Demo, 75000 Paris, France'

const otherStores = [
  { id: 1, city: 'SEOUL, KOREA', name: 'FLAGSHIP STORE', image: '/images/offline/offline5.jpg' },
  { id: 2, city: 'TOKYO, JAPAN', name: 'SHIBUYA STORE', image: '/images/offline/offline6.jpg' },
  { id: 3, city: 'NEW YORK, USA', name: 'SOHO STORE', image: '/images/offline/offline7.jpg' },
  { id: 4, city: 'PARIS, FRANCE', name: 'MARAIS STORE', image: '/images/offline/offline8.jpg' },
  { id: 5, city: 'LONDON, UK', name: 'MAYFAIR STORE', image: '/images/offline/offline9.jpg' }
]

export default function Detail(): React.JSX.Element {
  const [expandedStore, setExpandedStore] = useState<number | null>(null)
  const [copiedAddress, setCopiedAddress] = useState(false)
  const [hoveredStore, setHoveredStore] = useState<number | null>(null)

  const handleCopyAddress = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(STORE_ADDRESS)
      setCopiedAddress(true)
      setTimeout(() => setCopiedAddress(false), 1500)
    } catch (err) {
      // Fallback for browsers that don't support clipboard API
      const textArea = document.createElement('textarea')
      textArea.value = STORE_ADDRESS
      textArea.style.position = 'fixed'
      textArea.style.left = '-999999px'
      textArea.style.top = '-999999px'
      document.body.appendChild(textArea)
      textArea.focus()
      textArea.select()
      try {
        document.execCommand('copy')
        setCopiedAddress(true)
        setTimeout(() => setCopiedAddress(false), 1500)
      } catch {
        console.error('Failed to copy address')
      }
      document.body.removeChild(textArea)
    }
  }

  return (
    <div className="bg-white relative w-full min-h-screen" data-name="detail" data-node-id="741:5567">
      {/* Header - Fixed */}
      <div 
        className="fixed backdrop-blur-[2px] bg-[rgba(255,255,255,0.95)] border-[rgba(0,0,0,0.05)] border-b border-solid h-[49px] left-0 top-0 w-full z-50" 
        data-name="Header" 
        data-node-id="741:5568"
      >
        <div className="relative h-full w-full px-[10px]">
          {/* Nav Links Left */}
          <div className="absolute h-[16.5px] left-[10px] top-[15.75px] flex items-center" data-name="Nav" data-node-id="741:5569">
            <div className="h-[16.5px] cursor-pointer hover:opacity-60 transition-opacity" data-name="Link" data-node-id="741:5570">
              <div className="flex flex-col font-['Sk-Modernist',sans-serif] font-normal justify-center leading-[0] not-italic text-[11px] text-black tracking-[2.2px] uppercase" data-node-id="741:5571">
                <p className="css-4hzbpn leading-[16.5px]">Shop</p>
              </div>
            </div>
            <div className="h-[16.5px] ml-[24px] cursor-pointer hover:opacity-60 transition-opacity" data-name="Link" data-node-id="741:5572">
              <div className="flex flex-col font-['Sk-Modernist',sans-serif] font-normal justify-center leading-[0] not-italic text-[11px] text-black tracking-[2.2px] uppercase" data-node-id="741:5573">
                <p className="css-4hzbpn leading-[16.5px]">Offline Store</p>
              </div>
            </div>
          </div>

          {/* Logo Center */}
          <div className="absolute left-1/2 top-[15.14px] translate-x-[-50%] w-[80px] cursor-pointer hover:opacity-80 transition-opacity" data-name="Link" data-node-id="741:5574">
            <div className="h-[17.7px] overflow-clip w-[80px]" data-name="BYREDO" data-node-id="741:5575">
              <img alt="BYREDO" className="block w-full h-full" src={imgLogoSvg} data-node-id="741:5577" />
            </div>
          </div>

          {/* Nav Links Right */}
          <div className="absolute flex font-['Sk-Modernist',sans-serif] font-normal gap-[24px] items-center leading-[0] right-[10px] not-italic text-[11px] text-black top-[16px] tracking-[2.2px] uppercase" data-node-id="741:5579">
            <div className="css-g0mm18 flex flex-col justify-center shrink-0 cursor-pointer hover:opacity-60 transition-opacity" data-node-id="741:5580">
              <p className="css-ew64yg leading-[16.5px]">MYPAGE</p>
            </div>
            <div className="css-g0mm18 flex flex-col justify-center shrink-0 cursor-pointer hover:opacity-60 transition-opacity" data-node-id="741:5581">
              <p className="css-ew64yg leading-[16.5px]">LOGIN</p>
            </div>
            <div className="css-g0mm18 flex flex-col justify-center shrink-0 cursor-pointer hover:opacity-60 transition-opacity" data-node-id="741:5582">
              <p className="css-ew64yg leading-[16.5px]">JOIN</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="relative w-full pt-[49px]">
        <div className="relative w-full px-[10px]">
          
          {/* Hero Section - Title & Description Group */}
          <div className="mt-[10px] mb-[200px]">
            {/* Hero Title - LE BON MARCHE */}
            <div 
              className="css-g0mm18 flex flex-col font-['Sk-Modernist',sans-serif] font-bold justify-center leading-[0] not-italic text-black uppercase w-full overflow-hidden" 
              data-node-id="741:5583"
              style={{ 
                marginLeft: '-6px',
              }}
            >
              <p 
                className="css-ew64yg leading-none whitespace-nowrap"
                style={{
                  fontSize: 'calc((100vw - 20px) / 7.5)',
                  transform: 'scaleX(1)',
                  transformOrigin: 'left center'
                }}
              >
                LE BON MARCHE
              </p>
            </div>

            {/* Description Text */}
            <div 
              className="flex flex-col font-['Sk-Modernist',sans-serif] font-normal justify-center leading-[0] not-italic text-black uppercase mt-[20px] w-full max-w-[633px]" 
              data-node-id="741:5587"
              style={{ fontSize: 'clamp(14px, 1.39vw, 20px)' }}
            >
              <p className="css-4hzbpn leading-[1.5]">
                Magni temporibus facere facilis officiis. Voluptatem veniam iste architecto quo reiciendis eos quo voluptatum. Sit labore necessitatibus dolorem sunt magni at aperiam. Pariatur praesentium sapiente.
              </p>
            </div>
          </div>

          {/* Store Address Section - New Design */}
          <div 
            className="flex flex-col lg:flex-row lg:items-end relative w-full gap-[20px] lg:gap-0" 
            data-node-id="742:135"
          >
            {/* Left Side: Store Address + Copy Button - 50% */}
            <div 
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between relative w-full lg:w-1/2 gap-4 sm:gap-0 lg:pr-[10px]" 
              data-node-id="742:136"
            >
              {/* Store Address Text */}
              <div 
                className="css-g0mm18 flex flex-col font-['Sk-Modernist',sans-serif] font-normal justify-center leading-[1.2] not-italic text-[20px] text-black" 
                data-node-id="742:137"
              >
                <p className="css-ew64yg mb-0">Store Address</p>
                <p className="css-ew64yg">{STORE_ADDRESS}</p>
              </div>

              {/* Copy Address Button */}
              <button
                type="button"
                onClick={handleCopyAddress}
                className="bg-[#f5f5f5] flex items-center justify-center px-[10px] py-[10px] hover:bg-[#e5e5e5] transition-colors cursor-pointer shrink-0"
                data-node-id="742:138"
              >
                <div 
                  className="css-g0mm18 flex flex-col font-['Sk-Modernist',sans-serif] font-normal justify-center leading-[0] not-italic text-[16px] text-black uppercase" 
                  data-node-id="742:139"
                >
                  <p className="css-ew64yg leading-[1.2]">{copiedAddress ? 'COPIED' : 'COPY ADDRESS'}</p>
                </div>
              </button>
            </div>

            {/* Right Side: Google Maps - 50% */}
            <div 
              className="hidden lg:block h-[665px] w-full lg:w-1/2 lg:pl-[10px]" 
              data-node-id="742:140"
            >
              <iframe
                src={`https://www.google.com/maps?q=${encodeURIComponent(STORE_ADDRESS)}&output=embed`}
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'grayscale(100%)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
            </div>
          </div>

          {/* Image Gallery Section */}
          <div className="mt-[106px] relative w-full flex flex-col lg:flex-row lg:items-start gap-[10px]">
            {/* Left Large Image */}
            <div 
              className="w-full lg:w-[58.5%] flex-shrink-0" 
              data-node-id="741:5597"
            >
              <div className="relative w-full" style={{ paddingBottom: '104.85%' }}>
                <div className="absolute bg-[#e9e9e9] inset-0" />
                <img 
                  alt="Store Interior" 
                  className="absolute object-cover size-full" 
                  src={imgFrame24} 
                />
              </div>

              {/* Left Image Title */}
              <div 
                className="mt-[24px] mb-[10px] flex flex-col font-['Sk-Modernist',sans-serif] font-bold justify-center leading-[0] not-italic text-[18px] text-black tracking-[1px] uppercase max-w-[350px]" 
                data-node-id="741:5600"
              >
                <p className="css-4hzbpn leading-[16.5px]">PhOTO TITLE</p>
              </div>

              {/* Left Image Description */}
              <div 
                className="css-g0mm18 flex flex-col font-['Sk-Modernist',sans-serif] font-normal justify-center leading-[16.5px] not-italic text-[12px] text-black tracking-[1px] uppercase" 
                data-node-id="741:5601"
              >
                <p className="css-ew64yg mb-0">discription discription discription</p>
                <p className="css-ew64yg">discription</p>
              </div>
            </div>

            {/* Right Image */}
            <div 
              className="w-full lg:w-[41.5%] flex-shrink-0" 
              data-node-id="741:5598"
            >
              <div className="relative w-full" style={{ paddingBottom: '91.62%' }}>
                <div className="absolute bg-[#e9e9e9] inset-0" />
                <img 
                  alt="Store Detail" 
                  className="absolute object-cover size-full" 
                  src={imgFrame25} 
                />
              </div>

              {/* Right Image Title */}
              <div 
                className="mt-[24px] mb-[10px] flex flex-col font-['Sk-Modernist',sans-serif] font-bold justify-center leading-[0] not-italic text-[18px] text-black tracking-[1px] uppercase max-w-[350px]" 
                data-node-id="741:5604"
              >
                <p className="css-4hzbpn leading-[16.5px]">PhOTO TITLE</p>
              </div>

              {/* Right Image Description */}
              <div 
                className="css-g0mm18 flex flex-col font-['Sk-Modernist',sans-serif] font-normal justify-center leading-[16.5px] not-italic text-[12px] text-black tracking-[1px] uppercase" 
                data-node-id="741:5605"
              >
                <p className="css-ew64yg mb-0">discription discription discription</p>
                <p className="css-ew64yg">discription</p>
              </div>
            </div>
          </div>

        </div>

        {/* Other Stores List - Full Width Section */}
        <div className="mt-[110px] w-full">
          <div className="w-full px-[10px] relative">
            {/* Hover Preview Image - Centered */}
            <div 
              className="fixed left-1/2 top-1/2 pointer-events-none z-10"
              style={{
                opacity: hoveredStore ? 1 : 0,
                transform: `translate(-50%, -50%) scale(${hoveredStore ? 1 : 0.8})`,
                transition: 'opacity 0.5s ease-out, transform 0.5s ease-out',
                width: '22.5vw',
                maxWidth: '400px'
              }}
            >
              <img
                src={hoveredStore ? otherStores.find(s => s.id === hoveredStore)?.image : otherStores[0].image}
                alt="Store Preview"
                className="w-full h-auto object-contain"
                style={{
                  maxHeight: '60vh'
                }}
              />
            </div>

            {otherStores.map((store, index) => (
              <div key={store.id} className="relative" data-node-id={`741:${5613 + index * 7}`}>
                {/* Divider Line */}
                <div className="h-[1px] w-full bg-black mb-[28px]" data-node-id={`741:${5606 + index * 7}`}>
                  <div className="w-full h-full border-t border-black"></div>
                </div>

                {/* Store Item */}
                <button
                  onClick={() => setExpandedStore(expandedStore === store.id ? null : store.id)}
                  onMouseEnter={() => setHoveredStore(store.id)}
                  onMouseLeave={() => setHoveredStore(null)}
                  className="w-full flex items-center justify-between leading-[0] not-italic tracking-[1px] uppercase mb-[28px] cursor-pointer hover:opacity-80 transition-opacity relative z-20"
                  data-node-id={`741:${5611 + index * 7}`}
                >
                  <div className="flex flex-col gap-[16px] items-start w-[188px]" data-node-id={`741:${5610 + index * 7}`}>
                    <div 
                      className="flex flex-col font-['Sk-Modernist',sans-serif] font-normal justify-start text-[12px] text-[rgba(0,0,0,0.7)] w-full" 
                      data-node-id={`741:${5607 + index * 7}`}
                    >
                      <p className="css-4hzbpn leading-[1.4] text-left">{store.city}</p>
                    </div>
                    <div 
                      className="flex flex-col font-['Sk-Modernist',sans-serif] font-bold justify-start text-[22px] text-black w-full" 
                      data-node-id={`741:${5608 + index * 7}`}
                    >
                      <p className="css-4hzbpn leading-[1.4] text-left">{store.name}</p>
                    </div>
                  </div>
                  <div 
                    className="css-g0mm18 flex flex-col font-['Sk-Modernist',sans-serif] font-bold justify-center text-[22px] text-black transition-transform duration-300" 
                    style={{ transform: expandedStore === store.id ? 'rotate(45deg)' : 'rotate(0deg)' }}
                    data-node-id={`741:${5609 + index * 7}`}
                  >
                    <p className="css-ew64yg leading-[16.5px]">+</p>
                  </div>
                </button>

                {/* Expanded Content */}
                {expandedStore === store.id && (
                  <div className="mb-[28px] pl-[35px] animate-fade-in relative z-20">
                    <p className="font-['Sk-Modernist',sans-serif] font-normal text-[14px] text-black leading-[1.5]">
                      Store details and information would appear here.
                    </p>
                  </div>
                )}
              </div>
            ))}

            {/* Final Divider */}
            <div className="h-[1px] w-full bg-black relative z-20" data-node-id="741:5656">
              <div className="w-full h-full border-t border-black"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}
