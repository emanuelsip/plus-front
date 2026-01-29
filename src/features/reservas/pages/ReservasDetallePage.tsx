import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { AuthLinks, Logo } from '@/components/shared'
import { reservasService } from '../services/reservasService'
import type { ReservaDetalle, ReservaInvitado } from '../types'

export const ReservasDetallePage = () => {
  const { reservaId } = useParams()
  const [detail, setDetail] = useState<ReservaDetalle | null>(null)
  const [guests, setGuests] = useState<ReservaInvitado[]>([])
  const [guestFilter, setGuestFilter] = useState<'all' | 'confirmed' | 'pending'>('all')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    const intervalId = window.setInterval(() => setNow(Date.now()), 1000)
    return () => window.clearInterval(intervalId)
  }, [])

  useEffect(() => {
    const fetchDetail = async () => {
      if (!reservaId) {
        setError('Reserva no encontrada.')
        setIsLoading(false)
        return
      }

      try {
        setIsLoading(true)
        setError(null)
        const [detailData, guestsData] = await Promise.all([
          reservasService.getReservationDetail(reservaId),
          reservasService.getReservationGuests(reservaId),
        ])
        setDetail(detailData)
        setGuests(guestsData)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al cargar reservas')
      } finally {
        setIsLoading(false)
      }
    }

    fetchDetail()
  }, [reservaId])

  const formattedLongDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('es-ES', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    })
  }

  const buildEventDate = (fecha?: string, hora?: string) => {
    if (!fecha) return null
    const date = new Date(fecha)
    if (Number.isNaN(date.getTime())) return null
    const hasTime = /T\d{2}:\d{2}/.test(fecha)
    if (!hasTime && hora) {
      const [hours, minutes] = hora.split(':').map((value) => Number(value))
      if (!Number.isNaN(hours)) {
        date.setHours(hours, Number.isNaN(minutes) ? 0 : minutes, 0, 0)
      }
    }
    return date
  }

  const formatEventTime = (fecha?: string, hora?: string) => {
    const eventDate = buildEventDate(fecha, hora)
    if (!eventDate) return ''
    return eventDate.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
  }

  const filterButtonClass = (isActive: boolean) =>
    `px-6 py-2 text-xs font-bold uppercase rounded-lg tracking-widest transition-colors ${
      isActive ? 'bg-primary text-black' : 'text-slate-400 hover:text-white'
    }`

  const countdown = useMemo(() => {
    if (!detail?.evento?.fecha_evento) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 }
    }
    const eventDate = buildEventDate(detail.evento.fecha_evento, detail.evento.hora)
    if (!eventDate) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 }
    }
    const diffMs = Math.max(0, eventDate.getTime() - now)
    const totalSeconds = Math.floor(diffMs / 1000)
    const days = Math.floor(totalSeconds / 86400)
    const hours = Math.floor((totalSeconds % 86400) / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const seconds = totalSeconds % 60
    return { days, hours, minutes, seconds }
  }, [detail?.evento?.fecha_evento, detail?.evento?.hora, now])

  const stats = useMemo(() => {
    const total = detail?.estadisticas.total_invitados ?? 0
    const confirmados = detail?.estadisticas.total_confirmados ?? 0
    const pendientes = detail?.estadisticas.total_no_confirmados ?? 0
    const porcentaje = detail?.estadisticas.porcentaje_confirmados ?? 0
    return { total, confirmados, pendientes, porcentaje }
  }, [detail])

  const filteredGuests = useMemo(() => {
    if (guestFilter === 'confirmed') {
      return guests.filter((guest) => guest.confirmado)
    }
    if (guestFilter === 'pending') {
      return guests.filter((guest) => !guest.confirmado)
    }
    return guests
  }, [guestFilter, guests])

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
                        {formatEventTime(detail.evento.fecha_evento, detail.evento.hora) || '--:--'} HRS
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
                  <span className="text-2xl md:text-3xl lg:text-4xl">
                    {countdown.seconds}{' '}
                    <span className="text-[10px] font-sans text-slate-500 uppercase">segundos</span>
                  </span>
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
                  <button
                    className={filterButtonClass(guestFilter === 'all')}
                    onClick={() => setGuestFilter('all')}
                  >
                    Todos
                  </button>
                  <button
                    className={filterButtonClass(guestFilter === 'confirmed')}
                    onClick={() => setGuestFilter('confirmed')}
                  >
                    Confirmados
                  </button>
                  <button
                    className={filterButtonClass(guestFilter === 'pending')}
                    onClick={() => setGuestFilter('pending')}
                  >
                    Pendientes
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredGuests.map((guest) => {
                  const statusLabel = guest.confirmado ? 'Confirmado' : 'Pendiente'
                  const normalizedSex = guest.usuario.sexo?.toLowerCase() ?? ''
                  const isFemale = normalizedSex === 'femenino'
                  const isMale = normalizedSex === 'masculino'
                  const genderIcon = isFemale ? 'female' : isMale ? 'male' : 'person'
                  const genderClass = isFemale ? 'text-pink-400' : isMale ? 'text-blue-400' : 'text-slate-400'

                  return (
                    <div key={guest.id} className="glass rounded-2xl p-6 relative group hover:border-primary/30 transition-all">
                      <div className="flex justify-between items-start mb-4">
                        <span
                          className={`text-[10px] font-bold px-2.5 py-1 rounded border uppercase tracking-widest ${
                            guest.confirmado
                              ? 'bg-primary/10 text-primary border-primary/20'
                              : 'bg-white/5 text-slate-300 border-white/10'
                          }`}
                        >
                          {statusLabel}
                        </span>
                        <span className={`material-symbols-outlined text-lg ${genderClass}`}>
                          {genderIcon}
                        </span>
                      </div>
                      <h4 className="text-lg font-medium text-white mb-1">{guest.usuario.nombre_completo}</h4>
                      <p className="text-slate-500 text-sm font-mono">{guest.usuario.telefono}</p>
                    </div>
                  )
                })}

                <Link
                  className="border border-dashed border-white/20 rounded-2xl p-6 flex flex-col items-center justify-center gap-3 hover:bg-white/5 transition-colors group"
                  to={`/reservas/invitaciones?reserva_id=${detail.reserva.id}`}
                >
                  <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:border-primary transition-colors">
                    <span className="material-symbols-outlined text-slate-400 group-hover:text-primary">add</span>
                  </div>
                  <span className="text-xs uppercase tracking-widest font-bold text-slate-400 group-hover:text-white">Añadir Invitado</span>
                </Link>
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

