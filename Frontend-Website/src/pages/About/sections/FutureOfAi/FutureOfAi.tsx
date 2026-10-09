import SectionBadge from '../../../../components/SectionBadge/SectionBadge'
import futureBg from '../../../../assets/about-page/future-bg.png'

export default function FutureOfAi() {
  return (
    <section className="relative mt-12 flex justify-center overflow-hidden px-section-x py-16 text-center lg:mt-32.5 lg:aspect-1920/845 lg:pt-55 lg:pb-42.25">
      <img src={futureBg} alt="" className="absolute inset-0 size-full object-cover" />
      <div aria-hidden="true" className="absolute inset-0 bg-future-overlay" />

      <div data-reveal="up" className="relative flex w-full max-w-262.5 flex-col items-center gap-5.25 self-start">
        <SectionBadge tone="light">Future of AI</SectionBadge>
        <h2 className="max-w-179.25 bg-heading-hero bg-clip-text font-body text-display-tight font-bold text-transparent">
          Built For Next Generation Ai Infrastructure
        </h2>
        <div className="flex flex-col gap-7.75 text-lead-relaxed font-medium text-white">
          <p>
            IRIS incorporates advanced direct liquid cooling and high-density AI-ready deployment architecture to support next-generation digital infrastructure.
          </p>
          <p>
            The campus is purpose-built to serve hyperscalers, neo-cloud providers, GPU-as-a-Service operators, enterprise cloud deployments, and large-scale AI workloads, providing the scalability, efficiency, and resilience required for future growth.
          </p>
        </div>
      </div>
    </section>
  )
}
