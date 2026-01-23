import { cn } from '@/lib/utils'
import { Logo } from '../Logo'

interface FooterProps {
  className?: string
  variant?: 'default' | 'minimal'
}

export const Footer = ({ className, variant = 'default' }: FooterProps) => {
  if (variant === 'minimal') {
    return (
      <footer className={cn('mt-16 text-center space-y-4', className)}>
        <p className="text-slate-500 text-xs uppercase tracking-[0.3em]">
          Exclusividad • Elegancia • PLUS
        </p>
        <div className="flex justify-center gap-6">
          <a className="text-slate-500 hover:text-primary transition-colors" href="#">
            <i className="material-icons">share</i>
          </a>
          <a className="text-slate-500 hover:text-primary transition-colors" href="#">
            <i className="material-icons">info</i>
          </a>
          <a className="text-slate-500 hover:text-primary transition-colors" href="#">
            <i className="material-icons">security</i>
          </a>
        </div>
      </footer>
    )
  }

  return (
    <footer className={cn('py-24 border-t border-white/5 text-center', className)}>
      <div className="max-w-xs mx-auto space-y-8">
        <Logo variant="small" className="mx-auto opacity-40 grayscale" />
        <p className="text-[9px] tracking-[0.5em] text-zinc-500 uppercase font-light">
          Elegance is the only beauty that never fades.
        </p>
      </div>
    </footer>
  )
}

