import { apiClient } from '@/api/client'
import { API_ENDPOINTS } from '@/shared/constants'
import type { ApiResponse } from '@/shared/types'
import type { ReservaDetalle, ReservaEvento, ReservaInvitado } from '../types'

export const reservasService = {
  async getAssignedEvents(): Promise<ReservaEvento[]> {
    const response = await apiClient.get<ApiResponse<ReservaEvento[]>>(API_ENDPOINTS.RESERVAS.EVENTS)
    return response.data.data
  },

  async getReservationDetail(reservaId: string): Promise<ReservaDetalle | null> {
    const response = await apiClient.get<ApiResponse<ReservaDetalle>>(API_ENDPOINTS.RESERVAS.DETAIL(reservaId))
    return response.data.data ?? null
  },

  async getReservationGuests(reservaId: string): Promise<ReservaInvitado[]> {
    const response = await apiClient.get<ApiResponse<ReservaInvitado[]>>(API_ENDPOINTS.RESERVAS.GUESTS(reservaId))
    return response.data.data
  },

  async createGuest(payload: { reserva_id: string; nombres: string; apellidos: string; telefono: string }): Promise<void> {
    await apiClient.post<ApiResponse<ReservaInvitado>>(API_ENDPOINTS.RESERVAS.CREATE_GUEST, payload)
  },

  async confirmGuest(payload: { invitado_reserva_id: string; confirmado: boolean }): Promise<void> {
    await apiClient.post<ApiResponse<unknown>>(API_ENDPOINTS.RESERVAS.CONFIRM_GUEST, payload)
  },

  async payGuest(payload: {
    invitado_reserva_id: string
    numero_tarjeta: string
    nombre_titular: string
    mes_expiracion: string
    anio_expiracion: string
    cvv: string
  }): Promise<void> {
    await apiClient.post<ApiResponse<unknown>>(API_ENDPOINTS.RESERVAS.PAY_GUEST, payload)
  },
}

