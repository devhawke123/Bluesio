import SectionBadge from '../../../../components/SectionBadge/SectionBadge'
import europeMap from '../../../../assets/positioning/europe-map.png'
import Callout from './Callout'

// Heading and paragraph copy are as supplied in Figma (the heading repeats the roadmap's wording).
export default function Positioning() {
  return (
    <section className="relative mt-8 overflow-hidden px-section-x py-12 text-white lg:mt-13.5 lg:aspect-1920/849 lg:pt-32.75 lg:pr-[52.3%] lg:pb-42.25 lg:pl-[5.42%]">
      {/* Figma crops the map inside the frame; the percentages reproduce that crop */}
      <img src={europeMap} alt="" className="absolute top-[-43.23%] left-[-0.02%] h-[186.37%] w-[100.04%] max-w-none" />
      {/* Keeps the copy legible when it sits over the map on narrow screens */}
      <div aria-hidden="true" className="absolute inset-0 bg-black/55 lg:hidden" />

      <div data-reveal="up" className="relative flex w-full max-w-203 flex-col items-start">
        <SectionBadge tone="light">Strategically Positioned</SectionBadge>
        <h2 className="mt-2 max-w-187 font-body text-display font-bold text-white">Building the Future in Phases</h2>
        <p className="mt-2.75 max-w-145.25 text-body">
          IRIS is being developed through a carefully planned multi-phase roadmap, ensuring scalable growth while meeting the increasing demand for AI, cloud, and enterprise infrastructure.
        </p>

        <div className="mt-8.75 flex w-full max-w-138.75 flex-col gap-5.75">
          <div className="flex flex-col gap-4.5 sm:flex-row">
            <Callout title="Enterprise Security" description="Robust, high-capacity and highly reliable." className="sm:w-63" />
            <Callout title="Low Latency Connectivity" description="Robust, high-capacity and highly reliable." className="sm:w-71.25" />
          </div>
          <Callout title="Proximity To Major Markets" description={'20 km from Germany\n85 km from Prague'} className="sm:w-63" />
        </div>
      </div>
    </section>
  )
}
