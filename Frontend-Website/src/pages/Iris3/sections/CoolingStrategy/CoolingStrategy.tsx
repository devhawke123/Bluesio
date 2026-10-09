import SectionBadge from '../../../../components/SectionBadge/SectionBadge'
import BlockedImage from '../../../../components/BlockedImage/BlockedImage'
import coolingDiagram from '../../../../assets/iris-3/cooling-diagram.jpg'
import coolingPipes from '../../../../assets/iris-3/cooling-pipes.jpg'

export default function CoolingStrategy() {
  return (
    <section className="mt-10.25 bg-lilac px-section-x py-12 lg:pt-29.75 lg:pr-[16.35%] lg:pb-0 lg:pl-[13.07%]">
      <div className="mx-auto flex max-w-346.75 flex-col items-center">
        <div data-reveal="up" className="flex flex-col items-center text-center">
          <SectionBadge className="min-w-40.5">Summary</SectionBadge>
          <h2 className="mt-0.75 bg-heading-about bg-clip-text font-body text-display font-bold text-transparent">Cooling Strategy</h2>
          <p className="mt-10 max-w-276.75 text-body-loose text-ink">
            KONNECT&apos;s cooling architecture is designed around a deliberate evaluation framework rather than a fixed solution. The primary analysis compares hybrid air/liquid cooling, combining rear door heat exchangers with direct liquid cooling, against full chiller-based solutions. The hybrid approach is selected as the reference design due to its ability to support both legacy air-cooled equipment and emerging high-density liquid-cooled workloads within the same physical infrastructure
          </p>
        </div>

        <div data-reveal-stagger="up" className="mt-10 grid w-full gap-8 lg:mt-11.75 lg:grid-cols-[633fr_673fr] lg:gap-x-[5.8%]">
          <BlockedImage
            src={coolingDiagram}
            alt="Diagram of the two-ring cooling plant"
            frameClassName="aspect-633/390 w-full"
            block={{ left: '64.1%', top: '41%', width: '43%', height: '59.5%' }}
          />
          <BlockedImage
            src={coolingPipes}
            alt="Liquid cooling pipework inside a module"
            frameClassName="aspect-673/390 w-full"
            block={{ left: '64.9%', top: '40.5%', width: '40.4%', height: '59.5%' }}
            imageClassName="top-[-93.41%] left-[-0.04%] h-[195.28%] w-full"
          />
        </div>
      </div>
    </section>
  )
}
