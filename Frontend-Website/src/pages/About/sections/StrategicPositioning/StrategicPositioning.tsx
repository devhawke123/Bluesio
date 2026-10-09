import SectionBadge from '../../../../components/SectionBadge/SectionBadge'
import germanyMap from '../../../../assets/about-page/germany-map.png'

export default function StrategicPositioning() {
  return (
    <section className="mt-12 flex flex-col items-center bg-lilac px-section-x py-12 text-center lg:mt-15.5 lg:pt-21.5 lg:pb-0.5">
      <SectionBadge data-reveal="up">Positioning</SectionBadge>
      <h2 data-reveal="up" data-reveal-delay="100" className="mt-1.5 max-w-146.5 bg-heading-about bg-clip-text font-body text-display font-bold text-transparent">
        Strategic positioning near Germany
      </h2>
      <p data-reveal="up" data-reveal-delay="200" className="mt-4.25 max-w-276.75 text-body text-ink">
        Strategically located in Most, Czechia — just 20 km from Germany and 85 km from Prague — the campus is engineered to support Europe’s accelerating demand for hyperscale cloud infrastructure, AI training, AI inference, and high-performance computing.
      </p>
      <img data-reveal="up" data-reveal-delay="300" src={germanyMap} alt="Map showing the IRIS campus in Most, Czechia, near Germany" className="mt-2.75 aspect-988/593 w-full max-w-247 rounded-[5px] object-cover" />
    </section>
  )
}
