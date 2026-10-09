import Bullet from '../../../../components/Bullet/Bullet'

type SummaryCardProps = {
  title: string
  items: string[]
  image: string
}

// The card is a size container (@container) so its text scales with its width from lg.
// Below lg it is a simple stacked card.
export default function SummaryCard({ title, items, image }: SummaryCardProps) {
  return (
    <div className="@container relative flex flex-col gap-5 rounded-[5px] border border-blue bg-glow-card p-5 text-white lg:block lg:aspect-543/236 lg:p-0">
      <h3 className="text-summary-title font-semibold lg:absolute lg:top-[17.4%] lg:left-[3.5%] lg:w-[25.2%] lg:text-center">{title}</h3>

      <ul className="flex flex-col gap-4 lg:absolute lg:top-[42.4%] lg:left-[3.5%] lg:gap-[2.95cqw]">
        {items.map((item) => (
          <li key={item} className="flex items-center gap-3.25 lg:gap-[2.4cqw]">
            <Bullet className="size-4.5 lg:size-[3.315cqw]" />
            <span className="text-summary-item whitespace-nowrap">{item}</span>
          </li>
        ))}
      </ul>

      {/* Figma crops the thumbnail inside its frame; the percentages reproduce that crop */}
      <div className="relative aspect-174/153 w-full max-w-43.5 overflow-hidden lg:absolute lg:top-[32.6%] lg:left-[65.2%] lg:w-[32%] lg:max-w-none">
        <img src={image} alt="" className="absolute top-[-81.44%] left-[-18.28%] h-[221.05%] w-[130.6%] max-w-none" />
      </div>
    </div>
  )
}
