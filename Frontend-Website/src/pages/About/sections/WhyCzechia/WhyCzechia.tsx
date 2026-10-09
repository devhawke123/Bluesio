import SectionBadge from '../../../../components/SectionBadge/SectionBadge'
import czechiaNetwork from '../../../../assets/about-page/czechia-network.png'
import czechiaSite from '../../../../assets/about-page/czechia-site.png'
import czechiaSolar from '../../../../assets/about-page/czechia-solar.png'

type Reason = {
  title: string
  text: string
  image: string
  imageAlt: string
  // Figma crops the middle photo inside its frame
  imageClassName?: string
  // Middle column shows its photo above the text, the outer two below it
  imageFirst?: boolean
}

const reasons: Reason[] = [
  {
    title: '1. Strategic Geographic Advantage',
    text: 'Located in Most, Czechia, IRIS benefits from direct proximity to Germany while maintaining access to the wider Central and Eastern European market. The campus is strategically positioned near key European internet exchanges including Frankfurt, Leipzig, and Prague, enabling low-latency access across major digital corridors.',
    image: czechiaNetwork,
    imageAlt: 'Glowing network map of Europe',
  },
  {
    title: '2. Solving Europe’s Power & Land Challenge',
    text: 'As Germany faces increasing land scarcity, energy constraints, and complex permitting environments for new hyperscale data center developments, IRIS emerges as a strategically positioned spill-over solution capable of delivering scalable AI infrastructure with committed power availability and renewable integration.',
    image: czechiaSite,
    imageAlt: 'Industrial site that will host the campus',
    imageClassName: 'top-[-62.25%] left-[-13.72%] h-[175.72%] w-[113.66%]',
    imageFirst: true,
  },
  {
    title: '3. Renewable & Scalable Infrastructure',
    text: 'The project integrates large-scale photovoltaic solar infrastructure and battery energy storage systems alongside scalable high-voltage power distribution architecture — enabling long-term sustainable compute deployment at hyperscale level.',
    image: czechiaSolar,
    imageAlt: 'Solar panels and energy storage',
  },
]

function ReasonColumn({ reason, index }: { reason: Reason; index: number }) {
  const { title, text, image, imageAlt, imageClassName, imageFirst } = reason
  const photo = (
    <div className="relative aspect-496/268 w-full max-w-124 overflow-hidden rounded-[5px]">
      <img src={image} alt={imageAlt} className={`absolute max-w-none ${imageClassName ?? 'size-full object-cover'}`} />
    </div>
  )
  const copy = (
    <div className="flex max-w-124 flex-col gap-4.25">
      <h3 className="text-col-title text-white">{title}</h3>
      <p className="text-col-body text-white/80">{text}</p>
    </div>
  )

  return (
    <div
      className={[
        'flex flex-col lg:pb-31.25',
        index > 0 ? 'lg:border-l lg:border-blue-light lg:pl-12' : 'lg:pr-12',
        imageFirst ? 'gap-8 lg:gap-24 lg:pt-2.75' : 'gap-8 lg:gap-16.75 lg:pt-22',
      ].join(' ')}
    >
      {imageFirst ? (
        <>
          {photo}
          {copy}
        </>
      ) : (
        <>
          {copy}
          {photo}
        </>
      )}
    </div>
  )
}

export default function WhyCzechia() {
  return (
    <section className="mt-12 bg-glow-masterplan px-section-x py-12 text-white lg:mt-27.5 lg:px-[5.73%] lg:pt-34.25 lg:pb-0">
      <div data-reveal="up" className="flex flex-col items-start">
        <SectionBadge tone="light">Masterplan</SectionBadge>
        <h2 className="mt-3.25 max-w-167.5 bg-heading-masterplan bg-clip-text font-body text-display-tight font-bold text-transparent">
          Why Czechia &amp; Central Europe
        </h2>
      </div>

      <div data-reveal-stagger="up" className="mt-10 grid gap-12 lg:grid-cols-3 lg:gap-0">
        {reasons.map((reason, index) => (
          <ReasonColumn key={reason.title} reason={reason} index={index} />
        ))}
      </div>
    </section>
  )
}
