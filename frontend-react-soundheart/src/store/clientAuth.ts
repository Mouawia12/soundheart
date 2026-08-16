import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface ClientUser {
  id: number
  name: string
  email: string
  role: string
  phone?: string | null
  avatar?: string | null
}

interface ClientAuthState {
  token: string | null
  user: ClientUser | null
  setAuth: (token: string, user: ClientUser) => void
  logout: () => void
  isAuthenticated: () => boolean
}

/** Client-portal auth — separate token/store from the admin dashboard. */
export const useClientAuth = create<ClientAuthState>()(
  persist(
    (set, get) => ({
      token: null,
      user: null,
      setAuth: (token, user) => set({ token, user }),
      logout: () => set({ token: null, user: null }),
      isAuthenticated: () => Boolean(get().token),
    }),
    { name: 'soundheart_client' },
  ),
)
