type SummaryCardProps = {
  image: string
  alt: string
  title: string
  description?: string
  // Figma crops some photos inside their frame
  imageClassName?: string
  // Blue wash over the photo (only the first card has one)
  tinted?: boolean
  className?: string
}

export default function SummaryCard({ image, alt, title, description, imageClassName = 'size-full object-cover', tinted = false, className }: SummaryCardProps) {
  return (
    <figure className={['relative m-0 overflow-hidden rounded-[5px] border border-white/42 text-white', className].filter(Boolean).join(' ')}>
      <img src={image} alt={alt} className={`absolute max-w-none ${imageClassName}`} />
      {tinted && <div aria-hidden="true" className="absolute inset-0 bg-blue/36" />}

      {description ? (
        <figcaption className="absolute inset-x-0 bottom-0 flex flex-col gap-8.5 rounded-b-[17px] bg-caption-blue-strong px-8 pt-9.75 pb-9.5">
          <p className="font-card text-caption-title font-semibold">{title}</p>
          <p className="text-caption-desc">{description}</p>
        </figcaption>
      ) : (
        <figcaption className="absolute inset-x-0 bottom-0 bg-caption-blue px-8 pt-7.75 pb-9.5">
          <p className="font-card text-caption-title font-semibold">{title}</p>
        </figcaption>
      )}
    </figure>
  )
}
