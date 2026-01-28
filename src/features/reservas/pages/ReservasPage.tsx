import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { AuthLinks, Logo } from '@/components/shared'
import { EventCardSkeleton } from '@/features/events/components/EventCard'
import { reservasService } from '../services/reservasService'
import type { ReservaEvento, ReservaEventoDetalle } from '../types'

const attendeePreview = [
  { name: 'Lucía Fernández', phone: '+34 600 000 001', status: 'Confirmado', gender: 'female' },
  { name: 'Alejandro Sanz', phone: '+34 600 000 002', status: 'Confirmado', gender: 'male' },
  { name: 'María García', phone: '+34 600 000 003', status: 'Pendiente', gender: 'female' },
  { name: 'Carla Méndez', phone: '+34 600 000 004', status: 'Confirmado', gender: 'female' },
  { name: 'Roberto Gómez', phone: '+34 600 000 005', status: 'Pendiente', gender: 'male' },
  { name: 'Javier Ruiz', phone: '+34 600 000 006', status: 'Confirmado', gender: 'male' },
  { name: 'Elena Costa', phone: '+34 600 000 007', status: 'Pendiente', gender: 'female' },
]

export const ReservasPage = () => {
  const [searchParams] = useSearchParams()
  const eventoId = searchParams.get('evento_id')
  const [events, setEvents] = useState<ReservaEvento[]>([])
  const [detail, setDetail] = useState<ReservaEventoDetalle | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        setError(null)

        if (eventoId) {
          const data = await reservasService.getReservationDetail(eventoId)
          setDetail(data)
        } else {
          const data = await reservasService.getAssignedEvents()
          setEvents(data)
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al cargar reservas')
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [eventoId])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const months = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC']
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`
  }

  const formattedLongDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('es-ES', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    })
  }

  const countdown = useMemo(() => {
    if (!detail?.evento?.fecha_evento) {
      return { days: 0, hours: 0, minutes: 0 }
    }
    const diffMs = Math.max(0, new Date(detail.evento.fecha_evento).getTime() - Date.now())
    const totalMinutes = Math.floor(diffMs / 60000)
    const days = Math.floor(totalMinutes / 1440)
    const hours = Math.floor((totalMinutes % 1440) / 60)
    const minutes = totalMinutes % 60
    return { days, hours, minutes }
  }, [detail?.evento?.fecha_evento])

  const stats = useMemo(() => {
    const total = detail?.total_invitados ?? 0
    const confirmados = detail?.invitados_confirmados ?? 0
    const pendientes = Math.max(0, total - confirmados)
    const porcentaje = total > 0 ? Math.round((confirmados / total) * 100) : 0
    return { total, confirmados, pendientes, porcentaje }
  }, [detail])

  if (eventoId) {
    return (
      <div className="min-h-screen">
        <div className="max-w-[1400px] mx-auto px-6 py-8">
          <header className="flex flex-col items-center mb-12">
            <div className="w-full flex items-center justify-between">
              <Link className="text-xs uppercase tracking-[0.3em] text-white/60 hover:text-primary" to="/reservas/mias">
                Volver
              </Link>
              <AuthLinks />
            </div>
            <Logo variant="default" invert to="/" className="h-12 my-8" />
            <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </header>

          {isLoading ? (
            <div className="grid gap-6">
              <div className="glass rounded-3xl h-64 animate-pulse" />
              <div className="glass rounded-3xl h-32 animate-pulse" />
            </div>
          ) : error ? (
            <div className="glass rounded-3xl p-8 text-center text-red-300">{error}</div>
          ) : detail ? (
            <main className="space-y-8">
              <section className="glass rounded-3xl overflow-hidden relative">
                <div className="grid md:grid-cols-2">
                  <div className="h-64 md:h-auto relative overflow-hidden">
                    <img
                      alt={detail.evento.nombre}
                      className="w-full h-full object-cover opacity-60"
                      src={detail.evento.imagen_portada || 'https://picsum.photos/seed/event-default/1200/600'}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />
                  </div>
                  <div className="p-8 md:p-12 flex flex-col justify-center">
                    <span className="text-primary uppercase tracking-[0.4em] text-xs font-semibold mb-2">
                      Evento Asignado
                    </span>
                    <h2 className="font-display text-white text-4xl md:text-5xl mb-6 tracking-widest uppercase">
                      {detail.evento.nombre}
                    </h2>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 text-slate-300">
                        <span className="material-symbols-outlined text-primary">calendar_month</span>
                        <span className="tracking-wide uppercase text-sm">
                          {formattedLongDate(detail.evento.fecha_evento)}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-slate-300">
                        <span className="material-symbols-outlined text-primary">schedule</span>
                        <span className="tracking-wide uppercase text-sm">
                          {detail.evento.hora} HRS
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-slate-300">
                        <span className="material-symbols-outlined text-primary">location_on</span>
                        <span className="tracking-wide uppercase text-sm">
                          {detail.evento.ubicacion}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section className="glass rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="flex flex-col">
                  <span className="text-slate-500 uppercase tracking-widest text-xs mb-4">Tiempo Restante</span>
                  <div className="font-mono text-4xl md:text-5xl lg:text-6xl text-white tracking-tighter flex gap-4">
                    <span>{countdown.days} <span className="text-xs font-sans text-slate-500 uppercase">días</span></span>
                    <span>{countdown.hours} <span className="text-xs font-sans text-slate-500 uppercase">horas</span></span>
                    <span>{countdown.minutes} <span className="text-xs font-sans text-slate-500 uppercase">minutos</span></span>
                  </div>
                </div>
                <div className="relative flex items-center justify-center w-32 h-32">
                  <svg className="w-32 h-32 -rotate-90">
                    <circle className="text-white/5" cx="64" cy="64" fill="transparent" r="58" stroke="currentColor" strokeWidth="4" />
                    <circle
                      className="text-primary"
                      cx="64"
                      cy="64"
                      fill="transparent"
                      r="58"
                      stroke="currentColor"
                      strokeDasharray="364.4"
                      strokeDashoffset={364.4 - (stats.porcentaje / 100) * 364.4}
                      strokeLinecap="round"
                      strokeWidth="4"
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center">
                    <span className="text-primary font-bold text-xl">{stats.porcentaje}%</span>
                    <span className="text-[10px] text-slate-500 uppercase tracking-tighter">RSVP</span>
                  </div>
                </div>
              </section>

              <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass rounded-2xl p-8 text-center group transition-all hover:bg-white/[0.05]">
                  <p className="text-slate-500 text-xs uppercase tracking-[0.2em] mb-3">Total Invitados</p>
                  <p className="text-5xl font-display text-white">{stats.total}</p>
                </div>
                <div className="glass rounded-2xl p-8 text-center group transition-all hover:bg-white/[0.05]">
                  <p className="text-slate-500 text-xs uppercase tracking-[0.2em] mb-3">Confirmados</p>
                  <p className="text-5xl font-display text-primary">{stats.confirmados}</p>
                </div>
                <div className="glass rounded-2xl p-8 text-center group transition-all hover:bg-white/[0.05]">
                  <p className="text-slate-500 text-xs uppercase tracking-[0.2em] mb-3">Pendientes</p>
                  <p className="text-5xl font-display text-slate-400">{stats.pendientes}</p>
                </div>
              </section>

              <section className="space-y-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-6">
                  <div>
                    <h3 className="font-display text-2xl uppercase tracking-widest">Estado de Invitados</h3>
                    <p className="text-slate-500 text-sm mt-1">Gestión de acceso y confirmaciones en tiempo real.</p>
                  </div>
                  <div className="flex bg-white/5 p-1 rounded-xl">
                    <button className="px-6 py-2 bg-primary text-black text-xs font-bold uppercase rounded-lg tracking-widest">Todos</button>
                    <button className="px-6 py-2 text-slate-400 text-xs font-bold uppercase tracking-widest hover:text-white transition-colors">Confirmados</button>
                    <button className="px-6 py-2 text-slate-400 text-xs font-bold uppercase tracking-widest hover:text-white transition-colors">Pendientes</button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {attendeePreview.map((attendee) => (
                    <div key={attendee.name} className="glass rounded-2xl p-6 relative group hover:border-primary/30 transition-all">
                      <div className="flex justify-between items-start mb-4">
                        <span className={`text-[10px] font-bold px-2.5 py-1 rounded border uppercase tracking-widest ${
                          attendee.status === 'Confirmado'
                            ? 'bg-primary/10 text-primary border-primary/20'
                            : 'bg-white/5 text-slate-300 border-white/10'
                        }`}>
                          {attendee.status}
                        </span>
                        <span className={`material-symbols-outlined text-lg ${
                          attendee.gender === 'female' ? 'text-pink-400' : 'text-blue-400'
                        }`}>
                          {attendee.gender === 'female' ? 'female' : 'male'}
                        </span>
                      </div>
                      <h4 className="text-lg font-medium text-white mb-1">{attendee.name}</h4>
                      <p className="text-slate-500 text-sm font-mono">{attendee.phone}</p>
                    </div>
                  ))}

                  <button className="border border-dashed border-white/20 rounded-2xl p-6 flex flex-col items-center justify-center gap-3 hover:bg-white/5 transition-colors group">
                    <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:border-primary transition-colors">
                      <span className="material-symbols-outlined text-slate-400 group-hover:text-primary">add</span>
                    </div>
                    <span className="text-xs uppercase tracking-widest font-bold text-slate-400 group-hover:text-white">Añadir Invitado</span>
                  </button>
                </div>
              </section>
            </main>
          ) : (
            <div className="glass rounded-3xl p-8 text-center text-white/70">Reserva no encontrada.</div>
          )}
        </div>
      </div>
    )
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
                to={`/reservas/mias?evento_id=${event.id}`}
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
                  <span className="block text-primary text-[11px] tracking-[0.3em] font-medium uppercase">
                    {formatDate(event.fecha_evento)}
                  </span>
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

