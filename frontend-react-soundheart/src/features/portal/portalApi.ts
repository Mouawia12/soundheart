import axios from 'axios'
import type { ApiEnvelope } from '@/types/api'
import { useClientAuth, type ClientUser } from '@/store/clientAuth'
import type { Booking } from '@/features/booking/bookingApi'

/** Separate axios instance so the client token never mixes with the admin one. */
const clientApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? '/api/v1',
  headers: { Accept: 'application/json' },
})

clientApi.interceptors.request.use((config) => {
  const token = useClientAuth.getState().token
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

async function unwrap<T>(p: Promise<{ data: ApiEnvelope<T> }>): Promise<T> {
  const { data } = await p
  return data.data
}

export interface AuthResult {
  token: string
  user: ClientUser
}

export interface Message {
  id: number
  from_admin: boolean
  body: string
  created_at: string
}

export const portalApi = {
  register: (name: string, email: string, password: string, password_confirmation: string) =>
    unwrap<AuthResult>(clientApi.post('/auth/register', { name, email, password, password_confirmation })),
  login: (email: string, password: string) =>
    unwrap<AuthResult>(clientApi.post('/auth/login', { email, password })),
  google: (credential: string) => unwrap<AuthResult>(clientApi.post('/auth/google', { credential })),
  me: () => unwrap<ClientUser>(clientApi.get('/auth/me')),
  myBookings: () => unwrap<Booking[]>(clientApi.get('/auth/my-bookings')),
  logout: () => clientApi.post('/auth/logout').catch(() => {}),

  messages: () => unwrap<Message[]>(clientApi.get('/portal/messages')),
  sendMessage: (body: string) => unwrap<Message>(clientApi.post('/portal/messages', { body })),
  unread: () => unwrap<{ unread: number }>(clientApi.get('/portal/unread')),
}

export const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID as string | undefined
