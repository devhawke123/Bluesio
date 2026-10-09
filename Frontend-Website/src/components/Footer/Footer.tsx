import Logo from '../Logo/Logo'

type FooterLink = { label: string; href: string }

const menuLinks: FooterLink[] = [
  { label: 'About Us', href: '/about' },
  { label: 'News', href: '/news' },
  { label: 'IRIS Campus', href: '/masterplan' },
  { label: 'Investment', href: '/investment' },
  { label: 'AI & HPC', href: '/ai-hpc' },
  { label: 'Connectivity', href: '/connectivity' },
]

const legalLinks: FooterLink[] = [
  { label: 'Terms of Service', href: '/terms' },
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Cookies Settings', href: '/cookies' },
]

const linkClasses = 'text-white/80 transition-colors lg:hover:text-white'

type FooterProps = {
  // Page-level spacing (margins) is set by the page, not baked in here
  className?: string
}

// Site footer: the last child of <main> on every page.
export default function Footer({ className }: FooterProps) {
  return (
    <footer
      className={['bg-glow-footer px-footer-x py-footer-y text-footer text-white/80', className].filter(Boolean).join(' ')}
    >
      <div data-reveal="fade" className="mx-auto flex w-full max-w-409.5 flex-col items-center">
        <div className="flex w-full flex-col items-center gap-8 lg:flex-row lg:gap-footer-gap">
          <a href="/" aria-label="Bluesio Technologies home">
            <Logo className="aspect-301/114 w-footer-logo" />
          </a>
          <nav aria-label="Footer">
            <ul className="flex flex-wrap justify-center gap-x-[2.3vw] gap-y-3 lg:justify-start lg:gap-x-[2.865vw]">
              {menuLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className={`whitespace-nowrap ${linkClasses}`}>{link.label}</a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-8 flex flex-col items-center gap-x-[1.615vw] gap-y-3 text-center lg:mt-0 lg:flex-row">
          <p>&copy; Copyright 2026, All Rights Reserved</p>
          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {legalLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href} className={`whitespace-nowrap ${linkClasses}`}>{link.label}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}
