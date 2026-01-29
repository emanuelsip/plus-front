import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { AuthLinks, Logo } from '@/components/shared'
import { eventsService } from '@/features/events/services/eventsService'
import { reservasService } from '@/features/reservas/services/reservasService'
import type { EventDetail } from '@/features/events/types'

export const InvitadoPagoPage = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const invitacionId = searchParams.get('invitacion_id') || ''
  const eventoId = searchParams.get('evento_id') || ''
  const [event, setEvent] = useState<EventDetail | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'transfer'>('card')
  const [isPaying, setIsPaying] = useState(false)
  const [paymentError, setPaymentError] = useState<string | null>(null)
  const [cardName, setCardName] = useState('')
  const [cardNumber, setCardNumber] = useState('')
  const [expiryMonth, setExpiryMonth] = useState('')
  const [expiryYear, setExpiryYear] = useState('')
  const [cvv, setCvv] = useState('')

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

  const handlePay = async () => {
    if (!invitacionId) {
      setPaymentError('Invitación no encontrada.')
      return
    }
    if (paymentMethod === 'transfer') {
      setPaymentError('Pago por transferencia próximamente.')
      return
    }
    if (!cardName.trim() || !cardNumber.trim() || !expiryMonth.trim() || !expiryYear.trim() || !cvv.trim()) {
      setPaymentError('Completa todos los campos de tarjeta.')
      return
    }

    try {
      setIsPaying(true)
      setPaymentError(null)
      await reservasService.payGuest({
        invitado_reserva_id: invitacionId,
        numero_tarjeta: cardNumber.trim(),
        nombre_titular: cardName.trim(),
        mes_expiracion: expiryMonth.trim(),
        anio_expiracion: expiryYear.trim(),
        cvv: cvv.trim(),
      })
      const query = new URLSearchParams({ invitacion_id: invitacionId, evento_id: eventoId })
      navigate(`/invitado/confirmacion?${query.toString()}`)
    } catch (err) {
      setPaymentError(err instanceof Error ? err.message : 'No se pudo procesar el pago')
    } finally {
      setIsPaying(false)
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
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                  <h1 className="font-display text-3xl md:text-5xl font-black text-white tracking-widest uppercase drop-shadow-lg">
                    {event.title}
                  </h1>
                </div>
              </section>

              <section className="glass rounded-2xl p-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="flex flex-col items-center text-center p-2">
                    <span className="material-symbols-outlined text-primary text-lg mb-1">calendar_today</span>
                    <span className="text-[9px] uppercase tracking-widest text-white/40">Fecha</span>
                    <span className="text-xs font-semibold">{formattedDate}</span>
                  </div>
                  <div className="flex flex-col items-center text-center p-2">
                    <span className="material-symbols-outlined text-primary text-lg mb-1">schedule</span>
                    <span className="text-[9px] uppercase tracking-widest text-white/40">Hora</span>
                    <span className="text-xs font-semibold">{event.start_time}</span>
                  </div>
                  <div className="flex flex-col items-center text-center p-2">
                    <span className="material-symbols-outlined text-primary text-lg mb-1">location_on</span>
                    <span className="text-[9px] uppercase tracking-widest text-white/40">Ubicación</span>
                    <span className="text-xs font-semibold leading-tight">{event.venue}</span>
                  </div>
                </div>
              </section>
            </>
          )}

          <div className="space-y-4">
            <h4 className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-bold ml-1">Método de pago</h4>
            <div className="grid gap-3">
              <label className="flex items-center justify-between p-4 bg-[#141414] border border-white/5 rounded-xl cursor-pointer hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-4">
                  <span className="material-symbols-outlined text-white/60">credit_card</span>
                  <span className="text-sm font-medium">Tarjeta de Crédito / Débito</span>
                </div>
                <input
                  checked={paymentMethod === 'card'}
                  className="w-4 h-4 text-primary border-white/20 bg-transparent focus:ring-0"
                  name="payment"
                  type="radio"
                  onChange={() => setPaymentMethod('card')}
                />
              </label>
              <label className="flex items-center justify-between p-4 bg-[#141414] border border-white/5 rounded-xl cursor-pointer hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-4">
                  <span className="material-symbols-outlined text-white/60">account_balance</span>
                  <span className="text-sm font-medium">Transferencia Bancaria</span>
                </div>
                <input
                  checked={paymentMethod === 'transfer'}
                  className="w-4 h-4 text-primary border-white/20 bg-transparent focus:ring-0"
                  name="payment"
                  type="radio"
                  onChange={() => setPaymentMethod('transfer')}
                />
              </label>
            </div>
            {paymentMethod === 'transfer' && (
              <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-center text-xs uppercase tracking-widest text-white/50">
                Transferencia bancaria próximamente.
              </div>
            )}
          </div>

          {paymentMethod === 'card' && (
            <form className="bg-[#141414] rounded-2xl p-6 border border-white/5 space-y-6">
              <div className="relative">
                <input
                  className="w-full bg-transparent border-b border-white/10 border-t-0 border-x-0 px-0 py-3 focus:ring-0 focus:border-primary text-sm transition-all peer"
                  id="card_name"
                  placeholder=" "
                  type="text"
                  value={cardName}
                  onChange={(event) => setCardName(event.target.value)}
                />
                <label
                  className="absolute left-0 top-3 text-white/40 text-sm transition-all pointer-events-none peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-5 peer-focus:scale-90 peer-focus:text-primary"
                  htmlFor="card_name"
                >
                  Nombre en la tarjeta
                </label>
              </div>
              <div className="relative">
                <input
                  className="w-full bg-transparent border-b border-white/10 border-t-0 border-x-0 px-0 py-3 focus:ring-0 focus:border-primary text-sm transition-all peer"
                  id="card_number"
                  placeholder=" "
                  type="text"
                  inputMode="numeric"
                  value={cardNumber}
                  onChange={(event) => setCardNumber(event.target.value)}
                />
                <label
                  className="absolute left-0 top-3 text-white/40 text-sm transition-all pointer-events-none peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-5 peer-focus:scale-90 peer-focus:text-primary"
                  htmlFor="card_number"
                >
                  Número de tarjeta
                </label>
                <div className="absolute right-0 top-3 flex gap-1 opacity-40">
                  <span className="material-symbols-outlined text-sm">credit_card</span>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="relative">
                  <input
                    className="w-full bg-transparent border-b border-white/10 border-t-0 border-x-0 px-0 py-3 focus:ring-0 focus:border-primary text-sm transition-all peer"
                    id="expiry_month"
                    placeholder=" "
                    type="text"
                    inputMode="numeric"
                    value={expiryMonth}
                    onChange={(event) => setExpiryMonth(event.target.value)}
                  />
                  <label
                    className="absolute left-0 top-3 text-white/40 text-sm transition-all pointer-events-none peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-5 peer-focus:scale-90 peer-focus:text-primary"
                    htmlFor="expiry_month"
                  >
                    Mes (MM)
                  </label>
                </div>
                <div className="relative">
                  <input
                    className="w-full bg-transparent border-b border-white/10 border-t-0 border-x-0 px-0 py-3 focus:ring-0 focus:border-primary text-sm transition-all peer"
                    id="expiry_year"
                    placeholder=" "
                    type="text"
                    inputMode="numeric"
                    value={expiryYear}
                    onChange={(event) => setExpiryYear(event.target.value)}
                  />
                  <label
                    className="absolute left-0 top-3 text-white/40 text-sm transition-all pointer-events-none peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-5 peer-focus:scale-90 peer-focus:text-primary"
                    htmlFor="expiry_year"
                  >
                    Año (AAAA)
                  </label>
                </div>
                <div className="relative">
                  <input
                    className="w-full bg-transparent border-b border-white/10 border-t-0 border-x-0 px-0 py-3 focus:ring-0 focus:border-primary text-sm transition-all peer"
                    id="cvv"
                    placeholder=" "
                    type="text"
                    inputMode="numeric"
                    value={cvv}
                    onChange={(event) => setCvv(event.target.value)}
                  />
                  <label
                    className="absolute left-0 top-3 text-white/40 text-sm transition-all pointer-events-none peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-5 peer-focus:scale-90 peer-focus:text-primary"
                    htmlFor="cvv"
                  >
                    CVV
                  </label>
                </div>
              </div>
            </form>
          )}

          <div className="pt-4">
            <button
              className="gold-gradient w-full py-5 rounded-xl text-black font-bold uppercase tracking-[0.2em] shadow-[0_8px_30px_rgba(212,175,55,0.2)] flex items-center justify-center gap-3 active:scale-[0.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              type="button"
              onClick={handlePay}
              disabled={isPaying || paymentMethod === 'transfer' || !invitacionId}
            >
              <span className="material-symbols-outlined text-lg">lock</span>
              {isPaying ? 'Procesando...' : 'Pagar ahora'}
            </button>
            {paymentError && (
              <p className="mt-4 text-center text-red-300 text-xs uppercase tracking-widest">{paymentError}</p>
            )}
            <div className="flex items-center justify-center gap-2 mt-6 text-white/30">
              <span className="material-symbols-outlined text-sm">verified_user</span>
              <p className="text-[9px] uppercase tracking-widest">Pago 100% seguro con encriptación SSL</p>
            </div>
          </div>

          <footer className="text-center pt-8 pb-4">
            <p className="text-[8px] uppercase tracking-[0.4em] text-white/20">
              Exclusividad • Elegancia • PLUS
            </p>
          </footer>
        </main>
      </div>

      <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[400px] h-[400px] bg-primary/5 blur-[100px] rounded-full" />
        <div className="absolute bottom-[-5%] left-[-10%] w-[400px] h-[400px] bg-white/5 blur-[100px] rounded-full" />
      </div>
    </div>
  )
}

