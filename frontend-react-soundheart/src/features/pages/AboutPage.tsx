import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import CtaBand from '@/components/CtaBand'
import { HeroBand } from './parts'
import { usePage, pageImage, pageText, pageHtml, pageCta } from '@/features/site/usePage'

const credsDefault = 'Licensed LPC, Licensed LMFT, Dual board certified, 20+ years experience'

const bioDefault = [
  'For more than twenty years, I have walked alongside individuals, couples, and families through trauma, life transitions, and the beautiful complexity of being human. I know that reaching out for support can feel vulnerable, so my first priority is always the same, to create a space where you feel safe, respected, and truly heard.',
  'Alaska has been home for several years now, and I treasure the connection and community here in the Valley. As a wife and mother of five, I know the joys and the real challenges of family life from the inside. When I am not in session, you will most likely find me grounded in time on our small farm or traveling with my family, both of which keep me close to what matters most.',
  "My training includes dual master's degrees in Counseling Psychology and Marriage and Family Therapy from the University of Akron, and a Master of Counseling from Alaska Pacific University. Over the years I have worked across community mental health, child welfare, corrections, and psychiatric emergency settings, supporting people in acute crisis and in slower, more reflective growth alike.",
  'In our work together, I offer a calm, collaborative space where we can slow things down and make sense of what you are carrying, at your pace and in a way that feels right for you. My approach is trauma-informed, practical, and tailored to your goals, blending real insight with real-world strategies for meaningful, lasting change.',
  'I am committed to an inclusive, neurodiversity-affirming space where everyone, including autistic and otherwise neurodivergent clients, feels welcomed, respected, and valued. I meet each person with curiosity and respect for their own way of thinking, feeling, and moving through the world.',
  'Above all, I hope to be a steady, supportive presence, a place where you feel understood and empowered to move forward in a way that aligns with your values and your goals. Whether we meet in person here in the Mat-Su Valley or work together another way, I would be honored to walk with you.',
]
  .map((p) => `<p>${p}</p>`)
  .join('')

const approachTextDefault =
  '<p>Everything at SoundHeart flows from one idea. Connection is not something you find, it is something you practice. The NeuroRelational Belonging model helps calm the nervous system so that people bound together, in a marriage, a family, or after divorce, can feel safe with each other again and find their way back.</p>'

export default function AboutPage() {
  const page = usePage('about')
  const hero = page?.hero
  const body = pageHtml(page, 'body', '')
  const cta = pageCta(page, {
    title: 'Ready to take the first step?',
    text: 'Whatever brought you here, booking a consultation is where we begin. Choose a date, and we will guide you from there.',
    buttonLabel: 'Book a consultation',
  })

  const name = pageText(page, 'name', 'Nawal Ibrahim Alhawsawi, LPC, LMFT')
  const role = pageText(page, 'role', 'Founder and Clinical Director, SoundHeart Counseling')
  const creds = pageText(page, 'credentials', credsDefault)
    .split(',')
    .map((c) => c.trim())
    .filter(Boolean)
  const approachTitle = pageText(page, 'approach_title', 'The NeuroRelational Belonging approach')
  const approachLink = pageText(page, 'approach_link', 'Read the complete guide to the NeuroRelational Belonging model →')

  useEffect(() => {
    document.title = 'Meet Nawal | SoundHeart Counseling'
  }, [])

  return (
    <>
      <HeroBand
        eyebrow={hero?.eyebrow ?? 'About SoundHeart'}
        title={hero?.title ?? 'Meet Nawal'}
        lead={hero?.lead ?? 'A calm, steady presence for the hardest seasons, based in the Mat-Su Valley, with clients who come from across the lower 48 and beyond.'}
      />

      <section className="pb-16">
        <div className="wrap grid grid-cols-[0.8fr_1.2fr] items-start gap-[46px] max-[760px]:grid-cols-1 max-[760px]:gap-8">
          <div className="sticky top-[90px] max-[760px]:static max-[760px]:mx-auto max-[760px]:max-w-[340px]">
            <img
              src={pageImage(page, 'portrait') ?? '/images/nawal-portrait.svg'}
              alt="Nawal Ibrahim Alhawsawi"
              className="w-full rounded-[16px] border border-stone [aspect-ratio:4/5] object-cover"
            />
          </div>

          <div>
            <h2 className="mb-1 text-[1.9rem]">{name}</h2>
            <p className="mb-4 font-semibold text-gold">{role}</p>

            <div className="mb-6 flex flex-wrap gap-2">
              {creds.map((c) => (
                <span key={c} className="rounded-[20px] border border-stone bg-white px-[13px] py-[5px] text-[0.8rem] font-bold text-navy">
                  {c}
                </span>
              ))}
            </div>

            <div
              className="rich text-[1.05rem]"
              dangerouslySetInnerHTML={{ __html: pageHtml(page, 'bio', bioDefault) }}
            />

            <div className="mt-6 rounded-[16px] border border-stone bg-white p-[26px_28px] shadow-[0_16px_40px_-30px_rgba(31,61,46,0.5)]">
              <h3 className="mb-2 font-serif text-[1.3rem] font-medium text-navy">{approachTitle}</h3>
              <div
                className="rich mb-3 text-[1rem] [&>p]:text-[#4a5550] [&>p]:leading-[1.7]"
                dangerouslySetInnerHTML={{ __html: pageHtml(page, 'approach_text', approachTextDefault) }}
              />
              <Link to="/the-model" className="border-b-2 border-gold font-bold text-navy no-underline">
                {approachLink}
              </Link>
            </div>

            {body.trim() && <div className="rich mt-8" dangerouslySetInnerHTML={{ __html: body }} />}
          </div>
        </div>
      </section>

      <CtaBand title={cta.title} text={cta.text} buttonText={cta.buttonLabel} />
    </>
  )
}
