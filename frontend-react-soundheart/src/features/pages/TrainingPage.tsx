import { useEffect } from 'react'
import CtaBand from '@/components/CtaBand'
import { Card, HeroBand, ImgPh, Note, SecHead, Wrap } from './parts'
import { usePage, pageImage, pageHtml, pageCta } from '@/features/site/usePage'

const covers = [
  { title: 'The framework', body: 'The core principles of NeuroRelational Belonging and how they translate into everyday clinical practice.' },
  { title: 'Skills & application', body: 'Practical ways to bring the model into work with couples, families, and individuals.' },
  { title: 'Certification path', body: 'A route to becoming certified in the NeuroRelational Belonging approach.' },
]

export default function TrainingPage() {
  const page = usePage('training')
  const hero = page?.hero
  const cta = pageCta(page, {
    title: 'Want to hear when training opens?',
    text: 'Join our newsletter for first word on upcoming training and retreats, or reach out with questions.',
    buttonLabel: 'Contact us →',
  })
  const body = pageHtml(page, 'body', '')

  useEffect(() => {
    document.title = 'NeuroRelational Training & Certification | SoundHeart Counseling'
  }, [])

  return (
    <>
      <HeroBand
        eyebrow={hero?.eyebrow ?? 'Training'}
        title={hero?.title ?? 'NeuroRelational Belonging training and certification'}
        lead={hero?.lead ?? 'Professional training for clinicians and helpers who want to bring the NeuroRelational Belonging model into their own work.'}
      />

      <Wrap>
        <ImgPh label="PHOTO PLACEHOLDER, training session, workshop, or presentation setting" src={pageImage(page, 'hero')} className="mt-10" />

        <div
          className="rich mx-auto mt-12 max-w-[70ch] text-[1.12rem]"
          dangerouslySetInnerHTML={{
            __html: pageHtml(
              page,
              'intro',
              '<p>The NeuroRelational Belonging model holds that connection is a set of patterns the nervous system learns and can relearn, and that healing happens through repeated experiences of safety and belonging. Our training helps professionals understand and apply that framework with the people they serve.</p>',
            ),
          }}
        />

        <SecHead>What the training covers</SecHead>
        <div className="mt-7 grid grid-cols-3 gap-5 max-[720px]:grid-cols-1">
          {covers.map((c) => (
            <Card key={c.title} title={c.title}>
              {c.body}
            </Card>
          ))}
        </div>

        <ImgPh label="PHOTO PLACEHOLDER, a workshop or training moment with professionals" src={pageImage(page, 'workshop')} ratio="16/6" className="mt-10" />

        <SecHead>Who it is for</SecHead>
        <p className="max-w-[70ch] text-[1.05rem] leading-[1.7] text-ink">
          Therapists, counselors, coaches, and other helping professionals who want a deeper,
          relationship-centered framework for their work.
        </p>
        <Note>
          <strong className="text-[#5a4423]">Details coming soon.</strong> Dates, format, and pricing
          for upcoming cohorts are being finalized. Join the newsletter to hear first when enrollment
          opens.
        </Note>

        {body.trim() && <div className="rich mx-auto mt-12 max-w-[70ch]" dangerouslySetInnerHTML={{ __html: body }} />}
      </Wrap>

      <CtaBand title={cta.title} text={cta.text} buttonText={cta.buttonLabel} />
    </>
  )
}
