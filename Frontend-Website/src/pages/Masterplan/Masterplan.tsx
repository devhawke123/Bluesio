import PageHero from '../../components/PageHero/PageHero'
import CampusMap from './sections/CampusMap/CampusMap'
import Divisions from './sections/Divisions/Divisions'
import Visuals from './sections/Visuals/Visuals'
import DivisionSummary from './sections/DivisionSummary/DivisionSummary'
import CtaBanner from '../../components/CtaBanner/CtaBanner'
import Footer from '../../components/Footer/Footer'

export default function Masterplan() {
  return (
    <main className="flex flex-col">
      <PageHero
        title="Masterplan"
        description="The IRIS masterplan is structured as a large-scale multi-phase AI and hyperscale data center campus consisting of East and West campus divisions."
      />
      <CampusMap />
      <Divisions />
      <Visuals />
      <DivisionSummary />
      <CtaBanner className="mt-8 lg:mt-17.5" />
      <Footer className="mt-8 lg:mt-23.25" />
    </main>
  )
}
