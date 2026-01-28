export interface ReservaEvento {
  id: string
  nombre: string
  fecha_evento: string
  hora: string
  ubicacion: string
  imagen_portada: string | null
}

export interface ReservaEventoDetalle {
  id: string
  estado: string
  cantidad_mujeres: number
  cantidad_hombres: number
  total_invitados: number
  link_unico: string
  url_compartir: string
  invitados_total: number
  invitados_confirmados: number
  invitados_pagados: number
  monto_recaudado: number
  created_at: string
  updated_at: string
  evento: ReservaEvento & {
    estado: string
  }
}

