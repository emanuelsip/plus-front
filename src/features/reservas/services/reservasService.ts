import { apiClient } from '@/api/client'
import { API_ENDPOINTS } from '@/shared/constants'
import type { ApiResponse } from '@/shared/types'
import type { ReservaEvento, ReservaEventoDetalle } from '../types'

export const reservasService = {
  async getAssignedEvents(): Promise<ReservaEvento[]> {
    const response = await apiClient.get<ApiResponse<ReservaEvento[]>>(API_ENDPOINTS.RESERVAS.EVENTS)
    return response.data.data
  },

  async getReservationDetail(eventoId: string): Promise<ReservaEventoDetalle | null> {
    const response = await apiClient.get<ApiResponse<ReservaEventoDetalle[]>>(
      `${API_ENDPOINTS.RESERVAS.DETAIL}?evento_id=${encodeURIComponent(eventoId)}`
    )
    return response.data.data[0] ?? null
  },
}

