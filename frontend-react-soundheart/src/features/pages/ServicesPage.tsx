import { useEffect } from 'react'
import CtaBand from '@/components/CtaBand'
import { site } from '@/config/site'
import { Card, HeroBand, SecHead, Wrap } from './parts'
import { usePage, pageHtml, pageCta } from '@/features/site/usePage'

const services = [
  {
    title: 'Counseling',
    body: 'Individual, couples, and family therapy in person in the Mat-Su Valley, grounded in the NeuroRelational Belonging model.',
    to: '/therapy',
    link: 'Explore counseling →',
  },
  {
    title: 'Coaching',
    body: 'Model-based coaching for growth, relationships, and goals, available more broadly, beyond licensed therapy.',
    href: site.simplePracticeUrl,
    link: 'Enquire about coaching →',
  },
  {
    title: 'Training',
    body: 'NeuroRelational Belonging training and certification for clinicians and helping professionals.',
    to: '/training',
    link: 'Explore training →',
  },
  {
    title: 'Retreats',
    body: 'Immersive, guided multi-day retreats for couples and individuals, in a calm setting in the Valley.',
    to: '/retreats',
    link: 'Explore retreats →',
  },
  {
    title: 'The Model',
    body: 'The NeuroRelational Belonging model, the thinking that holds all of our work together.',
    to: '/the-model',
    link: 'Explore the model →',
  },
]

export default function ServicesPage() {
  const page = usePage('services')
  const hero = page?.hero
  const cta = pageCta(page, {
    title: 'Not sure which fits?',
    text: 'Tell us a little about what is going on, and we will point you to the right kind of support.',
    buttonLabel: 'Get started',
  })

  useEffect(() => {
    document.title = 'Services — Ways we can work together | SoundHeart Counseling'
  }, [])

  return (
    <>
      <HeroBand
        eyebrow={hero?.eyebrow ?? 'Services'}
        title={hero?.title ?? 'Ways we can work together'}
        lead={
          hero?.lead ??
          'Licensed therapy here in the Valley, model-based coaching more broadly, professional training, and the thinking that holds it all together.'
        }
      />

      <Wrap>
        <div
          className="rich mx-auto mt-12 max-w-[70ch] text-[1.12rem]"
          dangerouslySetInnerHTML={{
            __html: pageHtml(
              page,
              'intro',
              '<p>Every path into SoundHeart runs through the same idea, that connection is a practice. Choose where you are, and we will help you find the right way in.</p>',
            ),
          }}
        />

        <SecHead>Our offerings</SecHead>
        <div className="mt-7 grid grid-cols-3 gap-5 max-[820px]:grid-cols-2 max-[560px]:grid-cols-1">
          {services.map((s) => (
            <Card key={s.title} title={s.title} to={s.to} href={s.href} linkText={s.link}>
              {s.body}
            </Card>
          ))}
        </div>
      </Wrap>

      <CtaBand title={cta.title} text={cta.text} buttonText={cta.buttonLabel} />
    </>
  )
}
