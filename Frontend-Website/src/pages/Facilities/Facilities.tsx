import PageHero from '../../components/PageHero/PageHero'
import CtaBanner from '../../components/CtaBanner/CtaBanner'
import Footer from '../../components/Footer/Footer'
import { facilities } from '../../data/facilities'
import FacilityNav from './sections/FacilityNav/FacilityNav'
import FacilityBlock from './sections/FacilityBlock/FacilityBlock'

export default function Facilities() {
  return (
    <main className="flex flex-col">
      <PageHero
        title="Facilities"
        description="Discover the facilities engineered for high-density compute, resilient infrastructure, and future-ready expansion."
      />
      <FacilityNav />

      <div className="mt-8 flex flex-col gap-8 lg:mt-14 lg:gap-16">
        {facilities.map((facility) => (
          <FacilityBlock key={facility.id} facility={facility} />
        ))}
      </div>

      <CtaBanner className="mt-8 lg:mt-27.5" />
      <Footer className="mt-8 lg:mt-23.25" />
    </main>
  )
}
