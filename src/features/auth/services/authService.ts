import { apiClient } from '@/api/client'
import { API_ENDPOINTS } from '@/shared/constants'
import type { ApiResponse } from '@/shared/types'
import type { LoginFormData, RegisterFormData } from '../types'
import { mockUser, mockToken } from '../mocks/auth'

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

// Flag para usar mocks o API real
const USE_MOCKS = import.meta.env.VITE_USE_MOCKS === 'true' || import.meta.env.VITE_USE_MOCKS === undefined

export const authService = {
  /**
   * Iniciar sesión
   */
  async login(credentials: LoginFormData): Promise<AuthResponse> {
    if (USE_MOCKS) {
      await new Promise(resolve => setTimeout(resolve, 1000))
      return {
        user: {
          ...mockUser,
          phone: credentials.phone,
          role: credentials.role,
        },
        token: mockToken,
      }
    }

    const response = await apiClient.post<ApiResponse<AuthResponse>>(
      API_ENDPOINTS.AUTH.LOGIN,
      credentials
    )
    return response.data.data
  },

  /**
   * Registrarse
   */
  async register(data: RegisterFormData): Promise<AuthResponse> {
    if (USE_MOCKS) {
      await new Promise(resolve => setTimeout(resolve, 1000))
      return {
        user: {
          id: mockUser.id,
          name: `${data.first_name} ${data.last_name}`,
          phone: data.phone,
          role: data.role,
        },
        token: mockToken,
      }
    }

    const response = await apiClient.post<ApiResponse<AuthResponse>>(
      API_ENDPOINTS.AUTH.REGISTER,
      data
    )
    return response.data.data
  },

  /**
   * Obtener usuario actual
   */
  async getCurrentUser(): Promise<AuthResponse['user']> {
    const response = await apiClient.get<ApiResponse<AuthResponse['user']>>(
      API_ENDPOINTS.AUTH.USER
    )
    return response.data.data
  },

  /**
   * Cerrar sesión
   */
  async logout(): Promise<void> {
    if (USE_MOCKS) {
      return
    }

    await apiClient.post(API_ENDPOINTS.AUTH.LOGOUT)
  },
}

