import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { navItems, site } from '@/config/site'
import LangToggle from '@/components/LangToggle'

/** The heartbeat brand mark from the design (gold stroke). */
export function BrandMark() {
  return (
    <svg viewBox="0 0 120 40" width="42" height="21" aria-hidden="true" className="flex-none">
      <path
        d="M2 20 H30 L36 8 L46 32 L54 14 L60 26 L66 20 H118"
        fill="none"
        stroke="#B8964F"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

const bookOutline =
  'rounded-[8px] border-[1.5px] border-gold px-[0.9em] py-[0.5em] text-[0.9rem] font-extrabold text-navy no-underline transition-colors hover:bg-[rgba(184,150,79,0.1)]'

export default function Header() {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-30 border-b border-stone bg-ivory">
      <div className="mx-auto flex max-w-[1180px] items-center justify-between gap-4 px-[26px] py-[14px]">
        <Link
          to="/"
          className="flex flex-none items-center gap-[0.55em] no-underline"
          aria-label="SoundHeart home"
          onClick={() => setOpen(false)}
        >
          <BrandMark />
          <b className="font-serif text-[1.25rem] font-semibold text-navy">SoundHeart</b>
        </Link>

        {/* Desktop nav — all links fit on one line */}
        <nav className="hidden flex-wrap items-center justify-end gap-[17px] min-[1120px]:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.key}
              to={item.to}
              className="whitespace-nowrap text-[0.9rem] font-medium text-ink transition-colors hover:text-gold"
            >
              {t(`nav.${item.key}`)}
            </NavLink>
          ))}
          <a href={site.simplePracticeUrl} target="_blank" rel="noopener noreferrer" className={bookOutline}>
            {t('nav.book')}
          </a>
          <LangToggle className="text-navy" />
        </nav>

        {/* Mobile: keep the book button + a menu toggle */}
        <div className="flex items-center gap-3 min-[1120px]:hidden">
          <a href={site.simplePracticeUrl} target="_blank" rel="noopener noreferrer" className={`${bookOutline} max-[420px]:hidden`}>
            {t('nav.book')}
          </a>
          <button
            type="button"
            aria-label={t('common.menu')}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex-none p-2"
          >
            <span className="my-[5px] block h-0.5 w-6 bg-navy transition" />
            <span className="my-[5px] block h-0.5 w-6 bg-navy transition" />
            <span className="my-[5px] block h-0.5 w-6 bg-navy transition" />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <nav
        className={`absolute inset-x-0 top-full flex flex-col border-b border-stone bg-ivory py-2 transition-transform duration-300 min-[1120px]:hidden ${
          open ? 'translate-y-0' : '-translate-y-[130%]'
        }`}
      >
        {navItems.map((item) => (
          <NavLink
            key={item.key}
            to={item.to}
            onClick={() => setOpen(false)}
            className="w-full border-b border-stone px-[26px] py-[14px] text-[0.94rem] font-medium text-ink hover:text-gold"
          >
            {t(`nav.${item.key}`)}
          </NavLink>
        ))}
        <div className="flex items-center justify-between gap-3 px-[26px] py-3">
          <a
            href={site.simplePracticeUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="inline-flex items-center justify-center rounded-[8px] border-[1.5px] border-gold px-5 py-3 text-[0.95rem] font-extrabold text-navy"
          >
            {t('nav.book')}
          </a>
          <LangToggle className="text-navy" />
        </div>
      </nav>
    </header>
  )
}
