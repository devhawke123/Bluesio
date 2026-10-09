import Bullet from '../../../../components/Bullet/Bullet'

export type Zone = {
  title: string
  items: string[]
  image: string
  alt: string
  // Figma alternates the order: some zones show the photo first, others the text
  imageFirst?: boolean
  // Gap between photo and text from lg (Figma uses a different gap per zone)
  gap: string
  // Cell padding from lg: column inset and the offset below the row's top edge
  cellClassName: string
}

export default function ZoneBlock({ zone, borderLeft }: { zone: Zone; borderLeft: boolean }) {
  const { title, items, image, alt, imageFirst, gap, cellClassName } = zone

  const photo = <img src={image} alt={alt} className="aspect-496/268 w-full rounded-[5px] border border-white/42 object-cover" />
  const copy = (
    <div className="flex flex-col gap-6 lg:min-h-53.75">
      <h3 className="font-display text-col-title font-medium text-black">{title}</h3>
      <ul className="flex flex-col gap-3.25">
        {items.map((item) => (
          <li key={item} className="flex items-center gap-3.25">
            <Bullet />
            <span className="text-col-body text-black">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )

  return (
    <div className={`flex flex-col gap-6 ${borderLeft ? 'lg:border-l lg:border-blue-deep' : ''} ${cellClassName}`}>
      <div className={`flex w-full max-w-129 flex-col gap-6 ${gap}`}>
        {imageFirst ? (
          <>
            {photo}
            {copy}
          </>
        ) : (
          <>
            {copy}
            {photo}
          </>
        )}
      </div>
    </div>
  )
}
