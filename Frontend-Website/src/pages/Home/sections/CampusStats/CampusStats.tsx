import statPower from '../../../../assets/home/stat-power.png'
import statServer from '../../../../assets/home/stat-server.png'
import statSolar from '../../../../assets/home/stat-solar.png'
import statBattery from '../../../../assets/home/stat-battery.png'
import StatItem from './StatItem'

const stats = [
  { icon: statPower, value: '710MWe', label: 'Total Campus Power', crop: true },
  { icon: statServer, value: '440MWit', label: 'Deployable IT Capacity' },
  { icon: statSolar, value: '110MWe', label: 'Phase 1 Third-Party PV Solar Integration' },
  { icon: statBattery, value: '15MWe', label: 'Phase 1 Third-Party BESS Energy Storage' },
]

export default function CampusStats() {
  return (
    <section data-reveal-stagger="up" className="grid grid-cols-1 items-start gap-10 bg-glow-stats px-section-x py-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
      {stats.map((stat) => (
        <StatItem key={stat.value} {...stat} />
      ))}
    </section>
  )
}
