type StatItemProps = {
  icon: string
  value: string
  label: string
  // The power icon is cropped inside its Figma frame; the others fill theirs
  crop?: boolean
}

export default function StatItem({ icon, value, label, crop = false }: StatItemProps) {
  return (
    <div className="mx-auto flex w-full max-w-63 flex-col items-center gap-1.25 text-center">
      <div className="relative size-22 shrink-0 overflow-hidden">
        {crop ? (
          <img src={icon} alt="" className="absolute top-[-13.77%] left-[-8.67%] h-[127.54%] w-[117.33%] max-w-none" />
        ) : (
          <img src={icon} alt="" className="absolute inset-0 size-full object-cover" />
        )}
      </div>
      <p className="font-accent text-stat font-bold text-blue-light">{value}</p>
      <p className="font-accent text-stat-label font-normal text-white">{label}</p>
    </div>
  )
}
