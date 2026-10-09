import SectionBadge from '../../../../components/SectionBadge/SectionBadge'
import cardThumb from '../../../../assets/masterplan-page/card-thumb.png'
import SummaryCard from './SummaryCard'

// Figma repeats one card three times ("IRIS East"); replace with the real per-campus content when supplied.
const cards = Array.from({ length: 3 }, (_, index) => ({
  id: `summary-${index + 1}`,
  title: 'IRIS East',
  items: ['IRIS 1 — 75 MW', 'IRIS 2 — 135 MW', 'IRIS 3 — 50 MW HPC Deployment.'],
}))

export default function DivisionSummary() {
  return (
    <section className="mt-12 bg-glow-masterplan px-section-x py-12 text-white lg:mt-37.75 lg:pt-28.5 lg:pb-30">
      <div className="mx-auto flex w-full max-w-434.25 flex-col items-center">
        <div data-reveal="up" className="flex flex-col items-center text-center">
          <SectionBadge tone="light">Masterplan</SectionBadge>
          <h2 className="mt-3.25 max-w-167.5 bg-heading-masterplan bg-clip-text font-body text-display-tight font-bold text-transparent">
            East &amp; West campus divisions
          </h2>
        </div>

        <div data-reveal-stagger="up" className="mt-10 grid w-full gap-6 lg:mt-37 lg:grid-cols-3 lg:gap-[3.11%]">
          {cards.map(({ id, ...card }) => (
            <SummaryCard key={id} {...card} image={cardThumb} />
          ))}
        </div>
      </div>
    </section>
  )
}
