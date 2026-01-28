import { z } from 'zod'

export const loginSchema = z.object({
  phone: z.string().min(8, 'El teléfono debe tener al menos 8 dígitos'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
  remember: z.boolean().optional(),
})

export const registerSchema = z.object({
  first_name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  last_name: z.string().min(2, 'El apellido debe tener al menos 2 caracteres'),
  birth_date: z.string().min(1, 'La fecha de nacimiento es requerida'),
  phone: z.string().min(8, 'El teléfono debe tener al menos 8 dígitos'),
  nit: z.string().min(2, 'El NIT es requerido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
  password_confirmation: z.string(),
  accept_terms: z.boolean().refine((value) => value === true, {
    message: 'Debes aceptar los términos y condiciones',
  }),
}).refine((data) => data.password === data.password_confirmation, {
  message: 'Las contraseñas no coinciden',
  path: ['password_confirmation'],
})

export type LoginFormData = z.infer<typeof loginSchema>
export type RegisterFormData = z.infer<typeof registerSchema>

