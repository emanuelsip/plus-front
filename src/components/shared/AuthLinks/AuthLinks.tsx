import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'

interface AuthLinksProps {
  className?: string
}

export const AuthLinks = ({ className }: AuthLinksProps) => {
  return (
    <div className={cn('flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-white/70 justify-end', className)}>
      <Link className="hover:text-primary transition-colors" to="/auth/sign-up">
        Sign up
      </Link>
      <span className="text-white/30">/</span>
      <Link className="hover:text-primary transition-colors" to="/auth/sign-in">
        Sign in
      </Link>
    </div>
  )
}

