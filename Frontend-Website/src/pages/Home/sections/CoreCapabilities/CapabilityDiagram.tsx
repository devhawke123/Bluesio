import campus3d from '../../../../assets/capabilities/iris-campus-3d.png'
import arrowHorizontal from '../../../../assets/capabilities/arrow-horizontal.svg'
import CapabilityCard from './CapabilityCard'

// Positions are percentages of the 1824 x 772 Figma area that holds the cards and the 3D image,
// so the diagram scales as one piece. left/top are the card's top-left corner.
const capabilities = [
  { title: 'AI-Optimized Compute', description: 'Built for next-generation AI and HPC workloads.', left: 0, top: 5.311 },
  { title: 'Enterprise Security', description: 'Resilient, monitored, and highly secure.', left: 0, top: 39.249 },
  { title: 'Modular Expansion', description: 'Designed to scale with future demand.', left: 77.851, top: 0 },
  { title: 'Power Efficiency', description: 'Intelligent energy infrastructure.', left: 77.796, top: 39.249 },
  { title: 'Advanced Cooling', description: 'Engineered for high-density performance.', left: 23.958, top: 81.52 },
  { title: 'Sustainability', description: 'Renewable-ready, future-focused campus.', left: 55.208, top: 81.48 },
]

// Each Arrow reproduces its Figma frame: box position/size plus the transforms Figma applied.
type ArrowProps = {
  src: string
  left: number
  top: number
  width: number
  height: number
  inset: string
  className?: string
  centered?: boolean
}

function Arrow({ src, left, top, width, height, inset, className, centered = false }: ArrowProps) {
  const position = centered ? '-translate-x-1/2 -translate-y-1/2' : ''
  return (
    <div
      aria-hidden="true"
      className={['absolute [filter:drop-shadow(0_0_1px_white)_drop-shadow(0_0_1px_white)]', position, className].filter(Boolean).join(' ')}
      style={{ left: `${left}%`, top: `${top}%`, width: `${width}%`, height: `${height}%` }}
    >
      <img src={src} alt="" className={`absolute block size-full max-w-none ${inset}`} />
    </div>
  )
}

export default function CapabilityDiagram() {
  return (
    <>
      {/* lg and up: scales as one piece; the width is capped by viewport height (header + padding ~30rem) so the section fits one screen */}
      <div className="relative mx-auto hidden aspect-1824/772 w-[min(100%,clamp(52rem,calc((100svh-30rem)*2.363),114rem))] lg:block">
        <div className="absolute overflow-hidden" style={{ left: '30.263%', top: '11.788%', width: '40.13%', height: '68.91%' }}>
          <img src={campus3d} alt="Isometric view of the IRIS data center campus" className="absolute top-[-4.49%] left-[-7.12%] h-[103.28%] w-[112.61%] max-w-none" />
        </div>

        {capabilities.map(({ left, top, ...card }) => (
          <div key={card.title} className="absolute w-[22.149%]" style={{ left: `${left}%`, top: `${top}%` }}>
            <CapabilityCard {...card} />
          </div>
        ))}

        {/* Left arrows point at the cards */}
        <Arrow src={arrowHorizontal} left={22.204} top={13.128} width={7.417} height={1.5415} inset="inset-[0_-17.53%_-55.13%_0]" />
        <Arrow src={arrowHorizontal} left={22.149} top={50.82} width={7.417} height={1.5415} inset="inset-[0_-17.53%_-55.13%_0]" />

        {/* Right arrows point away from the image */}
        <Arrow src={arrowHorizontal} left={70.434} top={11.574} width={7.417} height={1.5415} inset="inset-[0_-17.53%_-55.13%_0]" className="-scale-y-100 rotate-180" />
        <Arrow src={arrowHorizontal} left={70.38} top={51.68} width={7.417} height={0.2174} inset="inset-[0_-17.53%_-999.98%_0]" className="-scale-y-100 rotate-180 skew-x-[0.16deg]" />

        {/* Down arrows reuse the horizontal arrow, rotated; the tip touches the top of each bottom card */}
        <Arrow centered src={arrowHorizontal} left={35.28} top={72.72} width={7.417} height={1.5415} inset="inset-[0_-17.53%_-55.13%_0]" className="-rotate-90" />
        <Arrow centered src={arrowHorizontal} left={66.53} top={72.72} width={7.417} height={1.5415} inset="inset-[0_-17.53%_-55.13%_0]" className="-rotate-90" />
      </div>

      {/* Below lg: the image, then the cards stacked in reading order */}
      <div className="mx-auto flex w-full max-w-185 flex-col items-center gap-6 lg:hidden">
        <img src={campus3d} alt="Isometric view of the IRIS data center campus" className="aspect-732/532 w-full max-w-120 object-cover" />
        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
          {capabilities.map(({ left: _left, top: _top, ...card }) => (
            <CapabilityCard key={card.title} {...card} className="w-full" />
          ))}
        </div>
      </div>
    </>
  )
}
