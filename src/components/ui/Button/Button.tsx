import { type ButtonHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'dashed'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
  icon?: React.ReactNode
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, icon, children, disabled, ...props }, ref) => {
    const baseStyles = 'font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed'
    
    const variants = {
      primary: 'gold-gradient rounded-full text-black shadow-[0_0_30px_rgba(212,175,55,0.3)] hover:shadow-[0_0_50px_rgba(212,175,55,0.5)]',
      secondary: 'bg-primary text-black rounded-full hover:bg-primary/90',
      outline: 'border-2 border-primary text-primary rounded-full hover:bg-primary/10',
      ghost: 'text-primary hover:bg-primary/10 rounded-full',
      dashed: 'py-2 text-primary/60 hover:text-primary border border-dashed border-white/10 hover:border-primary/50 rounded-xl text-sm',
    }
    
    const sizes = {
      sm: 'px-6 py-2 text-sm',
      md: 'px-8 py-3 text-base',
      lg: 'px-12 py-5 text-lg tracking-[0.2em]',
    }

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Cargando...
          </>
        ) : (
          <>
            {icon && <span className="text-base">{icon}</span>}
            {children}
          </>
        )}
      </button>
    )
  }
)

Button.displayName = 'Button'

