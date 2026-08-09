export interface Category {
  id: number
  name: string
  slug: string
  description: string | null
  sort_order: number
  articles_count?: number
}

export interface ArticleCard {
  id: number
  title: string
  slug: string
  excerpt: string | null
  read_time: string | null
  featured: boolean
  published_at: string | null
  status?: string
  updated_at?: string
  category?: { name: string; slug: string }
}

export interface Faq {
  q: string
  a: string
}

export interface Article extends ArticleCard {
  body: string | null
  meta_description: string | null
  focus_keywords: string | null
  author: string | null
  faqs: Faq[]
  category?: { id: number; name: string; slug: string }
}
