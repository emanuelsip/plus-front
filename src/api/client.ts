import axios, { type AxiosInstance, type InternalAxiosRequestConfig, type AxiosError } from 'axios'

// Base URL - cambiar según el entorno
const API_BASE_URL = import.meta.env.VITE_API_URL
  || import.meta.env.VITE_API_BASE_URL
  || 'http://localhost:80/api'

// Crear instancia de Axios
export const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest', // Requerido por Sanctum
  },
  withCredentials: false, // API stateless con token Bearer
})

// Interceptor para agregar token de autenticación
apiClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
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

    return Promise.reject(error)
  }
)

