type CapabilityCardProps = {
  title: string
  description: string
  className?: string
}

// The card is a size container (@container) so its text scales with its width.
export default function CapabilityCard({ title, description, className }: CapabilityCardProps) {
  return (
    <div
      className={['@container relative aspect-404/143 rounded-[5px] border border-blue bg-blue/13 font-card text-white', className]
        .filter(Boolean)
        .join(' ')}
    >
      <div className="absolute top-[24.5%] left-[7.67%] flex w-[89.85%] flex-col">
        <h3 className="text-capability-title font-normal">{title}</h3>
        <p className="text-capability-desc">{description}</p>
      </div>
    </div>
  )
}
