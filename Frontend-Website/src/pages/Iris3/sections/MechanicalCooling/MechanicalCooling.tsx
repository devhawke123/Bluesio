import SectionBadge from '../../../../components/SectionBadge/SectionBadge'
import BlockedImage from '../../../../components/BlockedImage/BlockedImage'
import mechanical from '../../../../assets/iris-3/mechanical.png'

export default function MechanicalCooling() {
  return (
    <section className="mt-8 bg-glow-masterplan px-section-x py-12 text-white lg:mt-14.25 lg:grid lg:grid-cols-[670fr_760fr] lg:items-center lg:gap-[12.7%] lg:pt-40.75 lg:pr-[11.8%] lg:pb-35.75 lg:pl-[5.73%]">
      <div data-reveal="left" className="flex flex-col items-start gap-1.75">
        <SectionBadge tone="light" className="min-w-40.5">Mechanical</SectionBadge>
        <h2 className="bg-heading-masterplan bg-clip-text font-body text-display-tight font-bold text-transparent">Cooling Strategy</h2>
        <p className="text-col-body text-white/80">
          A next-generation modular infrastructure platform by Bluesio Technologies, engineered for 5MW to 8MW+ enterprise and hyperscale IT workloads. Purpose-built for AI and HPC compute clusters requiring rapid deployment, operational simplicity, and extreme resilience.
        </p>
      </div>

      <BlockedImage
        src={mechanical}
        alt="Modular data center buildings with cooling equipment"
        frameClassName="aspect-760/458 w-full"
        block={{ left: '67.6%', top: '49.3%', width: '35.8%', height: '50.7%' }}
        imageClassName="top-[-18.96%] left-[0.02%] h-[119.01%] w-full"
        className="mt-10 lg:mt-0"
      />
    </section>
  )
}
