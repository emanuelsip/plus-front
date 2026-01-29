import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { AuthLinks, Logo } from '@/components/shared'
import { eventsService } from '@/features/events/services/eventsService'
import { reservasService } from '@/features/reservas/services/reservasService'
import type { EventDetail } from '@/features/events/types'

export const InvitadoConfirmarPage = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const invitacionId = searchParams.get('invitacion_id') || ''
  const eventoId = searchParams.get('evento_id') || ''
  const [event, setEvent] = useState<EventDetail | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [isConfirming, setIsConfirming] = useState(false)
  const [confirmError, setConfirmError] = useState<string | null>(null)

  useEffect(() => {
    const fetchEvent = async () => {
      if (!eventoId) {
        setLoadError('Evento no encontrado.')
        setIsLoading(false)
        return
      }

      try {
        setIsLoading(true)
        const data = await eventsService.getEventById(eventoId)
        setEvent(data)
        setLoadError(null)
      } catch (err) {
        setLoadError(err instanceof Error ? err.message : 'Error al cargar el evento')
      } finally {
        setIsLoading(false)
      }
    }

    fetchEvent()
  }, [eventoId])

  const formattedDate = useMemo(() => {
    if (!event?.date) return ''
    const date = new Date(event.date)
    if (Number.isNaN(date.getTime())) return ''
    return date.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  }, [event?.date])

  const handleConfirm = async () => {
    if (!invitacionId) {
      setConfirmError('Invitación no encontrada.')
      return
    }

    try {
      setIsConfirming(true)
      setConfirmError(null)
      await reservasService.confirmGuest({ invitado_reserva_id: invitacionId, confirmado: true })
      const query = new URLSearchParams({ invitacion_id: invitacionId, evento_id: eventoId })
      navigate(`/invitado/pago?${query.toString()}`)
    } catch (err) {
      setConfirmError(err instanceof Error ? err.message : 'No se pudo confirmar la invitación')
    } finally {
      setIsConfirming(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-zinc-900 text-white">
      <div className="w-full max-w-[960px] mx-auto min-h-screen flex flex-col pb-8 px-4 sm:px-8">
        <header className="mb-12 pt-8">
          <div className="grid grid-cols-12 items-center">
            <div className="col-span-12 md:col-span-6" />
            <div className="col-span-12 md:col-span-6 flex justify-end">
              <AuthLinks />
            </div>
            <div className="col-span-12 flex justify-center mt-8">
              <Logo variant="default" invert to="/" />
            </div>
          </div>
        </header>

        <main className="px-5 space-y-6 flex-grow">
          {isLoading ? (
            <section className="space-y-6">
              <div className="h-56 bg-white/5 rounded-2xl animate-pulse" />
              <div className="h-40 bg-white/5 rounded-2xl animate-pulse" />
            </section>
          ) : loadError || !event ? (
            <section className="glass rounded-2xl p-6 text-center text-red-300">
              {loadError || 'Evento no encontrado.'}
            </section>
          ) : (
            <>
              <section className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl">
                <img
                  alt={event.title}
                  className="w-full h-full object-cover opacity-80"
                  src={event.image}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <h1 className="font-display text-4xl md:text-5xl font-black text-white tracking-widest uppercase drop-shadow-lg">
                    {event.title}
                  </h1>
                </div>
              </section>

              <section className="glass rounded-2xl p-6 space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-4">
                    <span className="material-symbols-outlined text-primary">calendar_today</span>
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-white/50">Fecha</p>
                      <p className="font-display text-sm tracking-widest">{formattedDate}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="material-symbols-outlined text-primary">schedule</span>
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-white/50">Hora</p>
                      <p className="font-display text-sm tracking-widest">
                        {event.start_time} - {event.end_time}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="material-symbols-outlined text-primary">location_on</span>
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-white/50">Ubicación</p>
                      <p className="font-display text-sm tracking-widest">{event.venue}</p>
                    </div>
                  </div>
                </div>
              </section>
            </>
          )}

          <section className="space-y-6 pt-4">
            <h2 className="text-center font-display text-xl tracking-widest">¿Confirmas tu asistencia?</h2>
            <div className="flex flex-col gap-4">
              <button
                className="gold-gradient w-full py-5 rounded-xl text-black font-bold uppercase tracking-[0.15em] shadow-[0_4px_20px_rgba(212,175,55,0.3)] flex items-center justify-center gap-3 active:scale-95 transition-transform disabled:opacity-60 disabled:cursor-not-allowed"
                type="button"
                onClick={handleConfirm}
                disabled={isConfirming || !invitacionId}
              >
                <span className="material-symbols-outlined font-bold">check_circle</span>
                {isConfirming ? 'Confirmando...' : 'SÍ, VOY A IR'}
              </button>
              <button className="w-full py-4 rounded-xl border border-white/20 text-white/60 font-medium uppercase tracking-[0.1em] flex items-center justify-center gap-3 hover:bg-white/5 active:scale-95 transition-transform">
                NO VOY A IR
              </button>
            </div>
            {confirmError && (
              <p className="text-center text-red-300 text-xs uppercase tracking-widest">{confirmError}</p>
            )}
          </section>
        </main>

        <footer className="mt-8 px-5">
          <div className="glass border-none bg-white/5 rounded-full py-3 px-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-xs text-white/40">info</span>
              <p className="text-[10px] uppercase tracking-wider text-white/40">Límite de confirmación</p>
            </div>
            <p className="text-[10px] font-bold text-primary uppercase tracking-wider">Quedan 5 días</p>
          </div>
          <p className="text-center text-[8px] uppercase tracking-[0.4em] text-white/20 mt-8 mb-4">
            Exclusividad • Elegancia • PLUS
          </p>
        </footer>
      </div>
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[300px] h-[300px] bg-primary/5 blur-[80px] rounded-full" />
        <div className="absolute bottom-[-5%] left-[-10%] w-[350px] h-[350px] bg-red-900/10 blur-[100px] rounded-full" />
      </div>
    </div>
  )
}

