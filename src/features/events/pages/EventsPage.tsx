import { useEvents } from '../hooks/useEvents'
import { EventCard, EventCardSkeleton } from '../components/EventCard'
import { AuthLinks, Logo } from '@/components/shared'

export const EventsPage = () => {
  const { events, isLoading } = useEvents()

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
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl md:text-5xl text-primary tracking-widest uppercase mb-4">
            Eventos
          </h1>
          <p className="text-slate-400 text-sm tracking-widest uppercase">
            Descubre nuestras próximas experiencias exclusivas
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            <>
              {[...Array(6)].map((_, i) => (
                <EventCardSkeleton key={i} />
              ))}
            </>
          ) : (
            events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))
          )}
        </div>
      </main>
    </div>
  )
}

