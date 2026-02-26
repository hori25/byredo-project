'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import gsap from 'gsap'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import HeroCarousel from '@/components/HeroCarousel'
import Reveal from '@/components/Reveal'

const imgContainer = "/figma/e274b5e346ed97b987b87f7ca0c224975ac58080.png";
const imgContainer1 = "/figma/494e42c878478d9ecbace2fb789d1664b373dab4.png";
const imgContainer2 = "/figma/3b25cff81bce927ebfd0195f15f7de95d56edb8b.png";
const imgContainer3 = "/figma/4c9c0c5bb4864cf9d068f00ff4c3954d42801e89.png";
const imgContainer4 = "/figma/011e2449b205a66fe265beac9de5ab800a6df992.png";
const imgContainer5 = "/figma/533f935c9993e8b7e7a5afe5b8dea6f092870bf6.png";
const imgContainer6 = "/figma/a9b7a7acb444a9efdba9b10eb18954de60ecea54.png";
const imgContainer7 = "/figma/ede2532e15359a21b1242de63fb0d27f98edbed9.png";
const imgContainer8 = "/figma/871a715fe7b55389f85eeec12bc9c0d0382c50c5.png";
const imgContainer9 = "/figma/96406f43f2cb26dbccb9b7a7635d4b8ef99869d8.png";
const imgContainer10 = "/figma/3c59b3fc44b0fc1b03013be253c8335eb86c3035.png";
const imgContainer11 = "/figma/2a9548de1609d5af939c2f6d0b2e154e10fa1566.png";
const imgContainer12 = "/figma/2eaca315de4ea0ce2b1a008f1dde6f548b7096d6.png";
const imgContainer13 = "/figma/9a0de628b0e36ab0cf001af01a59967f69fc72a6.png";

// Product data
const products = [
  { id: 1, name: "LA TULIPE", price: "75 ML - $285", image: imgContainer },
  { id: 2, name: "GYPSY WATER", price: "100 ML - $235", image: imgContainer1 },
  { id: 3, name: "MOJAVE GHOST", price: "50 ML - $185", image: imgContainer2 },
  { id: 4, name: "BAL D'AFRIQUE", price: "100 ML - $235", image: imgContainer3 },
]

// Product Card Component
function ProductCard({ product, index, isVisible }: { product: typeof products[0], index: number, isVisible: boolean }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className="col-span-6 md:col-span-3 h-[217px] md:h-[434px] relative overflow-hidden cursor-pointer"
      data-name="Container"
      style={{ willChange: 'transform, opacity, clip-path' }}
      initial={{ opacity: 0, y: 40, clipPath: 'inset(0% 0% 100% 0%)' }}
      animate={
        isVisible
          ? { opacity: 1, y: 0, clipPath: 'inset(0% 0% 0% 0%)' }
          : { opacity: 0, y: 40, clipPath: 'inset(0% 0% 100% 0%)' }
      }
      transition={{
        duration: 0.6,
        delay: index * 0.15,
        ease: [0.25, 0.1, 0.25, 1]
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="absolute bg-[#e3e3e3] inset-0" />
        <img alt="" className="absolute max-w-none object-cover size-full" src={product.image} />
      </div>

      {/* Product Info - appears on hover */}
      <motion.div
        className="absolute bottom-0 left-0 px-4 py-4 md:px-6 md:py-6 pointer-events-none"
        initial={{ opacity: 0, y: 20 }}
        animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <p className="css-ew64yg font-['Sk-Modernist',sans-serif] font-medium leading-tight not-italic text-[#000] text-[14px] md:text-[16px] tracking-[0.5px] uppercase mb-1">
          {product.name}
        </p>
        <p className="css-ew64yg font-['Sk-Modernist',sans-serif] font-normal leading-tight not-italic text-[#000] text-[10px] md:text-[12px] tracking-[0.3px]">
          {product.price}
        </p>
      </motion.div>
    </motion.div>
  )
}

export default function Main(): React.JSX.Element {
  const [isVisible, setIsVisible] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const journalImage1Ref = useRef<HTMLDivElement>(null)
  const journalImage2Ref = useRef<HTMLDivElement>(null)
  const journalImage3Ref = useRef<HTMLDivElement>(null)
  const journalImage4Ref = useRef<HTMLDivElement>(null)
  const journalCenterContentRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    const sectionEl = sectionRef.current
    if (sectionEl) {
      observer.observe(sectionEl)
    }

    return () => {
      if (sectionEl) {
        observer.unobserve(sectionEl)
      }
    }
  }, [])

  const handleJournalViewMore = () => {
    if (isAnimating) return
    setIsAnimating(true)

    const images = [
      journalImage1Ref.current,
      journalImage2Ref.current,
      journalImage3Ref.current,
      journalImage4Ref.current,
    ]

    const centerContent = journalCenterContentRef.current

    // Get current positions and sizes
    const imagePositions = images.map((img) => {
      if (!img) return null
      const rect = img.getBoundingClientRect()
      return {
        element: img,
        rect,
        left: rect.left,
        top: rect.top,
        width: rect.width,
        height: rect.height,
      }
    }).filter(Boolean)

    // Calculate center position
    const centerX = window.innerWidth / 2
    const centerY = window.innerHeight / 2
    const targetWidth = 240
    const targetHeight = 300
    const rotations = [-10, -3, 3, 10]

    // Convert to fixed positioning
    imagePositions.forEach((pos) => {
      if (pos && pos.element) {
        pos.element.style.position = 'fixed'
        pos.element.style.left = `${pos.left}px`
        pos.element.style.top = `${pos.top}px`
        pos.element.style.width = `${pos.width}px`
        pos.element.style.height = `${pos.height}px`
        pos.element.style.zIndex = '9999'
      }
    })

    // Create GSAP timeline
    const tl = gsap.timeline({
      onComplete: () => {
        router.push('/journal')
      }
    })

    // Fade out center content first
    if (centerContent) {
      tl.to(centerContent, {
        opacity: 0,
        duration: 0.2,
        ease: 'power2.out'
      })
    }

    // Animate all images to center simultaneously - fast and at the same time
    imagePositions.forEach((pos, index) => {
      if (pos && pos.element) {
        tl.to(pos.element, {
          left: centerX - targetWidth / 2,
          top: centerY - targetHeight / 2,
          width: targetWidth,
          height: targetHeight,
          rotation: rotations[index],
          duration: 0.6,
          ease: 'power2.inOut'
        }, index === 0 ? '-=0.1' : '<') // All start at the same time
      }
    })
  }
  return (
    <div className="bg-white w-full" data-name="main" data-node-id="726:1784">
      {/* Header - Fixed */}
      <Header />

      {/* Hero Section - Auto Carousel (Fixed + Spacer 포함) */}
      <HeroCarousel />

      {/* Main Content - 높은 z-index로 Hero 위에 올라옴 */}
      <div className="relative bg-white z-10 min-h-screen">

      {/* Product Grid Section */}
      <div className="relative container-grid pt-[50px] md:pt-[100px] pb-[10px] md:pb-[20px]" data-name="Section" data-node-id="726:1811">
        <div className="col-span-12 relative flex items-center justify-between">
          <p className="css-ew64yg font-['Sk-Modernist',sans-serif] font-medium leading-[36px] md:leading-[72px] not-italic text-[#0a0a0a] text-[44px] md:text-[87px] tracking-[-2.5px] md:tracking-[-4.5px] uppercase" data-node-id="726:1813">
            SHOP
          </p>
          <p className="absolute left-1/2 -translate-x-1/2 css-ew64yg font-['Sk-Modernist',sans-serif] font-normal leading-none not-italic text-[#0a0a0a] text-[11px] tracking-normal uppercase underline">
            VISIT SHOP →
          </p>
          <p className="css-ew64yg font-['Sk-Modernist',sans-serif] font-medium leading-[36px] md:leading-[72px] not-italic text-[#0a0a0a] text-[42px] md:text-[84px] tracking-[-2.5px] md:tracking-[-4.5px] uppercase" data-node-id="726:1819">
            NOW
          </p>
        </div>
      </div>

      {/* 4 Product Images */}
      <div ref={sectionRef} className="container-grid">
        {products.map((product, index) => (
          <ProductCard
            key={product.id}
            product={product}
            index={index}
            isVisible={isVisible}
          />
        ))}
      </div>

      {/* Content Section */}
      <div className="relative h-[900px] pt-[1000px] w-full mt-[60px] md:mt-[100px]" data-name="Section" data-node-id="726:1824">
        {/* Top Left Empty Container */}
        <div className="absolute content-stretch flex flex-col gap-[3px] h-[33px] items-start left-0 top-0 w-[106px]" data-name="Container" data-node-id="726:1825">
          <div className="h-[9px] shrink-0 w-full" data-name="Paragraph" data-node-id="726:1826" />
          <div className="h-[9px] shrink-0 w-full" data-name="Paragraph" data-node-id="726:1828" />
          <div className="h-[9px] shrink-0 w-full" data-name="Paragraph" data-node-id="726:1830" />
        </div>

        {/* PLACEHOLDER - Top Center */}
        <div className="absolute h-[72px] left-[355px] top-[124px] w-[710px]" data-name="Container" data-node-id="726:1833">
          <p className="absolute css-ew64yg font-['Sk-Modernist',sans-serif] font-bold leading-[72px] left-[355.47px] not-italic text-[#0a0a0a] text-[85px] text-center top-px tracking-[0.5px] translate-x-[-50%] whitespace-nowrap" data-node-id="726:1834">
            BYREDO CREATES
          </p>
        </div>

        {/* PLACEHOLDER - Middle Right Top */}
        <div className="absolute h-[72px] right-0 top-[306px] w-[650px]" data-name="Container" data-node-id="726:1838">
          <p className="absolute css-ew64yg font-['Sk-Modernist',sans-serif] font-bold leading-[72px] right-0 not-italic text-[#0a0a0a] text-[83px] text-right top-px tracking-[0.5px] whitespace-nowrap" data-node-id="726:1839">
            WITH A TASTE
          </p>
        </div>

        {/* PLACEHOLDER - Middle Right Bottom */}
        <div className="absolute h-[72px] right-0 top-[388px] w-[650px]" data-name="Container" data-node-id="726:1899">
          <p className="absolute css-ew64yg font-['Sk-Modernist',sans-serif] font-bold leading-[72px] right-0 not-italic text-[#0a0a0a] text-[83px] text-right top-px tracking-[0.5px] whitespace-nowrap" data-node-id="726:1900">
            OF PERFUME
          </p>
        </div>

        {/* Left Image Container */}
        <Reveal
          className="absolute h-[583px] left-[-4px] top-[317px] w-[486px]"
          data-name="Container"
          data-node-id="726:1842"
        >
          <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
            <div className="absolute bg-[#e3e3e3] inset-0" />
            <div className="absolute inset-0 overflow-hidden">
              <img alt="" className="absolute left-0 max-w-none size-full top-0 object-cover" src="/images/section2_image.png" />
            </div>
          </div>
        </Reveal>

        {/* Right Content Container */}
        <div className="absolute h-[256px] left-[494px] top-[644px] w-[700px]" data-name="Container" data-node-id="726:1843">
          {/* Label */}
          <div className="absolute h-[12px] left-0 top-0 w-[700px]" data-name="Container" data-node-id="726:1844">
            <p className="absolute css-ew64yg font-['Sk-Modernist',sans-serif] font-normal leading-[12px] left-0 not-italic text-[#0a0a0a] text-[8px] top-0 tracking-[0.5px] uppercase" data-node-id="726:1845">
              ABOUT
            </p>
          </div>

          {/* Description Title */}
          <div className="absolute h-[22px] left-0 top-[22px] w-[700px]" data-name="Container" data-node-id="726:1846">
            <p className="absolute css-ew64yg font-['Sk-Modernist',sans-serif] font-normal leading-[22px] left-0 not-italic text-[#0a0a0a] text-[20px] top-0 tracking-[0.5px]" data-node-id="726:1847">
              Crafting memories through the art of fragrance
            </p>
          </div>

          {/* Description Lines */}
          <div className="absolute content-stretch flex flex-col gap-[6px] h-[140px] items-start left-0 top-[64px] w-[700px]" data-name="Container" data-node-id="726:1848">
            <div className="h-[22px] relative shrink-0 w-full" data-name="Paragraph" data-node-id="726:1849">
              <p className="absolute css-ew64yg font-['Sk-Modernist',sans-serif] font-normal leading-[22px] left-0 not-italic text-[#0a0a0a] text-[20px] top-0 tracking-[0.5px]" data-node-id="726:1850">
                Each scent tells a story, capturing moments and emotions.
              </p>
            </div>
            <div className="h-[22px] relative shrink-0 w-full" data-name="Paragraph" data-node-id="726:1851">
              <p className="absolute css-ew64yg font-['Sk-Modernist',sans-serif] font-normal leading-[22px] left-0 not-italic text-[#0a0a0a] text-[20px] top-0 tracking-[0.5px]" data-node-id="726:1852">
                Our perfumes are created with meticulous attention to detail.
              </p>
            </div>
            <div className="h-[22px] relative shrink-0 w-full" data-name="Paragraph" data-node-id="726:1855">
              <p className="absolute css-ew64yg font-['Sk-Modernist',sans-serif] font-normal leading-[22px] left-0 not-italic text-[#0a0a0a] text-[20px] top-0 tracking-[0.5px]" data-node-id="726:1856">
                experiences. Every fragrance is a journey, an invitation to explore
              </p>
            </div>
            <div className="h-[22px] relative shrink-0 w-full" data-name="Paragraph" data-node-id="726:1857">
              <p className="absolute css-ew64yg font-['Sk-Modernist',sans-serif] font-normal leading-[22px] left-0 not-italic text-[#0a0a0a] text-[20px] top-0 tracking-[0.5px]" data-node-id="726:1858">
                new dimensions of personal expression and sensory discovery.
              </p>
            </div>
          </div>

          {/* Text Link */}
          <div className="absolute content-stretch flex gap-[5px] h-[20px] items-center left-0 top-[236px] w-[700px]" data-name="Container" data-node-id="726:1859">
            <div className="h-[12px] relative shrink-0 w-auto" data-name="Container" data-node-id="726:1860">
              <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
                <p className="absolute css-ew64yg font-['Sk-Modernist',sans-serif] font-normal leading-[12px] left-0 not-italic text-[#0a0a0a] text-[8px] top-0 tracking-[0.2057px] uppercase whitespace-nowrap" data-node-id="726:1861">
                  VIEW MORE →
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="container-grid mt-[400px]">
        <div className="col-span-12 border-t border-[#231f20] pt-[10px]" data-name="Container" data-node-id="726:1864">
          <div className="flex justify-between items-center">
            <p className="css-ew64yg font-['Sk-Modernist',sans-serif] font-normal leading-[12px] not-italic text-[#0a0a0a] text-[8px] tracking-[0.2057px] uppercase" data-node-id="726:1866">
              Placeholder Text
            </p>
            <div className="flex gap-[5px] items-center" data-node-id="726:1867">
              <p className="css-ew64yg font-['Sk-Modernist',sans-serif] font-normal leading-[12px] not-italic text-[#0a0a0a] text-[8px] tracking-[0.2057px] uppercase" data-node-id="726:1869">
                Text Link
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Image Grid */}
      <div className="container-grid mt-[40px]">
        <Reveal className="col-span-3 aspect-square relative overflow-hidden" delay={0} data-name="Container" data-node-id="726:1871">
          <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
            <div className="absolute bg-[#e3e3e3] inset-0" />
            <img alt="" className="absolute inset-0 w-full h-full object-cover" src={imgContainer10} />
          </div>
        </Reveal>
        <Reveal className="col-span-3 aspect-square relative overflow-hidden" delay={0.15} data-name="Container" data-node-id="726:1872">
          <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
            <div className="absolute bg-[#e3e3e3] inset-0" />
            <img alt="" className="absolute inset-0 w-full h-full object-cover" src={imgContainer11} />
          </div>
        </Reveal>
        <Reveal className="col-span-3 aspect-square relative overflow-hidden" delay={0.3} data-name="Container" data-node-id="726:1873">
          <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
            <div className="absolute bg-[#e3e3e3] inset-0" />
            <img alt="" className="absolute inset-0 w-full h-full object-cover" src={imgContainer12} />
          </div>
        </Reveal>
        <Reveal className="col-span-3 aspect-square relative overflow-hidden" delay={0.45} data-name="Container" data-node-id="726:1874">
          <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
            <div className="absolute bg-[#e3e3e3] inset-0" />
            <img alt="" className="absolute inset-0 w-full h-full object-cover" src={imgContainer13} />
          </div>
        </Reveal>
      </div>

      {/* Journal Section */}
      <div className="relative h-[1080px] mt-[400px] w-full max-w-[1280px] mx-auto" data-name="Section" data-node-id="726:1875">
        {/* Top Left Large Image - BYREDO Product */}
        <Reveal ref={journalImage1Ref} className="absolute h-[372px] left-0 -top-[50px] w-[466px] overflow-hidden" delay={0} data-name="Container" data-node-id="726:1876">
          <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
            <div className="absolute bg-[#e3e3e3] inset-0" />
            <img alt="" className="absolute inset-0 w-full h-full object-cover" src={imgContainer6} />
          </div>
        </Reveal>
        
        {/* Top Right Small Image - Face */}
        <Reveal ref={journalImage2Ref} className="absolute h-[138px] right-0 top-[262px] w-[109px] overflow-hidden" delay={0.15} data-name="Container" data-node-id="726:1877">
          <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
            <div className="absolute bg-[#e3e3e3] inset-0" />
            <img alt="" className="absolute inset-0 w-full h-full object-cover" src={imgContainer7} />
          </div>
        </Reveal>
        
        {/* Center Content - Journal Title & Newsletter */}
        <div ref={journalCenterContentRef} className="absolute h-[271px] left-1/2 top-[389px] w-[500px] -translate-x-1/2" data-name="Container" data-node-id="726:1880">
          {/* Journal Title */}
          <div className="absolute h-[60px] left-0 top-0 w-[500px]" data-name="Container" data-node-id="726:1881">
            <p className="absolute capitalize css-ew64yg font-['Sk-Modernist',sans-serif] font-medium leading-[60px] left-1/2 not-italic text-[#0a0a0a] text-[69px] text-center top-px tracking-[0.5px] translate-x-[-50%]" data-node-id="726:1882">
              Journal
            </p>
          </div>
          
          {/* Placeholder Text Lines */}
          <div className="absolute flex flex-col gap-[3px] h-[37px] items-start left-0 top-[80px] w-[500px]" data-name="Container" data-node-id="726:1883">
            <div className="h-[17px] relative w-full" data-name="Paragraph" data-node-id="726:1884">
              <p className="absolute css-ew64yg font-['Sk-Modernist',sans-serif] font-normal leading-[17px] left-[250px] not-italic text-[#0a0a0a] text-[21px] text-center top-0 tracking-[0.5px] translate-x-[-50%] uppercase whitespace-nowrap" data-node-id="726:1885">
                LATEST STORIES
              </p>
            </div>
            <div className="h-[17px] relative w-full" data-name="Paragraph" data-node-id="726:1886">
              <p className="absolute css-ew64yg font-['Sk-Modernist',sans-serif] font-normal leading-[17px] left-[250px] not-italic text-[#0a0a0a] text-[21px] text-center top-0 tracking-[0.5px] translate-x-[-50%] uppercase whitespace-nowrap" data-node-id="726:1887">
                FROM OUR JOURNAL
              </p>
            </div>
          </div>
          
          {/* Newsletter Description */}
          <div className="absolute flex flex-col gap-[6px] h-auto items-center left-0 top-[132px] w-[500px]" data-name="Container" data-node-id="726:1888">
            <div className="h-auto relative w-full" data-name="Paragraph" data-node-id="726:1889">
              <p className="css-ew64yg font-['Sk-Modernist',sans-serif] font-normal leading-[12px] not-italic text-[#0a0a0a] text-[8px] text-center tracking-[0.5px]" data-node-id="726:1890">
                Placeholder text for newsletter description here
              </p>
            </div>
            <div className="h-auto relative w-full" data-name="Paragraph" data-node-id="726:1891">
              <p className="css-ew64yg font-['Sk-Modernist',sans-serif] font-normal leading-[12px] not-italic text-[#0a0a0a] text-[8px] text-center tracking-[0.5px]" data-node-id="726:1892">
                with additional line of text and content here too
              </p>
            </div>
            <div className="h-auto relative w-full" data-name="Paragraph" data-node-id="726:1893">
              <p className="css-ew64yg font-['Sk-Modernist',sans-serif] font-normal leading-[12px] not-italic text-[#0a0a0a] text-[8px] text-center tracking-[0.5px]" data-node-id="726:1894">
                ending text.
              </p>
            </div>
          </div>
          
          {/* Button Container */}
          <div className="absolute flex flex-col gap-[25px] h-[76px] items-start left-1/2 top-[195px] w-[250px] -translate-x-1/2" data-name="Container" data-node-id="726:1895">
            <div className="bg-[#dedcdc] h-px w-full" data-name="Container" data-node-id="726:1896" />
            <div 
              onClick={handleJournalViewMore}
              className="bg-[#231f20] h-[50px] relative w-full cursor-pointer hover:bg-[#3a3637] transition-colors" 
              data-name="Container" 
              data-node-id="726:1897"
            >
              <p className="absolute css-ew64yg font-['Sk-Modernist',sans-serif] font-normal leading-[12px] left-1/2 not-italic text-[#ebebeb] text-[8px] text-center top-[19px] tracking-[0.2057px] translate-x-[-50%] uppercase" data-node-id="726:1898">
                VIEW MORE
              </p>
            </div>
          </div>
        </div>
        
        {/* Bottom Left Image - Mumbai Noise Product */}
        <Reveal ref={journalImage3Ref} className="absolute h-[288px] left-0 top-[677px] w-[228px] overflow-hidden" delay={0.3} data-name="Container" data-node-id="726:1878">
          <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
            <div className="absolute bg-[#e3e3e3] inset-0" />
            <img alt="" className="absolute inset-0 w-full h-full object-cover" src={imgContainer8} />
          </div>
        </Reveal>
        
        {/* Bottom Right Large Image - Red Background */}
        <Reveal ref={journalImage4Ref} className="absolute h-[277px] right-0 top-[803px] w-[348px] overflow-hidden" delay={0.45} data-name="Container" data-node-id="726:1879">
          <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
            <div className="absolute bg-[#e3e3e3] inset-0" />
            <img alt="" className="absolute inset-0 w-full h-full object-cover" src={imgContainer9} />
          </div>
        </Reveal>
      </div>

      </div>
      {/* End Main Content */}

      {/* Footer */}
      <Footer />
    </div>
  );
}
