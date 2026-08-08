import { Routes, Route } from 'react-router-dom'
import PublicLayout from '@/layouts/PublicLayout'
import HomePage from '@/features/home/HomePage'
import PlaceholderPage from '@/components/PlaceholderPage'
import ProtectedRoute from '@/router/ProtectedRoute'

export default function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<PlaceholderPage title="About" />} />
        <Route path="the-model" element={<PlaceholderPage title="The Model" />} />
        <Route path="therapy" element={<PlaceholderPage title="Therapy" />} />
        <Route path="retreats" element={<PlaceholderPage title="Retreats" />} />
        <Route path="training" element={<PlaceholderPage title="Training" />} />
        <Route path="resources" element={<PlaceholderPage title="Resources" />} />
        <Route path="shop" element={<PlaceholderPage title="Shop" />} />
        <Route path="contact" element={<PlaceholderPage title="Contact" />} />
        <Route path="faq" element={<PlaceholderPage title="FAQ" />} />
        <Route path="privacy" element={<PlaceholderPage title="Privacy" />} />
        <Route path="terms" element={<PlaceholderPage title="Terms" />} />
        <Route path="login" element={<PlaceholderPage title="Sign in" />} />
        <Route path="*" element={<PlaceholderPage title="Page not found" />} />
      </Route>

      {/* Admin (protected) — built out in the admin task */}
      <Route
        path="/admin/*"
        element={
          <ProtectedRoute>
            <PlaceholderPage title="Admin" />
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}
