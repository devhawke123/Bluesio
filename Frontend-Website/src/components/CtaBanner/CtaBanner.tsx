import defaultImage from '../../assets/cta/campus-aerial-banner.png'
import Button from '../Button/Button'

type CtaBannerProps = {
  title?: string
  description?: string
  ctaLabel?: string
  ctaHref?: string
  image?: string
  // Page-level spacing (margins) is set by the page, not baked in here
  className?: string
}

// Full-width call-to-action banner for use near the bottom of any page, just above the Footer.
export default function CtaBanner({
  title = 'Let’s Build The Future Of AI Together',
  description = 'Join us in building Europe’s most advanced AI and cloud infrastructure campus.',
  ctaLabel = 'Request Investment Deck',
  ctaHref = '/investment',
  image = defaultImage,
  className,
}: CtaBannerProps) {
  return (
    <section
      className={['relative flex min-h-100 items-center justify-center overflow-hidden border-[0.8px] border-teal px-section-x py-16 text-center lg:aspect-1920/621 lg:items-start lg:pt-50.75 lg:pb-32', className]
        .filter(Boolean)
        .join(' ')}
    >
      <img src={image} alt="" className="absolute inset-0 size-full object-cover" />
      <div aria-hidden="true" className="absolute inset-0 bg-cta-overlay" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 shadow-cta-glow" />

      <div data-reveal="up" className="relative flex w-full max-w-212 flex-col items-center gap-9">
        <div className="flex flex-col items-center gap-8">
          <h2 className="max-w-209.5 font-body text-display-plain font-semibold text-white">{title}</h2>
          <p className="max-w-205.5 font-display text-lead-relaxed font-medium text-white/80">{description}</p>
        </div>
        <Button href={ctaHref} variant="dark" size="xl">{ctaLabel}</Button>
      </div>
    </section>
  )
}
