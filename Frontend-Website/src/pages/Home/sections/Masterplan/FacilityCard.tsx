import facilityBuilding from '../../../../assets/masterplan/facility-building.png'
import irisCube from '../../../../assets/home/iris-cube.png'

type FacilityIcon = 'building' | 'cube'

type FacilityCardProps = {
  number: string
  title: string
  subtitle: string
  icon: FacilityIcon
  className?: string
}

// Figma crops each illustration inside its frame; the percentages reproduce that crop.
const iconFrames: Record<FacilityIcon, { src: string; box: string; crop: string }> = {
  building: {
    src: facilityBuilding,
    box: 'w-[29.25%] h-[57.07%]',
    crop: 'top-[-5.78%] left-[-17.03%] h-[113.54%] w-[134.05%]',
  },
  cube: {
    src: irisCube,
    box: 'w-[30.64%] h-[56.16%]',
    crop: 'top-[2.39%] left-[-10.71%] h-[109.54%] w-[121.66%]',
  },
}

// The card is a size container (@container) so its text scales with its width.
export default function FacilityCard({ number, title, subtitle, icon, className }: FacilityCardProps) {
  const frame = iconFrames[icon]
  return (
    <div className={['@container relative aspect-359/217 border border-blue bg-blue/13 font-card text-white', className].filter(Boolean).join(' ')}>
      <span className="absolute top-[14.73%] left-[7.8%] flex h-[24.4%] w-[15.04%] items-center justify-center rounded-[5px] border-[0.2px] border-white bg-glow-icon text-facility-num">
        {number}
      </span>

      <div className={`absolute top-[10.59%] left-[62.7%] overflow-hidden ${frame.box}`}>
        <img src={frame.src} alt="" className={`absolute max-w-none ${frame.crop}`} />
      </div>

      <div className="absolute top-[54.77%] left-[7.8%] flex w-[82.5%] flex-col">
        <p className="text-facility-title">{title}</p>
        <p className="text-facility-sub">{subtitle}</p>
      </div>
    </div>
  )
}
