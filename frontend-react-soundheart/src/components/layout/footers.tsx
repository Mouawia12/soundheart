import { Link } from 'react-router-dom'

/** About / Contact — minimal one-line footer (design `<footer>` no class). */
export function FooterMinimal() {
  return (
    <footer className="bg-navy-deep px-6 py-9 text-center text-[0.85rem] text-[#9fb0a2]">
      <p className="m-0 mx-auto max-w-[70ch]">
        SoundHeart Counseling · Based in the Mat-Su Valley · Working with clients across the lower 48
        and beyond ·{' '}
        <em className="text-[#c9d3c8]">
          A sound heart is not one that never breaks. It is one that learns to mend.
        </em>
      </p>
    </footer>
  )
}

const siteLinks = [
  { to: '/privacy', label: 'Privacy' },
  { to: '/terms', label: 'Terms' },
  { to: '/disclaimer', label: 'Disclaimer' },
  { to: '/faq', label: 'FAQ' },
  { to: '/contact', label: 'Contact' },
]

/** Marketing + legal pages — design `footer.site` (links + NAP + sig + crisis). */
export function FooterSite() {
  return (
    <footer className="mt-[52px] bg-navy-deep px-[26px] pb-[30px] pt-[34px] text-[0.85rem] text-[#c9d3c8]">
      <div className="mx-auto max-w-[1000px] text-center">
        <nav className="mb-[14px] flex flex-wrap justify-center gap-4">
          {siteLinks.map((l) => (
            <Link key={l.to} to={l.to} className="font-semibold text-gold-bright no-underline">
              {l.label}
            </Link>
          ))}
        </nav>
        <p className="m-0">
          SoundHeart Counseling · Based in the Mat-Su Valley · Working with clients from across the
          lower 48 and beyond
        </p>
        <p className="m-0 mt-[6px] italic text-[#9fb0a2]">
          A sound heart is not one that never breaks. It is one that learns to mend.
        </p>
        <p className="mx-auto mt-[14px] max-w-[60ch] text-[0.8rem] opacity-85">
          If you are in crisis, do not wait. Call or text 988 (Suicide &amp; Crisis Lifeline) or dial
          911. SoundHeart is not a crisis or emergency service.
        </p>
      </div>
    </footer>
  )
}

/** Blog / guide / service pages — design `footer.site` (NAP + soundheart.org · All articles). */
export function FooterBlog() {
  return (
    <footer className="mt-11 bg-navy-deep px-5 py-10 text-center text-[0.86rem] text-[#9DAC9E]">
      <div className="mx-auto max-w-[760px]">
        <p className="m-0">
          <b className="text-ivory">SoundHeart Counseling</b>
        </p>
        <p className="m-0 mt-1">
          Serving the Mat-Su Valley (Palmer and Wasilla), Eagle River, and Anchorage, plus telehealth
          across Alaska
        </p>
        <p className="m-0 mt-2">
          soundheart.org · hello@soundheart.org ·{' '}
          <Link to="/articles" className="font-semibold text-gold-bright no-underline">
            All articles
          </Link>
        </p>
      </div>
    </footer>
  )
}
