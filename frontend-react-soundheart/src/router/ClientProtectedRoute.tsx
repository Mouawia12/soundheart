import { Navigate } from 'react-router-dom'
import type { ReactNode } from 'react'
import { useClientAuth } from '@/store/clientAuth'

/** Client-only guard for the portal. */
export default function ClientProtectedRoute({ children }: { children: ReactNode }) {
  const token = useClientAuth((s) => s.token)
  const role = useClientAuth((s) => s.user?.role)
  if (!token) return <Navigate to="/login" replace />
  if (role === 'admin') return <Navigate to="/admin" replace />
  return <>{children}</>
}
