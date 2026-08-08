const quotes = [
  'Add real quote here once you have permission, a couple who found their way back to each other.',
  'Add real quote here once you have permission, an individual client on the practice work.',
  'Add real quote here once you have permission, a retreat or training participant.',
]

export default function Testimonials() {
  return (
    <section className="py-24 max-[560px]:py-[68px]" id="stories">
      <div className="wrap">
        <div className="mx-auto mb-14 max-w-[640px] text-center">
          <p className="eyebrow">In their words</p>
          <h2 className="text-[clamp(2rem,4vw,2.6rem)]">What clients say</h2>
        </div>
        <div className="mt-12 grid grid-cols-3 gap-6 max-[920px]:grid-cols-1">
          {quotes.map((q, i) => (
            <div key={i} className="rounded-card border border-stone bg-white p-[34px_30px]">
              <div className="font-serif text-[3rem] leading-[0.6] text-gold">&ldquo;</div>
              <p className="my-[0.4rem_0_1.2rem] font-serif text-[1.08rem] italic text-ink">{q}</p>
              <p className="text-[0.82rem] font-semibold tracking-[0.04em] text-[#9DAC9E]">
                , Add real attribution
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
