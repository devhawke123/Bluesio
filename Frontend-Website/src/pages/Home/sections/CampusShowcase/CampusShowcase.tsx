import ExploreCampus from '../ExploreCampus/ExploreCampus'
import CampusStats from '../CampusStats/CampusStats'

// Card overlaps the hero's bottom edge; the overlap grows with the viewport.
export default function CampusShowcase() {
  return (
    <div className="relative z-10 mx-auto -mt-16 w-full sm:-mt-32 lg:-mt-61.75 lg:w-[76.7%]">
      <ExploreCampus />
      <CampusStats />
    </div>
  )
}
