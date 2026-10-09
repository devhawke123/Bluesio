import visionCard from '../../../../assets/about-page/vision-card.png'
import missionCard from '../../../../assets/about-page/mission-card.jpg'

type StatementCardProps = {
  image: string
  imageClassName: string
  title: string
  text: string
  // Figma anchors the text at a slightly different height per card
  textTop: string
}

// The card is a size container (@container) so its text scales with its width.
function StatementCard({ image, imageClassName, title, text, textTop }: StatementCardProps) {
  return (
    <div className="relative">
      {/* Decorative blue block behind the card's bottom-right corner */}
      <div aria-hidden="true" className="absolute top-[42%] left-[65.1%] hidden h-[58%] w-[40%] bg-blue-edge lg:block" />

      <div className="@container relative z-10 aspect-4/5 overflow-hidden rounded-[5px] text-white lg:aspect-607/657">
        <img src={image} alt="" className={`absolute max-w-none ${imageClassName}`} />
        <div className={`absolute bottom-6 left-[5.1%] flex w-[90%] flex-col gap-2.5 lg:bottom-auto ${textTop}`}>
          <h2 className="text-about-card-title font-bold tracking-[-0.0416em]">{title}</h2>
          <p className="text-about-card-desc text-white/97">{text}</p>
        </div>
      </div>
    </div>
  )
}

export default function VisionMission() {
  return (
    <section className="mt-12 px-section-x lg:mt-15.5">
      <div data-reveal-stagger="up" className="mx-auto grid w-full max-w-326.25 gap-12 lg:grid-cols-2 lg:gap-x-[7%]">
        <StatementCard
          image={visionCard}
          imageClassName="top-[0.03%] left-[-4.39%] h-[99.91%] w-[104.39%]"
          title="Our Vision"
          text="To create one of Europe’s largest AI and cloud infrastructure campuses — a hyperscale digital platform purpose-built to serve Central and Eastern Europe over the next two decades through scalable compute, renewable integration, and advanced AI-ready infrastructure."
          textTop="lg:top-[66.2%]"
        />
        <StatementCard
          image={missionCard}
          imageClassName="size-full object-cover"
          title="Our mission"
          text="To deliver a next-generation data center ecosystem that combines committed power infrastructure, renewable energy integration, high-density AI compute architecture, and low-latency connectivity to support hyperscalers, AI cloud providers, GPU infrastructure operators, and enterprise digital transformation across Europe."
          textTop="lg:top-[64.8%]"
        />
      </div>
    </section>
  )
}
