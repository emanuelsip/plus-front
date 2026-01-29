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
    DETAIL: (reservaId: string | number) => `/reservas/${reservaId}/detalle`,
    GUESTS: (reservaId: string | number) => `/reservas/${reservaId}/invitados`,
    CREATE_GUEST: '/reservas/invitados/crear',
    CONFIRM_GUEST: '/reservas/invitados/confirmar',
    PAY_GUEST: '/reservas/invitados/pagar',
  },
  EVENTS: {
    LIST: '/events',
    DETAIL: (id: string | number) => `/events/${id}`,
    CREATE: '/events',
    UPDATE: (id: string | number) => `/events/${id}`,
    DELETE: (id: string | number) => `/events/${id}`,
  },
} as const

