import { apiDelete, apiGet, apiGetPaginated, apiPost, apiPut, api } from '@/lib/api'
import type { AuthUser } from '@/store/auth'
import type { Article, ArticleCard, Category } from '@/features/blog/types'
import type { PageData, PagePayload } from '@/features/site/types'
import type { SiteSettings } from '@/features/site/useSettings'

export interface DashboardStats {
  articles: number
  published: number
  drafts: number
  categories: number
  recent: ArticleCard[]
}

export interface ArticleInput {
  title: string
  slug?: string
  category_id?: number | null
  excerpt?: string | null
  body?: string | null
  meta_description?: string | null
  focus_keywords?: string | null
  read_time?: string | null
  author?: string | null
  faqs?: { q: string; a: string }[]
  status?: string
  featured?: boolean
}

export const adminApi = {
  login: (email: string, password: string) =>
    apiPost<{ token: string; user: AuthUser }>('/auth/login', { email, password }),
  me: () => apiGet<AuthUser>('/auth/me'),
  logout: () => apiPost<null>('/auth/logout'),
  updatePassword: (current_password: string, password: string, password_confirmation: string) =>
    apiPut<null>('/auth/password', { current_password, password, password_confirmation }),

  stats: () => apiGet<DashboardStats>('/admin/stats'),

  articles: (params?: { search?: string; status?: string; category?: string; page?: number; per_page?: number }) =>
    apiGetPaginated<ArticleCard>('/admin/articles', params),
  article: (slug: string) => apiGet<Article>(`/admin/articles/${slug}`),
  createArticle: (data: ArticleInput) => apiPost<Article>('/admin/articles', data),
  updateArticle: (slug: string, data: ArticleInput) => apiPut<Article>(`/admin/articles/${slug}`, data),
  deleteArticle: (slug: string) => apiDelete<null>(`/admin/articles/${slug}`),

  categories: () => apiGet<Category[]>('/admin/categories'),
  createCategory: (data: Partial<Category>) => apiPost<Category>('/admin/categories', data),
  updateCategory: (id: number, data: Partial<Category>) => apiPut<Category>(`/admin/categories/${id}`, data),
  deleteCategory: (id: number) => apiDelete<null>(`/admin/categories/${id}`),

  pages: () => apiGet<{ id: number; key: string; name: string }[]>('/admin/pages'),
  page: (key: string) => apiGet<PagePayload>(`/admin/pages/${key}`),
  updatePage: (key: string, data: PageData) => apiPut<PagePayload>(`/admin/pages/${key}`, { data }),

  settings: () => apiGet<SiteSettings>('/admin/settings'),
  updateSettings: (data: SiteSettings) => apiPut<SiteSettings>('/admin/settings', { data }),

  uploadMedia: async (file: File): Promise<{ url: string; path: string }> => {
    const form = new FormData()
    form.append('file', file)
    const { data } = await api.post('/admin/media', form)
    return data.data
  },
}
