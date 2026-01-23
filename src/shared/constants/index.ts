// Constantes globales

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REGISTER: '/auth/register',
    USER: '/auth/user',
  },
  EVENTS: {
    LIST: '/events',
    DETAIL: (id: string | number) => `/events/${id}`,
    CREATE: '/events',
    UPDATE: (id: string | number) => `/events/${id}`,
    DELETE: (id: string | number) => `/events/${id}`,
  },
} as const

