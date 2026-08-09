import { site } from '@/config/site'

/** The recurring call-to-action — navy rounded box (design `.cta`). */
export default function CtaBand({
  title,
  text,
  buttonText = 'Book a consultation',
}: {
  title: string
  text: string
  buttonText?: string
}) {
  return (
    <div className="mx-auto max-w-[1000px] px-[26px] pb-[76px]">
      <div className="mt-[52px] rounded-[18px] bg-navy p-[50px_26px] text-center text-ivory">
        <h2 className="m-0 mb-[0.6rem] font-serif text-[1.7rem] font-medium !text-white">{title}</h2>
        <p className="mx-auto mb-[1.3rem] max-w-[54ch] text-[#CBD6CC]">{text}</p>
        <a
          href={site.simplePracticeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block rounded-[10px] bg-gold px-[1.8em] py-[0.85em] font-extrabold text-navy no-underline"
        >
          {buttonText}
        </a>
      </div>
    </div>
  )
}
