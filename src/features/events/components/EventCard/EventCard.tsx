import { Link } from 'react-router-dom'
import type { Event } from '../../types'
import { cn } from '@/lib/utils'

interface EventCardProps {
  event: Event
  className?: string
}

export const EventCard = ({ event, className }: EventCardProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const days = ['DOM', 'LUN', 'MAR', 'MIÉ', 'JUE', 'VIE', 'SÁB']
    const months = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC']
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`
  }

  return (
    <Link to={`/events/${event.id}`} className={cn('event-card group cursor-pointer', className)}>
      <div className="aspect-[4/5] overflow-hidden bg-zinc-900 mb-8">
        <img
          alt={event.title}
          className="event-card-img w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
          src={event.image}
        />
      </div>
      <div className="space-y-4">
        <span className="block text-primary text-[11px] tracking-[0.3em] font-medium uppercase">
          {formatDate(event.date)}
        </span>
        <h3 className="font-display text-2xl lg:text-3xl text-white tracking-widest uppercase leading-tight group-hover:text-primary transition-colors duration-300">
          {event.title}
        </h3>
      </div>
    </Link>
  )
}

