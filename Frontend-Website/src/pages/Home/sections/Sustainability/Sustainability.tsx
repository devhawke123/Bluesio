import SectionBadge from '../../../../components/SectionBadge/SectionBadge'
import cooling from '../../../../assets/sustainability/cooling.jpg'
import heatRecovery from '../../../../assets/sustainability/heat-recovery.png'
import lowCarbon from '../../../../assets/sustainability/low-carbon.jpg'
import FeatureCard from './FeatureCard'

const features = [
  {
    image: cooling,
    title: 'Advanced Cooling',
    description: 'Engineered for high-density performance.',
    textTop: 'top-[71.5%]',
    imageClassName: 'top-[0.08%] left-[-60.94%] h-full w-[160.96%]',
  },
  {
    image: heatRecovery,
    title: 'Heat Recovery Solutions',
    description: 'Waste heat reused through district heating infrastructure',
    textTop: 'top-[68.6%]',
  },
  {
    image: lowCarbon,
    title: 'Low-Carbon Energy Strategy',
    description: 'Future compatibility with nuclear and other low-carbon energy sources',
    textTop: 'top-[68.6%]',
  },
]

// Sized to one viewport like the other sections: padding scales with height, cards scale with width.
export default function Sustainability() {
  return (
    <section className="mt-8 flex min-h-svh flex-col justify-center bg-lilac px-section-x pt-section-top pb-section-bottom lg:mt-11">
      <div className="mx-auto flex w-full max-w-397 flex-col items-center">
        <div data-reveal="up" className="flex flex-col items-center text-center">
          <SectionBadge>Sustainability by Design</SectionBadge>
          <h2 className="mt-1.5 max-w-146.5 bg-heading-about bg-clip-text font-body text-display font-bold text-transparent">
            Powering AI with Responsible Energy
          </h2>
          <p className="mt-7 max-w-276.75 text-body text-ink">
            IRIS is a 710 MW hyperscale AI data center campus located in Most, Czechia, just 20 km from the German border. Spanning 11 facilities across East and West campus divisions, it delivers 440 MW of deployable IT capacity for AI, HPC, cloud, and enterprise workloads. Phase 1 launches in 2027 with IRIS 1&ndash;5, followed by West Campus expansion through IRIS 6&ndash;11.
          </p>
        </div>

        <div data-reveal-stagger="up" className="mt-10 grid w-full max-w-107 grid-cols-1 gap-10 lg:mt-15.5 lg:max-w-none lg:grid-cols-3 lg:gap-x-[8.36%]">
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </section>
  )
}
