import SectionBadge from '../../../../components/SectionBadge/SectionBadge'

type Highlight = { number: string; title: string; text: string }

const highlights: Highlight[] = [
  { number: '01', title: 'Plug-and-play', text: 'Factory FAT-tested; on-site work limited to connections and hookup' },
  { number: '02', title: '4N/3 distributed power', text: 'Four independent paths; any one maintainable under full load' },
  { number: '03', title: 'Hybrid liquid cooling', text: 'DLC + RDHx for maximum density; air-cooled variant also available' },
  { number: '04', title: 'IEC & UL variants', text: 'Designed for EU and international deployment' },
  { number: '05', title: 'Fire & safety', text: 'N2Gen suppression, ESD flooring, RC2 security doors.' },
  { number: '06', title: '5 min thermal buffer', text: 'N+1 buffer vessels; no UPS needed on heat rejection equipment.' },
]

function HighlightItem({ item }: { item: Highlight }) {
  return (
    <div className="flex max-w-87.5 flex-col font-card">
      <p className="bg-detail-number bg-clip-text text-detail-number font-semibold text-transparent">{item.number}</p>
      <h3 className="mt-5.5 bg-detail-title bg-clip-text text-detail-title font-bold text-transparent">{item.title}</h3>
      <p className="mt-3 text-col-body text-ink">{item.text}</p>
    </div>
  )
}

// Cell padding % is relative to each cell's own width. Figma insets row 2 slightly further than row 1 (87/645/1203px vs 95/655/1215px).
const cellPadding = [
  ['lg:pl-[6.3%]', 'lg:pl-[19.2%]', 'lg:pl-[15.9%]'],
  ['lg:pl-[8%]', 'lg:pl-[20.9%]', 'lg:pl-[18.1%]'],
]

export default function ExecutiveSummary() {
  return (
    <section className="mt-7 bg-lilac px-section-x py-12 lg:px-[3%] lg:pt-27.5 lg:pb-0">
      {/* Left-aligned, not centred: Figma starts the grid at x57 and leaves the extra space on the right */}
      <div className="mr-auto w-full max-w-400">
        <div data-reveal="up" className="flex max-w-205 flex-col items-start lg:pl-[1.9%]">
          <SectionBadge className="min-w-40.5">Summary</SectionBadge>
          <h2 className="mt-6.75 bg-heading-about bg-clip-text font-body text-display font-bold text-transparent">Executive Summary</h2>
          <p className="mt-6.5 text-body-loose text-ink">
            The KONNECT MDC is a factory-built platform for high-density AI compute. Every module arrives fully wired, piped, tested, and equipped with fire suppression; on-site work is limited to intermodule connections and utility hookup. It supports liquid-cooled (DLC + RDHx) and air-cooled variants; multiple blocks connect for larger deployments, with smaller configurations available on request.
          </p>
        </div>

        <div data-reveal-stagger="up" className="relative mt-12 grid gap-10 lg:mt-16 lg:grid-cols-[476fr_584fr_541fr] lg:gap-0">
          {/* Vertical rules start 13px below the first row, as in Figma */}
          <span aria-hidden="true" className="absolute top-3.25 bottom-0 left-[29.73%] hidden w-px bg-navy-dark lg:block" />
          <span aria-hidden="true" className="absolute top-3.25 bottom-0 left-[66.21%] hidden w-px bg-navy-dark lg:block" />
          {highlights.map((item, index) => {
            const column = index % 3
            const secondRow = index >= 3
            return (
              <div
                key={item.number}
                className={[
                  cellPadding[secondRow ? 1 : 0][column],
                  secondRow ? 'lg:border-t lg:border-navy-dark lg:pt-6.5 lg:pb-32' : 'lg:pb-26',
                ].join(' ')}
              >
                <HighlightItem item={item} />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
