import { useParams } from 'react-router-dom'
import { useEvent } from '../hooks/useEvent'
import { EventHeader } from '../components/EventHeader'
import { Card } from '@/components/ui'
import { AuthLinks, Logo, Footer } from '@/components/shared'

export const EventDetailPage = () => {
  const { id } = useParams<{ id: string }>()
  const { event, isLoading, error } = useEvent(id || '')

  if (isLoading) {
    return (
      <div className="min-h-screen max-w-[1200px] mx-auto px-6 py-12">
        <div className="animate-pulse space-y-8">
          <div className="h-16 bg-zinc-900 rounded-xl w-32 mx-auto" />
          <div className="h-96 bg-zinc-900 rounded-3xl" />
          <div className="h-64 bg-zinc-900 rounded-3xl" />
        </div>
      </div>
    )
  }

  if (error || !event) {
    return (
      <div className="min-h-screen max-w-[1200px] mx-auto px-6 py-12 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-display text-primary mb-4">Evento no encontrado</h2>
          <p className="text-slate-400">{error?.message || 'El evento que buscas no existe'}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen max-w-[1200px] mx-auto px-6 py-12">
      <header className="mb-16">
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

      <main className="space-y-12">
        <EventHeader event={event} />

        {event.full_description && (
          <Card variant="glass" className="p-8 md:p-12">
            <h3 className="font-display text-2xl text-primary mb-6 tracking-wider uppercase">
              Descripción
            </h3>
            <p className="text-slate-300 leading-relaxed">
              {event.full_description}
            </p>
          </Card>
        )}

        {(event.capacity || event.confirmed_count !== undefined) && (
          <Card variant="glass" className="p-8 md:p-12">
            <h3 className="font-display text-2xl text-primary mb-6 tracking-wider uppercase">
              Información del Evento
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {event.capacity && (
                <div>
                  <p className="text-slate-500 text-xs uppercase tracking-widest mb-1">
                    Capacidad
                  </p>
                  <p className="font-display text-2xl text-primary">{event.capacity}</p>
                </div>
              )}
              {event.confirmed_count !== undefined && (
                <div>
                  <p className="text-slate-500 text-xs uppercase tracking-widest mb-1">
                    Confirmados
                  </p>
                  <p className="font-display text-2xl gold-text-gradient font-bold">
                    {event.confirmed_count}
                  </p>
                </div>
              )}
            </div>
          </Card>
        )}
      </main>

      <Footer variant="minimal" />
    </div>
  )
}

