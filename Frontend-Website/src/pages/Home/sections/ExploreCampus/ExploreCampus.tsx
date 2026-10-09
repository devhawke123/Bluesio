import irisCube from '../../../../assets/home/iris-cube.png'

// Unlisted Vimeo video: the hash after ?h= is required; dnt=1 skips tracking.
const videoSrc = 'https://player.vimeo.com/video/1215161820?h=f27c274e5b&dnt=1'

export default function ExploreCampus() {
  return (
    <section className="section min-h-0 items-center gap-8 border-b border-black bg-glow-explore px-section-x text-white">
      <div data-reveal="up" className="flex items-center gap-2 sm:gap-4">
        <h2 className="bg-heading-section bg-clip-text font-body text-h2 font-medium text-transparent capitalize">
          Explore IRIS Campus
        </h2>
        <div className="relative size-16 shrink-0 rotate-[1.12deg] overflow-hidden sm:size-23.25">
          {/* Figma crops the icon inside its frame; the percentages reproduce that crop */}
          <img src={irisCube} alt="" className="absolute top-[2.39%] left-[-10.71%] h-[109.54%] w-[121.66%] max-w-none" />
        </div>
      </div>

      <div data-reveal="up" data-reveal-delay="100" className="aspect-803/460 w-full max-w-185">
        <iframe
          src={videoSrc}
          title="Explore IRIS Campus"
          loading="lazy"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          className="size-full border-0"
        />
      </div>
    </section>
  )
}
