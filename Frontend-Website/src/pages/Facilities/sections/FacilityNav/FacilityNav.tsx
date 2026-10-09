import { facilities } from '../../../../data/facilities'

// Black bar under the hero that jumps to each facility block. Figma's blue highlight is the hover state, so it only shows on hover.
export default function FacilityNav() {
  return (
    <nav aria-label="Facilities" className="mx-auto w-[89.5%] bg-black px-2 py-3 lg:py-2.75">
      <ul data-reveal-stagger="up" className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-[286fr_286fr_286fr_286fr_223fr] lg:gap-x-[3.75vw]">
        {facilities.map((facility) => (
          <li key={facility.id}>
            <a
              href={`#${facility.id}`}
              className="flex h-full min-h-22.75 flex-col gap-1.75 rounded-[5px] px-5 py-5 text-white transition-colors focus-visible:bg-blue/70 lg:gap-3.5 lg:pr-9.75 lg:hover:bg-blue/70"
            >
              <span className="text-callout-title font-medium">{facility.name}</span>
              <span className="text-callout-desc">{facility.tagline}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
