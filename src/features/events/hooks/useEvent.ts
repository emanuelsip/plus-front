import { useState, useEffect } from 'react'
import { eventsService } from '../services/eventsService'
import type { EventDetail } from '../types'

export const useEvent = (id: string | number) => {
  const [event, setEvent] = useState<EventDetail | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setIsLoading(true)
        const data = await eventsService.getEventById(id)
        setEvent(data)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Error al cargar el evento'))
      } finally {
        setIsLoading(false)
      }
    }

    if (id) {
      fetchEvent()
    }
  }, [id])

  return { event, isLoading, error }
}

