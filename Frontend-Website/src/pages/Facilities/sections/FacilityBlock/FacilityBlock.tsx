import Bullet from '../../../../components/Bullet/Bullet'
import Button from '../../../../components/Button/Button'
import arrowRight from '../../../../assets/facilities/arrow-right.svg'
import type { Facility } from '../../../../data/facilities'

function SpecList({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-5.25">
      {items.map((item) => (
        <li key={item} className="flex items-center gap-3.25">
          <Bullet />
          <span className="text-col-body text-white">{item}</span>
        </li>
      ))}
    </ul>
  )
}

export default function FacilityBlock({ facility }: { facility: Facility }) {
  const { id, name, tagline, image, imageAlt, imageClassName, rounded, intro, readiness, specsLeft, specsRight, footnote, ctaLabel, detailHref, features } = facility
  const radius = rounded ? 'rounded-[17px]' : ''

  return (
    <section id={id} className="scroll-mt-8 bg-glow-masterplan px-section-x pt-12 pb-12 text-white lg:pt-12.25 lg:pr-[4.27%] lg:pb-20.5 lg:pl-[4.375%]">
      <div className="mx-auto flex w-full max-w-421 flex-col gap-12 lg:gap-20.5">
        <div data-reveal-stagger="up" className="grid items-start gap-10 lg:grid-cols-[744fr_780fr] lg:gap-x-[8.25%]">
          <div className="flex flex-col gap-10.75">
            <div className="flex flex-col gap-4.75">
              <h2 className="font-facility text-h1 font-bold">{name}</h2>
              <p className="font-facility text-facility-sub font-semibold uppercase">{tagline}</p>
            </div>
            <div className={`relative aspect-684/558 w-full max-w-171 overflow-hidden ${radius}`}>
              <img src={image} alt={imageAlt} className={`absolute max-w-none ${imageClassName}`} />
            </div>
          </div>

          <div className={`flex flex-col border border-blue bg-blue/13 px-6.5 pt-8.25 pb-7.5 lg:mt-8.25 ${radius}`}>
            <h3 className="text-spec-title font-medium">Facility Specifications</h3>
            <p className="mt-5.25 max-w-173 text-col-body text-white/90">{intro}</p>
            <p className="mt-8 inline-flex h-14 w-full max-w-98.5 items-center rounded-[17px] bg-spec-pill px-3.25 text-col-body">{readiness}</p>

            <div className="mt-8 grid gap-x-6 gap-y-5.25 sm:grid-cols-[1fr_1.15fr]">
              <SpecList items={specsLeft} />
              <SpecList items={specsRight} />
            </div>

            {footnote && <p className="mt-8 max-w-180 text-col-body">{footnote}</p>}

            {ctaLabel && (
              <Button href={detailHref ?? '/facilities'} variant="glass" size="md" className={`mx-auto w-full max-w-110.25 ${footnote ? 'mt-10' : 'mt-17'}`}>
                {ctaLabel}
                <img src={arrowRight} alt="" width={24} height={24} />
              </Button>
            )}
          </div>
        </div>

        {features && (
          <div data-reveal="up" className="flex flex-col gap-9.5">
            <h3 className="text-feature-heading font-medium">Infrastructure Features</h3>
            <ul data-reveal-stagger="up" className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6 lg:gap-x-[1.9%]">
              {features.map((feature) => (
                <li
                  key={feature.label}
                  className="flex min-h-38.5 flex-col gap-4.75 rounded-[5px] border border-white/64 bg-feature-card px-3.75 pt-4.25 pr-6 pb-6.5"
                >
                  <img src={feature.icon} alt="" width={47} height={45} className="size-11.25 shrink-0 object-cover" />
                  <span className="text-feature-label">{feature.label}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  )
}
