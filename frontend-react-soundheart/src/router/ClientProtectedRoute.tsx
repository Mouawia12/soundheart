import { Navigate } from 'react-router-dom'
import type { ReactNode } from 'react'
import { useClientAuth } from '@/store/clientAuth'

/** Client-only guard for the portal. */
export default function ClientProtectedRoute({ children }: { children: ReactNode }) {
  const token = useClientAuth((s) => s.token)
  return token ? <>{children}</> : <Navigate to="/portal/login" replace />
}
