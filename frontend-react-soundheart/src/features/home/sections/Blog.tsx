import { Link } from 'react-router-dom'
import { useArticles } from '@/features/blog/hooks'
import type { ArticleCard } from '@/features/blog/types'

const cardImages = ['/images/blog-1.svg', '/images/blog-2.svg', '/images/blog-3.svg']

function PostMedia({ tag, img }: { tag: string; img: string }) {
  return (
    <div className="relative h-full">
      <img src={img} alt="" className="h-full w-full object-cover" />
      <span className="absolute left-3 top-3 rounded-full bg-[rgba(21,48,31,0.55)] px-[0.8em] py-[0.35em] text-[0.66rem] font-extrabold uppercase tracking-[0.1em] text-gold-bright">
        {tag}
      </span>
    </div>
  )
}

export default function Blog() {
  const { data } = useArticles({ per_page: 12 })
  const items = data?.items ?? []
  const featured: ArticleCard | undefined = items.find((a) => a.featured) ?? items[0]
  const recent = items.filter((a) => a.slug !== featured?.slug).slice(0, 3)

  return (
    <section className="py-24 max-[560px]:py-[68px]" id="blog">
      <div className="wrap">
        <div className="mb-11 flex flex-wrap items-end justify-between gap-4 max-[820px]:items-start">
          <div className="max-w-[620px]">
            <p className="eyebrow">Insights</p>
            <h2 className="text-[clamp(2rem,4vw,2.6rem)]">From the SoundHeart blog</h2>
            <p className="section-lead">
              Practical writing on relationships, co-parenting, trauma, and getting the help you
              need.
            </p>
          </div>
          <Link to="/articles" className="inline-flex items-center gap-2 whitespace-nowrap text-[0.9rem] font-bold text-gold no-underline">
            <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.8} className="h-[18px] w-[18px] stroke-gold">
              <circle cx="6" cy="18" r="1.6" />
              <path d="M5 11a8 8 0 0 1 8 8M5 5a14 14 0 0 1 14 14" />
            </svg>
            All articles
          </Link>
        </div>

        {featured && (
          <Link
            to={`/articles/${featured.slug}`}
            className="mb-[26px] grid grid-cols-[0.9fr_1.6fr] overflow-hidden rounded-[14px] border border-stone bg-white no-underline shadow-[0_18px_40px_-28px_rgba(31,61,46,0.5)] transition-transform hover:-translate-y-1 max-[820px]:grid-cols-1"
          >
            <div className="relative min-h-[220px] max-[820px]:min-h-[150px]">
              <img src="/images/blog-featured.svg" alt="" className="absolute inset-0 h-full w-full object-cover" />
              <span className="absolute left-4 top-4 rounded-full bg-[rgba(21,48,31,0.55)] px-[0.9em] py-[0.4em] text-[0.68rem] font-extrabold uppercase tracking-[0.1em] text-gold-bright">
                {featured.category?.name ?? 'Featured'}
              </span>
            </div>
            <div className="p-[34px]">
              <p className="eyebrow mb-[0.4rem]">Featured{featured.read_time ? ` · ${featured.read_time}` : ''}</p>
              <h3 className="my-[0.2rem_0_0.6rem] font-serif text-[1.5rem] leading-[1.25] text-navy">
                {featured.title}
              </h3>
              <p className="mb-4 text-[0.98rem] text-[#59636f]">{featured.excerpt}</p>
              <span className="inline-block border-b-2 border-gold pb-[2px] font-extrabold text-navy">
                Read the article →
              </span>
            </div>
          </Link>
        )}

        <div className="grid grid-cols-3 gap-6 max-[820px]:grid-cols-1">
          {recent.map((a, i) => (
            <article
              key={a.id}
              className="flex flex-col overflow-hidden rounded-[12px] border border-stone bg-white shadow-[0_12px_30px_-22px_rgba(31,61,46,0.45)] transition-transform hover:-translate-y-1"
            >
              <div className="h-[110px]">
                <PostMedia tag={a.category?.name ?? 'Article'} img={cardImages[i % cardImages.length]} />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="mb-2 text-[1.14rem] leading-[1.3]">{a.title}</h3>
                <p className="mb-4 text-[0.92rem] text-[#59636f]">{a.excerpt}</p>
                <Link to={`/articles/${a.slug}`} className="mt-auto inline-block border-b-2 border-gold pb-[2px] font-extrabold text-navy no-underline">
                  Read →
                </Link>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-[34px] text-center">
          <Link to="/articles" className="inline-block rounded-[999px] bg-navy px-[1.4em] py-[0.7em] font-bold text-ivory no-underline">
            View all articles →
          </Link>
        </p>

        <p className="mt-9 text-center text-[#59636f]">
          Prefer to listen? <strong>Wired to Belong</strong>, our NeuroRelational Belonging podcast,
          is on the way,{' '}
          <a href="#apple" className="font-bold text-gold no-underline">Apple Podcasts</a> ·{' '}
          <a href="#spotify" className="font-bold text-gold no-underline">Spotify</a> ·{' '}
          <a href="#rss" className="font-bold text-gold no-underline">RSS</a>
        </p>
      </div>
    </section>
  )
}
