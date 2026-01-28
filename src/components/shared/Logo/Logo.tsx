import { cn } from '@/lib/utils'
import { Link } from 'react-router-dom'
import logoUrl from '@/assets/logo-plus-blanco.png'

interface LogoProps {
  className?: string
  variant?: 'default' | 'small' | 'large'
  invert?: boolean
  to?: string
}

export const Logo = ({ className, variant = 'default', invert = false, to }: LogoProps) => {
  const sizes = {
    default: 'h-16',
    small: 'h-6',
    large: 'h-32 md:h-48 lg:h-64',
  }

  const image = (
    <img
      alt="PLUS Nightclub Logo"
      className={cn(
        sizes[variant],
        invert ? 'invert dark:invert-0 brightness-0 dark:brightness-100' : '',
        variant === 'large' ? 'logo-glow opacity-90' : '',
        'transition-all duration-300',
        className
      )}
      src={logoUrl}
    />
  )

  if (to) {
    return <Link to={to} aria-label="Ir al inicio">{image}</Link>
  }

  return image
}

