import { apiClient } from '@/api/client'
import { API_ENDPOINTS } from '@/shared/constants'
import type { ApiResponse } from '@/shared/types'
import type { LoginFormData, RegisterFormData } from '../types'

interface AuthResponse {
  user: {
    id: string | number
    name: string
    email?: string
    phone?: string
    role: 'leader' | 'guest'
  }
  token: string
}

interface BackendUser {
  id: string | number
  name?: string
  nombres?: string
  apellidos?: string
  email?: string
  telefono?: string
  phone?: string
  role?: 'leader' | 'guest'
  tipo_usuario?: 'invitado' | 'lider' | 'leader' | 'guest' | string
}

const normalizeRole = (role?: BackendUser['tipo_usuario'] | BackendUser['role']): AuthResponse['user']['role'] => {
  if (role === 'leader' || role === 'lider') {
    return 'leader'
  }
  return 'guest'
}

const normalizeUser = (user: BackendUser): AuthResponse['user'] => {
  const fullName = user.name?.trim()
    || `${user.nombres ?? ''} ${user.apellidos ?? ''}`.trim()
    || 'Usuario'

  return {
    id: user.id,
    name: fullName,
    email: user.email,
    phone: user.phone ?? user.telefono,
    role: normalizeRole(user.role ?? user.tipo_usuario),
  }
}

const ensureSuccess = <T>(response: ApiResponse<T>): T => {
  if (!response.success) {
    throw new Error(response.message || 'Error inesperado en la solicitud')
  }
  return response.data
}

export const authService = {
  /**
   * Iniciar sesión
   */
  async login(credentials: LoginFormData): Promise<AuthResponse> {
    const response = await apiClient.post<ApiResponse<{ user: BackendUser; token: string }>>(
      API_ENDPOINTS.AUTH.LOGIN,
      {
        telefono: credentials.phone,
        password: credentials.password,
      }
    )
    const data = ensureSuccess(response.data)
    return {
      user: normalizeUser(data.user),
      token: data.token,
    }
  },

  /**
   * Registrarse
   */
  async register(data: RegisterFormData): Promise<AuthResponse> {
    const response = await apiClient.post<ApiResponse<{ user: BackendUser; token: string }>>(
      API_ENDPOINTS.USERS.CREATE,
      {
        nombres: data.first_name,
        apellidos: data.last_name,
        fecha_nacimiento: data.birth_date,
        telefono: data.phone,
        nit: data.nit,
        password: data.password,
        tipo_usuario: data.role === 'leader' ? 'lider' : 'invitado',
      }
    )
    const responseData = ensureSuccess(response.data)
    return {
      user: normalizeUser(responseData.user),
      token: responseData.token,
    }
  },

  /**
   * Obtener usuario actual
   */
  async getCurrentUser(): Promise<AuthResponse['user']> {
    const response = await apiClient.get<ApiResponse<BackendUser>>(
      API_ENDPOINTS.AUTH.ME
    )
    const user = ensureSuccess(response.data)
    return normalizeUser(user)
  },

  /**
   * Cerrar sesión
   */
  async logout(): Promise<void> {
    await apiClient.post(API_ENDPOINTS.AUTH.LOGOUT)
  },
}

