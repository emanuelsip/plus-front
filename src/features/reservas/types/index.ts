export interface ReservaEvento {
  id: string
  evento_id: string
  rol: 'lider' | 'invitado' | string
  invitacion_id: string | null
  nombre: string
  fecha_evento: string
  hora: string | null
  ubicacion: string
  imagen_portada: string | null
}

export interface ReservaDetalleReserva {
  id: string
  cantidad_mujeres: number
  cantidad_hombres: number
  total_invitados: number
  link_unico: string
  url_compartir: string
  estado: string
  created_at: string
}

export interface ReservaDetalleEvento {
  id: string
  nombre: string
  descripcion: string
  fecha_evento: string
  fecha_limite_confirmacion: string
  fecha_limite_pago: string
  ubicacion: string
  precio_cover_hombre: number
  precio_cover_mujer: number
  imagen_portada: string | null
  video_url: string | null
  estado: string
  hora?: string
}

export interface ReservaDetalleLider {
  id: string
  nombre_completo: string
  telefono: string
  sexo: string
}

export interface ReservaDetalleEstadisticas {
  total_invitados: number
  total_confirmados: number
  total_no_confirmados: number
  total_pagados: number
  total_pendientes_pago: number
  porcentaje_confirmados: number
  porcentaje_pagados: number
}

export interface ReservaDetalleMontos {
  monto_por_hombre: number
  monto_por_mujer: number
  monto_esperado_hombres: number
  monto_esperado_mujeres: number
  monto_total_esperado: number
  monto_total_recaudado: number
  monto_pendiente: number
}

export interface ReservaDetalleInvitadosResumen {
  total_hombres: number
  total_mujeres: number
}

export interface ReservaDetalle {
  reserva: ReservaDetalleReserva
  evento: ReservaDetalleEvento
  lider: ReservaDetalleLider
  estadisticas: ReservaDetalleEstadisticas
  montos: ReservaDetalleMontos
  invitados_resumen: ReservaDetalleInvitadosResumen
}

export interface ReservaInvitadoUsuario {
  id: string
  nombres: string
  apellidos: string
  nombre_completo: string
  telefono: string
  sexo: string
}

export interface ReservaInvitado {
  id: string
  usuario: ReservaInvitadoUsuario
  confirmado: boolean
  pagado: boolean
  monto_pagado: number
  monto_a_pagar: number
  created_at: string
}

