// Constantes globales

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    ME: '/auth/me',
  },
  USERS: {
    CREATE: '/usuarios',
  },
  RESERVAS: {
    EVENTS: '/reservas/eventos',
    DETAIL: '/reservas/mias',
  },
  EVENTS: {
    LIST: '/events',
    DETAIL: (id: string | number) => `/events/${id}`,
    CREATE: '/events',
    UPDATE: (id: string | number) => `/events/${id}`,
    DELETE: (id: string | number) => `/events/${id}`,
  },
} as const

