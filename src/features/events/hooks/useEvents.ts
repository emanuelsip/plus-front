import { useState, useEffect } from 'react'
import { eventsService } from '../services/eventsService'
import type { Event } from '../types'

export const useEvents = () => {
  const [events, setEvents] = useState<Event[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setIsLoading(true)
        const data = await eventsService.getEvents()
        setEvents(data)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Error al cargar eventos'))
      } finally {
        setIsLoading(false)
      }
    }

    fetchEvents()
  }, [])

  return { events, isLoading, error, refetch: () => {
    const fetchEvents = async () => {
      try {
        setIsLoading(true)
        const data = await eventsService.getEvents()
        setEvents(data)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Error al cargar eventos'))
      } finally {
        setIsLoading(false)
      }
    }
    fetchEvents()
  } }
}

