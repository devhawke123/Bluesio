import Button from '../../../../components/Button/Button'
import SectionBadge from '../../../../components/SectionBadge/SectionBadge'
import FacilityDiagram from './FacilityDiagram'

// Sized to one viewport: padding and the scaling diagram keep header + diagram in a single screen on desktop.
export default function Masterplan() {
  return (
    <section className="mt-12 flex min-h-svh flex-col justify-center bg-glow-masterplan px-section-x pt-section-top pb-section-bottom text-white sm:mt-20 lg:mt-27.5">
      <div className="mx-auto flex w-full max-w-420 flex-col items-center gap-1">
        <div data-reveal="up" className="flex flex-col items-center text-center">
          <SectionBadge tone="light">Masterplan</SectionBadge>
          <h2 className="mt-3.5 max-w-167.5 bg-heading-masterplan bg-clip-text font-body text-display-tight font-bold text-transparent">
            A Campus Built at Hyperscale
          </h2>
          <p className="mt-7.75 max-w-258.5 text-body-relaxed">
            IRIS is a 710 MW hyperscale AI data center campus located in Most, Czechia, just 20 km from the German border. Spanning 11 facilities across East and West campus divisions, it delivers 440 MW of deployable IT capacity for AI, HPC, cloud, and enterprise workloads. Phase 1 launches in 2027 with IRIS 1&ndash;5, followed by West Campus expansion through IRIS 6&ndash;11.
          </p>
          <Button href="/masterplan" variant="light" className="mt-5.5">Explore Master Plan</Button>
        </div>

        <div data-reveal="up" data-reveal-delay="100" className="mt-8 w-full xl:mt-0">
          <FacilityDiagram />
        </div>
      </div>
    </section>
  )
}
