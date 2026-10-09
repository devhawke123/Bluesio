import logo from '../../assets/logo.png'

type LogoProps = {
  // Sizes the crop frame (width and height together)
  className?: string
}

export default function Logo({ className }: LogoProps) {
  return (
    <span className={['relative block shrink-0 overflow-hidden', className].filter(Boolean).join(' ')}>
      {/* Figma crops the logo inside its frame; the percentages reproduce that crop */}
      <img src={logo} alt="" className="absolute top-[-19.07%] left-[-7.22%] h-[138.15%] w-[113.72%] max-w-none" />
    </span>
  )
}
