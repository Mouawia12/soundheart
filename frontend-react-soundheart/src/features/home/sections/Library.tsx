const books = [
  'The Marriage Rehab',
  'The Relationship Brain',
  'The Rehabilitated Self',
  'NeuroRelational Belonging',
]

export default function Library() {
  return (
    <section className="bg-stone py-24 max-[560px]:py-[68px]" id="books">
      <div className="wrap">
        <div className="mx-auto mb-14 max-w-[640px] text-center">
          <p className="eyebrow">The NeuroRelational Library</p>
          <h2 className="text-[clamp(2rem,4vw,2.6rem)]">Four books, one throughline</h2>
          <p className="section-lead mx-auto">
            The ideas behind the practice, written to be read at a kitchen table, not a lecture hall.
          </p>
        </div>

        <div className="mt-[52px] grid grid-cols-4 gap-[22px] max-[920px]:grid-cols-2">
          {books.map((title) => (
            <div
              key={title}
              className="relative flex flex-col justify-between overflow-hidden rounded-[4px] border border-[#2E5A44] bg-navy p-[30px_22px] text-ivory transition-transform hover:-translate-y-1 hover:rotate-[-0.6deg] [aspect-ratio:3/4.2]"
            >
              <span className="absolute bottom-0 left-[14px] top-0 w-[2px] bg-gold opacity-50" />
              <span className="text-[0.66rem] uppercase tracking-[0.18em] text-gold-bright">
                NeuroRelational Library
              </span>
              <div>
                <h4 className="m-0 text-[1.24rem] leading-[1.2] !text-ivory">{title}</h4>
                <p className="mt-[6px] text-[0.78rem] text-[#9DAC9E]">Nawal Alhawsawi</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 grid grid-cols-[1.1fr_1fr] items-center gap-9 rounded-[8px] border border-[#E0D6BE] bg-white p-11 max-[920px]:grid-cols-1 max-[560px]:p-[32px_26px]">
          <div>
            <h3 className="mb-2 text-[1.7rem]">Join our newsletter</h3>
            <p className="m-0 text-[#55606b]">
              Get the free NeuroRelational starter guide, one practice you can try tonight, plus a
              short monthly note with tools and first word on upcoming retreats and training.
              Unsubscribe anytime.
            </p>
          </div>
          <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              placeholder="First name"
              aria-label="First name"
              className="rounded-[3px] border-[1.5px] border-stone p-[0.9em_1em] font-sans text-base focus:border-gold focus:outline focus:outline-2 focus:outline-gold"
            />
            <input
              type="email"
              placeholder="Email address"
              aria-label="Email address"
              className="rounded-[3px] border-[1.5px] border-stone p-[0.9em_1em] font-sans text-base focus:border-gold focus:outline focus:outline-2 focus:outline-gold"
            />
            <button type="submit" className="btn btn-primary block">
              Join the newsletter
            </button>
            <p className="text-[0.8rem] text-[#8a929c]">
              No spam. Unsubscribe anytime. (Demo form, connect to MailerLite/Substack before
              launch.)
            </p>
          </form>
        </div>
      </div>
    </section>
  )
}
