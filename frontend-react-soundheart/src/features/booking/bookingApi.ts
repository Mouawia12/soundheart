import { apiGet, apiPost, apiPut, apiGetPaginated } from '@/lib/api'

export interface BookingConfig {
  timezone: string
  sessionMinutes: number
  price: number
  currency: string
  allowOnline: boolean
  allowInPerson: boolean
  leadTimeHours: number
  maxAdvanceDays: number
  openDays: string[]
}

export interface Slot {
  time: string
  startsAt: string
  available: boolean
}

export interface CreateBookingInput {
  name: string
  email: string
  guests: string[]
  startsAt: string
  type: 'online' | 'in_person'
  website?: string
}

export interface Window {
  start: string
  end: string
}

export interface BookingSettings {
  timezone?: string
  sessionMinutes?: number
  bufferMinutes?: number
  leadTimeHours?: number
  maxAdvanceDays?: number
  price?: number
  currency?: string
  allowOnline?: boolean
  allowInPerson?: boolean
  hours?: Record<string, Window[]>
}

export interface Booking {
  id: number
  name: string
  email: string
  guests: string[] | null
  starts_at: string
  ends_at: string
  timezone: string
  type: 'online' | 'in_person'
  status: string
  payment_status: string
  meet_url?: string | null
}

export const bookingApi = {
  config: () => apiGet<BookingConfig>('/booking/config'),
  slots: (date: string) => apiGet<{ date: string; slots: Slot[] }>('/booking/slots', { date }),
  create: (input: CreateBookingInput) =>
    apiPost<{
      id: number
      requiresPayment?: boolean
      checkoutUrl?: string
      startsAt?: string
      endsAt?: string
      type?: string
      meetUrl?: string | null
    }>('/booking', input),

  // Admin
  settings: () => apiGet<BookingSettings>('/admin/booking/settings'),
  updateSettings: (data: BookingSettings) => apiPut<BookingSettings>('/admin/booking/settings', { data }),
  bookings: (params?: { status?: string; from?: string; page?: number }) =>
    apiGetPaginated<Booking>('/admin/bookings', params),
  cancel: (id: number) => apiPut<null>(`/admin/bookings/${id}/cancel`),
}
