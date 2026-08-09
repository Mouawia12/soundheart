import { useQuery } from '@tanstack/react-query'
import { blogApi, type ArticleQuery } from './api/blogApi'

export const useCategories = () =>
  useQuery({ queryKey: ['categories'], queryFn: blogApi.categories })

export const useArticles = (params?: ArticleQuery) =>
  useQuery({ queryKey: ['articles', params], queryFn: () => blogApi.articles(params) })

export const useArticle = (slug: string | undefined) =>
  useQuery({
    queryKey: ['article', slug],
    queryFn: () => blogApi.article(slug as string),
    enabled: Boolean(slug),
  })
