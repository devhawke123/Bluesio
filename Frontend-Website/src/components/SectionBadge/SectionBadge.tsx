import type { HTMLAttributes, ReactNode } from 'react'

type Tone = 'dark' | 'light'

type SectionBadgeProps = Omit<HTMLAttributes<HTMLSpanElement>, 'className' | 'children'> & {
  tone?: Tone
  className?: string
  children: ReactNode
}

const toneClasses: Record<Tone, string> = {
  dark: 'bg-navy-dark/78 text-white',
  light: 'bg-white text-black',
}

export default function SectionBadge({ tone = 'dark', className, children, ...rest }: SectionBadgeProps) {
  const classes = ['inline-flex h-6 items-center justify-center rounded-sm px-6 text-badge font-semibold uppercase', toneClasses[tone], className]
    .filter(Boolean)
    .join(' ')
  return (
    <span className={classes} {...rest}>
      {children}
    </span>
  )
}
