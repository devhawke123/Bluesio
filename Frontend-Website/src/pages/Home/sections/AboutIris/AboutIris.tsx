import irisAerial from '../../../../assets/about/iris-aerial.png'
import Button from '../../../../components/Button/Button'
import SectionBadge from '../../../../components/SectionBadge/SectionBadge'
import CircleTick from '../../../../components/CircleTick/CircleTick'

const highlights = ['High-Density Compute', 'Future Expansion', 'Enterprise-Grade Security']

export default function AboutIris() {
  return (
    <section className="relative mt-12 flex flex-col gap-12 overflow-hidden bg-lilac px-section-x py-16 sm:mt-20 lg:mt-31 lg:flex-row lg:items-start lg:justify-between lg:gap-10 lg:pt-38 lg:pr-9 lg:pb-12.75 lg:pl-25">
      <div data-reveal="left" className="flex w-full max-w-198 flex-col items-start gap-11.5">
        <div className="flex max-w-187 flex-col items-start">
          <SectionBadge>About IRIS Campus</SectionBadge>
          <h2 className="bg-heading-about bg-clip-text font-body text-display font-bold text-transparent">
            We Build What the Digital Future Runs On.
          </h2>
        </div>

        <div className="flex flex-col gap-4.75">
          <p className="text-body text-ink">
            BlueSio Technologies is developing IRIS, a next-generation hyperscale AI data center campus in Central Europe, purpose-built for cloud, AI, enterprise, and HPC workloads. Combining scalable infrastructure, renewable energy, and high-speed connectivity, IRIS is designed to power Europe&rsquo;s digital future.
          </p>
          <ul className="flex flex-col gap-4.75">
            {highlights.map((item) => (
              <li key={item} className="flex items-center gap-2.5 text-body text-ink">
                <CircleTick />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <Button href="/about" variant="gradient" className="mt-6 lg:mt-0">Explore&nbsp; More</Button>
      </div>

      <div data-reveal="right" data-reveal-delay="100" className="relative w-full max-w-210 shrink-0 lg:w-[43.75%]">
        {/* Decorative blue block tucked behind the photo's bottom-right corner */}
        <div aria-hidden="true" className="absolute -right-9 top-86.75 hidden h-74.5 w-68 bg-blue-edge lg:block" />
        <img src={irisAerial} alt="Aerial view of the IRIS campus site" className="relative aspect-840/578 w-full rounded-[5px] object-cover" />
      </div>
    </section>
  )
}
