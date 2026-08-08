import { Link } from 'react-router-dom'

export default function RetreatBanner() {
  return (
    <section style={{ background: 'linear-gradient(135deg,var(--navy),#2E5A44)' }}>
      <div className="wrap flex items-center justify-between gap-8 py-24 max-[820px]:flex-col max-[820px]:items-start max-[560px]:py-[68px]">
        <div>
          <p className="eyebrow mb-[0.6rem] !text-gold-bright">Retreats</p>
          <h2 className="m-0 max-w-[18ch] text-[clamp(1.7rem,3vw,2.3rem)] !text-ivory">
            Give your relationship a weekend, not just an hour
          </h2>
          <p className="mt-[0.6rem] max-w-[52ch] text-[#C9D3C8]">
            SoundHeart couples and individual retreats are immersive time to step out of old
            patterns and practice new ones, for people ready to go deeper than weekly sessions.
          </p>
        </div>
        <Link to="/retreats" className="btn btn-ghost-light flex-none">
          Explore retreats
        </Link>
      </div>
    </section>
  )
}
