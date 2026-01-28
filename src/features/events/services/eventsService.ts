import { apiClient } from '@/api/client'
import { API_ENDPOINTS } from '@/shared/constants'
import type { Event, EventDetail } from '../types'
import type { ApiResponse } from '@/shared/types'

export const eventsService = {
  /**
   * Obtener lista de eventos
   */
  async getEvents(): Promise<Event[]> {
    const response = await apiClient.get<ApiResponse<Event[]>>(API_ENDPOINTS.EVENTS.LIST)
    return response.data.data
  },

  /**
   * Obtener evento por ID
   */
  async getEventById(id: string | number): Promise<EventDetail> {
    const response = await apiClient.get<ApiResponse<EventDetail>>(
      API_ENDPOINTS.EVENTS.DETAIL(id)
    )
    return response.data.data
  },

  /**
   * Crear nuevo evento (solo para líderes)
   */
  async createEvent(event: Omit<Event, 'id' | 'created_at' | 'updated_at'>): Promise<Event> {
    const response = await apiClient.post<ApiResponse<Event>>(
      API_ENDPOINTS.EVENTS.CREATE,
      event
    )
    return response.data.data
  },

  /**
   * Actualizar evento (solo para líderes)
   */
  async updateEvent(
    id: string | number,
    event: Partial<Event>
  ): Promise<Event> {
    const response = await apiClient.put<ApiResponse<Event>>(
      API_ENDPOINTS.EVENTS.UPDATE(id),
      event
    )
    return response.data.data
  },

  /**
   * Eliminar evento (solo para líderes)
   */
  async deleteEvent(id: string | number): Promise<void> {
    await apiClient.delete(API_ENDPOINTS.EVENTS.DELETE(id))
  },
}

