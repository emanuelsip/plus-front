import { useNavigate } from 'react-router-dom'
import { AuthLinks, Logo } from '@/components/shared'

export const InvitadoPagoPage = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex justify-center items-start py-0 px-0 sm:py-8 sm:px-4">
      <div className="w-full max-w-[960px] space-y-6 bg-[#0A0A0A] sm:rounded-3xl overflow-hidden shadow-2xl pb-10">
        <header className="px-6 pt-8">
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
        <div
          className="relative h-[280px] w-full flex flex-col justify-end px-8 pb-6"
          style={{
            backgroundImage: "linear-gradient(rgba(0,0,0,0.4), rgba(10,10,10,1)), url('https://lh3.googleusercontent.com/aida-public/AB6AXuC2Mir_sTiReUuUYzS7AEf_s6qgu8g09zFfuER3RHMVL3lwPEU2Yjk8bRMaiQUHqbGJ5AO9SqrQg-fzdqIp2V9AqAolK62dfJ7n6AwvoRMeWry8QxGd-CLu1WqxGWfuNrw8KV0a0LxiMdtZ1ovKzGfw7Zb4MVcjzljokLi69uYg9E1UfeLk2AcFWFXEAEjhzL4iBeWXuxmeMuXP7IQmCmhkPlMP86VFkchkV5hWal7CN4I8r9Br1G_NyyyLc41n1p8e-f2fPgjOWNE')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="space-y-1">
            <h1 className="font-display text-4xl font-black text-white leading-none tracking-tighter">VALENTINES</h1>
            <h2 className="font-display text-2xl font-bold gold-text-gradient leading-none tracking-widest">NIGHTLIFE</h2>
          </div>
        </div>

        <div className="px-6 space-y-6">
          <div className="bg-[#141414] border border-white/10 rounded-2xl p-5 space-y-4">
            <div className="grid grid-cols-3 gap-2">
              <div className="flex flex-col items-center text-center p-2 border-r border-white/5">
                <span className="material-symbols-outlined text-primary text-lg mb-1">calendar_today</span>
                <span className="text-[9px] uppercase tracking-widest text-white/40">Fecha</span>
                <span className="text-xs font-semibold">14 de febrero</span>
              </div>
              <div className="flex flex-col items-center text-center p-2 border-r border-white/5">
                <span className="material-symbols-outlined text-primary text-lg mb-1">schedule</span>
                <span className="text-[9px] uppercase tracking-widest text-white/40">Hora</span>
                <span className="text-xs font-semibold">22:00</span>
              </div>
              <div className="flex flex-col items-center text-center p-2">
                <span className="material-symbols-outlined text-primary text-lg mb-1">location_on</span>
                <span className="text-[9px] uppercase tracking-widest text-white/40">Ubicación</span>
                <span className="text-xs font-semibold leading-tight">PLUS Main Hall</span>
              </div>
            </div>
            <div className="pt-3 border-t border-white/5 flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-medium">Cover para:</span>
              <span className="text-xs font-bold text-white uppercase tracking-widest">[User Name]</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 border-l-[6px] border-primary shadow-2xl relative overflow-hidden">
            <div className="flex flex-col">
              <span className="text-black/40 text-[10px] uppercase font-bold tracking-[0.2em] mb-1">Monto Total</span>
              <div className="flex items-baseline gap-1">
                <span className="text-black font-bold text-6xl tracking-tighter">Q 150.00</span>
              </div>
              <div className="mt-4 inline-flex items-center gap-2 bg-[#F9F6EE] border border-primary/20 px-3 py-1.5 rounded-full w-fit">
                <span className="material-symbols-outlined text-primary text-lg">auto_awesome</span>
                <span className="text-primary text-[10px] font-bold uppercase tracking-widest">Canjeable en PLUS</span>
              </div>
            </div>
            <div className="absolute top-0 right-0 p-4 opacity-5">
              <span className="material-symbols-outlined text-black text-6xl">payments</span>
            </div>
          </div>

          <div className="bg-[#141414] rounded-2xl p-5 border border-white/10 space-y-3">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-white/40 text-sm">timer</span>
                <span className="text-[10px] uppercase tracking-widest text-white/40 font-medium">Tiempo restante</span>
              </div>
              <span className="text-xs font-bold text-primary">5 días 8 horas</span>
            </div>
            <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-primary w-3/4" />
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-bold ml-1">Método de pago</h4>
            <div className="grid gap-3">
              <label className="flex items-center justify-between p-4 bg-[#141414] border border-white/5 rounded-xl cursor-pointer hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-4">
                  <span className="material-symbols-outlined text-white/60">credit_card</span>
                  <span className="text-sm font-medium">Tarjeta de Crédito / Débito</span>
                </div>
                <input
                  defaultChecked
                  className="w-4 h-4 text-primary border-white/20 bg-transparent focus:ring-0"
                  name="payment"
                  type="radio"
                />
              </label>
              <label className="flex items-center justify-between p-4 bg-[#141414] border border-white/5 rounded-xl cursor-pointer hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-4">
                  <span className="material-symbols-outlined text-white/60">account_balance</span>
                  <span className="text-sm font-medium">Transferencia Bancaria</span>
                </div>
                <input
                  className="w-4 h-4 text-primary border-white/20 bg-transparent focus:ring-0"
                  name="payment"
                  type="radio"
                />
              </label>
              <label className="flex items-center justify-between p-4 bg-[#141414] border border-white/5 rounded-xl cursor-pointer hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-4">
                  <span className="material-symbols-outlined text-white/60">smartphone</span>
                  <span className="text-sm font-medium">Pago Móvil / Wallet</span>
                </div>
                <input
                  className="w-4 h-4 text-primary border-white/20 bg-transparent focus:ring-0"
                  name="payment"
                  type="radio"
                />
              </label>
            </div>
          </div>

          <form className="bg-[#141414] rounded-2xl p-6 border border-white/5 space-y-6">
            <div className="relative">
              <input
                className="w-full bg-transparent border-b border-white/10 border-t-0 border-x-0 px-0 py-3 focus:ring-0 focus:border-primary text-sm transition-all peer"
                id="card_name"
                placeholder=" "
                type="text"
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
            <div className="grid grid-cols-2 gap-6">
              <div className="relative">
                <input
                  className="w-full bg-transparent border-b border-white/10 border-t-0 border-x-0 px-0 py-3 focus:ring-0 focus:border-primary text-sm transition-all peer"
                  id="expiry"
                  placeholder=" "
                  type="text"
                />
                <label
                  className="absolute left-0 top-3 text-white/40 text-sm transition-all pointer-events-none peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-5 peer-focus:scale-90 peer-focus:text-primary"
                  htmlFor="expiry"
                >
                  MM / YY
                </label>
              </div>
              <div className="relative">
                <input
                  className="w-full bg-transparent border-b border-white/10 border-t-0 border-x-0 px-0 py-3 focus:ring-0 focus:border-primary text-sm transition-all peer"
                  id="cvv"
                  placeholder=" "
                  type="text"
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

          <div className="pt-4">
            <button
              className="gold-gradient w-full py-5 rounded-xl text-black font-bold uppercase tracking-[0.2em] shadow-[0_8px_30px_rgba(212,175,55,0.2)] flex items-center justify-center gap-3 active:scale-[0.98] transition-all"
              type="button"
              onClick={() => navigate('/invitado/confirmacion')}
            >
              <span className="material-symbols-outlined text-lg">lock</span>
              Pagar Q 150.00
            </button>
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
        </div>
      </div>

      <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[400px] h-[400px] bg-primary/5 blur-[100px] rounded-full" />
        <div className="absolute bottom-[-5%] left-[-10%] w-[400px] h-[400px] bg-white/5 blur-[100px] rounded-full" />
      </div>
    </div>
  )
}

