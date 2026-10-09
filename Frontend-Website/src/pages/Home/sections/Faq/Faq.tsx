import { useState } from 'react'
import Button from '../../../../components/Button/Button'
import SectionBadge from '../../../../components/SectionBadge/SectionBadge'
import FaqItem from './FaqItem'

// Figma repeats one placeholder question six times; replace with the real FAQ copy when it is supplied.
const placeholderAnswer =
  'IRIS is a next-generation hyperscale AI data center campus being developed by BlueSio Technologies in Most, Czechia. Designed for AI, cloud, enterprise, and HPC workloads, the campus is planned across 11 facilities with scalable infrastructure and sustainable energy integration.'

const faqs = Array.from({ length: 6 }, (_, index) => ({
  id: `faq-${index + 1}`,
  question: 'What is the IRIS Data Center Campus?',
  answer: placeholderAnswer,
}))

export default function Faq() {
  // First item starts open, as in the design; one item open at a time.
  const [openId, setOpenId] = useState<string | null>(faqs[0].id)

  return (
    <section className="mt-8 bg-glow-masterplan px-section-x py-12 text-white lg:mt-23 lg:pt-33.5 lg:pb-21.75">
      <div className="mx-auto flex w-full max-w-346.875 flex-col items-center">
        <div data-reveal="up" className="flex flex-col items-center text-center">
          <SectionBadge tone="light">FAQ&rsquo;s</SectionBadge>
          <h2 className="mt-3.25 max-w-237.25 bg-heading-masterplan bg-clip-text font-body text-display-tight font-bold text-transparent">
            Everything You Need to Know About IRIS
          </h2>
          <p className="mt-5 max-w-218.5 text-body-relaxed">
            Find answers to common questions about the IRIS hyperscale AI data center campus, its development, infrastructure, and partnership opportunities.
          </p>
          <Button href="/contact" variant="light" className="mt-9">Explore More</Button>
        </div>

        <div data-reveal-stagger="up" className="mt-12 flex w-full max-w-322.5 flex-col gap-5 lg:mt-18.25">
          {faqs.map((faq) => (
            <FaqItem
              key={faq.id}
              {...faq}
              open={openId === faq.id}
              onToggle={() => setOpenId(openId === faq.id ? null : faq.id)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
