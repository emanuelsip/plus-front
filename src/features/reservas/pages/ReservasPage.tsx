import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthLinks, Logo } from '@/components/shared'
import { EventCardSkeleton } from '@/features/events/components/EventCard'
import { reservasService } from '../services/reservasService'
import type { ReservaEvento } from '../types'

export const ReservasPage = () => {
  const [events, setEvents] = useState<ReservaEvento[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const data = await reservasService.getAssignedEvents()
        setEvents(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al cargar reservas')
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const months = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC']
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`
  }
  return (
    <div className="min-h-screen">
      <div className="max-w-[1600px] mx-auto px-8 md:px-16 py-12">
        <header className="mb-16">
          <div className="grid grid-cols-12 items-center">
            <div className="col-span-12 md:col-span-6">
              <h1 className="font-display text-3xl md:text-4xl text-white tracking-widest uppercase">
                Mis Reservas
              </h1>
              <p className="text-slate-400 text-sm tracking-widest uppercase mt-2">
                Eventos asignados por administración
              </p>
            </div>
            <div className="col-span-12 md:col-span-6 flex justify-end mt-6 md:mt-0">
              <AuthLinks />
            </div>
            <div className="col-span-12 flex justify-center mt-8">
              <Logo variant="default" invert to="/" />
            </div>
          </div>
        </header>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
            {[...Array(6)].map((_, i) => (
              <EventCardSkeleton key={i} />
            ))}
          </div>
        ) : error ? (
          <div className="glass rounded-3xl p-8 text-center text-red-300">{error}</div>
        ) : events.length === 0 ? (
          <div className="glass rounded-3xl p-12 text-center text-white/70">
            No tienes reservas aún.
          </div>
        ) : (
          <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
            {events.map((event) => (
              <Link
                key={event.id}
                to={event.rol === 'invitado'
                  ? `/invitado/confirmar${event.invitacion_id
                    ? `?invitacion_id=${event.invitacion_id}&evento_id=${event.evento_id}`
                    : ''}`
                  : `/reservas/mias/${event.id}`}
                className="event-card group cursor-pointer"
              >
                <div className="aspect-[4/5] overflow-hidden bg-zinc-900 mb-8">
                  <img
                    alt={event.nombre}
                    className="event-card-img w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                    src={event.imagen_portada || 'https://picsum.photos/seed/event-default/1200/600'}
                  />
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-3">
                    <span className="block text-primary text-[11px] tracking-[0.3em] font-medium uppercase">
                      {formatDate(event.fecha_evento)}
                    </span>
                    {event.rol && (
                      <span className="rounded-full border border-primary/30 px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.25em] text-primary/90">
                        {event.rol === 'lider' ? 'Líder' : 'Invitado'}
                      </span>
                    )}
                  </div>
                  <h3 className="font-display text-2xl lg:text-3xl text-white tracking-widest uppercase leading-tight group-hover:text-primary transition-colors duration-300">
                    {event.nombre}
                  </h3>
                  <div className="flex items-center gap-2 text-slate-400 text-sm uppercase tracking-widest">
                    <span className="material-symbols-outlined text-base text-primary">location_on</span>
                    {event.ubicacion}
                  </div>
                </div>
              </Link>
            ))}
          </main>
        )}
      </div>
    </div>
  )
}

