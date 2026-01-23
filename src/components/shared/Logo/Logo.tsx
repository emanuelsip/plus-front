import { cn } from '@/lib/utils'
import { Link } from 'react-router-dom'

interface LogoProps {
  className?: string
  variant?: 'default' | 'small' | 'large'
  invert?: boolean
  to?: string
}

const LOGO_URL = 'https://lh3.googleusercontent.com/aida-public/AB6AXuAYpIZ3LnAfFcWOxfbk6mWGF5EsFjNGGkjP7NqpfTwxU3qa_YGE6CS1LP1-Vk-ITfHYUQliPAJ330S7PyOxtEhrVqaPPxdlQlIRg0VVRzg7o9jwWBP4jFpqqvC8LnivcNuD09Jn9rYMaD-oeQHAM3zAkQg48tjJsxJBu6cTS6zGixWRS-t1RXVestrdyW6gC6cpr3mN_GXS1klbuL_vpjRXRgv_ZGWf0xiWzi0O06kOCddBc7zrSQXuXL3wH3J1lAEJQuISOFz-eNo'

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
      src={LOGO_URL}
    />
  )

  if (to) {
    return <Link to={to} aria-label="Ir al inicio">{image}</Link>
  }

  return image
}

