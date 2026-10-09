import connectorVertical from '../../../../assets/masterplan/connector-1.svg'
import connectorIntoSecond from '../../../../assets/masterplan/connector-2.svg'
import connectorLine from '../../../../assets/masterplan/connector-3.svg'
import connectorArrowUp from '../../../../assets/masterplan/connector-4.svg'
import connectorSecondToThird from '../../../../assets/masterplan/connector-5.svg'
import FacilityCard from './FacilityCard'
import { ArrowDown } from './icons'

const facilities = [
  { number: '1', title: 'IRIS 1', subtitle: 'Strategic AI Facility', icon: 'building', left: 0, top: 0 },
  { number: '2', title: 'IRIS 2', subtitle: 'Flagship AI Compute Facility', icon: 'building', left: 24.271, top: 53.55 },
  { number: '3', title: 'IRIS 3 (HPC)', subtitle: 'High Density Ai Clusters', icon: 'cube', left: 59.786, top: 53.55 },
  { number: '4', title: 'IRIS 4-11', subtitle: 'Modular Hyperscale Expansion Campus', icon: 'cube', left: 78.643, top: 0 },
] as const

export default function FacilityDiagram() {
  return (
    <>
      {/* xl and up: positions are percentages of the 1681 x 468 Figma diagram so it scales as one piece */}
      <div className="relative mx-auto hidden aspect-1681/468 w-full max-w-420 xl:block">
        {facilities.map(({ left, top, ...card }) => (
          <div key={card.number} className="absolute w-[21.357%]" style={{ left: `${left}%`, top: `${top}%` }}>
            <FacilityCard {...card} />
          </div>
        ))}

        {/* Card 1 down, then right into card 2 */}
        <img src={connectorVertical} alt="" className="absolute top-[64.07%] left-[10.29%] h-[0.2136%] w-[9.849%] max-w-none -translate-x-1/2 -translate-y-1/2 rotate-90" />
        <div className="absolute top-[79.42%] left-[10.946%] h-[4.443%] w-[13.662%] rotate-180">
          <img src={connectorIntoSecond} alt="" className="absolute inset-[0_-4.79%_0_0] block size-full max-w-none" />
        </div>

        {/* Card 2 to card 3 */}
        <div className="absolute top-[77.83%] left-[46.1%] h-[4.032%] w-[13.662%] rotate-180">
          <img src={connectorSecondToThird} alt="" className="absolute inset-[0_-4.79%_0_0] block size-full max-w-none" />
        </div>

        {/* Card 3 right, then up into card 4 */}
        <img src={connectorLine} alt="" className="absolute top-[79.6%] left-[81.06%] h-[0.2136%] w-[8.804%] max-w-none" />
        <img src={connectorArrowUp} alt="" className="absolute top-[63.43%] left-[90%] h-[4.485%] w-[9.018%] max-w-none -translate-x-1/2 -translate-y-1/2 -rotate-90" />
      </div>

      {/* Below xl: cards stack in order with a small arrow between them */}
      <ol className="mx-auto flex w-full max-w-90 flex-col items-center gap-3 xl:hidden">
        {facilities.map((facility, index) => (
          <li key={facility.number} className="flex w-full flex-col items-center gap-3">
            <FacilityCard {...facility} className="w-full" />
            {index < facilities.length - 1 && <ArrowDown />}
          </li>
        ))}
      </ol>
    </>
  )
}
