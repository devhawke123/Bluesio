import heroBg from '../../../../assets/home/hero-bg.png'
import Navbar from '../../../../components/Navbar/Navbar'
import Button from '../../../../components/Button/Button'

export default function Hero() {
  return (
    <section className="section relative items-center overflow-hidden rounded-b-xl px-section-x pt-32 text-center text-white">
      <img src={heroBg} alt="" className="absolute inset-0 size-full object-cover" />
      <Navbar />

      <div className="hero-stagger relative -top-1.25 flex w-full max-w-180 flex-col items-center gap-5.5">
        <div className="flex flex-col items-center">
          <p className="font-display text-eyebrow font-semibold uppercase">
            Europe&rsquo;s next-generation digital infrastructure
          </p>
          <h1 className="bg-heading-hero bg-clip-text font-body text-h1 font-bold text-transparent">
            Powering the Future of AI at Hyperscale.
          </h1>
        </div>

        <div className="flex flex-col items-center gap-9">
          <p className="max-w-198 font-display text-lead font-medium">
            A 710 MW hyperscale data center campus engineered for AI, HPC, cloud, and next-generation compute &mdash; built for performance, resilience, and sustainable growth.
          </p>
          <div className="flex flex-col items-center gap-5 sm:flex-row">
            <Button href="/connectivity" variant="light">Explore Connectivity Solutions</Button>
            <Button href="/contact" variant="outline-white">Partner with us</Button>
          </div>
        </div>
      </div>
    </section>
  )
}
