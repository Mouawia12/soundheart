import { useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useArticles, useCategories } from '../hooks'
import type { ArticleCard } from '../types'

function PostCard({ a }: { a: ArticleCard }) {
  return (
    <Link
      to={`/articles/${a.slug}`}
      className="flex flex-col overflow-hidden rounded-[12px] border border-stone bg-white no-underline shadow-[0_12px_30px_-24px_rgba(31,61,46,0.5)] transition-transform hover:-translate-y-1"
    >
      <div className="relative h-[76px]" style={{ background: 'linear-gradient(135deg,var(--navy),#2E5A44)' }}>
        <span className="absolute left-[11px] top-2 text-[0.58rem] font-extrabold tracking-[0.14em] text-[rgba(250,246,238,0.5)]">
          PHOTO
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="m-0 mb-[0.4rem] font-serif text-[1.1rem] font-medium leading-[1.3] text-navy">
          {a.title}
        </h3>
        <p className="m-0 mb-3 text-[0.9rem] text-[#59636f]">{a.excerpt}</p>
        <span className="mt-auto text-[0.85rem] font-extrabold text-gold">Read →</span>
      </div>
    </Link>
  )
}

export default function BlogIndexPage() {
  const { data: categories } = useCategories()
  const { data: articles, isLoading } = useArticles({ per_page: 200 })

  useEffect(() => {
    document.title = 'The SoundHeart Blog | Relationships, Trauma & Family'
  }, [])

  const grouped = useMemo(() => {
    const map = new Map<string, ArticleCard[]>()
    for (const a of articles?.items ?? []) {
      const slug = a.category?.slug ?? 'uncategorized'
      if (!map.has(slug)) map.set(slug, [])
      map.get(slug)!.push(a)
    }
    return map
  }, [articles])

  const orderedCats = (categories ?? []).filter((c) => (grouped.get(c.slug)?.length ?? 0) > 0)

  return (
    <div className="mx-auto max-w-[1120px] px-[26px]">
      <div className="pb-2 pt-[52px]">
        <span className="inline-block text-[0.68rem] font-extrabold uppercase tracking-[0.16em] text-gold">
          Insights
        </span>
        <h1 className="mt-[0.4rem] font-serif text-[clamp(1.9rem,4.4vw,2.8rem)] font-medium leading-[1.16] text-navy">
          The SoundHeart Blog
        </h1>
        <p className="max-w-[60ch] text-[1.12rem] text-[#59636f]">
          Practical, trauma-informed writing on relationships, co-parenting, family healing, and
          getting the right help — grounded in our NeuroRelational Belonging approach.
        </p>
      </div>

      {isLoading && <p className="py-16 text-center text-[#59636f]">Loading articles…</p>}

      {orderedCats.map((cat) => (
        <section key={cat.slug} className="mt-10">
          <h2 className="border-b border-stone pb-[10px] font-serif text-[1.6rem] font-medium text-navy">
            {cat.name}
          </h2>
          <div className="mt-[22px] grid grid-cols-3 gap-5 max-[820px]:grid-cols-1">
            {grouped.get(cat.slug)!.map((a) => (
              <PostCard key={a.id} a={a} />
            ))}
          </div>
        </section>
      ))}

      <div className="h-16" />
    </div>
  )
}
