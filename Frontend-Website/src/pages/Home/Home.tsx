import Hero from './sections/Hero/Hero'
import CampusShowcase from './sections/CampusShowcase/CampusShowcase'
import AboutIris from './sections/AboutIris/AboutIris'
import Masterplan from './sections/Masterplan/Masterplan'
import Sustainability from './sections/Sustainability/Sustainability'
import CoreCapabilities from './sections/CoreCapabilities/CoreCapabilities'
import Roadmap from './sections/Roadmap/Roadmap'
import Faq from './sections/Faq/Faq'
import AiInfrastructure from './sections/AiInfrastructure/AiInfrastructure'
import Positioning from './sections/Positioning/Positioning'
import CtaBanner from '../../components/CtaBanner/CtaBanner'
import Footer from '../../components/Footer/Footer'

export default function Home() {
  return (
    <main className="flex flex-col">
      <Hero />
      <CampusShowcase />
      <AboutIris />
      <Masterplan />
      <Sustainability />
      <CoreCapabilities />
      <Roadmap />
      <Faq />
      <AiInfrastructure />
      <Positioning />
      <CtaBanner className="mt-8 lg:mt-34.5" />
      <Footer className="mt-8 lg:mt-23.25" />
    </main>
  )
}
