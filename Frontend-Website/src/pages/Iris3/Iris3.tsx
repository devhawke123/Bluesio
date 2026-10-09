import DetailHero from '../../components/DetailHero/DetailHero'
import CtaBanner from '../../components/CtaBanner/CtaBanner'
import Footer from '../../components/Footer/Footer'
import SiteOverview from './sections/SiteOverview/SiteOverview'
import MechanicalCooling from './sections/MechanicalCooling/MechanicalCooling'
import ExecutiveSummary from './sections/ExecutiveSummary/ExecutiveSummary'
import CoreArchitecture from './sections/CoreArchitecture/CoreArchitecture'
import StatsStrip from './sections/CoreArchitecture/StatsStrip'
import DataHall from './sections/DataHall/DataHall'
import RackSpace from './sections/RackSpace/RackSpace'
import CoolingStrategy from './sections/CoolingStrategy/CoolingStrategy'
import FireSuppression from './sections/FireSuppression/FireSuppression'

export default function Iris3() {
  return (
    <main className="flex flex-col">
      <DetailHero title="IRIS Data Center Campus - IRIS 3" backHref="/facilities" backLabel="Back to facilities" />
      <SiteOverview />
      <MechanicalCooling />
      <ExecutiveSummary />
      <CoreArchitecture />
      <StatsStrip />
      <DataHall />
      <RackSpace />
      <CoolingStrategy />
      <FireSuppression />
      <CtaBanner className="mt-8 lg:mt-20.5" />
      <Footer className="mt-8 lg:mt-23.25" />
    </main>
  )
}
