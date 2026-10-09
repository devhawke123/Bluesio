type FeatureCardProps = {
  image: string
  title: string
  description: string
  // Figma anchors the text block at a slightly different height per card
  textTop: string
  // The cooling photo is a wide frame cropped inside the card
  imageClassName?: string
}

const defaultImageClass = 'size-full object-cover'

// The inner card is a size container (@container) so its text scales with its width.
export default function FeatureCard({ image, title, description, textTop, imageClassName = defaultImageClass }: FeatureCardProps) {
  return (
    <div className="relative">
      {/* Decorative blue block behind the card's bottom-right corner */}
      <div aria-hidden="true" className="absolute top-[53.24%] bottom-0 left-[44.68%] hidden w-[63.4%] bg-blue-edge lg:block" />

      <div className="@container relative z-10 aspect-429/509 overflow-hidden rounded-[5px] font-card text-white">
        <img src={image} alt="" className={`absolute max-w-none ${imageClassName}`} />
        <div aria-hidden="true" className="absolute inset-0 bg-black/20" />
        <div className={`absolute left-[4.9%] flex w-[89.98%] flex-col gap-[3.96cqw] ${textTop}`}>
          <h3 className="text-feature-title font-semibold">{title}</h3>
          <p className="text-feature-desc text-white/92">{description}</p>
        </div>
      </div>
    </div>
  )
}
