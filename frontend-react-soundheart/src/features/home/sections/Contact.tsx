import { Link } from 'react-router-dom'
import { site } from '@/config/site'

export default function Contact() {
  return (
    <section className="py-24 max-[560px]:py-[68px]" id="contact">
      <div className="wrap">
        <div className="mx-auto mb-12 max-w-[600px] text-center">
          <p className="eyebrow">Get started</p>
          <h2 className="text-[clamp(2rem,4vw,2.6rem)]">Book a consultation</h2>
          <p className="section-lead mx-auto">
            New and returning clients schedule through the secure SimplePractice portal. Not sure
            where to begin? Complete our{' '}
            <Link to="/contact" className="font-bold text-gold">
              contact form
            </Link>{' '}
            and we&apos;ll help you take the first step.
          </p>
        </div>

        <div className="mx-auto grid max-w-[840px] grid-cols-2 gap-6 max-[920px]:grid-cols-1">
          <div className="rounded-card border border-stone bg-white p-[38px_34px] max-[560px]:p-[32px_26px]">
            <p className="m-0 mb-2 text-[0.72rem] font-bold uppercase tracking-[0.14em] text-gold">
              Booking · SimplePractice
            </p>
            <h3 className="mb-[0.4rem] text-[1.35rem]">Book online</h3>
            <p className="text-[0.96rem] text-[#55606b]">
              Schedule and manage your sessions in the secure SimplePractice client portal, in person
              in the Mat-Su Valley, or online where available.
            </p>
            <p className="my-[0.2rem_0_1.3rem] text-[0.85rem] text-[#7a8a7c]">
              <strong className="text-navy">For:</strong> couples, co-parenting, family, and
              individual sessions, and intensives.
            </p>
            <a href={site.simplePracticeUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary block">
              Open the client portal
            </a>
            <p className="mt-4 text-[0.85rem] text-[#7a8a7c]">
              Questions first? Complete our{' '}
              <Link to="/contact" className="font-bold text-gold">contact form</Link> or call{' '}
              <a href={site.phoneHref} className="font-bold text-gold">{site.phoneDisplay}</a>.
            </p>
          </div>

          <div className="rounded-card border border-stone bg-white p-[38px_34px] max-[560px]:p-[32px_26px]">
            <p className="m-0 mb-2 text-[0.72rem] font-bold uppercase tracking-[0.14em] text-gold">
              Private &amp; secure
            </p>
            <h3 className="mb-[0.4rem] text-[1.35rem]">A confidential space</h3>
            <p className="text-[0.96rem] text-[#55606b]">
              Every session is private and judgment-free, in person in the Mat-Su Valley, or online
              through secure, HIPAA-compliant sessions.
            </p>
            <p className="mt-4 text-[0.85rem] text-[#7a8a7c]">
              <strong className="text-navy">Not sure where to start?</strong> Complete our{' '}
              <Link to="/contact" className="font-bold text-gold">contact form</Link> and we&apos;ll
              help you find the right path.
            </p>
          </div>
        </div>

        <div className="mx-auto mt-6 max-w-[840px] rounded-card border border-[#e9d3ad] bg-[#fff4e8] p-[20px_26px] text-[0.9rem] text-[#6b5636]">
          <strong className="text-[#5a4423]">If you are in crisis, please don&apos;t wait for an email.</strong>{' '}
          Call or text <strong>988</strong> (Suicide &amp; Crisis Lifeline) or dial <strong>911</strong>{' '}
          for an emergency. SoundHeart is not a crisis or emergency service.
        </div>
      </div>
    </section>
  )
}
