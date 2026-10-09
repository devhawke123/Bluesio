import SectionBadge from '../../../../components/SectionBadge/SectionBadge'
import BlockedImage from '../../../../components/BlockedImage/BlockedImage'
// Same aerial photo as the Masterplan page's power zone
import siteOverview from '../../../../assets/masterplan-page/zone-power.png'

export default function SiteOverview() {
  return (
    <section className="mt-8 bg-lilac px-section-x pt-12 pb-12 lg:mt-8.25 lg:pt-24.75 lg:pb-0">
      <div className="mx-auto flex w-full max-w-280 flex-col items-center">
        <div data-reveal="up" className="flex flex-col items-center text-center">
          <SectionBadge className="min-w-51.25">Overview</SectionBadge>
          <h2 className="mt-5.5 bg-heading-about bg-clip-text font-body text-display font-bold text-transparent">Site Layout Overview</h2>
          {/* whitespace-pre-wrap keeps Figma's leading spaces: the 2nd paragraph is nudged in and the 3rd is indented */}
          <div className="mt-7 flex max-w-276.75 flex-col text-body-airy whitespace-pre-wrap text-ink">
            <p>
              {'The KONNECT campus is structured for operational clarity and expansion readiness. HPC Whitespace units are deployed in parallel rows along a central access spine, each paired with a dedicated E-House directly overhead — keeping power infrastructure close to the load and cable runs short.  '}
            </p>
            <p>
              {' The support building, MV substations, cooling systems and dual-carrier fiber entry points occupy the site perimeter, separating operational and visitor traffic from the secure technical core.  '}
            </p>
            <p>
              {'   The layout is phased by design: civil infrastructure is installed once for the full build-out, while power, cooling, and connectivity scale incrementally as capacity grows.'}
            </p>
          </div>
        </div>

        <BlockedImage
          src={siteOverview}
          alt="Aerial view of the IRIS 3 campus layout"
          frameClassName="aspect-1059/491 w-full"
          block={{ left: '77.5%', top: '39.3%', width: '25.7%', height: '60.7%' }}
          imageClassName="top-0 left-0 size-full object-cover"
          radiusClassName="rounded-sm"
          className="mt-8 w-full max-w-264.75 lg:mr-auto lg:ml-[1.25%]"
        />
      </div>
    </section>
  )
}
