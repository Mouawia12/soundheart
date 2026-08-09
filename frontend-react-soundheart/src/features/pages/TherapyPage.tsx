import { useEffect } from 'react'
import CtaBand from '@/components/CtaBand'
import { Card, HeroBand, ImgPh, SecHead, Wrap } from './parts'
import { usePage, pageImage, pageHtml, pageCta } from '@/features/site/usePage'

const ways = [
  { title: 'Individual therapy', body: 'Support for anxiety, depression, PTSD, complex trauma, life transitions, and neurodivergent and autism-affirming care.', to: '/therapy', link: 'Trauma & PTSD guide →' },
  { title: 'Couples & marriage', body: 'Help for constant conflict, disconnection, affairs, and deciding whether to stay, including intensives for couples in crisis.', to: '/therapy', link: 'Marriage & couples guide →' },
  { title: 'Family & parenting', body: 'For families under strain, estrangement, difficult teens, and healing patterns handed down across generations.', to: '/therapy', link: 'Family & parenting guide →' },
  { title: 'Co-parenting after divorce', body: 'Lower conflict, two workable homes, and protecting your children through and after separation.', to: '/articles', link: 'Read more →' },
  { title: 'Trauma therapy & EMDR', body: 'Evidence-based trauma work, including EMDR, at a pace that builds safety first. You do not have to retell every detail.', to: '/articles/what-is-emdr', link: 'What is EMDR? →' },
  { title: 'Not sure where to start?', body: 'Tell us a little about what is going on and we will help you find the right path.', to: '/contact', link: 'Contact us →' },
]

const forceTags = ['Police', 'Corrections officers', 'CPS & child welfare', 'EMS & emergency personnel']

export default function TherapyPage() {
  const page = usePage('therapy')
  const hero = page?.hero
  const cta = pageCta(page, {
    title: 'Ready to begin?',
    text: 'Reaching out is the first step. Book a consultation and we will guide you to the right path from there.',
    buttonLabel: 'Book a session',
  })
  const body = pageHtml(page, 'body', '')

  useEffect(() => {
    document.title = 'Therapy — Individual, Couples & Family | SoundHeart Counseling'
  }, [])

  return (
    <>
      <HeroBand
        eyebrow={hero?.eyebrow ?? 'Therapy'}
        title={hero?.title ?? 'Individual, couples, and family therapy'}
        lead={hero?.lead ?? 'Focused, trauma-informed therapy in person in the Mat-Su Valley, grounded in the NeuroRelational Belonging model.'}
      />

      <Wrap>
        <ImgPh
          label="PHOTO PLACEHOLDER, warm image of the therapy space or a session setting"
          src={pageImage(page, 'hero')}
          className="mt-10"
        />

        <div
          className="rich mx-auto mt-12 max-w-[70ch] text-[1.12rem]"
          dangerouslySetInnerHTML={{
            __html: pageHtml(
              page,
              'intro',
              '<p>Reaching out is the hardest step. From there, we slow things down and make sense of what you are carrying, at your pace. Our in-person therapy is provided here in the Mat-Su Valley, where we are licensed. For people elsewhere, we also offer services based on our NeuroRelational Belonging model, depending on location.</p>',
            ),
          }}
        />

        <SecHead>Ways we work</SecHead>
        <div className="mt-7 grid grid-cols-3 gap-5 max-[820px]:grid-cols-2 max-[560px]:grid-cols-1">
          {ways.map((w) => (
            <Card key={w.title} title={w.title} to={w.to} linkText={w.link}>
              {w.body}
            </Card>
          ))}
        </div>

        <ImgPh
          label="PHOTO PLACEHOLDER, a warm, human image, hands, a calm session, or a quiet supportive moment"
          src={pageImage(page, 'session')}
          ratio="16/6"
          className="mt-10"
        />

        {/* First Responder & Protective Services (design .fr-block) */}
        <div
          className="mt-12 rounded-[18px] p-[40px_38px] text-ivory shadow-[0_24px_50px_-34px_rgba(31,61,46,0.6)] max-[560px]:p-7"
          style={{ background: 'linear-gradient(135deg,var(--navy),#2E5A44)' }}
        >
          <p className="m-0 mb-[0.4rem] text-[0.7rem] font-extrabold uppercase tracking-[0.16em] text-gold-bright">
            A specialized track
          </p>
          <h2 className="m-0 mb-[0.3rem] font-serif text-[1.7rem] font-medium !text-white">
            First Responder &amp; Protective Services
          </h2>
          <p className="m-0 mb-[1.1rem] text-[1.05rem] font-bold text-gold-bright">
            For police, corrections officers, CPS workers, and emergency personnel.
          </p>
          <p className="m-0 mb-[1.3rem] max-w-[74ch] text-[1rem] leading-[1.7] text-[#CBD6CC]">
            These are professions that ask people to carry what most never see, repeated exposure to
            crisis, trauma, and impossible decisions, often inside a culture where asking for help can
            feel risky. Nawal has worked inside these systems, in child protective services,
            corrections, and alongside first responders, and she understands the specific toll the
            work takes, and the guardedness that can come with it. Support here is practical,
            confidential, and built for people who are used to being the ones who hold it together.
          </p>
          <div className="mb-[1.5rem] flex flex-wrap gap-[9px]">
            {forceTags.map((t) => (
              <span key={t} className="rounded-[20px] border border-[rgba(201,169,97,0.4)] bg-white/[0.08] px-[14px] py-[5px] text-[0.82rem] font-bold text-ivory">
                {t}
              </span>
            ))}
          </div>
          <a href="#first-responders" className="inline-block rounded-[9px] bg-gold px-[1.5em] py-[0.72em] font-extrabold text-navy no-underline">
            First responders &amp; veterans →
          </a>
        </div>

        {body.trim() && <div className="rich mx-auto mt-12 max-w-[70ch]" dangerouslySetInnerHTML={{ __html: body }} />}
      </Wrap>

      <CtaBand title={cta.title} text={cta.text} buttonText={cta.buttonLabel} />
    </>
  )
}
