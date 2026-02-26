'use client'

import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import gsap from 'gsap'

// Gallery images data
const galleryImages = [
  {
    src: '/images/journal/06a26ecb2b36382d23d4ec52eb9e3547.jpg',
    title: 'ITEM 01',
    subtitle: 'Hover to discover',
  },
  {
    src: '/images/journal/1ac9caeddaded3252f77b3fd0f1314b9.jpg',
    title: 'ITEM 02',
    subtitle: 'Hover to discover',
  },
  {
    src: '/images/journal/26f5ffed3d3d6e932ab83d2e964c44ab.jpg',
    title: 'ITEM 03',
    subtitle: 'Hover to discover',
  },
  {
    src: '/images/journal/4f4b57256f2f727ac5d3906dda206b62.jpg',
    title: 'ITEM 04',
    subtitle: 'Hover to discover',
  },
  {
    src: '/images/journal/59aff09c965bb558b5403dfbbfcd4507.jpg',
    title: 'ITEM 05',
    subtitle: 'Hover to discover',
  },
  {
    src: '/images/journal/7b62f660c2c653f6df3a0d4a7e5b8ad0.jpg',
    title: 'ITEM 06',
    subtitle: 'Hover to discover',
  },
  {
    src: '/images/journal/80b0fcbb7ccdc11253a8d12ed689d66b.jpg',
    title: 'ITEM 07',
    subtitle: 'Hover to discover',
  },
  {
    src: '/images/journal/99d2de151233233e825c0b711e20596b.jpg',
    title: 'ITEM 08',
    subtitle: 'Hover to discover',
  },
  {
    src: '/images/journal/Rectangle-1894-700x558.webp-1.png',
    title: 'ITEM 09',
    subtitle: 'Hover to discover',
  },
  {
    src: '/images/journal/Rectangle-1894-700x558.webp.png',
    title: 'ITEM 10',
    subtitle: 'Hover to discover',
  },
  {
    src: '/images/journal/Rectangle-1896-300x380.webp.png',
    title: 'ITEM 11',
    subtitle: 'Hover to discover',
  },
  {
    src: '/images/journal/Rectangle-1897-500x631.webp.png',
    title: 'ITEM 12',
    subtitle: 'Hover to discover',
  },
]

// Positions for 24 items (repeating pattern)
const positions = [
  { top: '5%', left: '3%', width: '280px', height: '280px' },
  { top: '8%', left: '25%', width: '320px', height: '320px' },
  { top: '2%', left: '52%', width: '260px', height: '260px' },
  { top: '12%', left: '72%', width: '300px', height: '300px' },
  { top: '35%', left: '2%', width: '310px', height: '310px' },
  { top: '38%', left: '23%', width: '270px', height: '270px' },
  { top: '32%', left: '48%', width: '340px', height: '340px' },
  { top: '40%', left: '75%', width: '290px', height: '290px' },
  { top: '65%', left: '5%', width: '300px', height: '300px' },
  { top: '68%', left: '28%', width: '280px', height: '280px' },
  { top: '62%', left: '50%', width: '320px', height: '320px' },
  { top: '70%', left: '73%', width: '270px', height: '270px' },
  { top: '15%', left: '15%', width: '290px', height: '290px' },
  { top: '20%', left: '40%', width: '310px', height: '310px' },
  { top: '18%', left: '65%', width: '280px', height: '280px' },
  { top: '45%', left: '10%', width: '300px', height: '300px' },
  { top: '48%', left: '35%', width: '320px', height: '320px' },
  { top: '42%', left: '62%', width: '290px', height: '290px' },
  { top: '75%', left: '8%', width: '280px', height: '280px' },
  { top: '78%', left: '32%', width: '310px', height: '310px' },
  { top: '72%', left: '58%', width: '300px', height: '300px' },
  { top: '80%', left: '80%', width: '270px', height: '270px' },
  { top: '25%', left: '82%', width: '290px', height: '290px' },
  { top: '55%', left: '85%', width: '280px', height: '280px' },
]

// Rotation values for opening animation
const rotations = [-6, 3, -4, 5, -3, 4, -5, 2, -7, 4, -2, 6, -4, 3, -6, 5, -3, 7, -2, 4, -5, 3, -4, 6]

export default function JournalPage(): React.JSX.Element {
  const pageRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [hoveredItem, setHoveredItem] = useState<{ title: string; subtitle: string } | null>(null)
  const [isOpened, setIsOpened] = useState(false)
  const mousePos = useRef({ x: 0.5, y: 0.5 })
  const currentPos = useRef({ x: 0.5, y: 0.5 })
  const rafId = useRef<number | null>(null)

  // Opening animation (gather at viewport center -> burst)
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current
      if (!track) return

      // Start centered so there's no jump when exploration starts
      mousePos.current = { x: 0.5, y: 0.5 }
      currentPos.current = { x: 0.5, y: 0.5 }
      const trackWidth = track.scrollWidth - window.innerWidth
      const trackHeight = track.scrollHeight - window.innerHeight
      const initialTranslateX = -0.5 * trackWidth
      const initialTranslateY = -0.5 * trackHeight
      track.style.transform = `translate3d(${initialTranslateX}px, ${initialTranslateY}px, 0)`

      const galleryItems = track.querySelectorAll<HTMLElement>('.gallery-item')

      // Calculate viewport center (화면 중앙)
      const viewportCenterX = window.innerWidth / 2
      const viewportCenterY = window.innerHeight / 2
      const targetGatherSize = 260 // 중앙에 모일 때 보이는 한 장 크기(px)

      // Set initial state - all items gathered at viewport center
      galleryItems.forEach((item, index) => {
        const itemRect = item.getBoundingClientRect()

        // 각 이미지의 현재 중심 좌표
        const itemCenterX = itemRect.left + itemRect.width / 2
        const itemCenterY = itemRect.top + itemRect.height / 2

        // viewport 중앙으로 이동시키기 위한 offset
        const offsetX = viewportCenterX - itemCenterX
        const offsetY = viewportCenterY - itemCenterY
        const gatherScale = targetGatherSize / itemRect.width

        gsap.set(item, {
          x: offsetX,
          y: offsetY,
          scale: gatherScale,
          rotation: rotations[index % rotations.length],
          opacity: 1,
          transformOrigin: '50% 50%',
        })
      })

      // Timeline for opening animation
      const tl = gsap.timeline({
        onComplete: () => setIsOpened(true),
      })

      // Spread items to their positions simultaneously (stagger 없이)
      tl.to(galleryItems, {
        x: 0,
        y: 0,
        scale: 1,
        rotation: 0,
        duration: 1.0,
        ease: 'power2.out',
        delay: 0.15,
      })

      // Fade in UI elements
      tl.fromTo(
        '.fade-in',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.1,
        },
        '-=0.4'
      )
    }, pageRef)

    return () => {
      ctx.revert()
    }
  }, [])

  // Mouse movement tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  // Smooth exploration loop (starts after opening completes)
  useEffect(() => {
    if (!isOpened) return

    const animate = () => {
      const track = trackRef.current
      if (!track) return

      // LERP
      const lerp = 0.06
      currentPos.current.x += (mousePos.current.x - currentPos.current.x) * lerp
      currentPos.current.y += (mousePos.current.y - currentPos.current.y) * lerp

      // Calculate movement
      const trackWidth = track.scrollWidth - window.innerWidth
      const trackHeight = track.scrollHeight - window.innerHeight
      const translateX = -currentPos.current.x * trackWidth
      const translateY = -currentPos.current.y * trackHeight

      track.style.transform = `translate3d(${translateX}px, ${translateY}px, 0)`

      rafId.current = requestAnimationFrame(animate)
    }

    rafId.current = requestAnimationFrame(animate)

    return () => {
      if (rafId.current !== null) cancelAnimationFrame(rafId.current)
    }
  }, [isOpened])

  return (
    <div
      ref={pageRef}
      className="relative h-screen w-screen overflow-hidden"
      style={{ backgroundColor: '#f8f7f5' }}
    >
      {/* Header */}
      <header className="fade-in opacity-0 fixed top-0 left-0 right-0 z-50 px-8 py-6 flex items-center justify-between">
        <Link
          href="/"
          className="font-['Sk-Modernist',sans-serif] text-[14px] tracking-[0.5px] text-[#0a0a0a] hover:opacity-60 transition-opacity"
        >
          ← Back
        </Link>
        <h1 className="font-['Sk-Modernist',sans-serif] font-medium text-[16px] tracking-[1px] text-[#0a0a0a] uppercase">
          Collection
        </h1>
        <span className="font-['Sk-Modernist',sans-serif] text-[14px] tracking-[0.5px] text-[#0a0a0a]">
          {galleryImages.length} Items
        </span>
      </header>

      {/* Center Text */}
      <div className="fade-in opacity-0 fixed inset-0 flex items-center justify-center pointer-events-none z-40">
        <div className="text-center transition-all duration-500">
          {hoveredItem ? (
            <>
              <h2 className="font-['Sk-Modernist',sans-serif] font-medium text-[#0a0a0a] text-[48px] md:text-[64px] tracking-[-2px] uppercase mb-2">
                {hoveredItem.title}
              </h2>
              <p className="font-['Sk-Modernist',sans-serif] font-normal text-[#666] text-[16px] md:text-[20px] tracking-[0.5px]">
                {hoveredItem.subtitle}
              </p>
            </>
          ) : (
            <>
              <h2 className="font-['Sk-Modernist',sans-serif] font-medium text-[#ccc] text-[48px] md:text-[64px] tracking-[-2px] uppercase mb-2">
                Explore
              </h2>
              <p className="font-['Sk-Modernist',sans-serif] font-normal text-[#bbb] text-[16px] md:text-[20px] tracking-[0.5px]">
                Hover to discover
              </p>
            </>
          )}
        </div>
      </div>

      {/* Gallery Track */}
      <div
        ref={trackRef}
        className="absolute will-change-transform"
        style={{
          width: '2800px',
          height: '2200px',
          padding: '80px',
        }}
      >
        {galleryImages.map((item, index) => {
          const position = positions[index % positions.length]
          return (
            <div
              key={index}
              className="gallery-item opacity-0 absolute cursor-pointer will-change-transform group"
              style={{
                top: position.top,
                left: position.left,
                width: position.width,
                height: position.height,
              }}
              onMouseEnter={() => setHoveredItem({ title: item.title, subtitle: item.subtitle })}
              onMouseLeave={() => setHoveredItem(null)}
            >
              {/* Hover scale should NOT be on `.gallery-item` (GSAP controls transforms there). */}
              <div className="transition-transform duration-700 group-hover:scale-105">
                {/* Square wrapper */}
                <div className="relative w-full" style={{ paddingBottom: '100%' }}>
                  <div className="absolute inset-0 bg-[#e3e3e3] rounded-sm overflow-hidden shadow-lg">
                    <Image
                      src={item.src}
                      alt={item.title}
                      fill
                      className="object-cover"
                      sizes={position.width}
                      priority={index < 6}
                    />
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Bottom Instructions */}
      <div className="fade-in opacity-0 fixed bottom-8 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
        <p className="font-['Sk-Modernist',sans-serif] font-normal text-[#999] text-[10px] tracking-[1px] uppercase">
          Move mouse to explore
        </p>
      </div>

      {/* Copyright */}
      <div className="fade-in opacity-0 fixed bottom-8 right-8 z-50 pointer-events-none">
        <p className="font-['Sk-Modernist',sans-serif] font-normal text-[#aaa] text-[9px] tracking-[0.5px]">
          © 2026 BYREDO
        </p>
      </div>
    </div>
  )
}
