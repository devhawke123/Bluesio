import Button from '../../../../components/Button/Button'
import SectionBadge from '../../../../components/SectionBadge/SectionBadge'
import CapabilityDiagram from './CapabilityDiagram'

export default function CoreCapabilities() {
  return (
    <section className="mt-8 flex min-h-svh flex-col justify-center bg-glow-masterplan px-section-x pt-[6svh] pb-[4svh] text-white lg:mt-17">
      <div className="mx-auto flex w-full max-w-456 flex-col items-center">
        <div data-reveal="up" className="flex flex-col items-center text-center">
          <SectionBadge tone="light">Core Capabilities</SectionBadge>
          <h2 className="mt-3.25 max-w-237.25 bg-heading-masterplan bg-clip-text font-body text-display-tight font-bold text-transparent">
            Built For Next Generation Ai Infrastructure
          </h2>
          <p className="mt-5 max-w-258.5 text-body-relaxed">
            Every aspect of the IRIS campus is purpose-built to support AI, cloud, HPC, and enterprise workloads with scalable infrastructure, resilient power systems, and future-ready technologies.
          </p>
          <Button href="/facilities" variant="light" className="mt-9">Explore More</Button>
        </div>

        <div data-reveal="up" data-reveal-delay="100" className="mt-8 w-full">
          <CapabilityDiagram />
        </div>
      </div>
    </section>
  )
}
