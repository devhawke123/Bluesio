import SectionBadge from '../../../../components/SectionBadge/SectionBadge'
import architectureBg from '../../../../assets/iris-3/architecture-bg.png'
import archDot from '../../../../assets/iris-3/arch-dot.svg'

const blocks = [
  { title: 'Whitespace HPC Modules', text: 'Left-Right paired cells, 2MW each' },
  { title: 'Power E-Houses', text: 'Containerized MV/LV distribution and UPS' },
  { title: 'Chiller Skids', text: '335kW modular units with mixing tanks' },
]

export default function CoreArchitecture() {
  return (
    <section className="relative mt-7 overflow-hidden px-section-x py-12 text-center text-white lg:mt-6.75 lg:pt-25.5 lg:pb-34.5">
      {/* Figma crops the photo inside the frame; the percentages reproduce that crop */}
      <img src={architectureBg} alt="" className="absolute top-[-47.16%] left-[0.02%] h-[170.08%] w-full max-w-none" />
      <div aria-hidden="true" className="absolute inset-0 bg-black/45" />

      <div className="relative mx-auto flex w-full max-w-370.75 flex-col items-center">
        <SectionBadge data-reveal="up" tone="light" className="min-w-51.25">Architecture</SectionBadge>
        <h2 data-reveal="up" data-reveal-delay="100" className="mt-5.5 font-body text-display font-bold">Core Architecture</h2>
        <p data-reveal="up" data-reveal-delay="200" className="mt-8 max-w-276.75 text-body-loose">
          The KONNECT system is assembled from discrete, pre-engineered, and factory-tested building blocks &mdash; whitespace modules, power E-houses, and chiller skids &mdash; purpose-designed to compress construction timelines, minimize on-site integration risk, and deliver a fully validated infrastructure stack from day one.
        </p>

        <ul data-reveal-stagger="up" className="mt-12 grid w-full gap-8 text-left lg:mt-24 lg:grid-cols-3 lg:gap-x-[8.8%]">
          {blocks.map((block) => (
            <li key={block.title} className="flex items-center gap-2.75 font-card">
              <img src={archDot} alt="" width={39} height={39} className="size-9.75 shrink-0" />
              <div className="flex flex-col gap-3.75">
                <h3 className="text-col-title font-semibold">{block.title}</h3>
                <p className="text-callout-desc">{block.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
