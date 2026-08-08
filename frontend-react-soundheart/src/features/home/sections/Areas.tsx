const chips = ['Mat-Su Valley', 'In person & online', 'Clients across the lower 48', 'and beyond']

export default function Areas() {
  return (
    <section className="py-24 max-[560px]:py-[68px]" id="areas">
      <div className="wrap">
        <div className="mx-auto mb-12 max-w-[740px] text-center">
          <p className="eyebrow">Where we work</p>
          <h2 className="text-[clamp(2rem,4vw,2.6rem)]">
            Based in the Mat-Su Valley, working with clients everywhere
          </h2>
          <p className="section-lead mx-auto">
            SoundHeart is based in the Mat-Su Valley, where we offer in-person therapy and retreats.
            Clients come to us from across the lower 48 and beyond, and we also work with some people
            online through services based on our NeuroRelational Belonging model.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          {chips.map((c) => (
            <span
              key={c}
              className="rounded-[999px] border border-stone bg-white px-[1.3em] py-[0.6em] text-[0.95rem] font-semibold text-navy shadow-[0_8px_20px_-14px_rgba(31,61,46,0.35)]"
            >
              {c}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
