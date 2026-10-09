import CircleTick from '../../../../components/CircleTick/CircleTick'

type FeatureItemProps = {
  title: string
  // Figma breaks each description over two lines
  description: string
  className?: string
}

// The item is a size container (@container) so its text scales with its width.
export default function FeatureItem({ title, description, className }: FeatureItemProps) {
  return (
    <div className={['@container relative', className].filter(Boolean).join(' ')}>
      {/* Width from the item, height from aspect-square: a % height would have nothing to resolve against */}
      <CircleTick className="absolute top-0 left-0 aspect-square w-[8.68%]" />
      <div className="flex flex-col gap-[3.08cqw] pt-px pl-[14%]">
        <h3 className="text-feature-item-title font-semibold whitespace-nowrap text-heading-dark">{title}</h3>
        <p className="text-feature-item-desc whitespace-pre-line text-muted">{description}</p>
      </div>
    </div>
  )
}
