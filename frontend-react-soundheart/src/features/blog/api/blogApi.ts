import { apiGet, apiGetPaginated } from '@/lib/api'
import type { Article, ArticleCard, Category } from '../types'

export interface ArticleQuery {
  category?: string
  search?: string
  per_page?: number
  page?: number
}

export const blogApi = {
  categories: () => apiGet<Category[]>('/categories'),
  articles: (params?: ArticleQuery) => apiGetPaginated<ArticleCard>('/articles', params),
  article: (slug: string) => apiGet<Article>(`/articles/${slug}`),
}
