import { useState } from 'react'
import Button from '../Button/Button'
import Logo from '../Logo/Logo'
import { ChevronDown, MenuIcon } from './icons'

// Figma sets Investment and Corporate in Medium; the rest are Regular.
const navLinks = [
  { label: 'About', href: '/about', weight: 'font-normal' },
  { label: 'Masterplan', href: '/masterplan', weight: 'font-normal' },
  { label: 'Facilities', href: '/facilities', weight: 'font-normal' },
  { label: 'AI & HPC', href: '/ai-hpc', weight: 'font-normal' },
  { label: 'Development', href: '/development', weight: 'font-normal' },
  { label: 'Sustainability', href: '/sustainability', weight: 'font-normal' },
  { label: 'Connectivity', href: '/connectivity', weight: 'font-normal' },
  { label: 'Investment', href: '/investment', weight: 'font-medium' },
  { label: 'Corporate', href: '/corporate', weight: 'font-medium' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="absolute inset-x-0 top-0 z-50 bg-black text-white">
      <div className="flex h-20 items-center justify-between px-section-x nav:h-29 nav:justify-center nav:gap-20">
        <a href="/" aria-label="Bluesio Technologies home" className="shrink-0">
          <Logo className="h-14 w-36 nav:h-22.25 nav:w-58.75" />
        </a>

        <nav aria-label="Primary" className="hidden nav:block">
          <ul className="flex items-center gap-11">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href} className={`flex items-center gap-0.5 text-nav whitespace-nowrap ${link.weight}`}>
                  {link.label}
                  <ChevronDown />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <Button href="/contact" size="sm" className="hidden w-34 nav:inline-flex">Contact</Button>

        <button
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
          className="nav:hidden"
        >
          <MenuIcon open={open} />
        </button>
      </div>

      {open && (
        <nav aria-label="Mobile" className="border-t border-white/20 px-section-x pb-6 nav:hidden">
          <ul className="flex flex-col">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href} className={`flex items-center justify-between py-3 text-nav ${link.weight}`}>
                  {link.label}
                  <ChevronDown />
                </a>
              </li>
            ))}
          </ul>
          <Button href="/contact" size="sm" className="mt-4 w-full">Contact</Button>
        </nav>
      )}
    </header>
  )
}
