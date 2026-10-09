import SectionBadge from '../../../../components/SectionBadge/SectionBadge'
import Bullet from '../../../../components/Bullet/Bullet'
import eastCampus from '../../../../assets/masterplan-page/east-campus.png'
import westCampus from '../../../../assets/masterplan-page/west-campus.png'

type Division = {
  title: string
  intro: string
  image: string
  alt: string
  items: string[]
}

const divisions: Division[] = [
  {
    title: 'IRIS East',
    intro: 'The East Campus includes:',
    image: eastCampus,
    alt: 'Aerial view of the East campus site',
    items: ['IRIS 1 — 75 MW', 'IRIS 2 — 135 MW', 'IRIS 3 — 50 MW HPC Deployment.', 'Dedicated substations and AI-ready infrastructure architecture.'],
  },
  {
    title: 'IRIS West',
    intro: 'The West Campus includes:',
    image: westCampus,
    alt: 'Aerial view of the West campus site',
    items: ['IRIS 4–11', 'Standardized hyperscale deployment architecture', 'Modular expansion strategy', 'High-density AI deployment facilities'],
  },
]

function DivisionColumn({ division, index }: { division: Division; index: number }) {
  const { title, intro, image, alt, items } = division
  return (
    <div
      className={[
        'flex flex-col items-center lg:pb-19.25',
        index === 0 ? 'lg:pr-[3%] lg:pl-[8.7%]' : 'lg:border-l lg:border-sky lg:pr-[8.7%] lg:pl-[8.9%]',
      ].join(' ')}
    >
      <div className="flex w-full max-w-155.5 flex-col gap-6.25">
        <div className="relative">
          {/* Decorative blue block behind the photo's bottom-right corner */}
          <div aria-hidden="true" className="absolute top-[37.8%] left-[59.2%] hidden h-[62.2%] w-[43.7%] bg-blue-edge lg:block" />
          <img src={image} alt={alt} className="relative z-10 aspect-622/344 w-full rounded-[5px] object-cover" />
        </div>

        <div className="flex flex-col gap-4.5">
          <div className="flex flex-col gap-2">
            <h3 className="text-col-title font-medium text-white">{title}</h3>
            <p className="text-col-body text-white">{intro}</p>
          </div>
          <ul className="flex flex-col gap-3">
            {items.map((item) => (
              <li key={item} className="flex min-h-15 items-center gap-3.25 rounded-[5px] border border-blue bg-blue/13 px-3 py-3">
                <Bullet />
                <span className="text-col-body text-white">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default function Divisions() {
  return (
    <section className="mt-12 bg-glow-masterplan px-section-x py-12 text-white lg:mt-14.5 lg:px-0 lg:pt-24.75 lg:pb-0">
      <div data-reveal="up" className="flex flex-col items-center text-center">
        <SectionBadge tone="light">Masterplan</SectionBadge>
        <h2 className="mt-3.25 max-w-167.5 bg-heading-masterplan bg-clip-text font-body text-display-tight font-bold text-transparent">
          East &amp; West campus divisions
        </h2>
      </div>

      <div data-reveal-stagger="up" className="mt-10 grid gap-12 lg:mt-17.25 lg:grid-cols-2 lg:gap-0">
        {divisions.map((division, index) => (
          <DivisionColumn key={division.title} division={division} index={index} />
        ))}
      </div>
    </section>
  )
}
