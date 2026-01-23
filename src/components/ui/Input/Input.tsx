import { type InputHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: string
  iconFamily?: 'material-icons' | 'material-symbols-outlined'
  leading?: React.ReactNode
  leadingClassName?: string
  label?: string
  error?: string
  variant?: 'default' | 'primary' | 'secondary'
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, icon, iconFamily = 'material-icons', leading, leadingClassName, label, error, variant = 'primary', ...props }, ref) => {
    const variants = {
      default: 'focus:border-slate-400 focus:ring-slate-400',
      primary: 'focus:border-primary focus:ring-primary',
      secondary: 'focus:border-slate-400 focus:ring-slate-400',
    }

    const iconColors = {
      default: 'text-slate-500 group-focus-within:text-slate-200',
      primary: 'text-slate-500 group-focus-within:text-primary',
      secondary: 'text-slate-500 group-focus-within:text-slate-200',
    }

    const hasLeading = Boolean(icon || leading)

    return (
      <div className="space-y-2">
        {label && (
          <label className="block text-sm font-medium text-slate-300">
            {label}
          </label>
        )}
        <div className="relative group">
          {icon && (
            <span
              className={cn(
                'absolute left-4 top-1/2 -translate-y-1/2 transition-colors text-sm',
                iconFamily,
                iconColors[variant]
              )}
            >
              {icon}
            </span>
          )}
          {leading && (
            <span
              className={cn(
                'absolute left-4 top-1/2 -translate-y-1/2 transition-colors',
                leadingClassName
              )}
            >
              {leading}
            </span>
          )}
          <input
            ref={ref}
            className={cn(
              'w-full bg-white/5 border border-white/10 rounded-xl transition-all',
              hasLeading ? 'pl-12' : 'pl-4',
              'py-4 pr-4',
              'focus:ring-1',
              variants[variant],
              error && 'border-red-500 focus:border-red-500 focus:ring-red-500',
              className
            )}
            {...props}
          />
        </div>
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    )
  }
)

Input.displayName = 'Input'

