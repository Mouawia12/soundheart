import { useEffect } from 'react'
import CtaBand from '@/components/CtaBand'
import { Card, HeroBand, ImgPh, Note, SecHead, Wrap } from './parts'
import { usePage, pageImage, pageHtml, pageCta } from '@/features/site/usePage'

const choosing = [
  { title: 'The 3-day retreat', body: 'Our standard format for most couples, a focused reset to understand your cycle, calm reactive patterns, and rebuild closeness.' },
  { title: 'The 5-day retreat', body: 'Designed for recovery from a crisis or breach of trust, such as an affair, where rebuilding safety and trust needs more time.', to: '/articles/couples-retreat-3-vs-5-day', link: '3-day vs 5-day →' },
]

const forWhom = [
  { title: 'Couples in crisis', body: 'When weekly sessions feel too slow for what you are facing right now.' },
  { title: 'Stuck patterns', body: 'When the same fight keeps returning and nothing seems to shift it.' },
  { title: 'A turning point', body: 'When you want a concentrated push to build momentum that carries forward.' },
]

export default function RetreatsPage() {
  const page = usePage('retreats')
  const hero = page?.hero
  const cta = pageCta(page, {
    title: 'Interested in a retreat?',
    text: 'Book a consultation to talk it through, and we will help you choose the right format.',
    buttonLabel: 'Enquire & book →',
  })
  const body = pageHtml(page, 'body', '')

  useEffect(() => {
    document.title = 'Couples & Individual Retreats | SoundHeart Counseling'
  }, [])

  return (
    <>
      <HeroBand
        eyebrow={hero?.eyebrow ?? 'Retreats'}
        title={hero?.title ?? 'Immersive in-person retreats'}
        lead={hero?.lead ?? 'Focused, guided time to work through what a weekly hour cannot reach, in a calm setting in the Mat-Su Valley.'}
      />

      <Wrap>
        <ImgPh label="PHOTO PLACEHOLDER, calm retreat setting or the Mat-Su Valley landscape" src={pageImage(page, 'hero')} className="mt-10" />

        <div
          className="rich mx-auto mt-12 max-w-[70ch] text-[1.12rem]"
          dangerouslySetInnerHTML={{
            __html: pageHtml(
              page,
              'intro',
              '<p>A retreat gives your relationship concentrated, guided time over several days, instead of spreading help across many short weekly sessions. Couples leave having practiced real change, not just talked about it. Retreats are held in person in the Mat-Su Valley.</p>',
            ),
          }}
        />

        <SecHead>Choosing your retreat</SecHead>
        <div className="mt-7 grid grid-cols-2 gap-5 max-[720px]:grid-cols-1">
          {choosing.map((c) => (
            <Card key={c.title} title={c.title} to={c.to} linkText={c.link}>
              {c.body}
            </Card>
          ))}
        </div>

        <ImgPh label="PHOTO PLACEHOLDER, a calm retreat moment or the Mat-Su Valley landscape" src={pageImage(page, 'moment')} ratio="16/6" className="mt-10" />

        <SecHead>Who a retreat is for</SecHead>
        <div className="mt-7 grid grid-cols-3 gap-5 max-[720px]:grid-cols-1">
          {forWhom.map((c) => (
            <Card key={c.title} title={c.title}>
              {c.body}
            </Card>
          ))}
        </div>

        <Note>
          <strong className="text-[#5a4423]">Cost:</strong> retreat pricing depends on the length and
          format that fit your situation, and it is private pay. We are always happy to talk openly
          about cost and help you choose the option that genuinely fits.
        </Note>

        {body.trim() && <div className="rich mx-auto mt-12 max-w-[70ch]" dangerouslySetInnerHTML={{ __html: body }} />}
      </Wrap>

      <CtaBand title={cta.title} text={cta.text} buttonText={cta.buttonLabel} />
    </>
  )
}
