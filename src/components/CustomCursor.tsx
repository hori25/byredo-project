'use client'

import { useEffect, useRef, useState } from 'react'

export function CustomCursor(): React.JSX.Element {
  const cursorDotRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)
  const requestRef = useRef<number>(0)
  
  const mousePosition = useRef({ x: 0, y: 0 })
  const currentPosition = useRef({ x: 0, y: 0 })

  useEffect(() => {
    // 마우스 위치 추적
    const updateMousePosition = (e: MouseEvent): void => {
      mousePosition.current = { x: e.clientX, y: e.clientY }

      // 현재 마우스 아래 요소 찾기
      const elementsUnderCursor = document.elementsFromPoint(e.clientX, e.clientY)
      
      // 커스텀 커서 제외하고 찾기
      let isOverInteractive = false
      
      for (const element of elementsUnderCursor) {
        if (element.classList.contains('custom-cursor')) continue
        
        // 인터랙티브 요소 체크 (자신 또는 부모)
        const interactive = element.closest('a, button, [role="button"], [data-cursor-hover], .cursor-pointer')
        if (interactive) {
          isOverInteractive = true
          break
        }
      }

      setIsHovering(isOverInteractive)
    }

    // 부드러운 애니메이션
    const animate = (): void => {
      if (!cursorDotRef.current) return

      // 빠른 따라가기 (ease 값 높임)
      const ease = 0.2 // 0.15에서 0.2로 증가 (더 빠름)
      
      currentPosition.current.x += (mousePosition.current.x - currentPosition.current.x) * ease
      currentPosition.current.y += (mousePosition.current.y - currentPosition.current.y) * ease

      // 위치 업데이트
      cursorDotRef.current.style.left = `${currentPosition.current.x}px`
      cursorDotRef.current.style.top = `${currentPosition.current.y}px`

      requestRef.current = requestAnimationFrame(animate)
    }

    // 이벤트 리스너 등록
    window.addEventListener('mousemove', updateMousePosition)
    
    // 애니메이션 시작
    requestRef.current = requestAnimationFrame(animate)

    // 정리
    return () => {
      window.removeEventListener('mousemove', updateMousePosition)
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }
    }
  }, [])

  return (
    <div
      ref={cursorDotRef}
      className="custom-cursor"
      style={{
        width: isHovering ? '24px' : '12px',
        height: isHovering ? '24px' : '12px',
        backgroundColor: isHovering ? '#ff0000' : '#0a0a0a',
      }}
    />
  )
}
