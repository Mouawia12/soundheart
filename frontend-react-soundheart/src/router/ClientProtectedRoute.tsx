import { Navigate } from 'react-router-dom'
import type { ReactNode } from 'react'
import { useClientAuth } from '@/store/clientAuth'

export default function ClientProtectedRoute({ children }: { children: ReactNode }) {
  const authed = useClientAuth((s) => s.isAuthenticated())
  return authed ? <>{children}</> : <Navigate to="/portal/login" replace />
}
