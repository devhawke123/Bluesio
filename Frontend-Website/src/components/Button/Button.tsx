import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'

type Variant = 'light' | 'outline-white' | 'gradient' | 'dark' | 'glass'
type Size = 'xl' | 'lg' | 'md' | 'sm'

type CommonProps = {
  variant?: Variant
  size?: Size
  className?: string
  children: ReactNode
}

type ButtonAsAnchor = CommonProps & { href: string } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'className' | 'children'>
type ButtonAsButton = CommonProps & { href?: undefined } & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'>
type ButtonProps = ButtonAsAnchor | ButtonAsButton

// Radius, weight and border colour live in the size/variant maps so no two utilities for one property compete.
const base = 'inline-flex items-center justify-center border-2 whitespace-nowrap transition-colors duration-200'

const variantClasses: Record<Variant, string> = {
  light: 'border-white bg-white text-black lg:hover:bg-transparent lg:hover:text-white',
  'outline-white': 'border-white bg-transparent text-white lg:hover:bg-white lg:hover:text-black',
  gradient: 'border-white bg-button-blue text-white lg:hover:brightness-125',
  glass: 'border-white/69 bg-button-glass text-white lg:hover:bg-white/10',
  dark: 'border-black bg-black text-white lg:hover:border-white lg:hover:bg-white lg:hover:text-black',
}

const sizeClasses: Record<Size, string> = {
  xl: 'h-15.5 rounded-[11px] px-10 text-cta-xl font-normal',
  lg: 'h-14.5 rounded-sm px-8 text-cta font-semibold',
  md: 'h-14 gap-2 rounded-[9px] px-8 text-col-body font-normal',
  sm: 'h-11 rounded-sm px-8 text-cta-sm font-semibold',
}

export default function Button(props: ButtonProps) {
  const { variant = 'light', size = 'lg', className, children, ...rest } = props
  const classes = [base, variantClasses[variant], sizeClasses[size], className].filter(Boolean).join(' ')

  if (props.href !== undefined) {
    return <a {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)} href={props.href} className={classes}>{children}</a>
  }
  return <button type="button" {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)} className={classes}>{children}</button>
}
