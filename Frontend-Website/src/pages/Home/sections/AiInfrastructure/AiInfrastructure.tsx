import SectionBadge from '../../../../components/SectionBadge/SectionBadge'
import pipeline from '../../../../assets/sustainability/low-carbon.jpg'
import solarDataCenter from '../../../../assets/sustainability/heat-recovery.png'
import campusAerial from '../../../../assets/ai-infrastructure/campus-aerial.png'
import FeatureItem from './FeatureItem'

const features = {
  compute: { title: 'High Density AI Compute', description: 'Designed for GPU\nclusters and AI training' },
  cooling: { title: 'Direct Liquid Cooling (DLC)', description: 'Advanced cooling for\nmaximum performance' },
  hpc: { title: 'HPC Ready', description: 'Built for high performance\ncomputing at scale' },
  hyperscale: { title: 'Hyperscale Architecture', description: 'Scalable, resilient and\nfuture-proof design.' },
}

// xl and up: everything is positioned in percentages of the 1847 x 565 Figma composition, so it scales as one piece.
// left/top/width/height are percentages of that canvas.
type Box = { left: number; top: number; width: number; height: number }

const photos: { src: string; alt: string; photo: Box; block: Box; rounded?: boolean }[] = [
  {
    src: pipeline,
    alt: 'Industrial cooling pipework',
    photo: { left: 0, top: 46.37, width: 22.96, height: 53.63 },
    block: { left: 10.016, top: 57.88, width: 14.73, height: 42.12 },
  },
  {
    src: campusAerial,
    alt: 'Aerial view of the IRIS campus',
    photo: { left: 26.37, top: 11.86, width: 45.32, height: 88.14 },
    block: { left: 58.96, top: 55.75, width: 14.73, height: 44.25 },
    rounded: true,
  },
  {
    src: solarDataCenter,
    alt: 'Data center beside a solar field and wind turbines',
    photo: { left: 75.31, top: 0, width: 22.96, height: 53.63 },
    block: { left: 85.28, top: 11.5, width: 14.73, height: 42.12 },
  },
]

const itemPositions = [
  { feature: features.compute, left: 2.707, top: 0.35 },
  { feature: features.cooling, left: 2.707, top: 24.42 },
  { feature: features.hpc, left: 77.91, top: 63.72 },
  { feature: features.hyperscale, left: 77.91, top: 84.6 },
]

const toStyle = ({ left, top, width, height }: Partial<Box>) => ({
  left: `${left}%`,
  top: `${top}%`,
  ...(width === undefined ? {} : { width: `${width}%` }),
  ...(height === undefined ? {} : { height: `${height}%` }),
})

export default function AiInfrastructure() {
  return (
    <section className="mt-8 bg-lilac px-section-x py-12 lg:mt-13.5 lg:pt-27 lg:pb-9.75 xl:px-[1.93%]">
      <div className="mx-auto w-full max-w-461.75">
        <div data-reveal="up" className="flex flex-col items-start lg:pl-[3.93%]">
          <SectionBadge>AI-Ready Infrastructure</SectionBadge>
          <h2 className="mt-0.5 max-w-187 bg-heading-about bg-clip-text font-body text-display font-bold text-transparent">
            Purpose-Built For AI Workloads
          </h2>
        </div>

        {/* xl and up: the Figma composition */}
        <div data-reveal="up" data-reveal-delay="100" className="relative mt-23 hidden aspect-1847/565 w-full xl:block">
          {photos.map(({ src, alt, photo, block, rounded }) => (
            <div key={alt}>
              <div aria-hidden="true" className={`absolute bg-blue-edge ${rounded ? 'rounded-[5px]' : ''}`} style={toStyle(block)} />
              <img src={src} alt={alt} className="absolute rounded-[5px] object-cover" style={toStyle(photo)} />
            </div>
          ))}
          {itemPositions.map(({ feature, left, top }) => (
            <div key={feature.title} className="absolute w-[19.33%]" style={{ left: `${left}%`, top: `${top}%` }}>
              <FeatureItem {...feature} />
            </div>
          ))}
        </div>

        {/* Below xl: photos stacked, then the four features */}
        <div data-reveal="up" data-reveal-delay="200" className="mt-10 flex flex-col gap-8 xl:hidden">
          <div className="grid gap-4 sm:grid-cols-2">
            {photos.map(({ src, alt }, index) => (
              <img
                key={alt}
                src={src}
                alt={alt}
                className={`w-full rounded-[5px] object-cover ${index === 1 ? 'aspect-video sm:col-span-2' : 'aspect-424/303'}`}
              />
            ))}
          </div>
          <div className="grid gap-8 sm:grid-cols-2">
            {itemPositions.map(({ feature }) => (
              <FeatureItem key={feature.title} {...feature} className="w-full max-w-89.25" />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
