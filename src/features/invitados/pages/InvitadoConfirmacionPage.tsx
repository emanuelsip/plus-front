import { AuthLinks, Logo } from '@/components/shared'

export const InvitadoConfirmacionPage = () => {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_center,#1A1A1A_0%,#0A0A0A_100%)] text-slate-100 font-sans antialiased overflow-hidden">
      <div className="max-w-[900px] mx-auto min-h-screen flex flex-col px-4 sm:px-8 py-8 relative">
        <header className="mb-12 pt-4">
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

        <main className="flex-grow flex flex-col items-center justify-center text-center space-y-8 py-12">
          <div className="relative">
            <div className="w-[120px] h-[120px] rounded-full border-2 border-primary flex items-center justify-center shadow-[0_0_40px_rgba(212,175,55,0.2)]">
              <span className="material-symbols-outlined text-[80px] text-primary">
                check_circle
              </span>
            </div>
            <div className="absolute inset-0 bg-primary blur-[60px] opacity-20 -z-10" />
          </div>
          <div className="space-y-4">
            <h1 className="text-white text-[32px] font-bold leading-tight tracking-tight">
              ¡Confirmación exitosa!
            </h1>
            <p className="text-slate-400 text-lg font-light max-w-[280px] mx-auto">
              Te avisaremos cuando llegue el momento de pagar
            </p>
          </div>
        </main>

        <footer className="mt-auto space-y-10 pb-8 flex flex-col items-center">
          <div className="flex flex-col items-center gap-4">
            <p className="font-display tracking-[0.3em] text-white/80 uppercase text-sm italic">Nos vemos en</p>
            <div className="relative group">
              <Logo variant="small" className="h-10 opacity-90" />
              <div className="absolute inset-0 bg-primary mix-blend-color opacity-60 pointer-events-none" />
            </div>
          </div>
          <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <div className="flex flex-col gap-2 items-center">
            <p className="text-slate-400/40 text-[10px] uppercase tracking-[0.4em]">
              Exclusividad • Elegancia • PLUS
            </p>
          </div>
        </footer>

        <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10 overflow-hidden">
          <div className="absolute top-[20%] right-[-20%] w-[300px] h-[300px] bg-primary/5 blur-[100px] rounded-full" />
          <div className="absolute bottom-[10%] left-[-20%] w-[400px] h-[400px] bg-red-900/10 blur-[120px] rounded-full" />
        </div>
      </div>
    </div>
  )
}

