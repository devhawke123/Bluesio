import SectionBadge from '../../../../components/SectionBadge/SectionBadge'
import campusMap from '../../../../assets/masterplan-page/campus-map.png'

export default function CampusMap() {
  return (
    <section className="mt-12 bg-lilac px-section-x py-12 lg:mt-10.5 lg:grid lg:grid-cols-2 lg:gap-10 lg:px-[4.74%] lg:pt-34 lg:pb-0.75">
      <div data-reveal="left" className="flex flex-col items-start">
        <SectionBadge>About IRIS Campus</SectionBadge>
        <h2 className="mt-4.5 max-w-115.5 bg-heading-about bg-clip-text font-body text-display font-bold text-transparent">
          IRIS campus map
        </h2>
        <p className="mt-5.5 max-w-198 text-body-loose text-ink">
          The IRIS masterplan is structured as a large-scale multi-phase AI and hyperscale data center campus consisting of East and West campus divisions. Upon completion, the campus will deliver approximately 710 MW of total installed power capacity across 11 facilities.
        </p>
      </div>

      <div data-reveal="right" data-reveal-delay="100" className="relative mt-10 lg:mt-0 lg:pt-13.75 lg:pr-[0.2%]">
        <div className="relative">
          {/* Decorative blue block behind the map's bottom-right corner */}
          <div aria-hidden="true" className="absolute top-[45.4%] left-[73.3%] hidden h-[55.2%] w-[33%] bg-blue-edge lg:block" />
          <div className="relative z-10 aspect-825/540 w-full max-w-206.25 overflow-hidden rounded-[5px]">
            <img src={campusMap} alt="Master plan of the IRIS campus" className="absolute top-[0.08%] left-[-0.01%] h-[99.95%] w-[113.77%] max-w-none" />
          </div>
        </div>
      </div>
    </section>
  )
}
