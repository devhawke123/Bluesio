import SectionBadge from '../../../../components/SectionBadge/SectionBadge'
import fireBg from '../../../../assets/iris-3/fire-bg.svg'

const steps = [
  {
    number: '01',
    title: 'Early Warning Detection',
    text: 'Aspirating smoke detection (ASD) systems sample air continuously, providing pre-alarm notification at smoke concentrations well below visible levels, enabling intervention before suppression discharge.',
    width: 'lg:w-[28.6%]',
  },
  {
    number: '02',
    title: 'Argonite Suppression',
    text: 'Suppression discharges through nozzles, achieving full 3D distribution and design concentration throughout the protected zone within seconds of activation, per ISO 14520 and EN 15004-8 design standards.',
    width: 'lg:ml-[5.5%] lg:w-[24.8%]',
  },
  {
    number: '03',
    title: 'Room Integrity',
    text: 'Module enclosure design is verified for gas retention via door fan pressure tests, ensuring suppression agent concentration is maintained for the required hold time after discharge.',
    width: 'lg:ml-[13.3%] lg:w-[27.7%]',
  },
]

// The badge repeats "Rack space" from the previous block in Figma; kept until a Fire-specific label is supplied.
export default function FireSuppression() {
  return (
    <section className="relative mt-11.5 overflow-hidden px-section-x py-12 text-white lg:pt-28.5 lg:pr-[3%] lg:pb-21.75 lg:pl-[5.73%]">
      <img src={fireBg} alt="" className="absolute inset-0 size-full max-w-none" />

      <div data-reveal="up" className="relative">
        <div className="flex flex-col items-start">
          <SectionBadge tone="light" className="min-w-40.5">Rack space</SectionBadge>
          <h2 className="mt-14 max-w-182.5 bg-heading-masterplan bg-clip-text font-body text-display-tight font-bold text-transparent">
            Fire Detection &amp; Suppression
          </h2>
          <p className="mt-8 max-w-264.25 text-col-body text-white/80">
            KONNECT HPC modules are protected by a pure nitrogen gas suppression system, the preferred solution for IT-occupied spaces where water-based suppression would cause catastrophic equipment damage. The system uses inert nitrogen (IG-100), generated on-site from a solid bound compound, to suppress fire by reducing oxygen concentration.
          </p>
        </div>

        <ol className="mt-12 flex flex-col gap-10 lg:mt-16.75 lg:ml-[0.3%] lg:flex-row lg:items-start lg:gap-0">
          {steps.map((step) => (
            <li key={step.number} className={`flex flex-col font-card ${step.width}`}>
              <span className="text-detail-number font-semibold">{step.number}</span>
              <h3 className="mt-2.5 bg-heading-masterplan bg-clip-text text-detail-title font-bold text-transparent">{step.title}</h3>
              <p className="mt-3 text-col-body">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
