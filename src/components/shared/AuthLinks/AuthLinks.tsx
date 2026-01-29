import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { useAuthStore } from '@/features/auth/store/authStore'
import { authService } from '@/features/auth/services/authService'

interface AuthLinksProps {
  className?: string
}

export const AuthLinks = ({ className }: AuthLinksProps) => {
  const navigate = useNavigate()
  const { isAuthenticated, user } = useAuthStore((state) => ({
    isAuthenticated: state.isAuthenticated,
    user: state.user,
  }))
  const logout = useAuthStore((state) => state.logout)
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const handleLogout = async () => {
    if (isLoggingOut) return
    setIsLoggingOut(true)
    try {
      await authService.logout()
    } finally {
      logout()
      setIsLoggingOut(false)
      navigate('/', { replace: true })
    }
  }

  if (isAuthenticated && user) {
    return (
      <div className={cn('flex items-center justify-end gap-4 text-xs uppercase tracking-[0.3em] text-white/70', className)}>
        <Link className="hover:text-primary transition-colors" to="/reservas/mias">
          Mis eventos
        </Link>
        <span className="text-white/90 tracking-normal font-medium">{user.name}</span>
        <button
          type="button"
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="hover:text-primary transition-colors disabled:opacity-60"
        >
          {isLoggingOut ? 'Saliendo...' : 'Logout'}
        </button>
      </div>
    )
  }

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

