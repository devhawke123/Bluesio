import irisCube from '../../assets/home/iris-cube.png'
import Navbar from '../Navbar/Navbar'

type PageHeroProps = {
  title: string
  description: string
}

// Top-of-page hero for inner pages. Renders the Navbar itself, so pages must not add it again.
export default function PageHero({ title, description }: PageHeroProps) {
  return (
    <section className="section relative min-h-[calc(100svh-1.875rem)] items-center overflow-hidden bg-glow-about-hero px-section-x pt-32 text-center text-white">
      <Navbar />

      {/* Faded cube at the right edge; Figma crops it inside its frame */}
      <div aria-hidden="true" className="pointer-events-none absolute top-[48%] right-0 hidden aspect-361/379 w-[18.8%] overflow-hidden opacity-38 lg:block">
        <img src={irisCube} alt="" className="absolute top-[2.53%] left-[-10.71%] h-[115.61%] w-[121.66%] max-w-none" />
      </div>

      <div className="hero-stagger relative flex w-full max-w-179.5 flex-col items-center gap-5.5">
        <h1 className="bg-heading-hero bg-clip-text font-body text-h1 font-bold text-transparent">{title}</h1>
        <p className="max-w-215.5 font-display text-lead-sm font-medium">{description}</p>
      </div>
    </section>
  )
}
