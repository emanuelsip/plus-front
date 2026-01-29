import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { AuthLinks, Logo } from '@/components/shared'
import { reservasService } from '../services/reservasService'
import type { ReservaDetalle } from '../types'

type GuestInput = {
  nombres: string
  apellidos: string
  telefono: string
}

export const ReservasInvitacionesPage = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const reservaId = searchParams.get('reserva_id')
  const [detail, setDetail] = useState<ReservaDetalle | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [formError, setFormError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const [femaleInput, setFemaleInput] = useState<GuestInput>({ nombres: '', apellidos: '', telefono: '' })
  const [maleInput, setMaleInput] = useState<GuestInput>({ nombres: '', apellidos: '', telefono: '' })
  const [femaleGuests, setFemaleGuests] = useState<GuestInput[]>([])
  const [maleGuests, setMaleGuests] = useState<GuestInput[]>([])

  useEffect(() => {
    const fetchDetail = async () => {
      if (!reservaId) {
        setLoadError('Reserva no encontrada.')
        setIsLoading(false)
        return
      }

      try {
        setIsLoading(true)
        const data = await reservasService.getReservationDetail(reservaId)
        setDetail(data)
      } catch (err) {
        setLoadError(err instanceof Error ? err.message : 'Error al cargar la reserva')
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

  const addFemaleGuest = () => {
    if (!femaleInput.nombres.trim() || !femaleInput.apellidos.trim() || !femaleInput.telefono.trim()) {
      setFormError('Completa nombre, apellido y teléfono para añadir mujeres.')
      return
    }
    setFemaleGuests((prev) => [...prev, { ...femaleInput }])
    setFemaleInput({ nombres: '', apellidos: '', telefono: '' })
    setFormError(null)
    setSuccess(null)
  }

  const editFemaleGuest = (index: number) => {
    const guest = femaleGuests[index]
    if (!guest) return
    setFemaleInput(guest)
    setFemaleGuests((prev) => prev.filter((_, currentIndex) => currentIndex !== index))
    setFormError(null)
    setSuccess(null)
  }

  const addMaleGuest = () => {
    if (!maleInput.nombres.trim() || !maleInput.apellidos.trim() || !maleInput.telefono.trim()) {
      setFormError('Completa nombre, apellido y teléfono para añadir hombres.')
      return
    }
    setMaleGuests((prev) => [...prev, { ...maleInput }])
    setMaleInput({ nombres: '', apellidos: '', telefono: '' })
    setFormError(null)
    setSuccess(null)
  }

  const editMaleGuest = (index: number) => {
    const guest = maleGuests[index]
    if (!guest) return
    setMaleInput(guest)
    setMaleGuests((prev) => prev.filter((_, currentIndex) => currentIndex !== index))
    setFormError(null)
    setSuccess(null)
  }

  const totals = useMemo(() => {
    const mujeres = femaleGuests.length
    const hombres = maleGuests.length
    return { mujeres, hombres, total: mujeres + hombres }
  }, [femaleGuests.length, maleGuests.length])

  const handleSave = async () => {
    if (!reservaId) return
    const payloads = [...femaleGuests, ...maleGuests].map((guest) => ({
      reserva_id: reservaId,
      nombres: guest.nombres.trim(),
      apellidos: guest.apellidos.trim(),
      telefono: guest.telefono.trim(),
    }))

    if (payloads.length === 0) {
      setFormError('Agrega al menos un invitado antes de enviar.')
      return
    }

    try {
      setIsSaving(true)
      setFormError(null)
      setSuccess(null)
      await Promise.all(payloads.map((payload) => reservasService.createGuest(payload)))
      setFemaleGuests([])
      setMaleGuests([])
      setFemaleInput({ nombres: '', apellidos: '', telefono: '' })
      setMaleInput({ nombres: '', apellidos: '', telefono: '' })
      setSuccess('Invitaciones enviadas correctamente.')
      navigate(`/reservas/mias/${reservaId}`)
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Error al enviar invitaciones')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-[1200px] mx-auto px-6 py-12">
        <header className="flex flex-col items-center mb-12">
          <div className="w-full flex items-center justify-between">
            <Link className="text-xs uppercase tracking-[0.3em] text-white/60 hover:text-primary" to={`/reservas/mias/${reservaId ?? ''}`}>
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
            <div className="glass rounded-3xl h-96 animate-pulse" />
          </div>
        ) : loadError ? (
          <div className="glass rounded-3xl p-8 text-center text-red-300">{loadError}</div>
        ) : !detail ? (
          <div className="glass rounded-3xl p-8 text-center text-white/70">Reserva no encontrada.</div>
        ) : (
          <main className="space-y-12">
            <section className="glass rounded-3xl overflow-hidden relative group">
              <div className="aspect-video relative overflow-hidden">
                <img
                  alt={detail.evento.nombre}
                  className="w-full h-full object-cover opacity-60 scale-105 group-hover:scale-110 transition-transform duration-700"
                  src={detail.evento.imagen_portada || 'https://picsum.photos/seed/event-default/1200/600'}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                  <h2 className="font-display text-primary text-4xl md:text-6xl mb-4 tracking-[0.2em] uppercase">
                    {detail.evento.nombre}
                  </h2>
                  <p className="text-white text-lg md:text-2xl font-light tracking-widest uppercase">
                    {formattedLongDate(detail.evento.fecha_evento)}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10 p-8 border-t border-white/10">
                <div className="flex flex-col items-center py-4 md:py-0">
                  <span className="material-symbols-outlined text-primary mb-2">calendar_month</span>
                  <span className="font-display tracking-widest text-sm uppercase">
                    {formattedLongDate(detail.evento.fecha_evento)}
                  </span>
                </div>
                <div className="flex flex-col items-center py-4 md:py-0">
                  <span className="material-symbols-outlined text-primary mb-2">schedule</span>
                  <span className="font-display tracking-widest text-sm uppercase">
                    {formatEventTime(detail.evento.fecha_evento, detail.evento.hora) || '--:--'} HRS
                  </span>
                </div>
                <div className="flex flex-col items-center py-4 md:py-0">
                  <span className="material-symbols-outlined text-primary mb-2">location_on</span>
                  <span className="font-display tracking-widest text-sm uppercase">
                    {detail.evento.ubicacion}
                  </span>
                </div>
              </div>
            </section>

            <section className="glass rounded-3xl p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-12">
                <div className="space-y-6">
                  <div className="flex items-center gap-4 border-b border-primary/30 pb-4">
                    <span className="material-symbols-outlined text-primary">female</span>
                    <h3 className="font-display text-xl tracking-wider text-primary">Mujeres</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="relative group">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary transition-colors material-symbols-outlined text-sm">
                        person
                      </span>
                      <input
                        className="w-full bg-white/5 border-white/10 focus:border-primary focus:ring-1 focus:ring-primary rounded-xl pl-12 py-4 transition-all"
                        placeholder="Nombres"
                        type="text"
                        value={femaleInput.nombres}
                        onChange={(event) => setFemaleInput((prev) => ({ ...prev, nombres: event.target.value }))}
                      />
                    </div>
                    <div className="relative group">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary transition-colors material-symbols-outlined text-sm">
                        badge
                      </span>
                      <input
                        className="w-full bg-white/5 border-white/10 focus:border-primary focus:ring-1 focus:ring-primary rounded-xl pl-12 py-4 transition-all"
                        placeholder="Apellidos"
                        type="text"
                        value={femaleInput.apellidos}
                        onChange={(event) => setFemaleInput((prev) => ({ ...prev, apellidos: event.target.value }))}
                      />
                    </div>
                    <div className="relative group">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary transition-colors material-symbols-outlined text-sm">
                        call
                      </span>
                      <input
                        className="w-full bg-white/5 border-white/10 focus:border-primary focus:ring-1 focus:ring-primary rounded-xl pl-12 py-4 transition-all"
                        placeholder="WhatsApp"
                        type="tel"
                        value={femaleInput.telefono}
                        onChange={(event) => setFemaleInput((prev) => ({ ...prev, telefono: event.target.value }))}
                      />
                    </div>
                    <button
                      className="w-full py-2 text-primary/60 hover:text-primary flex items-center justify-center gap-2 text-sm transition-colors border border-dashed border-white/10 hover:border-primary/50 rounded-xl"
                      onClick={addFemaleGuest}
                      type="button"
                    >
                      <span className="material-symbols-outlined text-base">add</span> Añadir mujer
                    </button>
                    {femaleGuests.length > 0 && (
                      <div className="space-y-2 pt-2">
                        {femaleGuests.map((guest, index) => (
                      <button
                        key={`${guest.telefono}-${index}`}
                        className="w-full flex items-center justify-between rounded-xl bg-white/5 px-4 py-2 text-sm text-left hover:bg-white/10 transition-colors"
                        onClick={() => editFemaleGuest(index)}
                        type="button"
                      >
                        <span className="text-white">{guest.nombres} {guest.apellidos}</span>
                        <span className="text-slate-500">{guest.telefono}</span>
                      </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="flex items-center gap-4 border-b border-slate-500/30 pb-4">
                    <span className="material-symbols-outlined text-slate-400">male</span>
                    <h3 className="font-display text-xl tracking-wider text-slate-200">Hombres</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="relative group">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-slate-200 transition-colors material-symbols-outlined text-sm">
                        person
                      </span>
                      <input
                        className="w-full bg-white/5 border-white/10 focus:border-slate-400 focus:ring-1 focus:ring-slate-400 rounded-xl pl-12 py-4 transition-all"
                        placeholder="Nombres"
                        type="text"
                        value={maleInput.nombres}
                        onChange={(event) => setMaleInput((prev) => ({ ...prev, nombres: event.target.value }))}
                      />
                    </div>
                    <div className="relative group">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-slate-200 transition-colors material-symbols-outlined text-sm">
                        badge
                      </span>
                      <input
                        className="w-full bg-white/5 border-white/10 focus:border-slate-400 focus:ring-1 focus:ring-slate-400 rounded-xl pl-12 py-4 transition-all"
                        placeholder="Apellidos"
                        type="text"
                        value={maleInput.apellidos}
                        onChange={(event) => setMaleInput((prev) => ({ ...prev, apellidos: event.target.value }))}
                      />
                    </div>
                    <div className="relative group">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-slate-200 transition-colors material-symbols-outlined text-sm">
                        call
                      </span>
                      <input
                        className="w-full bg-white/5 border-white/10 focus:border-slate-400 focus:ring-1 focus:ring-slate-400 rounded-xl pl-12 py-4 transition-all"
                        placeholder="WhatsApp"
                        type="tel"
                        value={maleInput.telefono}
                        onChange={(event) => setMaleInput((prev) => ({ ...prev, telefono: event.target.value }))}
                      />
                    </div>
                    <button
                      className="w-full py-2 text-slate-500 hover:text-slate-200 flex items-center justify-center gap-2 text-sm transition-colors border border-dashed border-white/10 hover:border-slate-500/50 rounded-xl"
                      onClick={addMaleGuest}
                      type="button"
                    >
                      <span className="material-symbols-outlined text-base">add</span> Añadir hombre
                    </button>
                    {maleGuests.length > 0 && (
                      <div className="space-y-2 pt-2">
                        {maleGuests.map((guest, index) => (
                      <button
                        key={`${guest.telefono}-${index}`}
                        className="w-full flex items-center justify-between rounded-xl bg-white/5 px-4 py-2 text-sm text-left hover:bg-white/10 transition-colors"
                        onClick={() => editMaleGuest(index)}
                        type="button"
                      >
                        <span className="text-white">{guest.nombres} {guest.apellidos}</span>
                        <span className="text-slate-500">{guest.telefono}</span>
                      </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-16 pt-8 border-t border-white/10">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                  <div className="flex gap-8">
                    <div className="text-center">
                      <p className="text-slate-500 text-xs uppercase tracking-widest mb-1">Mujeres</p>
                      <p className="font-display text-2xl text-primary">{String(totals.mujeres).padStart(2, '0')}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-slate-500 text-xs uppercase tracking-widest mb-1">Hombres</p>
                      <p className="font-display text-2xl text-slate-200">{String(totals.hombres).padStart(2, '0')}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-slate-500 text-xs uppercase tracking-widest mb-1">Total</p>
                      <p className="font-display text-2xl text-primary">{String(totals.total).padStart(2, '0')}</p>
                    </div>
                  </div>
                  <button
                    className="w-full md:w-auto px-12 py-5 gold-gradient rounded-full text-black font-bold uppercase tracking-[0.2em] shadow-[0_0_30px_rgba(212,175,55,0.3)] hover:shadow-[0_0_50px_rgba(212,175,55,0.5)] transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed"
                    onClick={handleSave}
                    type="button"
                    disabled={isSaving}
                  >
                    <span className="material-symbols-outlined text-xl">send</span>
                    {isSaving ? 'Enviando...' : 'Enviar Invitaciones'}
                  </button>
                </div>
                {success && (
                  <p className="mt-6 text-center text-primary text-sm uppercase tracking-widest">{success}</p>
                )}
                {formError && (
                  <p className="mt-3 text-center text-red-300 text-sm uppercase tracking-widest">{formError}</p>
                )}
              </div>
            </section>
          </main>
        )}
      </div>
    </div>
  )
}

