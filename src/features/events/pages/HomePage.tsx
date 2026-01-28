import { useEvents } from '../hooks/useEvents'
import { EventCard, EventCardSkeleton } from '../components/EventCard'
import { AuthLinks, Footer, Logo } from '@/components/shared'

export const HomePage = () => {
  const { events, isLoading } = useEvents()

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen w-full flex items-center justify-center flex-col bg-black overflow-hidden border-b border-white/5">
        <div className="absolute top-20 right-20">
          <AuthLinks />
        </div>
        <div className="relative flex flex-col items-center">
          <Logo variant="large" to="/" />
          <div className="mt-12 overflow-hidden">
            <span className="block text-[10px] tracking-[0.8em] uppercase text-primary font-medium text-center">
              Exclusive Experiences
            </span>
          </div>
        </div>
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
          <span className="material-symbols-outlined text-white/20 animate-bounce">expand_more</span>
        </div>
      </section>

      {/* Events Grid */}
      <main className="max-w-[1600px] mx-auto px-8 md:px-16 py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
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

      {/* Footer */}
      <Footer />
    </div>
  )
}

