import { useQuery } from '@tanstack/react-query'
import { apiGet } from '@/lib/api'
import type { PageData, PagePayload } from './types'

/**
 * Reads editable page content (hero / images / sections) from the CMS.
 * Components fall back to their in-code defaults while loading or if missing.
 */
export function usePage(key: string) {
  const { data } = useQuery({
    queryKey: ['page', key],
    queryFn: () => apiGet<PagePayload>(`/pages/${key}`),
    staleTime: 60_000,
    enabled: Boolean(key),
  })
  return data?.data as PageData | undefined
}

/** Look up an editable image URL by slot key. */
export function pageImage(data: PageData | undefined, key: string): string | null {
  return data?.images?.find((i) => i.key === key)?.url ?? null
}

/** Look up an editable section text by key (plain string). */
export function pageText(data: PageData | undefined, key: string, fallback: string): string {
  return data?.sections?.find((s) => s.key === key)?.text || fallback
}

/**
 * Rich section HTML by key, for rendering with `<div className="rich" dangerouslySetInnerHTML>`.
 * Returns the CMS value when present, otherwise the in-code fallback HTML.
 */
export function pageHtml(data: PageData | undefined, key: string, fallbackHtml: string): string {
  const found = data?.sections?.find((s) => s.key === key)?.text
  return found && found.trim() ? found : fallbackHtml
}

/** Editable CTA band content, falling back to in-code defaults. */
export function pageCta(
  data: PageData | undefined,
  fallback: { title: string; text: string; buttonLabel?: string },
) {
  return {
    title: data?.cta?.title || fallback.title,
    text: data?.cta?.text || fallback.text,
    buttonLabel: data?.cta?.buttonLabel || fallback.buttonLabel,
  }
}
