export interface Event {
  id: string | number
  title: string
  description?: string
  date: string
  time: string
  location: string
  image: string
  status: 'upcoming' | 'ongoing' | 'completed'
  created_at?: string
  updated_at?: string
}

export interface EventDetail extends Event {
  full_description?: string
  start_time: string
  end_time: string
  venue: string
  capacity?: number
  confirmed_count?: number
  payment_status?: 'pending' | 'partial' | 'completed'
}

