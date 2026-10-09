import SectionBadge from '../../../../components/SectionBadge/SectionBadge'
import geography from '../../../../assets/about-page/summary-geography.png'
import infrastructure from '../../../../assets/about-page/summary-infrastructure.jpg'
import power from '../../../../assets/about-page/summary-power.jpg'
import capacity from '../../../../assets/about-page/summary-capacity.jpg'
import SummaryCard from './SummaryCard'

export default function ExecutiveSummary() {
  return (
    <section className="mt-12 bg-lilac px-section-x py-12 lg:mt-10 lg:px-[3.33%] lg:pt-34 lg:pb-11">
      <div className="mx-auto flex w-full max-w-448.75 flex-col items-center">
        <div data-reveal="up" className="flex flex-col items-center text-center">
          <SectionBadge>Sustainability by Design</SectionBadge>
          <h2 className="mt-3 max-w-222.5 bg-heading-about bg-clip-text font-body text-display font-bold text-transparent">
            Executive Summary From The Investment Deck
          </h2>
          <p className="mt-7 max-w-276.75 text-body text-ink">
            IRIS is a 710 MW hyperscale AI data center campus located in Most, Czechia, just 20 km from the German border. Spanning 11 facilities across East and West campus divisions, it delivers 440 MW of deployable IT capacity for AI, HPC, cloud, and enterprise workloads. Phase 1 launches in 2027 with IRIS 1&ndash;5, followed by West Campus expansion through IRIS 6&ndash;11.
          </p>
        </div>

        {/* Tall cards stretch to the height of the two stacked middle cards */}
        <div data-reveal-stagger="up" className="mt-12 grid w-full gap-4.25 lg:mt-28.5 lg:grid-cols-[589fr_583fr_589fr]">
          <SummaryCard
            image={geography}
            alt="Aerial view of the IRIS campus surroundings"
            tinted
            title="Strategic Geographic Advantage"
            description="IRIS Data Center Campus is one of the most ambitious AI and cloud infrastructure developments planned in Central Europe. Strategically located in Most, Czechia — just 20 km from Germany and 85 km from Prague — the campus is engineered to support Europe’s accelerating demand for hyperscale cloud infrastructure, AI training, AI inference, and high-performance computing."
            className="aspect-4/5 lg:aspect-auto lg:h-full"
          />
          <div className="flex flex-col gap-3.5">
            <SummaryCard image={power} alt="Power transmission towers" title="710 MW Total Campus Electrical Power" className="aspect-583/417" />
            <SummaryCard image={capacity} alt="Industrial cooling pipework" title="440 MW Deployable IT Capacity" className="aspect-583/408" />
          </div>
          <SummaryCard
            image={infrastructure}
            alt="Modern office and data center buildings"
            title="New Infrastructure"
            imageClassName="top-[-1.49%] left-[-37.66%] h-full w-[218.31%]"
            className="aspect-4/5 lg:aspect-auto lg:h-full"
          />
        </div>
      </div>
    </section>
  )
}
