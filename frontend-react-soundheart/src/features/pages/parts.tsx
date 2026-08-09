import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

/** Narrow content container (design uses max-width:1000px on these pages). */
export function Wrap({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto max-w-[1000px] px-[26px] ${className}`}>{children}</div>
}

/** Green full-width hero band — eyebrow + h1 + lead, centered (design `.hero`). */
export function HeroBand({
  eyebrow,
  title,
  lead,
  children,
}: {
  eyebrow: string
  title: string
  lead?: string
  children?: ReactNode
}) {
  return (
    <section
      className="px-0 py-[56px_0_50px] text-center text-ivory"
      style={{
        padding: '56px 0 50px',
        background: 'linear-gradient(160deg,var(--navy-deep),var(--navy) 55%,#2E5A44 135%)',
      }}
    >
      <Wrap>
        <p className="text-[0.74rem] font-extrabold uppercase tracking-[0.18em] text-gold-bright">
          {eyebrow}
        </p>
        <h1 className="my-[0.5rem_0_0.4rem] font-serif text-[clamp(2rem,4.4vw,2.9rem)] font-medium leading-[1.12] !text-white">
          {title}
        </h1>
        {lead && <p className="mx-auto max-w-[56ch] text-[1.1rem] text-[#CBD6CC]">{lead}</p>}
        {children}
      </Wrap>
    </section>
  )
}

/** Service / guide hero — green band, left-aligned, with optional chips (design `.svc-hero`). */
export function SvcHero({
  kicker,
  title,
  sub,
  chips,
  buttonText = 'Book a consultation',
  buttonHref,
}: {
  kicker: string
  title: string
  sub?: string
  chips?: string[]
  buttonText?: string
  buttonHref: string
}) {
  return (
    <section
      className="text-ivory"
      style={{ padding: '56px 0 50px', background: 'linear-gradient(135deg,var(--navy-deep),#2E5A44)' }}
    >
      <Wrap>
        <p className="text-[0.72rem] font-extrabold uppercase tracking-[0.16em] text-gold-bright">{kicker}</p>
        <h1 className="my-[0.2rem_0_0.5rem] font-serif text-[clamp(2rem,4.6vw,3rem)] font-medium leading-[1.12] !text-white">
          {title}
        </h1>
        {sub && <p className="mb-[22px] max-w-[60ch] text-[1.18rem] text-[#CBD6CC]">{sub}</p>}
        {chips && chips.length > 0 && (
          <div className="mb-[26px] flex flex-wrap gap-2">
            {chips.map((c) => (
              <span key={c} className="rounded-[20px] border border-[rgba(201,169,97,0.5)] bg-white/[0.12] px-[13px] py-[5px] text-[0.82rem] font-semibold text-[#EBE3CE]">
                {c}
              </span>
            ))}
          </div>
        )}
        <a href={buttonHref} target="_blank" rel="noopener noreferrer" className="inline-block rounded-[9px] bg-gold px-[1.7em] py-[0.8em] font-extrabold text-navy no-underline">
          {buttonText}
        </a>
      </Wrap>
    </section>
  )
}

/** Photo slot — shows the uploaded image if set, else a dashed placeholder (design `.imgph`). */
export function ImgPh({
  label,
  src,
  ratio = '16/7',
  className = '',
}: {
  label: string
  src?: string | null
  ratio?: string
  className?: string
}) {
  if (src) {
    return (
      <div className={`overflow-hidden rounded-[16px] ${className}`} style={{ aspectRatio: ratio }}>
        <img src={src} alt={label} className="h-full w-full object-cover" />
      </div>
    )
  }
  return (
    <div
      className={`flex items-center justify-center rounded-[16px] border-2 border-dashed border-[#c9b98e] p-5 text-center text-[0.8rem] font-extrabold tracking-[0.04em] text-[#8a7a52] ${className}`}
      style={{
        aspectRatio: ratio,
        background:
          'repeating-linear-gradient(45deg,#efe8d8,#efe8d8 13px,#eae1cd 13px,#eae1cd 26px)',
      }}
    >
      {label}
    </div>
  )
}

/** Section heading (design `h2.sec`). */
export function SecHead({ children }: { children: ReactNode }) {
  return <h2 className="my-[44px_0_6px] font-serif text-[1.7rem] font-medium text-navy">{children}</h2>
}

/** Content card (design `.card`). */
export function Card({
  title,
  children,
  to,
  href,
  linkText,
}: {
  title: string
  children: ReactNode
  to?: string
  href?: string
  linkText?: string
}) {
  return (
    <div className="rounded-[16px] border border-stone bg-white p-6 shadow-[0_18px_42px_-34px_rgba(31,61,46,0.5)]">
      <h3 className="mb-2 font-serif text-[1.2rem] font-semibold text-navy">{title}</h3>
      <p className="m-0 text-[0.95rem] text-[#55606b]">{children}</p>
      {linkText &&
        (href ? (
          <a href={href} className="mt-3 inline-block border-b-2 border-gold text-[0.9rem] font-bold text-navy no-underline">
            {linkText}
          </a>
        ) : (
          <Link to={to ?? '#'} className="mt-3 inline-block border-b-2 border-gold text-[0.9rem] font-bold text-navy no-underline">
            {linkText}
          </Link>
        ))}
    </div>
  )
}

/** Dashed note box (design `.note`). */
export function Note({ children }: { children: ReactNode }) {
  return (
    <div className="my-[26px_0_0] mt-[26px] rounded-[12px] border border-dashed border-[#E4CF9E] bg-[#FFF7E9] p-[13px_18px] text-[0.86rem] text-[#6b5a33]">
      {children}
    </div>
  )
}
