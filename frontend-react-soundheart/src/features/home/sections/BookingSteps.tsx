import { site } from '@/config/site'

const steps = [
  {
    n: 'Step 1',
    label: 'Choose a date',
    icon: (
      <svg viewBox="0 0 24 24"><rect x="3.5" y="5" width="17" height="15" rx="2" /><path d="M3.5 9.5h17M8 3v4M16 3v4" /></svg>
    ),
  },
  {
    n: 'Step 2',
    label: 'Complete secure payment',
    icon: (
      <svg viewBox="0 0 24 24"><rect x="3" y="6" width="18" height="12" rx="2" /><path d="M3 10h18M7 15h3" /></svg>
    ),
  },
  {
    n: 'Step 3',
    label: 'Complete your forms to confirm',
    icon: (
      <svg viewBox="0 0 24 24"><rect x="5" y="3" width="14" height="18" rx="2" /><path d="M9 8h6M9 12h4" /><path d="M9.5 16.5l1.5 1.5 3-3" /></svg>
    ),
  },
]

export default function BookingSteps() {
  return (
    <div className="bg-navy py-10 text-ivory">
      <div className="wrap">
        <div className="flex flex-wrap items-start justify-center gap-[10px] max-[720px]:flex-col max-[720px]:items-stretch">
          {steps.map((s, i) => (
            <div key={s.n} className="contents">
              <div className="max-w-[240px] flex-1 text-center max-[720px]:flex max-[720px]:max-w-none max-[720px]:items-center max-[720px]:gap-4 max-[720px]:text-left">
                <div className="mx-auto mb-3 flex h-[54px] w-[54px] flex-none items-center justify-center rounded-full border-2 border-gold [&_svg]:h-[26px] [&_svg]:w-[26px] [&_svg]:fill-none [&_svg]:stroke-gold-bright [&_svg]:[stroke-linecap:round] [&_svg]:[stroke-linejoin:round] [&_svg]:[stroke-width:1.8] max-[720px]:m-0">
                  {s.icon}
                </div>
                <div>
                  <p className="mb-[0.28rem] text-[0.66rem] font-extrabold uppercase tracking-[0.16em] text-gold-bright">
                    {s.n}
                  </p>
                  <p className="m-0 font-serif text-[1.08rem] font-medium leading-[1.28] text-white">
                    {s.label}
                  </p>
                </div>
              </div>
              {i < steps.length - 1 && (
                <div className="self-center pt-[22px] text-[1.5rem] text-gold max-[720px]:hidden" aria-hidden="true">
                  &rarr;
                </div>
              )}
            </div>
          ))}
        </div>
        <p className="mt-7 text-center text-[1rem] text-[#B9C6BB]">
          Prefer to talk first? Call{' '}
          <a href={site.phoneHref} className="font-extrabold text-gold-bright underline decoration-[rgba(201,169,97,0.5)]">
            {site.phoneDisplay}
          </a>
          .
        </p>
      </div>
    </div>
  )
}
