import tileIconHome from '../../../../assets/roadmap/tile-icon-home.svg'
import tileIconPlus from '../../../../assets/roadmap/tile-icon-plus.svg'
import tileIconChart from '../../../../assets/roadmap/tile-icon-chart.svg'

export type TileIcon = 'home' | 'plus' | 'chart'
type TileTone = 'solid' | 'translucent'

type PhaseTileProps = {
  icon: TileIcon
  title: string
  description: string
  tone?: TileTone
}

// Home and plus sit inside a tinted box; the chart asset already includes its box.
const toneClasses: Record<TileTone, string> = {
  solid: 'rounded-[3px] bg-tile drop-shadow-card',
  translucent: 'rounded-[7px] bg-lilac/49 shadow-tile',
}

// Each tile is a size container (@container) so its text scales with its width.
export default function PhaseTile({ icon, title, description, tone = 'solid' }: PhaseTileProps) {
  return (
    <div className={`@container flex min-h-48.5 flex-col gap-4.5 pt-4.25 pr-3 pb-3.75 pl-3.25 ${toneClasses[tone]}`}>
      {icon === 'chart' ? (
        <img src={tileIconChart} alt="" width={41} height={42} className="shrink-0" />
      ) : (
        <span className="flex h-10.5 w-10.25 shrink-0 items-center justify-center rounded-md bg-tile-icon">
          {icon === 'home' ? (
            <img src={tileIconHome} alt="" width={20} height={22} />
          ) : (
            <img src={tileIconPlus} alt="" width={23} height={24} />
          )}
        </span>
      )}
      <div className="flex flex-col gap-2.75">
        <h4 className="text-tile-title font-semibold text-heading-dark max-md:leading-snug md:whitespace-nowrap">{title}</h4>
        <p className="text-tile-desc text-muted">{description}</p>
      </div>
    </div>
  )
}
