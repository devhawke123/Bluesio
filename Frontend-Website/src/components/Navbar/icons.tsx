import chevronDown from '../../assets/icons/chevron-down.svg'

export function ChevronDown() {
  return <img src={chevronDown} alt="" width={12} height={12} className="shrink-0" />
}

export function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
    </svg>
  )
}
