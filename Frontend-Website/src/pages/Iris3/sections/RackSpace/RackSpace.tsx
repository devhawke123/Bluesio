import SectionBadge from '../../../../components/SectionBadge/SectionBadge'
import rackDensities from '../../../../assets/iris-3/rack-densities.png'
// Same snowflake icon as the Facilities page's cooling feature card
import rackCdu from '../../../../assets/facilities/feature-cooling.png'
import rackTier from '../../../../assets/iris-3/rack-tier.png'

const cards = [
  {
    icon: rackDensities,
    title: 'High rack densities',
    text: '10 kW all the way up to +150 kW per rack or higher, multiple redundant power feeds from overhead busways, high floor load ratings.',
  },
  {
    icon: rackCdu,
    title: 'CDU integration',
    text: 'CDUs can be pre-installed, to connect the central chilled water plant to liquid-cooled rack manifolds.',
  },
  {
    icon: rackTier,
    title: 'Tier III capable',
    text: 'Each rack position is served by multiple independent power paths and redundant cooling, delivering built-in resilience and concurrent maintenance possibilities.',
  },
]

export default function RackSpace() {
  return (
    <section className="mt-9.25 bg-glow-rack px-section-x py-12 text-white lg:px-0 lg:pt-26 lg:pr-[7.2%] lg:pb-33.75 lg:pl-[4.74%]">
      <div data-reveal="up" className="flex flex-col items-center text-center lg:pl-[2%]">
        <SectionBadge tone="light" className="min-w-40.5">Rack space</SectionBadge>
        <h2 className="mt-4.25 max-w-167.5 bg-heading-masterplan bg-clip-text font-body text-display-tight font-bold text-transparent">
          Highly flexible rack space
        </h2>
        <p className="mt-5 max-w-230.75 text-col-body text-white/80">
          KONNECT rack positions are provisioned to accommodate the full spectrum of current and next-generation IT hardware, including high-density GPU and AI compute platforms
        </p>
      </div>

      <ul data-reveal-stagger="up" className="mt-10 grid gap-6 lg:mt-35 lg:grid-cols-3 lg:gap-x-[1.8%]">
        {cards.map((card) => (
          <li
            key={card.title}
            className="flex min-h-63.25 flex-col gap-5 border border-blue bg-glow-card px-8 pt-4.5 pb-6 font-card"
          >
            <img src={card.icon} alt="" width={72} height={67} className="h-16.75 w-18 shrink-0 object-cover" />
            <div className="flex flex-col gap-4.5">
              <h3 className="text-col-title font-semibold">{card.title}</h3>
              <p className="max-w-114.25 text-callout-desc">{card.text}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
