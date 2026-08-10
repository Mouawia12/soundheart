import { Link, Outlet } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { site } from '@/config/site'
import { BrandMark } from '@/components/layout/Header'
import LangToggle from '@/components/LangToggle'
import { FooterBlog } from '@/components/layout/footers'
import FloatingContact from '@/components/layout/FloatingContact'

/**
 * Guide / blog / service pages (The Model, pillars, articles, local service
 * pages) use the design's lighter guide header — Services · Articles ·
 * Book a session — with the shared heartbeat logo and the blog footer.
 */
export default function BlogLayout() {
  const { t } = useTranslation()
  return (
    <div className="min-h-screen bg-ivory text-[18px] leading-[1.75] text-ink">
      <header className="sticky top-0 z-20 border-b border-stone bg-ivory">
        <div className="mx-auto flex max-w-[1120px] items-center justify-between px-[26px] py-4">
          <Link to="/" className="flex items-center gap-[0.55em] no-underline">
            <BrandMark />
            <b className="font-serif text-[1.25rem] font-semibold text-navy">SoundHeart</b>
          </Link>
          <div className="flex items-center gap-5 max-[520px]:gap-3">
            <Link to="/therapy" className="text-[0.9rem] font-bold text-navy no-underline transition-colors hover:text-gold max-[520px]:hidden">
              {t('guideNav.services')}
            </Link>
            <Link to="/articles" className="text-[0.9rem] font-bold text-navy no-underline transition-colors hover:text-gold max-[520px]:hidden">
              {t('guideNav.articles')}
            </Link>
            <a
              href={site.simplePracticeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-[8px] bg-gold px-[1.2em] py-[0.55em] text-[0.9rem] font-bold text-navy no-underline transition-colors hover:bg-gold-bright"
            >
              {t('guideNav.book')}
            </a>
            <LangToggle className="text-navy" />
          </div>
        </div>
      </header>

      <main>
        <Outlet />
      </main>

      <FooterBlog />
      <FloatingContact />
    </div>
  )
}
