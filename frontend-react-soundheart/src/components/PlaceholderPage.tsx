import { Link } from 'react-router-dom'

/** Temporary page for routes not yet built. Replaced as each page is converted. */
export default function PlaceholderPage({ title }: { title: string }) {
  return (
    <section className="py-24">
      <div className="wrap text-center">
        <p className="eyebrow">SoundHeart</p>
        <h1 className="text-3xl md:text-4xl">{title}</h1>
        <p className="mx-auto mt-4 max-w-[520px] text-[#55606b]">
          This page is coming soon. We are converting the approved design one page at a time.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex items-center gap-2 rounded-btn border-[1.5px] border-navy px-6 py-3 font-bold text-navy transition-colors hover:bg-navy hover:text-ivory"
        >
          Back home
        </Link>
      </div>
    </section>
  )
}
