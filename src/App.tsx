import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HomePage } from '@/features/events/pages/HomePage'
import { EventDetailPage } from '@/features/events/pages/EventDetailPage'
import { EventsPage } from '@/features/events/pages/EventsPage'
import { SignInPage, SignUpPage } from '@/features/auth'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/events/:id" element={<EventDetailPage />} />
        <Route path="/auth/sign-in" element={<SignInPage />} />
        <Route path="/auth/sign-up" element={<SignUpPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

