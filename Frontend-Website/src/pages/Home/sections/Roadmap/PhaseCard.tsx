import checkCircle from '../../../../assets/roadmap/check-circle.svg'
import PhaseTile from './PhaseTile'
import type { TileIcon } from './PhaseTile'

type PhaseStatus = {
  label: string
  // 'success' = green (Completed), 'future' = deep blue (Future Expansion)
  tone: 'success' | 'future'
  // Figma anchors the status at a different distance from the bottom per card
  className: string
}

export type Phase = {
  year: string
  label: string
  headerIcon: string
  title: string
  subtitle: string
  items: string[]
  status?: PhaseStatus
  tiles: { icon: TileIcon; title: string; description: string }[]
  // Figma fixes each card's height; kept as a minimum from lg
  minHeight: string
}

const statusTones: Record<PhaseStatus['tone'], { dot: string; text: string }> = {
  success: { dot: 'bg-success', text: 'text-success' },
  future: { dot: 'bg-blue-deep', text: 'text-blue-deep' },
}

// The card is a size container (@container) so its text scales with its width.
export default function PhaseCard({ phase }: { phase: Phase }) {
  const { year, label, headerIcon, title, subtitle, items, status, tiles, minHeight } = phase

  return (
    <article className={`@container relative rounded-[9px] bg-white pb-8 drop-shadow-card ${minHeight}`}>
      <header className="flex items-center gap-1.25 px-6 pt-8 lg:pr-[3.85%] lg:pl-[2.54%]">
        <span className="flex size-12.5 shrink-0 items-center justify-center rounded-full bg-icon-blue">
          <img src={headerIcon} alt="" width={28} height={28} />
        </span>
        <p className="bg-heading-year bg-clip-text font-body text-phase-head font-medium text-transparent">{year}</p>
        <span aria-hidden="true" className="mx-2 hidden h-px flex-1 bg-black sm:block" />
        <p className="ml-auto bg-phase-label bg-clip-text font-body text-phase-head font-medium whitespace-nowrap text-transparent sm:ml-0">{label}</p>
      </header>

      <div className="mt-8.25 grid gap-8 px-6 lg:grid-cols-[30.1%_1fr] lg:gap-0 lg:pr-[4.47%] lg:pl-[3.02%]">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-1.25">
            <h3 className="font-body text-phase-title font-bold text-heading-dark">{title}</h3>
            <p className="font-body text-phase-sub font-semibold text-sky">{subtitle}</p>
          </div>
          <ul className="flex flex-col gap-4.5">
            {items.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <img src={checkCircle} alt="" width={18} height={18} className="mt-0.5 shrink-0" />
                <span className="font-card text-phase-item text-list max-md:leading-snug md:whitespace-nowrap">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="grid grid-cols-1 gap-4.75 md:grid-cols-3">
          {tiles.map((tile, index) => (
            <PhaseTile key={tile.title} {...tile} tone={status?.tone === 'success' && index === 0 ? 'translucent' : 'solid'} />
          ))}
        </div>
      </div>

      {status && (
        <p className={`mt-6 flex items-center gap-2 px-6 font-card text-phase-status font-semibold lg:absolute lg:left-[3.64%] lg:mt-0 lg:px-0 ${status.className} ${statusTones[status.tone].text}`}>
          <span aria-hidden="true" className={`size-3.5 rounded-full ${statusTones[status.tone].dot}`} />
          {status.label}
        </p>
      )}
    </article>
  )
}
