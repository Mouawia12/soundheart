import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuthStore } from '@/store/auth'

/** Admin-only guard. Non-admins are sent to the client portal, guests to login. */
export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const token = useAuthStore((s) => s.token)
  const role = useAuthStore((s) => s.user?.role)

  if (!token) {
    return <Navigate to="/login" replace />
  }
  if (role && role !== 'admin') {
    return <Navigate to="/portal" replace />
  }

  return <>{children}</>
}
