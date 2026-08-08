export default function TheSpace() {
  return (
    <section className="py-24 max-[560px]:py-[68px]" id="space">
      <div className="wrap grid grid-cols-[1.12fr_0.88fr] items-center gap-14 max-[820px]:grid-cols-1 max-[820px]:gap-7">
        <div>
          <p className="eyebrow">The space</p>
          <h2 className="text-[clamp(2rem,4vw,2.6rem)]">A warm, quiet place to do the work</h2>
          <p className="section-lead">
            In-person sessions happen in a calm, private office in the Mat-Su Valley, an unhurried
            room made for hard conversations. Meeting by telehealth? All you need is a quiet spot of
            your own, wherever you are.
          </p>
        </div>
        <div className="relative overflow-hidden rounded-[14px] border border-[rgba(184,150,79,0.4)] [aspect-ratio:4/3]">
          {/* Demo image — replace with a real office photo via the CMS */}
          <img
            src="/images/office.svg"
            alt="A warm, quiet counseling office in the Mat-Su Valley"
            className="h-full w-full object-cover"
          />
          <span className="absolute bottom-3 right-3 rounded-md border border-dashed border-[rgba(201,169,97,0.6)] bg-navy-deep/50 px-2 py-1 text-[0.68rem] tracking-[0.08em] text-gold-bright">
            Demo image
          </span>
        </div>
      </div>
    </section>
  )
}
