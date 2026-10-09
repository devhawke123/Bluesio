import bulletDot from '../../assets/icons/bullet-dot.svg'

type BulletProps = {
  // Defaults to Figma's 18px dot; pass a size class to scale it with a container
  className?: string
}

export default function Bullet({ className = 'size-4.5' }: BulletProps) {
  return <img src={bulletDot} alt="" className={`shrink-0 ${className}`} />
}
