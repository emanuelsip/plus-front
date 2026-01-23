import { apiClient } from '@/api/client'
import { API_ENDPOINTS } from '@/shared/constants'
import type { Event, EventDetail } from '../types'
import type { ApiResponse, PaginatedResponse } from '@/shared/types'
import { mockEvents, mockEventDetail } from '../mocks/events'

const USE_MOCKS = import.meta.env.VITE_USE_MOCKS === 'true' || import.meta.env.VITE_USE_MOCKS === undefined

export const eventsService = {
  /**
   * Obtener lista de eventos
   */
  async getEvents(): Promise<Event[]> {
    if (USE_MOCKS) {
      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 500))
      return mockEvents
    }

    const response = await apiClient.get<ApiResponse<Event[]>>(API_ENDPOINTS.EVENTS.LIST)
    return response.data.data
  },

  /**
   * Obtener evento por ID
   */
  async getEventById(id: string | number): Promise<EventDetail> {
    if (USE_MOCKS) {
      await new Promise(resolve => setTimeout(resolve, 500))
      return { ...mockEventDetail, id }
    }

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

