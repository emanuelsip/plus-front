import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Input } from '@/components/ui'
import { AuthLinks, Logo } from '@/components/shared'
import { authService } from '../services/authService'
import { useAuthStore } from '../store/authStore'
import { registerSchema, type RegisterFormData } from '../types'

export const SignUpPage = () => {
  const navigate = useNavigate()
  const setAuth = useAuthStore((state) => state.setAuth)
  const [showPassword, setShowPassword] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      role: 'guest',
      accept_terms: false,
    },
  })

  const role = watch('role')

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setSubmitError(null)
      const response = await authService.register(data)
      setAuth(response.user, response.token)
      navigate('/reservas/mias')
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error al crear la cuenta'
      setSubmitError(message)
    }
  }

  const roleClasses = useMemo(
    () => ({
      base: 'px-4 py-2 rounded-full text-xs uppercase tracking-[0.2em] transition-all',
      active: 'bg-primary text-black',
      inactive: 'border border-white/10 text-white/70 hover:text-primary',
    }),
    []
  )

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-6 right-6">
        <AuthLinks />
      </div>
      <div className="w-full max-w-[520px] bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
        <div className="p-8 md:p-10">
          <div className="flex flex-col items-center text-center mb-8">
            <Logo variant="large" to="/" className="h-20 mb-6 drop-shadow-[0_0_15px_rgba(212,175,55,0.4)]" />
            <h1 className="text-3xl font-display text-white font-bold tracking-wider mb-2">
              Crear Cuenta
            </h1>
            <p className="text-primary text-sm tracking-widest uppercase font-medium">
              Únete a la experiencia PLUS
            </p>
          </div>
          <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
            {submitError && (
              <div className="rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                {submitError}
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                  Nombres
                </label>
                <Input
                  icon="person"
                  iconFamily="material-symbols-outlined"
                  placeholder="Ej. Juan"
                  className="py-3.5"
                  error={errors.first_name?.message}
                  {...register('first_name')}
                />
              </div>
              <div className="space-y-1.5">
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                  Apellidos
                </label>
                <Input
                  icon="person"
                  iconFamily="material-symbols-outlined"
                  placeholder="Ej. Pérez"
                  className="py-3.5"
                  error={errors.last_name?.message}
                  {...register('last_name')}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                Fecha de Nacimiento
              </label>
              <Input
                icon="calendar_month"
                iconFamily="material-symbols-outlined"
                type="date"
                className="py-3.5"
                error={errors.birth_date?.message}
                {...register('birth_date')}
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                Teléfono
              </label>
              <Input
                icon="call"
                iconFamily="material-symbols-outlined"
                type="tel"
                placeholder="0000 0000"
                className="py-3.5 pl-24"
                leading={<span className="text-white text-sm border-r border-white/10 pr-2">+502</span>}
                leadingClassName="flex items-center left-12"
                error={errors.phone?.message}
                {...register('phone')}
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                NIT
              </label>
              <Input
                icon="badge"
                iconFamily="material-symbols-outlined"
                placeholder="CF o Número de NIT"
                className="py-3.5"
                error={errors.nit?.message}
                {...register('nit')}
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                Contraseña
              </label>
              <div className="relative">
                <Input
                  icon="lock"
                  iconFamily="material-symbols-outlined"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  className="py-3.5 pr-12"
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
              <div className="flex gap-1 mt-2 px-1">
                <div className="h-1 flex-1 rounded-full bg-primary opacity-40" />
                <div className="h-1 flex-1 rounded-full bg-gray-800" />
                <div className="h-1 flex-1 rounded-full bg-gray-800" />
                <div className="h-1 flex-1 rounded-full bg-gray-800" />
              </div>
              <p className="text-[9px] text-gray-500 uppercase tracking-tighter">
                Seguridad: Básica
              </p>
            </div>

            <div className="space-y-1.5">
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                Confirmar Contraseña
              </label>
              <Input
                icon="lock"
                iconFamily="material-symbols-outlined"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                className="py-3.5"
                error={errors.password_confirmation?.message}
                {...register('password_confirmation')}
              />
            </div>

            <div className="py-2">
              <label className="flex items-start gap-3 cursor-pointer group">
                <div className="relative flex items-center">
                  <input
                    className="peer h-5 w-5 cursor-pointer appearance-none rounded border border-primary bg-transparent checked:bg-primary transition-all"
                    type="checkbox"
                    {...register('accept_terms')}
                  />
                  <span className="material-symbols-outlined absolute left-0 text-black text-sm opacity-0 peer-checked:opacity-100 transition-opacity font-bold">
                    check
                  </span>
                </div>
                <span className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors">
                  Acepto los <a className="text-primary underline" href="#">Términos y Condiciones</a> y la Política de Privacidad.
                </span>
              </label>
              {errors.accept_terms?.message && (
                <p className="text-sm text-red-500 mt-2">{errors.accept_terms.message}</p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full py-4 rounded-xl tracking-[0.2em] text-sm shadow-[0_10px_30px_rgba(212,175,55,0.2)]"
              isLoading={isSubmitting}
            >
              Crear Cuenta
              <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </Button>
          </form>

        
          <footer className="mt-8 text-center">
            <p className="text-sm text-gray-400">
              ¿Ya tienes cuenta?
              <Link className="text-primary font-bold hover:underline ml-1" to="/auth/sign-in">
                Iniciar Sesión
              </Link>
            </p>
          </footer>
        </div>
      </div>
    </div>
  )
}

