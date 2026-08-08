import { Link } from 'react-router-dom'
import { footerNav, site } from '@/config/site'

const socials = [
  { key: 'ig', label: 'Instagram', href: '#', icon: (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.7}><rect x="4" y="4" width="16" height="16" rx="5" /><circle cx="12" cy="12" r="3.5" /><circle cx="17" cy="7" r="1" /></svg>
  ) },
  { key: 'x', label: 'X (Twitter)', href: '#', icon: (
    <svg viewBox="0 0 24 24" fill="none"><path d="M4 4l16 16M20 4L4 20" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" /></svg>
  ) },
  { key: 'fb', label: 'Facebook', href: '#', icon: (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.7}><path d="M14 8h2V5h-2a3 3 0 0 0-3 3v2H9v3h2v6h3v-6h2l1-3h-3V8a1 1 0 0 1 1-1z" /></svg>
  ) },
  { key: 'yt', label: 'YouTube', href: '#', icon: (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.7}><rect x="3" y="6" width="18" height="12" rx="4" /><path d="M10 9l5 3-5 3z" /></svg>
  ) },
  { key: 'li', label: 'LinkedIn', href: '#', icon: (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.7}><rect x="4" y="4" width="16" height="16" rx="2" /><path d="M8 10v6M8 7v.01M12 16v-3a2 2 0 0 1 4 0v3" /></svg>
  ) },
  { key: 'podcast', label: 'Podcast', href: '#', icon: (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.7}><rect x="9" y="3" width="6" height="11" rx="3" /><path d="M6 11a6 6 0 0 0 12 0M12 17v4M9 21h6" /></svg>
  ) },
  { key: 'rss', label: 'RSS', href: '#', icon: (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.7}><circle cx="6" cy="18" r="1.6" /><path d="M5 11a8 8 0 0 1 8 8M5 5a14 14 0 0 1 14 14" /></svg>
  ) },
]

export default function Footer() {
  return (
    <footer className="bg-navy-deep pb-10 pt-[70px] text-center text-[#AAB9AC]">
      <div className="wrap">
        <img
          src="/footer-logo.jpg"
          alt="SoundHeart Counseling"
          className="mx-auto mb-[26px] block max-w-[230px] rounded-[12px] border border-[rgba(201,169,97,0.28)] shadow-[0_12px_30px_-18px_rgba(0,0,0,0.5)]"
        />

        <div className="mx-auto mb-[26px] flex flex-wrap justify-center gap-3">
          {socials.map((s) => (
            <a
              key={s.key}
              href={s.href}
              aria-label={s.label}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(201,169,97,0.4)] text-gold-bright transition-colors hover:bg-gold [&_svg]:h-[18px] [&_svg]:w-[18px] [&_svg]:stroke-gold-bright hover:[&_svg]:stroke-navy"
            >
              {s.icon}
            </a>
          ))}
        </div>

        <div className="mx-auto mb-[30px] max-w-[340px]">
          <svg viewBox="0 0 340 36" preserveAspectRatio="xMidYMid meet" aria-hidden="true" className="h-9 w-full">
            <path
              d="M0 18 H120 L132 6 L146 30 L158 18 H220 L232 10 L244 26 L254 18 H340"
              fill="none"
              stroke="var(--gold)"
              strokeWidth={2}
              strokeLinecap="round"
              opacity={0.7}
            />
          </svg>
        </div>

        <p className="mx-auto mb-[34px] max-w-[560px] font-serif text-[1.2rem] italic text-ivory">
          {site.signature}
        </p>

        <nav className="mb-[30px] flex flex-wrap justify-center gap-[28px]">
          {footerNav.map((item) => (
            <Link
              key={item.key}
              to={item.to}
              className="text-[0.9rem] font-medium text-[#C9D3C8] transition-colors hover:text-gold-bright"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <p className="text-[0.82rem] leading-[1.9] text-[#86988A]">
          <strong className="font-serif text-[1rem] font-medium text-ivory">SoundHeart Counseling</strong>
          <br />
          Based in the Mat-Su Valley, with clients from across the lower 48 and beyond
          <br />
          hello@soundheart.org · {site.phoneDisplay} · By appointment
        </p>
      </div>
    </footer>
  )
}
