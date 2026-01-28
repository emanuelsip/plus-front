import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Input } from '@/components/ui'
import { AuthLinks, Logo } from '@/components/shared'
import { authService } from '../services/authService'
import { useAuthStore } from '../store/authStore'
import { loginSchema, type LoginFormData } from '../types'

export const SignInPage = () => {
  const navigate = useNavigate()
  const setAuth = useAuthStore((state) => state.setAuth)
  const [showPassword, setShowPassword] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      remember: true,
    },
  })

  const onSubmit = async (data: LoginFormData) => {
    try {
      setSubmitError(null)
      const response = await authService.login(data)
      setAuth(response.user, response.token)
      navigate('/reservas/mias')
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error al iniciar sesión'
      setSubmitError(message)
    }
  }


  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-6 right-6">
        <AuthLinks />
      </div>
      <div className="w-full max-w-[480px] flex flex-col items-center">
        <header className="mb-10 flex flex-col items-center text-center">
          <Logo variant="large" to="/" className="h-[100px] mb-6" />
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 tracking-tight">
            Bienvenido
          </h1>
          <p className="text-primary font-display text-sm tracking-[0.2em] uppercase">
            Inicia sesión para continuar
          </p>
        </header>

        <main className="w-full glass rounded-3xl p-8 md:p-10 shadow-2xl">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {submitError && (
              <div className="rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                {submitError}
              </div>
            )}
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-white/50 ml-1">
                Teléfono
              </label>
              <Input
                type="tel"
                placeholder="0000 0000"
                className="h-14 pl-20 text-lg tracking-wider"
                leading={
                  <span className="text-primary font-bold font-display border-r border-white/10 pr-3">
                    +502
                  </span>
                }
                leadingClassName="flex items-center"
                error={errors.phone?.message}
                {...register('phone')}
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-white/50 ml-1">
                Contraseña
              </label>
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  className="h-14 pr-12"
                  error={errors.password?.message}
                  {...register('password')}
                />
                <button
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-primary"
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  <span className="material-symbols-outlined">visibility</span>
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-white/20 bg-white/5 text-primary focus:ring-primary focus:ring-offset-0"
                  {...register('remember')}
                />
                <span className="text-white/70 group-hover:text-primary transition-colors">
                  Recordarme
                </span>
              </label>
              <a className="text-primary hover:underline underline-offset-4 font-medium transition-all italic" href="#">
                ¿Olvidaste tu contraseña?
              </a>
            </div>

            <Button
              type="submit"
              className="w-full h-14 rounded-xl tracking-[0.2em] shadow-[0_4px_25px_rgba(212,175,55,0.25)]"
              isLoading={isSubmitting}
            >
              Iniciar Sesión
            </Button>

          </form>
        </main>

        <footer className="mt-8 text-center">
          <p className="text-white/60">
            ¿No tienes cuenta?
            <Link
              className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-gray-200 hover:gold-text-gradient transition-all ml-1"
              to="/auth/sign-up"
            >
              Crear Cuenta
            </Link>
          </p>
          <div className="mt-12 flex items-center justify-center gap-4 opacity-20 grayscale">
            <div className="h-[1px] w-8 bg-white" />
            <span className="text-[10px] uppercase tracking-[0.5em] font-display">
              Exclusividad • PLUS
            </span>
            <div className="h-[1px] w-8 bg-white" />
          </div>
        </footer>
      </div>

      <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-white/5 blur-[100px] rounded-full" />
      </div>
    </div>
  )
}

