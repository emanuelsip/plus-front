import type { EventDetail } from '../../types'
import { Card } from '@/components/ui'

interface EventHeaderProps {
  event: EventDetail
}

export const EventHeader = ({ event }: EventHeaderProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
    const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
    const day = date.getDate()
    const month = months[date.getMonth()]
    const dayName = days[date.getDay()]
    return `${dayName}, ${day} ${month}`
  }

  return (
    <Card variant="glass" className="relative group">
      <div className="aspect-video relative overflow-hidden">
        <img
          alt={event.title}
          className="w-full h-full object-cover opacity-60 scale-105 group-hover:scale-110 transition-transform duration-700"
          src={event.image}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
          <h2 className="font-display text-primary text-5xl md:text-7xl mb-4 tracking-[0.2em] uppercase">
            {event.title}
          </h2>
          <p className="text-white text-xl md:text-2xl font-light tracking-widest uppercase">
            {formatDate(event.date)}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10 p-8 border-t border-white/10">
        <div className="flex flex-col items-center py-4 md:py-0">
          <span className="text-primary material-icons mb-2">calendar_today</span>
          <span className="font-display tracking-widest text-sm uppercase">
            {formatDate(event.date)}
          </span>
        </div>
        <div className="flex flex-col items-center py-4 md:py-0">
          <span className="text-primary material-icons mb-2">schedule</span>
          <span className="font-display tracking-widest text-sm uppercase">
            {event.start_time} HRS - {event.end_time} HRS
          </span>
        </div>
        <div className="flex flex-col items-center py-4 md:py-0">
          <span className="text-primary material-icons mb-2">location_on</span>
          <span className="font-display tracking-widest text-sm uppercase">
            {event.venue}
          </span>
        </div>
      </div>
    </Card>
  )
}

