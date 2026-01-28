import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HomePage } from '@/features/events/pages/HomePage'
import { EventDetailPage } from '@/features/events/pages/EventDetailPage'
import { EventsPage } from '@/features/events/pages/EventsPage'
import { RequireAuth, SignInPage, SignUpPage } from '@/features/auth'
import { ReservasPage } from '@/features/reservas'
import { InvitadoConfirmacionPage, InvitadoConfirmarPage, InvitadoPagoPage } from '@/features/invitados'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/events/:id" element={<EventDetailPage />} />
        <Route
          path="/reservas/mias"
          element={(
            <RequireAuth>
              <ReservasPage />
            </RequireAuth>
          )}
        />
        <Route path="/invitado/confirmar" element={<InvitadoConfirmarPage />} />
        <Route path="/invitado/confirmacion" element={<InvitadoConfirmacionPage />} />
        <Route path="/invitado/pago" element={<InvitadoPagoPage />} />
        <Route path="/auth/sign-in" element={<SignInPage />} />
        <Route path="/auth/sign-up" element={<SignUpPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

