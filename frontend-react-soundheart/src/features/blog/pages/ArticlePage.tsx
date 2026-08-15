import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { site } from '@/config/site'
import { useArticle, useArticles } from '../hooks'

function setMeta(name: string, content: string) {
  let el = document.querySelector(`meta[name="${name}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute('name', name)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

/** Inject/replace the article's JSON-LD structured data in <head>. */
function setJsonLd(data: object | null) {
  let el = document.getElementById('article-schema')
  if (!data) {
    el?.remove()
    return
  }
  if (!el) {
    el = document.createElement('script')
    el.setAttribute('type', 'application/ld+json')
    el.id = 'article-schema'
    document.head.appendChild(el)
  }
  el.textContent = JSON.stringify(data)
}

const AUTHOR = {
  name: 'Nawal Ibrahim Alhawsawi, MA, MS, LPC, LMFT, NCC',
  bio: 'Founder and clinical director of SoundHeart Counseling. A Licensed Professional Counselor and Licensed Marriage and Family Therapist, a National Certified Counselor (NCC) through the NBCC, and an AAMFT Clinical Fellow, she brings more than twenty years of experience working with individuals, couples, and families, and created the NeuroRelational Belonging model.',
}

export default function ArticlePage() {
  const { slug } = useParams<{ slug: string }>()
  const { data: article, isLoading, isError } = useArticle(slug)
  const { data: related } = useArticles(
    article?.category ? { category: article.category.slug, per_page: 4 } : undefined,
  )

  useEffect(() => {
    if (!article) return
    document.title = `${article.title} | SoundHeart Counseling`
    if (article.meta_description) setMeta('description', article.meta_description)
    setJsonLd({
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: article.title,
      description: article.meta_description || article.excerpt || undefined,
      author: {
        '@type': 'Person',
        name: 'Nawal Ibrahim Alhawsawi',
        honorificSuffix: 'MA, MS, LPC, LMFT, NCC',
        jobTitle: 'Founder and Clinical Director',
      },
      publisher: { '@type': 'Organization', name: 'SoundHeart Counseling' },
      mainEntityOfPage: window.location.href,
    })
    return () => setJsonLd(null)
  }, [article])

  if (isLoading) {
    return <div className="mx-auto max-w-[760px] px-[26px] py-24 text-center text-[#59636f]">Loading…</div>
  }
  if (isError || !article) {
    return (
      <div className="mx-auto max-w-[760px] px-[26px] py-24 text-center">
        <h1 className="font-serif text-3xl text-navy">Article not found</h1>
        <Link to="/articles" className="mt-6 inline-block border-b-2 border-gold font-bold text-navy no-underline">
          ← Back to all articles
        </Link>
      </div>
    )
  }

  const relatedList = (related?.items ?? []).filter((r) => r.slug !== article.slug).slice(0, 3)

  return (
    <div className="mx-auto max-w-[760px] px-[26px]">
      <p className="mb-[6px] mt-[26px] text-[0.82rem] text-[#59636f]">
        <Link to="/" className="text-[#59636f] no-underline hover:text-gold">Home</Link> ·{' '}
        <Link to="/articles" className="text-[#59636f] no-underline hover:text-gold">Blog</Link>
        {article.category && (
          <>
            {' '}· <span className="text-[#59636f]">{article.category.name}</span>
          </>
        )}
      </p>

      <article className="pb-10 pt-2">
        <Link
          to="/articles"
          className="inline-block text-[0.68rem] font-extrabold uppercase tracking-[0.16em] text-gold no-underline"
        >
          {article.category?.name ?? 'Article'}
        </Link>

        <h1 className="my-[0.4rem] font-serif text-[clamp(1.9rem,4.4vw,2.8rem)] font-medium leading-[1.16] text-navy">
          {article.title}
        </h1>

        <p className="mb-[30px] text-[0.9rem] text-[#59636f]">
          By <b className="font-semibold text-navy">{article.author}</b> · SoundHeart Counseling
          {article.read_time ? ` · ${article.read_time}` : ''}
        </p>

        <div className="prose-article" dangerouslySetInnerHTML={{ __html: article.body ?? '' }} />

        <div className="my-6 rounded-[8px] border border-[#e9d3ad] bg-[#fff4e8] p-[16px_20px] text-[0.9rem] text-[#6b5636]">
          <strong className="text-[#5a4423]">If you are in crisis, please don&apos;t wait.</strong> Call
          or text 988 (Suicide &amp; Crisis Lifeline) or dial 911. SoundHeart is not a crisis or
          emergency service. This article is educational and is not a substitute for individual
          clinical care.
        </div>

        {article.faqs.length > 0 && (
          <section>
            <h2 className="mb-2 mt-8 font-serif text-[1.5rem] font-medium text-navy">Common questions</h2>
            {article.faqs.map((f, i) => (
              <div key={i}>
                <h3 className="mb-[0.25rem] mt-[1.3rem] font-serif text-[1.18rem] font-medium text-navy">
                  {f.q}
                </h3>
                <p className="m-0 mb-[1.05rem]">{f.a}</p>
              </div>
            ))}
          </section>
        )}

        {/* About the author */}
        <div className="mt-10 flex items-start gap-4 rounded-[16px] border border-stone bg-white p-6 max-[520px]:flex-col max-[520px]:items-center max-[520px]:text-center">
          <img
            src="/images/nawal-portrait.svg"
            alt="Nawal Ibrahim Alhawsawi"
            className="h-16 w-16 flex-none rounded-full border border-stone object-cover"
          />
          <div>
            <p className="m-0 text-[0.68rem] font-extrabold uppercase tracking-[0.14em] text-gold">About the author</p>
            <p className="m-0 mt-0.5 font-serif text-[1.15rem] font-medium text-navy">{AUTHOR.name}</p>
            <p className="mt-1.5 text-[0.92rem] leading-[1.6] text-[#55606b]">{AUTHOR.bio}</p>
            <Link to="/about" className="mt-2 inline-block border-b-2 border-gold text-[0.9rem] font-bold text-navy no-underline">
              Meet Nawal →
            </Link>
          </div>
        </div>

        <div
          className="my-10 rounded-[16px] p-[34px_30px] text-center text-ivory"
          style={{ background: 'linear-gradient(135deg,var(--navy),#2E5A44)' }}
        >
          <h2 className="my-[0.1rem_0_0.5rem] text-[1.5rem] !text-ivory">Ready to take the first step?</h2>
          <p className="mx-auto mb-[18px] max-w-[52ch] text-[#C9D3C8]">
            Whatever brought you here, you don&apos;t have to sort it out alone — in person in the
            Mat-Su Valley or by telehealth across Alaska.
          </p>
          <a
            href={site.simplePracticeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-[8px] bg-gold px-[1.6em] py-[0.8em] font-bold text-navy no-underline"
          >
            Book a consultation
          </a>
        </div>

        {relatedList.length > 0 && (
          <div className="mt-11">
            <h2 className="font-serif text-[1.3rem] font-medium text-navy">Related reading</h2>
            <div className="mt-4 grid grid-cols-3 gap-[18px] max-[820px]:grid-cols-1">
              {relatedList.map((r) => (
                <Link
                  key={r.id}
                  to={`/articles/${r.slug}`}
                  className="block rounded-[12px] border border-stone bg-white p-5 no-underline shadow-[0_12px_30px_-24px_rgba(31,61,46,0.5)] transition-transform hover:-translate-y-[3px]"
                >
                  <span className="text-[0.62rem] font-extrabold uppercase tracking-[0.14em] text-gold">
                    {r.category?.name}
                  </span>
                  <h4 className="mt-[0.35rem] font-serif text-[1.05rem] font-medium leading-[1.3] text-navy">
                    {r.title}
                  </h4>
                </Link>
              ))}
            </div>
          </div>
        )}

        <Link
          to="/articles"
          className="mt-[26px] inline-block border-b-2 border-gold font-bold text-navy no-underline"
        >
          ← Back to all SoundHeart articles
        </Link>
      </article>
    </div>
  )
}
