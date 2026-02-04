const imgLeft = "/figma/a1ecb22b426b501faacca6adaba2da1b5d2598ef.png";
const imgRight = "/figma/0e423c974ccf7152aa71902b1ac8f051a6781cc3.png";
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
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function Main(): React.JSX.Element {
  return (
    <div className="bg-white w-full" data-name="main" data-node-id="726:1784">
      {/* Header - Fixed */}
      <Header />

      {/* Hero Section */}
      <div className="relative flex flex-col md:flex-row items-center justify-between w-full mt-[48px] h-[calc(100vh-48px)]" data-node-id="726:1808">
        <div className="h-full overflow-clip relative w-full md:w-1/2" data-name="left" data-node-id="726:1799">
          <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
            <div className="absolute bg-[#b7b7b7] inset-0" />
            <div className="absolute inset-0 overflow-hidden">
              <img alt="" className="absolute h-[99.3%] left-0 max-w-none top-[0.35%] w-full" src={imgLeft} />
            </div>
          </div>
          <p className="absolute css-ew64yg font-['Sk-Modernist',sans-serif] font-normal leading-[9px] left-[9px] not-italic text-[12px] md:text-[16px] text-white top-[225px] md:top-[450px]" data-node-id="726:1803">
            LA COLLECTION
          </p>
        </div>
        <div className="h-full overflow-clip relative w-full md:w-1/2" data-name="right" data-node-id="726:1800">
          <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
            <div className="absolute bg-[#c3c3c3] inset-0" />
            <img alt="" className="absolute max-w-none object-cover size-full" src={imgRight} />
          </div>
          <p className="absolute css-ew64yg font-['Sk-Modernist',sans-serif] font-normal leading-none right-[9px] bottom-[225px] md:bottom-[450px] not-italic text-[12px] md:text-[16px] text-white flex items-center gap-1" data-node-id="726:1804">
            LA MAISON →
          </p>
        </div>
        {/* BYREDO PARFUMS - 화면 전체 기준 가운데 */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center px-[10px] pointer-events-none" data-node-id="726:1805">
          <div className="flex items-baseline justify-center gap-1.5">
            <p className="css-ew64yg font-['Sk-Modernist',sans-serif] font-bold leading-none not-italic text-[20px] md:text-[26px] text-white" data-node-id="726:1801">BYREDO</p>
            <p className="css-ew64yg font-['Sk-Modernist',sans-serif] font-normal leading-none not-italic text-[12px] md:text-[16px] text-white" data-node-id="726:1802">PARFUMS</p>
          </div>
        </div>
      </div>

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
      <div className="container-grid">
        <div className="col-span-6 md:col-span-3 h-[217px] md:h-[434px] relative" data-name="Container" data-node-id="726:1820">
          <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
            <div className="absolute bg-[#e3e3e3] inset-0" />
            <img alt="" className="absolute max-w-none object-cover size-full" src={imgContainer} />
          </div>
        </div>
        <div className="col-span-6 md:col-span-3 h-[217px] md:h-[434px] relative" data-name="Container" data-node-id="726:1821">
          <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
            <div className="absolute bg-[#e3e3e3] inset-0" />
            <img alt="" className="absolute max-w-none object-cover size-full" src={imgContainer1} />
          </div>
        </div>
        <div className="col-span-6 md:col-span-3 h-[217px] md:h-[434px] relative" data-name="Container" data-node-id="726:1822">
          <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
            <div className="absolute bg-[#e3e3e3] inset-0" />
            <img alt="" className="absolute max-w-none object-cover size-full" src={imgContainer2} />
          </div>
        </div>
        <div className="col-span-6 md:col-span-3 h-[217px] md:h-[434px] relative" data-name="Container" data-node-id="726:1823">
          <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
            <div className="absolute bg-[#e3e3e3] inset-0" />
            <img alt="" className="absolute max-w-none object-cover size-full" src={imgContainer3} />
          </div>
        </div>
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
        <div className="absolute h-[583px] left-[-4px] top-[317px] w-[486px]" data-name="Container" data-node-id="726:1842">
          <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
            <div className="absolute bg-[#e3e3e3] inset-0" />
            <div className="absolute inset-0 overflow-hidden">
              <img alt="" className="absolute left-0 max-w-none size-full top-0 object-cover" src="/images/section2_image.png" />
            </div>
          </div>
        </div>

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
        <div className="col-span-3 aspect-square relative overflow-hidden" data-name="Container" data-node-id="726:1871">
          <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
            <div className="absolute bg-[#e3e3e3] inset-0" />
            <img alt="" className="absolute inset-0 w-full h-full object-cover" src={imgContainer10} />
          </div>
        </div>
        <div className="col-span-3 aspect-square relative overflow-hidden" data-name="Container" data-node-id="726:1872">
          <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
            <div className="absolute bg-[#e3e3e3] inset-0" />
            <img alt="" className="absolute inset-0 w-full h-full object-cover" src={imgContainer11} />
          </div>
        </div>
        <div className="col-span-3 aspect-square relative overflow-hidden" data-name="Container" data-node-id="726:1873">
          <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
            <div className="absolute bg-[#e3e3e3] inset-0" />
            <img alt="" className="absolute inset-0 w-full h-full object-cover" src={imgContainer12} />
          </div>
        </div>
        <div className="col-span-3 aspect-square relative overflow-hidden" data-name="Container" data-node-id="726:1874">
          <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
            <div className="absolute bg-[#e3e3e3] inset-0" />
            <img alt="" className="absolute inset-0 w-full h-full object-cover" src={imgContainer13} />
          </div>
        </div>
      </div>

      {/* Journal Section */}
      <div className="relative h-[1080px] mt-[400px] w-full max-w-[1280px] mx-auto" data-name="Section" data-node-id="726:1875">
        {/* Top Left Large Image - BYREDO Product */}
        <div className="absolute h-[372px] left-0 -top-[50px] w-[466px] overflow-hidden" data-name="Container" data-node-id="726:1876">
          <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
            <div className="absolute bg-[#e3e3e3] inset-0" />
            <img alt="" className="absolute inset-0 w-full h-full object-cover" src={imgContainer6} />
          </div>
        </div>
        
        {/* Top Right Small Image - Face */}
        <div className="absolute h-[138px] right-0 top-[262px] w-[109px] overflow-hidden" data-name="Container" data-node-id="726:1877">
          <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
            <div className="absolute bg-[#e3e3e3] inset-0" />
            <img alt="" className="absolute inset-0 w-full h-full object-cover" src={imgContainer7} />
          </div>
        </div>
        
        {/* Center Content - Journal Title & Newsletter */}
        <div className="absolute h-[271px] left-1/2 top-[389px] w-[500px] -translate-x-1/2" data-name="Container" data-node-id="726:1880">
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
            <div className="bg-[#231f20] h-[50px] relative w-full cursor-pointer hover:bg-[#3a3637] transition-colors" data-name="Container" data-node-id="726:1897">
              <p className="absolute css-ew64yg font-['Sk-Modernist',sans-serif] font-normal leading-[12px] left-1/2 not-italic text-[#ebebeb] text-[8px] text-center top-[19px] tracking-[0.2057px] translate-x-[-50%] uppercase" data-node-id="726:1898">
                VIEW MORE
              </p>
            </div>
          </div>
        </div>
        
        {/* Bottom Left Image - Mumbai Noise Product */}
        <div className="absolute h-[288px] left-0 top-[677px] w-[228px] overflow-hidden" data-name="Container" data-node-id="726:1878">
          <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
            <div className="absolute bg-[#e3e3e3] inset-0" />
            <img alt="" className="absolute inset-0 w-full h-full object-cover" src={imgContainer8} />
          </div>
        </div>
        
        {/* Bottom Right Large Image - Red Background */}
        <div className="absolute h-[277px] right-0 top-[803px] w-[348px] overflow-hidden" data-name="Container" data-node-id="726:1879">
          <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
            <div className="absolute bg-[#e3e3e3] inset-0" />
            <img alt="" className="absolute inset-0 w-full h-full object-cover" src={imgContainer9} />
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
