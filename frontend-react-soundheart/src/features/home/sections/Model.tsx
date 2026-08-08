const principles = [
  {
    num: '01',
    title: 'The brain seeks belonging',
    body: 'We are wired to stay connected to the people who matter. Most of what looks like conflict is a nervous system trying to feel safe.',
  },
  {
    num: '02',
    title: 'Patterns are conditioned',
    body: 'You did not choose the way you brace, shut down, or reach for reassurance. It was learned, which is exactly why it can change.',
  },
  {
    num: '03',
    title: 'Change comes through practice',
    body: 'Insight alone rarely rewires anything. Repeated, deliberate practice does. We build that practice together, session by session.',
  },
]

export default function Model() {
  return (
    <section className="bg-navy py-24 text-ivory max-[560px]:py-[68px]" id="model">
      <div className="wrap">
        <p className="eyebrow !text-gold-bright">The NeuroRelational model</p>
        <h2 className="max-w-[16ch] text-[clamp(2rem,4vw,2.8rem)] !text-ivory">
          A practice-first approach to change
        </h2>
        <p className="section-lead !text-[#C9D3C8]">
          The brain is a belonging organ. The patterns you fall into with the people you love were
          conditioned, not chosen, and that means they can be re-practiced. Think physical therapy,
          but for the nervous system.
        </p>

        <div className="mt-14 grid grid-cols-3 gap-8 max-[920px]:grid-cols-1">
          {principles.map((p) => (
            <div key={p.num}>
              <div className="font-serif text-[2.4rem] leading-none text-gold-bright">{p.num}</div>
              <h4 className="my-[0.6rem_0_0.5rem] text-[1.28rem] !text-ivory">{p.title}</h4>
              <p className="m-0 text-[0.98rem] text-[#BAC7BB]">{p.body}</p>
            </div>
          ))}
        </div>

        <blockquote className="mx-auto mt-16 max-w-[820px] border-y border-[rgba(204,170,85,0.35)] py-[38px] text-center font-serif text-[clamp(1.35rem,2.6vw,1.85rem)] font-normal italic leading-[1.5] text-ivory">
          You do not become what you believe. You become what you repeatedly practice, and what you
          practice, in the end, is <span className="text-gold-bright">belonging.</span>
          <footer className="mt-5 font-sans text-[0.85rem] not-italic tracking-[0.04em] text-[#9DAC9E]">
            Nawal Ibrahim Alhawsawi
          </footer>
        </blockquote>
      </div>
    </section>
  )
}
