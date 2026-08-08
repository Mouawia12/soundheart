/**
 * Static site config (defaults). Values the owner can change — phone, links —
 * will later be overridden by the CMS `settings` endpoint. Kept here so the
 * public site renders correctly before the API is wired.
 */
export const site = {
  name: 'SoundHeart',
  legalName: 'SoundHeart Counseling',
  phoneDisplay: '907-310-1404',
  phoneHref: 'tel:19073101404',
  whatsappNumber: '19073101404',
  whatsappHref: 'https://wa.me/19073101404',
  simplePracticeUrl: 'https://soundheart.clientsecure.me',
  location: 'Mat-Su Valley, Alaska',
  crisisNote: 'If you are in crisis, call or text 988, or dial 911 for an emergency.',
  signature: 'A sound heart is not one that never breaks. It is one that learns to mend.',
} as const

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
