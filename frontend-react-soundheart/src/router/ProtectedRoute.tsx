import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuthStore } from '@/store/auth'

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const isAuthed = useAuthStore((s) => Boolean(s.token))

  if (!isAuthed) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}
