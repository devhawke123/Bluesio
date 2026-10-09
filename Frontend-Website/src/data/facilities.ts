import iris1 from '../assets/facilities/iris-1.png'
import iris2 from '../assets/facilities/iris-2.png'
import iris3 from '../assets/facilities/iris-3.png'
import iris4 from '../assets/facilities/iris-4.png'
import iris611 from '../assets/facilities/iris-6-11.png'
import featureCooling from '../assets/facilities/feature-cooling.png'
import featureChilledWater from '../assets/facilities/feature-chilled-water.png'
import featurePower from '../assets/facilities/feature-power.png'
import featureGrid from '../assets/facilities/feature-grid.png'
import featureFuel from '../assets/facilities/feature-fuel.png'
import featureRing from '../assets/facilities/feature-ring.png'

export type FacilityFeature = { icon: string; label: string }

export type Facility = {
  id: string
  name: string
  // Used under the name on the page and in the facility switcher bar
  tagline: string
  image: string
  imageAlt: string
  // Figma crops each aerial photo inside its frame; these classes reproduce that crop
  imageClassName: string
  // Only the first facility block is square-cornered in Figma
  rounded: boolean
  intro: string
  readiness: string
  specsLeft: string[]
  specsRight: string[]
  footnote?: string
  ctaLabel?: string
  // Facilities that have their own detail page link to it from their block
  detailHref?: string
  features?: FacilityFeature[]
}

const hyperscalerFootnote =
  'The facilities are designed to support hyperscalers, GPU cloud operators, enterprise cloud deployments, and AI infrastructure providers through highly scalable and resilient data center operations.'

const westCampusIntro =
  'IRIS 4 is a Phase 2 West Campus facility within the IRIS campus masterplan. It follows a standardized hyperscale architecture designed to accelerate deployment, improve operational scalability, and support rapidly growing AI and cloud infrastructure demand across Europe.'

const westCampusSpecsLeft = [
  '54 MW total power',
  '36 MW IT load',
  '9 Data Halls',
  '17,600 sqm Whitespace Including Corridors',
  '1,441 sqm Per Data Hall',
  '4.5 MW IT per Data Hall',
  '700 racks per Data Hall',
  'hybrid AC + DLC cooling strategy',
  '3 Data Halls per level',
  'Direct Liquid Cooling integration',
  'Mission-critical redundancy systems',
]

const westCampusSpecsRight = [
  '2.78 kW/sqm Density',
  'Peak PUE 1.5 / 1.3',
  'Modular Cooling and Electrical Systems',
  '3-level production building',
  'Modular Electrical Equipment Adjacent to Whitespace',
  'Hybrid Cooling Based on Chilled Water / Air Cooling and Direct Liquid Cooling, Supporting Both Standard and High-Density IT Loads',
  'Standardized AI-ready deployment architecture',
  'Free-Cooling Chillers, Fan Wall Units, and DLC CDUs in N+2 Cooling Configuration',
  'IRIS West Supported by Dedicated GIS Substation Infrastructure and MV Ring Distribution',
]

export const facilities: Facility[] = [
  {
    id: 'iris-1',
    name: 'IRIS 1',
    tagline: 'Strategic AI Facility',
    image: iris1,
    imageAlt: 'Aerial view of the IRIS 1 site',
    imageClassName: 'top-[0.01%] left-[0.06%] h-full w-[137.74%]',
    rounded: false,
    intro:
      'IRIS has been designed as a phased infrastructure deployment platform capable of supporting long-term AI, cloud, and enterprise compute demand across Europe over the next two decades.',
    readiness: 'Planned Operational Readiness: Q2 2028',
    specsLeft: [
      '75 MW Total Power',
      '48 MW IT Load',
      '12 Data Halls',
      '14,184 sqm Whitespace',
      'Annualized PUE Target: 1.24',
      'WUE = 0.00 Cooling Design',
      '4 × 12 MW Flexible IT Rings',
    ],
    specsRight: [
      '3-Level Data Center Architecture',
      '1,207 sqm Per Data Hall',
      'Free-Cooling Chiller Technology',
      'Concurrently Maintainable Infrastructure',
      'Hybrid Air & Liquid Cooling Architecture',
      'AI-Ready High Density Rack Support',
    ],
    ctaLabel: 'Explore IRIS 1 in Detail',
    features: [
      { icon: featureCooling, label: 'Direct Liquid Cooling (DLC)' },
      { icon: featureChilledWater, label: 'Chilled Water Cooling Systems' },
      { icon: featurePower, label: '2N Redundant Power Architecture' },
      { icon: featureGrid, label: '35 kV Grid Supply' },
      { icon: featureFuel, label: '48-Hour Backup Fuel Storage' },
      { icon: featureRing, label: 'Modular IT Ring Distribution' },
    ],
  },
  {
    id: 'iris-2',
    name: 'IRIS 2',
    tagline: 'Flagship AI Compute Facility',
    image: iris2,
    imageAlt: 'Aerial view of the IRIS 2 site',
    imageClassName: 'size-full object-cover',
    rounded: true,
    intro:
      'IRIS 2 represents the flagship hyperscale AI deployment facility within the IRIS campus. Engineered for large-scale AI training, inference, and GPU-intensive operations, the facility delivers one of the highest-density compute environments planned in Europe.',
    readiness: 'Planned Operational Readiness: Q2 2028',
    specsLeft: [
      '135 MW Total Power',
      '90 MW IT Load',
      '15 Data Halls',
      '22,260 sqm Whitespace',
      'High-Density GPU Architecture',
      'Advanced Modular Cooling Systems',
      '1,484 sqm per Data Hall',
    ],
    specsRight: [
      '6 MW IT per Data Hall',
      '704 racks per Data Hall',
      '4.04 kW/sqm Data Hall Density',
      'Peak PUE: 1.5 / 1.3',
      'Modular Electrical Equipment',
      '2N Incoming Power Supply Architecture',
      'Hybrid Air & Liquid Cooling Architecture',
      'Free-Cooling Chiller Technology',
    ],
  },
  {
    id: 'iris-3',
    name: 'IRIS 3',
    tagline: 'High Density AI Clusters',
    image: iris3,
    imageAlt: 'Aerial view of the IRIS 3 site',
    imageClassName: 'top-[0.02%] left-[-15%] h-full w-[114.97%]',
    rounded: true,
    intro:
      'IRIS 3 is engineered as an early-stage HPC and AI deployment facility utilizing modular containerized architecture for accelerated operational readiness.',
    readiness: 'Planned Operational Readiness: Q1 2027',
    specsLeft: [
      '50 MW Total Power',
      '37.8 MW IT Capacity',
      'Containerized HPC Systems',
      'Annualized PUE: 1.3',
      'High-Density AI Compute Ready',
      'Plot Size: 31,500 sqm',
      '9 Data Halls',
    ],
    specsRight: [
      '5,000 sqm Whitespace',
      '460 sqm Per Data Hall',
      '2-Floor Architecture',
      '4 kW/sqm Data Hall Density',
      '35 kV Grid Supply',
      '2N Redundant UPS Architecture',
      '75 kW Racks Upgradeable to 150 kW Racks',
    ],
    ctaLabel: 'Explore IRIS 3 in Detail',
    detailHref: '/facilities/iris-3',
  },
  {
    id: 'iris-4',
    name: 'IRIS 4',
    tagline: 'Additional Capacity',
    image: iris4,
    imageAlt: 'Aerial view of the IRIS 4 site',
    imageClassName: 'top-[-7.08%] left-[-0.04%] h-[126.23%] w-[137.53%]',
    rounded: true,
    intro: westCampusIntro,
    readiness: 'Planned Operational Readiness: Q3 2029',
    specsLeft: westCampusSpecsLeft,
    specsRight: westCampusSpecsRight,
    footnote: hyperscalerFootnote,
    ctaLabel: 'Explore IRIS 4 in Detail',
  },
  {
    id: 'iris-6-11',
    name: 'IRIS 6-11',
    tagline: 'Phase 2 Expansion',
    image: iris611,
    imageAlt: 'Aerial view of the IRIS 6-11 site',
    imageClassName: 'top-[-0.05%] left-[-6.56%] h-full w-[119.66%]',
    rounded: true,
    intro: westCampusIntro,
    readiness: 'Planned Operational Readiness: Q1 2027',
    specsLeft: westCampusSpecsLeft,
    specsRight: westCampusSpecsRight,
    footnote: hyperscalerFootnote,
  },
]
