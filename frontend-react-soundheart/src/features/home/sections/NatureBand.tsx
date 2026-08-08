export default function NatureBand() {
  return (
    <section className="overflow-hidden p-0" aria-label="The Mat-Su Valley, Alaska">
      <div className="relative flex min-h-[320px] flex-col items-center justify-center gap-3 text-center">
        {/* Demo image — replace with a real Alaska photo via the CMS */}
        <img
          src="/images/nature-alaska.svg"
          alt="The Mat-Su Valley, Alaska"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-navy-deep/40" />
        <span className="absolute left-4 top-[14px] z-10 rounded-md border border-dashed border-[rgba(201,169,97,0.5)] px-[10px] py-1 text-[0.7rem] tracking-[0.08em] text-[rgba(201,169,97,0.9)]">
          Demo image
        </span>
        <svg className="relative z-10 h-[30px] w-[220px]" viewBox="0 0 300 34" aria-hidden="true">
          <path
            d="M0 17 H110 L122 5 L136 29 L148 17 H200 L212 8 L224 26 L234 17 H300"
            fill="none"
            stroke="var(--gold)"
            strokeWidth={2}
            strokeLinecap="round"
            opacity={0.85}
          />
        </svg>
        <p className="relative z-10 m-0 px-5 font-serif text-[1.35rem] italic text-ivory drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
          In person in the Mat-Su Valley · Telehealth across the lower 48 and beyond
        </p>
      </div>
    </section>
  )
}
