import SectionBadge from '../../../../components/SectionBadge/SectionBadge'
import BlockedImage from '../../../../components/BlockedImage/BlockedImage'
import dataHall from '../../../../assets/iris-3/data-hall.jpg'

// Each heading gets its own gradient and box width, as in Figma (258 / 468 / full-width px), so the navy-to-blue change lands in the same place.
// The first item's description repeats an unrelated line in Figma ("From fiber to finished garment"); kept until real copy arrives.
const features = [
  { title: 'Dual cooling pipeways', text: 'From fiber to finished garment', titleClassName: 'bg-feature-title-1 lg:w-64.5' },
  {
    title: 'Plug-and-play',
    text: 'Generous dimensions give technicians full freedom to install and maintain equipment',
    titleClassName: 'bg-feature-title-2 lg:w-117',
  },
  {
    title: 'Factory-integrated',
    text: 'Complete with VESDA fire detection, gas suppression, ESD flooring, 4 or even 6 redundant busways, cable trays, dual cooling pipeways, air renovation systems … all factory-tested and ready to connect on arrival.',
    titleClassName: 'bg-feature-title-3 lg:w-full',
  },
]

export default function DataHall() {
  return (
    <section className="mt-12 bg-lilac px-section-x py-12 lg:mt-12.75 lg:grid lg:grid-cols-[855fr_781fr] lg:gap-[8.4%] lg:pt-34 lg:pr-[3.28%] lg:pb-17.5 lg:pl-[3.07%]">
      <div data-reveal="left" className="flex flex-col items-start">
        <SectionBadge className="min-w-40.5">Whitespace</SectionBadge>
        <h2 className="mt-6.75 bg-heading-about bg-clip-text font-body text-display font-bold text-transparent">Data hall</h2>
        <div className="mt-10.75 flex max-w-201 flex-col text-body-loose text-ink">
          <p>Multiple connected modules provide the perfect space to house ITE racks, arranged for maximum density and airflow efficiency.</p>
          <p>
            Once deployed and interconnected, every KONNECT HPC module is a fully enclosed, thermally isolated, and weatherproof structure. The modules can meet up to EI120 fire resistance ratings, engineered for deployment in extreme climates, maintaining stable internal thermal conditions and reducing the burden on cooling infrastructure.
          </p>
        </div>

        <ul className="mt-10 flex flex-col gap-4.5 font-card">
          {features.map((feature) => (
            <li key={feature.title} className="max-w-213.75">
              <h3 className={`bg-clip-text text-feature-subtitle font-bold text-transparent ${feature.titleClassName}`}>{feature.title}</h3>
              <p className="mt-1.5 text-callout-desc text-ink">{feature.text}</p>
            </li>
          ))}
        </ul>
      </div>

      <BlockedImage
        src={dataHall}
        alt="Interior of a KONNECT HPC data hall module"
        frameClassName="aspect-781/462 w-full"
        block={{ left: '67.7%', top: '49.8%', width: '34.8%', height: '50.2%' }}
        className="mt-10 lg:mt-12"
      />
    </section>
  )
}
