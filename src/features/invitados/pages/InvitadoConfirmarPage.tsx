import { Link } from 'react-router-dom'
import { AuthLinks, Logo } from '@/components/shared'

export const InvitadoConfirmarPage = () => {
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
          <section className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl">
            <img
              alt="Valentine's Nightlife"
              className="w-full h-full object-cover opacity-80"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC2Mir_sTiReUuUYzS7AEf_s6qgu8g09zFfuER3RHMVL3lwPEU2Yjk8bRMaiQUHqbGJ5AO9SqrQg-fzdqIp2V9AqAolK62dfJ7n6AwvoRMeWry8QxGd-CLu1WqxGWfuNrw8KV0a0LxiMdtZ1ovKzGfw7Zb4MVcjzljokLi69uYg9E1UfeLk2AcFWFXEAEjhzL4iBeWXuxmeMuXP7IQmCmhkPlMP86VFkchkV5hWal7CN4I8r9Br1G_NyyyLc41n1p8e-f2fPgjOWNE"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center">
              <h1 className="font-display text-4xl md:text-5xl font-black text-white tracking-widest uppercase drop-shadow-lg">
                Valentines
              </h1>
            </div>
          </section>

          <section className="glass rounded-2xl p-6 space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-4">
                <span className="material-symbols-outlined text-primary">calendar_today</span>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-white/50">Fecha</p>
                  <p className="font-display text-sm tracking-widest">14 de febrero, 2024</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="material-symbols-outlined text-primary">schedule</span>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-white/50">Hora</p>
                  <p className="font-display text-sm tracking-widest">22:00 - 05:00</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="material-symbols-outlined text-primary">location_on</span>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-white/50">Ubicación</p>
                  <p className="font-display text-sm tracking-widest">PLUS Main Hall</p>
                </div>
              </div>
            </div>
            <div className="pt-4 border-t border-white/10">
              <p className="text-xs text-white/60 italic text-center">
                Invitado por: <span className="text-primary font-medium not-italic">Líder Name</span>
              </p>
            </div>
          </section>

          <section className="space-y-6 pt-4">
            <h2 className="text-center font-display text-xl tracking-widest">¿Confirmas tu asistencia?</h2>
            <div className="flex flex-col gap-4">
              <Link
                to="/invitado/pago"
                className="gold-gradient w-full py-5 rounded-xl text-black font-bold uppercase tracking-[0.15em] shadow-[0_4px_20px_rgba(212,175,55,0.3)] flex items-center justify-center gap-3 active:scale-95 transition-transform"
              >
                <span className="material-symbols-outlined font-bold">check_circle</span>
                SÍ, VOY A IR
              </Link>
              <button className="w-full py-4 rounded-xl border border-white/20 text-white/60 font-medium uppercase tracking-[0.1em] flex items-center justify-center gap-3 hover:bg-white/5 active:scale-95 transition-transform">
                NO VOY A IR
              </button>
            </div>
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

