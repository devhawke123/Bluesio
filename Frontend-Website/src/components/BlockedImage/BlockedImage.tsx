type Box = { left: string; top: string; width: string; height: string }

type BlockedImageProps = {
  src: string
  alt: string
  // Sizing/aspect of the photo frame, e.g. 'aspect-1059/491 w-full max-w-264.75'
  frameClassName: string
  // Position of the decorative blue block as percentages of the frame (shown from lg)
  block: Box
  // Figma crops some photos inside their frame; omit for a plain cover fit
  imageClassName?: string
  // Photo corner radius; Figma mixes 4px and 5px across pages
  radiusClassName?: string
  className?: string
}

// A photo with a blue block tucked behind its bottom-right corner.
export default function BlockedImage({ src, alt, frameClassName, block, imageClassName = 'size-full object-cover', radiusClassName = 'rounded-[5px]', className }: BlockedImageProps) {
  return (
    <div data-reveal="scale" className={['relative', className].filter(Boolean).join(' ')}>
      <div aria-hidden="true" className="absolute hidden bg-blue-edge lg:block" style={block} />
      <div className={`relative z-10 overflow-hidden ${radiusClassName} ${frameClassName}`}>
        <img src={src} alt={alt} className={`absolute max-w-none ${imageClassName}`} />
      </div>
    </div>
  )
}
