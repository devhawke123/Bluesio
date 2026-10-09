import SectionBadge from '../../../../components/SectionBadge/SectionBadge'
import docText from '../../../../assets/roadmap/doc-text.svg'
import sparkle from '../../../../assets/roadmap/sparkle.svg'
import PhaseCard from './PhaseCard'
import type { Phase } from './PhaseCard'

const phases: Phase[] = [
  {
    year: '2027',
    label: 'Phase 01',
    headerIcon: docText,
    title: 'Phase 1',
    subtitle: 'Initial Deployment',
    items: ['IRIS 3 – 50 MW – Q1 2027'],
    status: { label: 'Completed', tone: 'success', className: 'lg:bottom-13.5' },
    tiles: [
      { icon: 'home', title: 'Enterprise Security', description: 'Robust, high-capacity and highly reliable.' },
      { icon: 'plus', title: 'Master Planning', description: 'Campus infrastructure, grid design & zoning.' },
      { icon: 'chart', title: 'Engineering & Design', description: 'Future-ready engineering for a future-ready campus.' },
    ],
    minHeight: 'lg:min-h-98.25',
  },
  {
    year: '2028–2029',
    label: 'Phase 02',
    headerIcon: sparkle,
    title: 'Phase 2',
    subtitle: 'Initial Deployment',
    items: ['IRIS 1 – 75 MW – Q2 2028', '200 MW GIS Substation – Q2 2028', 'IRIS 4 – 54 MW – Q3 2029', 'IRIS 5 – 72 MW – Q3 2029'],
    tiles: [
      { icon: 'home', title: 'Power Infrastructure', description: 'Scalable, high-capacity power for the campus.' },
      { icon: 'plus', title: 'Fiber Connectivity', description: 'High-speed, low-latency fiber network.' },
      { icon: 'chart', title: 'Utilities & Systems', description: 'Water, cooling and essential systems.' },
    ],
    minHeight: 'lg:min-h-123',
  },
  {
    year: '2030–2031',
    label: 'Phase 03',
    headerIcon: docText,
    title: 'Phase 3',
    subtitle: 'Campus Expansion',
    items: ['IRIS 6 & 7 – Q2 2030', 'IRIS 8 & 11 – Q4 2030', 'IRIS 9 & 10 – Q4 2030', '500 MW GIS Substation – Q2 2030', 'IRIS 2 – 135 MW – Q4 2031'],
    status: { label: 'Future Expansion', tone: 'future', className: 'lg:bottom-8.25' },
    tiles: [
      { icon: 'home', title: 'IRIS 6–11', description: 'West campus expansion with 6 additional halls.' },
      { icon: 'plus', title: '500 MW Substation', description: 'Scalable grid infrastructure for full campus.' },
      { icon: 'chart', title: 'Future AI Capacity', description: 'Next-generation compute for AI innovation.' },
    ],
    minHeight: 'lg:min-h-123',
  },
]

// Three stacked phase cards make this section taller than one screen by design (Figma frame is ~2000px).
export default function Roadmap() {
  return (
    <section className="mt-8 bg-lilac px-section-x py-12 lg:mt-18 lg:pt-27 lg:pr-[17.81%] lg:pb-33 lg:pl-[5.78%]">
      <div className="mx-auto flex w-full max-w-366.75 flex-col lg:mx-0">
        <div data-reveal="up" className="flex max-w-203 flex-col items-start">
          <SectionBadge>About IRIS Campus</SectionBadge>
          <h2 className="mt-0.5 max-w-187 bg-heading-about bg-clip-text font-body text-display font-bold text-transparent">
            Building the Future in Phases
          </h2>
          <p className="mt-5 max-w-198 text-body text-ink">
            IRIS is being developed through a carefully planned multi-phase roadmap, ensuring scalable growth while meeting the increasing demand for AI, cloud, and enterprise infrastructure.
          </p>
        </div>

        <div data-reveal-stagger="up" className="mt-12.5 flex flex-col gap-15">
          {phases.map((phase) => (
            <PhaseCard key={phase.label} phase={phase} />
          ))}
        </div>
      </div>
    </section>
  )
}
