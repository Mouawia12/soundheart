export interface PageHeroData {
  eyebrow?: string
  title?: string
  lead?: string
}

export interface PageImage {
  key: string
  label: string
  url: string | null
}

export interface PageSection {
  key: string
  label: string
  text: string
  /** false = single-line plain input; otherwise a rich-text (HTML) block. */
  rich?: boolean
}

export interface PageCta {
  title?: string
  text?: string
  buttonLabel?: string
}

export interface PageData {
  hero?: PageHeroData
  images?: PageImage[]
  sections?: PageSection[]
  cta?: PageCta
}

export interface PagePayload {
  key: string
  name: string
  data: PageData
}

export interface PageListItem {
  id: number
  key: string
  name: string
}
