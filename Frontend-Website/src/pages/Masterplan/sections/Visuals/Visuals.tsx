import SectionBadge from '../../../../components/SectionBadge/SectionBadge'
import zoneEast from '../../../../assets/masterplan-page/zone-east.png'
import zoneWest from '../../../../assets/masterplan-page/zone-west.png'
import zonePower from '../../../../assets/masterplan-page/zone-power.png'
import zoneConnectivity from '../../../../assets/masterplan-page/zone-connectivity.jpg'
import zoneCooling from '../../../../assets/masterplan-page/zone-cooling.png'
// Same photo as the Sustainability cards' solar image
import zoneRenewable from '../../../../assets/sustainability/heat-recovery.png'
import ZoneBlock from './ZoneBlock'
import type { Zone } from './ZoneBlock'

// Rows read left to right. Padding % is relative to each cell's own width, so the insets below are cell-relative (Figma: 111 / 53 / 58px).
const topRow: Zone[] = [
  {
    title: 'East Campus Infrastructure Zone',
    items: ['AI compute facilities', 'HPC deployment infrastructure', 'Dedicated substations', 'High-density deployment architecture'],
    image: zoneEast,
    alt: 'Site plan of the East campus infrastructure',
    gap: 'lg:gap-7.5',
    cellClassName: 'lg:pt-22 lg:pb-14.25 lg:pl-[16.9%]',
  },
  {
    title: 'West Campus Expansion Zone',
    items: ['AI compute facilities', 'Modular deployment strategy', 'Scalable AI infrastructure expansion'],
    image: zoneWest,
    alt: 'Site plan of the West campus expansion',
    imageFirst: true,
    gap: 'lg:gap-18.25',
    cellClassName: 'lg:pt-13.75 lg:pb-14.25 lg:pl-[9.1%]',
  },
  {
    title: 'Power Infrastructure Zone',
    items: ['35 kV grid architecture', 'Dedicated substation', 'MV ring distribution', 'Redundant power pathways'],
    image: zonePower,
    alt: 'Power transmission towers',
    gap: 'lg:gap-26.75',
    cellClassName: 'lg:pt-13.75 lg:pb-14.25 lg:pl-[8.8%]',
  },
]

const bottomRow: Zone[] = [
  {
    title: 'Renewable Energy Zone',
    items: [
      '110 MW Third-Party Photovoltaic (PV) Solar Infrastructure',
      '15 MW Third-Party Battery Energy Storage System (BESS)',
      'Renewable-supported campus operations',
    ],
    image: zoneRenewable,
    alt: 'Data center beside solar panels and wind turbines',
    imageFirst: true,
    gap: 'lg:gap-18.25',
    cellClassName: 'lg:pt-14.25 lg:pb-53 lg:pl-[16.9%]',
  },
  {
    title: 'Connectivity Infrastructure Zone',
    items: ['Carrier-grade fiber infrastructure', 'CETIN Fiber Network', 'Quantcom Fiber Network', 'Cross-border German connectivity'],
    image: zoneConnectivity,
    alt: 'Data center server racks',
    gap: 'lg:gap-26.75',
    cellClassName: 'lg:pt-14.25 lg:pb-53 lg:pl-[9.1%]',
  },
  {
    title: 'Cooling & Sustainability Zone',
    items: ['Direct Liquid Cooling systems', 'Free cooling infrastructure', 'District heating reuse strategy', 'WUE & PUE optimized infrastructure'],
    image: zoneCooling,
    alt: 'Cooling and sustainability systems',
    imageFirst: true,
    gap: 'lg:gap-18.25',
    cellClassName: 'lg:pt-14.25 lg:pb-53 lg:pl-[8.8%]',
  },
]

function ZoneRow({ zones, className }: { zones: Zone[]; className?: string }) {
  return (
    <div className={['grid gap-12 lg:grid-cols-[656fr_583fr_662fr] lg:gap-0', className].filter(Boolean).join(' ')}>
      {zones.map((zone, index) => (
        <ZoneBlock key={zone.title} zone={zone} borderLeft={index > 0} />
      ))}
    </div>
  )
}

export default function Visuals() {
  return (
    <section className="mt-12 bg-lilac px-section-x py-12 lg:mt-9.25 lg:px-0 lg:pt-25.25 lg:pb-0">
      <div data-reveal="up" className="flex flex-col items-center text-center">
        <SectionBadge className="min-w-61.5">Visuals</SectionBadge>
        <h2 className="mt-1.5 max-w-146.5 bg-heading-about bg-clip-text font-body text-display font-bold text-transparent">
          Infrastructure and zoning visuals
        </h2>
      </div>

      <div data-reveal="up" data-reveal-delay="100" className="mt-10 flex flex-col gap-12 lg:mt-35.25 lg:gap-0">
        <ZoneRow zones={topRow} />
        <ZoneRow zones={bottomRow} className="lg:border-t lg:border-black" />
      </div>
    </section>
  )
}
