import { Link } from 'react-router-dom'

const PlayIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className}>
    <path d="M8 5v14l11-7z" />
  </svg>
)

export default function MediaResources() {
  return (
    <section className="border-t border-stone bg-ivory py-[66px]" id="media">
      <div className="wrap">
        <div className="mx-auto mb-[34px] max-w-[640px] text-center">
          <p className="m-0 text-[0.72rem] font-extrabold uppercase tracking-[0.16em] text-gold">
            Get to know us
          </p>
          <h2 className="mt-[0.4rem] font-serif text-[clamp(1.7rem,3.6vw,2.3rem)] font-medium text-navy">
            Meet Nawal, listen in, and check in
          </h2>
        </div>

        {/* Video placeholder */}
        <div className="relative mx-auto flex max-w-[760px] items-center justify-center overflow-hidden rounded-[16px] border-2 border-dashed border-[rgba(201,169,97,0.55)] [aspect-ratio:16/9]">
          {/* Demo poster — replace with a real welcome video via the CMS */}
          <img
            src="/images/video-nawal.svg"
            alt="Meet Nawal — welcome video"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="relative z-10 flex h-[78px] w-[78px] items-center justify-center rounded-full bg-gold shadow-[0_8px_24px_rgba(0,0,0,0.3)]">
            <PlayIcon className="ml-[5px] h-[30px] w-[30px] fill-navy" />
          </div>
          <p className="absolute inset-x-0 bottom-[14px] z-10 px-3 text-center text-[0.8rem] font-bold tracking-[0.03em] text-[rgba(247,244,237,0.75)]">
            VIDEO PLACEHOLDER · add your 60 to 90 second &quot;Meet Nawal&quot; welcome video (replace
            with a YouTube or Vimeo embed)
          </p>
        </div>

        <p className="mt-[22px] text-center">
          <Link
            to="/about"
            className="border-b-2 border-gold pb-[2px] font-extrabold text-gold no-underline"
          >
            Read Nawal&apos;s full story →
          </Link>
        </p>

        <div className="mx-auto mt-[30px] grid max-w-[900px] grid-cols-2 gap-5 max-[760px]:grid-cols-1">
          {/* Podcast card */}
          <div className="rounded-[16px] border border-stone bg-white p-6 shadow-[0_18px_42px_-32px_rgba(31,61,46,0.5)]">
            <p className="m-0 mb-2 text-[0.68rem] font-extrabold uppercase tracking-[0.14em] text-gold">
              Podcast
            </p>
            <h3 className="m-0 mb-2 font-serif text-[1.25rem] font-medium text-navy">Wired to Belong</h3>
            <p className="m-0 mb-4 text-[0.95rem] leading-[1.55] text-[#55606b]">
              A NeuroRelational Belonging podcast. Short episodes on relationships, trauma, and the
              practice of belonging.
            </p>
            <div className="flex items-center gap-[13px] rounded-[12px] border border-dashed border-[rgba(201,169,97,0.5)] bg-navy p-[13px_15px]">
              <span className="flex h-[42px] w-[42px] flex-none items-center justify-center rounded-full bg-gold">
                <PlayIcon className="ml-[2px] h-[17px] w-[17px] fill-navy" />
              </span>
              <span
                className="h-6 flex-1 rounded-[4px] opacity-50"
                style={{
                  background:
                    'repeating-linear-gradient(90deg,var(--gold-bright) 0 3px,transparent 3px 8px)',
                }}
              />
              <span className="flex-none text-[0.76rem] font-extrabold text-gold-bright">00:00</span>
            </div>
            <p className="mt-3 text-[0.84rem] text-[#7a837d]">
              Also on <a href="#apple" className="font-bold text-gold no-underline">Apple</a> ·{' '}
              <a href="#spotify" className="font-bold text-gold no-underline">Spotify</a> ·{' '}
              <a href="#rss" className="font-bold text-gold no-underline">RSS</a>
            </p>
            <span className="mt-[14px] inline-block rounded-[6px] border border-dashed border-[#E4CF9E] bg-[#FBF4E4] px-2 py-[3px] text-[0.72rem] text-[#9a8a5f]">
              Audio placeholder · paste your episode embed here
            </span>
          </div>

          {/* Self-check card */}
          <div
            className="rounded-[16px] border border-transparent p-6 text-ivory shadow-[0_18px_42px_-32px_rgba(31,61,46,0.5)]"
            style={{ background: 'linear-gradient(135deg,var(--navy),#2E5A44)' }}
          >
            <p className="m-0 mb-2 text-[0.68rem] font-extrabold uppercase tracking-[0.14em] text-gold-bright">
              Self-check
            </p>
            <h3 className="m-0 mb-2 font-serif text-[1.25rem] font-medium !text-white">
              Not sure where you stand?
            </h3>
            <p className="m-0 mb-4 text-[0.95rem] leading-[1.55] text-[#CBD6CC]">
              Take a quick, private self-assessment and we&apos;ll point you toward the right next
              step. No email required to see your result.
            </p>
            <a
              href="#assessment"
              className="inline-block rounded-[9px] bg-gold px-[1.4em] py-[0.7em] font-extrabold text-navy no-underline"
            >
              Take the assessment →
            </a>
            <span className="mt-[14px] block w-fit rounded-[6px] border border-[rgba(201,169,97,0.4)] bg-[rgba(255,255,255,0.08)] px-2 py-[3px] text-[0.72rem] text-[#E7D9AE]">
              Placeholder · links to your quiz or assessment tool
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
