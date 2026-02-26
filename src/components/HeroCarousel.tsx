'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';

const leftImages = [
  '/images/main/main_1_2.png',
  '/images/main/main_2_2.png',
  '/images/main/main_3_2.png',
];

const rightImages = [
  '/images/main/main1_1.png',
  '/images/main/main_2_1.png',
  '/images/main/main_3_1.png',
];

export default function HeroCarousel(): React.JSX.Element {
  const leftSlidesRef = useRef<(HTMLDivElement | null)[]>([]);
  const rightSlidesRef = useRef<(HTMLDivElement | null)[]>([]);
  const currentSlide = useRef<number>(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // 초기 상태 설정
    leftSlidesRef.current.forEach((slide, idx) => {
      if (slide) {
        gsap.set(slide, {
          y: idx === 0 ? '0%' : '100%',
        });
      }
    });

    rightSlidesRef.current.forEach((slide, idx) => {
      if (slide) {
        gsap.set(slide, {
          y: idx === 0 ? '0%' : '-100%',
        });
      }
    });

    // 전환 함수
    const transition = (): void => {
      const current = currentSlide.current;
      const next = (current + 1) % leftImages.length;

      const leftCurrent = leftSlidesRef.current[current];
      const leftNext = leftSlidesRef.current[next];
      const rightCurrent = rightSlidesRef.current[current];
      const rightNext = rightSlidesRef.current[next];

      if (!leftCurrent || !leftNext || !rightCurrent || !rightNext) return;

      // 다음 슬라이드 시작 위치 설정
      gsap.set(leftNext, { y: '100%' });
      gsap.set(rightNext, { y: '-100%' });

      // 타임라인으로 동시 전환
      const tl = gsap.timeline();

      tl.to(
        leftCurrent,
        {
          y: '-100%',
          duration: 1.2,
          ease: 'power3.inOut',
        },
        0
      )
        .to(
          leftNext,
          {
            y: '0%',
            duration: 1.2,
            ease: 'power3.inOut',
          },
          0
        )
        .to(
          rightCurrent,
          {
            y: '100%',
            duration: 1.2,
            ease: 'power3.inOut',
          },
          0
        )
        .to(
          rightNext,
          {
            y: '0%',
            duration: 1.2,
            ease: 'power3.inOut',
          },
          0
        );

      currentSlide.current = next;
    };

    // 3초마다 자동 전환
    intervalRef.current = setInterval(transition, 3000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <>
      {/* Hero Section - Fixed */}
      <div
        className="fixed top-0 left-0 h-screen w-full overflow-hidden z-0 bg-white"
        data-name="hero-carousel"
      >
        {/* 2 Column Grid */}
        <div className="grid grid-cols-2 h-full w-full">
          {/* Left Column */}
          <div className="relative h-full w-full overflow-hidden">
            {leftImages.map((src, idx) => (
              <div
                key={idx}
                ref={(el) => {
                  leftSlidesRef.current[idx] = el;
                }}
                className="absolute inset-0 will-change-transform"
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="50vw"
                  priority={idx === 0}
                />
              </div>
            ))}
          </div>

          {/* Right Column */}
          <div className="relative h-full w-full overflow-hidden">
            {rightImages.map((src, idx) => (
              <div
                key={idx}
                ref={(el) => {
                  rightSlidesRef.current[idx] = el;
                }}
                className="absolute inset-0 will-change-transform"
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="50vw"
                  priority={idx === 0}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Text Overlay */}
        <div className="absolute inset-0 pointer-events-none z-10">
          {/* Left Label */}
          <p className="absolute css-ew64yg font-['Sk-Modernist',sans-serif] font-normal leading-[9px] left-[9px] not-italic text-[12px] md:text-[16px] text-white top-1/2 -translate-y-1/2">
            LA COLLECTION
          </p>

          {/* Right Label */}
          <p className="absolute css-ew64yg font-['Sk-Modernist',sans-serif] font-normal leading-none right-[9px] top-1/2 -translate-y-1/2 not-italic text-[12px] md:text-[16px] text-white flex items-center gap-1">
            LA MAISON →
          </p>

          {/* Center - BYREDO PARFUMS */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center px-[10px]">
            <div className="flex items-baseline justify-center gap-1.5">
              <p className="css-ew64yg font-['Sk-Modernist',sans-serif] font-bold leading-none not-italic text-[20px] md:text-[26px] text-white">
                BYREDO
              </p>
              <p className="css-ew64yg font-['Sk-Modernist',sans-serif] font-normal leading-none not-italic text-[12px] md:text-[16px] text-white">
                PARFUMS
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Spacer - Hero 높이만큼 공간 확보 */}
      <div className="h-screen" />
    </>
  );
}
