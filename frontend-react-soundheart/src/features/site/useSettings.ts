import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { apiGet } from '@/lib/api'
import { site } from '@/config/site'

/** Shape of the CMS `/settings` payload (all optional — defaults fill the gaps). */
export interface SiteSettings {
  brandName?: string
  legalName?: string
  phoneDisplay?: string
  phoneNumber?: string
  email?: string
  whatsappNumber?: string
  bookingUrl?: string
  clientPortalUrl?: string
  address?: string
  hours?: string
  crisisNote?: string
  signature?: string
  social?: { facebook?: string; instagram?: string; linkedin?: string; youtube?: string }
}

const digits = (v: string) => v.replace(/[^\d+]/g, '')

/** Hydrate the shared `site` config in place from CMS settings, computing hrefs. */
export function applySettings(s: SiteSettings | undefined) {
  if (!s) return
  if (s.brandName) site.name = s.brandName
  if (s.legalName) site.legalName = s.legalName
  if (s.phoneDisplay) site.phoneDisplay = s.phoneDisplay
  if (s.phoneNumber) site.phoneHref = `tel:${digits(s.phoneNumber)}`
  if (s.email) {
    site.email = s.email
    site.emailHref = `mailto:${s.email}`
  }
  if (s.whatsappNumber) {
    site.whatsappNumber = s.whatsappNumber
    site.whatsappHref = `https://wa.me/${digits(s.whatsappNumber).replace('+', '')}`
  }
  if (s.bookingUrl) site.simplePracticeUrl = s.bookingUrl
  if (s.clientPortalUrl !== undefined) site.clientPortalUrl = s.clientPortalUrl
  if (s.address) site.location = s.address
  if (s.hours) site.hours = s.hours
  if (s.crisisNote) site.crisisNote = s.crisisNote
  if (s.signature) site.signature = s.signature
  if (s.social) site.social = { ...site.social, ...s.social }
}

/** Fetch site settings and hydrate `site`. Call once high in the tree (App). */
export function useSiteSettings() {
  const { data } = useQuery({
    queryKey: ['settings'],
    queryFn: () => apiGet<SiteSettings>('/settings'),
    staleTime: 5 * 60_000,
  })
  // Apply during render so descendants read the hydrated values in the same pass.
  useMemo(() => applySettings(data), [data])
  return data
}
