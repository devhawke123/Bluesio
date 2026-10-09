type CalloutProps = {
  title: string
  // Figma breaks multi-line descriptions explicitly
  description: string
  className?: string
}

export default function Callout({ title, description, className }: CalloutProps) {
  return (
    <div className={['flex flex-col gap-2.75 rounded-[7px] bg-blue/44 pt-4.25 pr-3 pb-3.75 pl-3.25 shadow-tile', className].filter(Boolean).join(' ')}>
      <h3 className="text-callout-title font-semibold text-white">{title}</h3>
      <p className="text-callout-desc whitespace-pre-line text-white">{description}</p>
    </div>
  )
}
