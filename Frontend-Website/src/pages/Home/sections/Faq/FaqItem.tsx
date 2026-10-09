import chevronDown from '../../../../assets/icons/chevron-down-lg.svg'

type FaqItemProps = {
  id: string
  question: string
  answer: string
  open: boolean
  onToggle: () => void
}

// Answer height animates with a grid-rows transition; motion-safe keeps it off for reduced-motion users.
export default function FaqItem({ id, question, answer, open, onToggle }: FaqItemProps) {
  return (
    <div className="rounded-xl border border-blue bg-faq">
      <h3>
        <button
          type="button"
          id={`${id}-button`}
          aria-expanded={open}
          aria-controls={`${id}-panel`}
          onClick={onToggle}
          className="flex w-full items-center justify-between gap-6 px-5 pt-10 text-left"
        >
          <span className={`font-card text-faq-question ${open ? 'text-blue' : 'text-white'}`}>{question}</span>
          <img src={chevronDown} alt="" width={30} height={30} className="shrink-0" />
        </button>
      </h3>
      <div
        id={`${id}-panel`}
        role="region"
        aria-labelledby={`${id}-button`}
        className={`grid motion-safe:transition-[grid-template-rows] motion-safe:duration-300 ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
      >
        <div className="overflow-hidden">
          <p className="max-w-[89.6%] px-5 pt-2 pb-10 font-card text-faq-answer text-white/92">{answer}</p>
        </div>
      </div>
      {!open && <div aria-hidden="true" className="h-7" />}
    </div>
  )
}
