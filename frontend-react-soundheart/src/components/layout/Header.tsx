import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { navItems, site } from '@/config/site'

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-stone bg-[rgba(247,244,237,0.9)] backdrop-blur-[10px]">
      <div className="mx-auto flex h-[72px] max-w-[1280px] items-center justify-between gap-6 px-7">
        <Link
          to="/"
          className="flex flex-shrink-0 items-center gap-[0.6em]"
          aria-label="SoundHeart home"
          onClick={() => setOpen(false)}
        >
          <img
            src="/brand-mark.jpg"
            alt="SoundHeart"
            width={44}
            height={44}
            className="h-11 w-auto rounded-[10px] shadow-[0_8px_20px_-10px_rgba(0,0,0,0.45)]"
          />
          <span className="font-serif text-[1.22rem] font-semibold tracking-[0.01em] text-navy">
            SoundHeart
          </span>
        </Link>

        {/* Desktop nav (>= 1120px, where all items fit comfortably on one line) */}
        <nav className="hidden items-center gap-6 min-[1120px]:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.key}
              to={item.to}
              className="whitespace-nowrap text-[0.92rem] font-medium text-ink transition-colors hover:text-gold"
            >
              {item.label}
            </NavLink>
          ))}
          <a
            href={site.simplePracticeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-1 inline-flex flex-shrink-0 items-center whitespace-nowrap rounded-btn bg-gold px-5 py-2.5 text-[0.9rem] font-bold text-navy transition-all hover:-translate-y-px hover:bg-gold-bright"
          >
            Book a consultation
          </a>
        </nav>

        {/* Mobile toggle (< 1120px) */}
        <button
          type="button"
          aria-label="Menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex-shrink-0 p-2 min-[1120px]:hidden"
        >
          <span className="my-[5px] block h-0.5 w-6 bg-navy transition" />
          <span className="my-[5px] block h-0.5 w-6 bg-navy transition" />
          <span className="my-[5px] block h-0.5 w-6 bg-navy transition" />
        </button>
      </div>

      {/* Mobile drawer */}
      <nav
        className={`absolute inset-x-0 top-[72px] flex flex-col border-b border-stone bg-ivory py-2 transition-transform duration-300 min-[1120px]:hidden ${
          open ? 'translate-y-0' : '-translate-y-[120%]'
        }`}
      >
        {navItems.map((item) => (
          <NavLink
            key={item.key}
            to={item.to}
            onClick={() => setOpen(false)}
            className="w-full border-b border-stone px-7 py-[14px] text-[0.94rem] font-medium text-ink hover:text-gold"
          >
            {item.label}
          </NavLink>
        ))}
        <a
          href={site.simplePracticeUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setOpen(false)}
          className="m-3 mx-7 inline-flex items-center justify-center rounded-btn bg-gold px-5 py-3 text-[0.95rem] font-bold text-navy"
        >
          Book a consultation
        </a>
      </nav>
    </header>
  )
}
