export interface SiteConfig {
  name: string
  legalName: string
  phoneDisplay: string
  phoneHref: string
  email: string
  emailHref: string
  whatsappNumber: string
  whatsappHref: string
  simplePracticeUrl: string
  location: string
  hours: string
  crisisNote: string
  signature: string
  social: { facebook: string; instagram: string; linkedin: string; youtube: string }
}

/**
 * Site config defaults. These are the fallbacks shown before the CMS `/settings`
 * endpoint loads; `SiteSettingsGate` (see features/site/useSettings) hydrates this
 * same object at runtime so every `site.*` reader picks up the owner's values.
 * Mutable on purpose — do not add `as const`.
 */
export const site: SiteConfig = {
  name: 'SoundHeart',
  legalName: 'SoundHeart Counseling',
  phoneDisplay: '907-310-1404',
  phoneHref: 'tel:19073101404',
  email: 'hello@soundheart.org',
  emailHref: 'mailto:hello@soundheart.org',
  whatsappNumber: '19073101404',
  whatsappHref: 'https://wa.me/19073101404',
  simplePracticeUrl: 'https://soundheart.clientsecure.me',
  location: 'Mat-Su Valley, Alaska',
  hours: 'By appointment, Monday to Friday',
  crisisNote: 'If you are in crisis, call or text 988, or dial 911 for an emergency.',
  signature: 'A sound heart is not one that never breaks. It is one that learns to mend.',
  social: { facebook: '', instagram: '', linkedin: '', youtube: '' },
}

export interface NavItem {
  key: string
  label: string
  to: string
}

/** Primary navigation — routes are placeholders until each page is built. */
export const navItems: NavItem[] = [
  { key: 'about', label: 'About', to: '/about' },
  { key: 'model', label: 'The Model', to: '/the-model' },
  { key: 'therapy', label: 'Therapy', to: '/therapy' },
  { key: 'retreats', label: 'Retreats', to: '/retreats' },
  { key: 'training', label: 'Training', to: '/training' },
  { key: 'resources', label: 'Resources', to: '/resources' },
  { key: 'shop', label: 'Shop', to: '/shop' },
  { key: 'contact', label: 'Contact', to: '/contact' },
]

export const footerNav: NavItem[] = [
  { key: 'about', label: 'About', to: '/about' },
  { key: 'model', label: 'The Model', to: '/the-model' },
  { key: 'therapy', label: 'Therapy', to: '/therapy' },
  { key: 'retreats', label: 'Retreats', to: '/retreats' },
  { key: 'training', label: 'Training', to: '/training' },
  { key: 'resources', label: 'Resources', to: '/resources' },
  { key: 'faq', label: 'FAQ', to: '/faq' },
  { key: 'contact', label: 'Contact', to: '/contact' },
  { key: 'privacy', label: 'Privacy', to: '/privacy' },
  { key: 'terms', label: 'Terms', to: '/terms' },
]
