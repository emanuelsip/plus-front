import axios, { type AxiosInstance, type InternalAxiosRequestConfig, type AxiosError } from 'axios'

// Base URL - cambiar según el entorno
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api'
const SANCTUM_CSRF_URL = import.meta.env.VITE_SANCTUM_CSRF_URL || 'http://localhost:8000/sanctum/csrf-cookie'

// Crear instancia de Axios
export const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest', // Requerido por Sanctum
  },
  withCredentials: true, // Necesario para Sanctum (cookies)
})

// Función para obtener el token CSRF de Sanctum
export const getCsrfCookie = async (): Promise<void> => {
  try {
    await axios.get(SANCTUM_CSRF_URL, {
      withCredentials: true,
    })
  } catch (error) {
    console.warn('Error al obtener cookie CSRF:', error)
  }
}

// Interceptor para agregar token de autenticación
apiClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    // Obtener cookie CSRF antes de cada petición (solo en desarrollo o cuando sea necesario)
    if (import.meta.env.DEV) {
      await getCsrfCookie()
    }

    // Agregar token Bearer si existe
    const token = localStorage.getItem('auth_token')
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Interceptor para manejar errores de respuesta
apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean }

    // Manejar error 401 (No autorizado)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      // Limpiar token almacenado
      localStorage.removeItem('auth_token')

      // Intentar obtener nuevo CSRF cookie
      await getCsrfCookie()

      // Redirigir a login si es necesario (descomentar cuando tengas ruta de login)
      // window.location.href = '/login'
    }

    // Manejar error 419 (CSRF token mismatch)
    if (error.response?.status === 419) {
      await getCsrfCookie()
      // Reintentar la petición original
      if (originalRequest) {
        return apiClient(originalRequest)
      }
    }

    return Promise.reject(error)
  }
)

