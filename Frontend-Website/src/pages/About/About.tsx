import PageHero from '../../components/PageHero/PageHero'
import VisionMission from './sections/VisionMission/VisionMission'
import StrategicPositioning from './sections/StrategicPositioning/StrategicPositioning'
import FutureOfAi from './sections/FutureOfAi/FutureOfAi'
import WhyCzechia from './sections/WhyCzechia/WhyCzechia'
import ExecutiveSummary from './sections/ExecutiveSummary/ExecutiveSummary'
import CtaBanner from '../../components/CtaBanner/CtaBanner'
import Footer from '../../components/Footer/Footer'

export default function About() {
  return (
    <main className="flex flex-col">
      <PageHero
        title="About Us"
        description="IRIS is a large-scale AI and cloud infrastructure campus developed to support the future demands of hyperscalers, GPU cloud providers, AI inference platforms, and enterprise cloud operators across Europe."
      />
      <VisionMission />
      <StrategicPositioning />
      <FutureOfAi />
      <WhyCzechia />
      <ExecutiveSummary />
      <CtaBanner className="mt-8 lg:mt-17.75" />
      <Footer className="mt-8 lg:mt-23.25" />
    </main>
  )
}
