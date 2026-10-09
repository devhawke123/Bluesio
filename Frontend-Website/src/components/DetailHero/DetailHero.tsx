import backArrow from '../../assets/iris-3/back-arrow.svg'

type DetailHeroProps = {
  title: string
  backHref: string
  backLabel?: string
}

// Hero for detail pages: no navbar, a back arrow at the top left and the page title centred.
export default function DetailHero({ title, backHref, backLabel = 'Back' }: DetailHeroProps) {
  return (
    <section className="hero-stagger section relative items-center bg-glow-about-hero px-section-x text-center lg:aspect-1920/742 lg:min-h-0">
      <a href={backHref} aria-label={backLabel} className="absolute top-8 left-6 lg:top-40.75 lg:left-30">
        <img src={backArrow} alt="" width={40} height={40} className="size-10 rotate-180 transition-transform lg:hover:-translate-x-1" />
      </a>
      <h1 className="max-w-170 bg-heading-hero bg-clip-text font-body text-h1 font-bold text-transparent">{title}</h1>
    </section>
  )
}
