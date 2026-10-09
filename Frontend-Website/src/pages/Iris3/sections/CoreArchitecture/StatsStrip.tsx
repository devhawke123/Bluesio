const stats = [
  { value: '5.250MV', label: 'Left-Right paired cells, 2MW each.' },
  { value: '56Racks', label: 'Across 2 whitespace units.' },
  { value: '4.200KW', label: 'IT capacity at PUE 1.25' },
]

export default function StatsStrip() {
  return (
    <section className="bg-stats-strip px-section-x py-8.25 text-white lg:px-[20.5%]">
      <ul data-reveal-stagger="up" className="mx-auto grid max-w-283.75 gap-8 text-center sm:grid-cols-3 lg:gap-x-[10.7%]">
        {stats.map((stat) => (
          <li key={stat.value} className="flex flex-col items-center justify-center gap-1.25 font-accent lg:min-h-36.75">
            <p className="text-detail-stat font-bold">{stat.value}</p>
            <p className="max-w-53.25 text-stat-label">{stat.label}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
