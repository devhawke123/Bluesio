import circleTick from '../../assets/icons/circle-tick.svg'

type CircleTickProps = {
  // Defaults to Figma's 31px frame; pass a size class to scale it with a container
  className?: string
}

export default function CircleTick({ className = 'size-7.75' }: CircleTickProps) {
  return (
    <span className={`relative block shrink-0 overflow-clip ${className}`} aria-hidden="true">
      {/* Figma insets the glyph inside its frame; the percentages reproduce that */}
      <span className="absolute inset-[11.02%_10.94%_10.94%_10.94%]">
        <span className="absolute inset-[-4.13%]">
          <img src={circleTick} alt="" className="block size-full max-w-none" />
        </span>
      </span>
    </span>
  )
}
