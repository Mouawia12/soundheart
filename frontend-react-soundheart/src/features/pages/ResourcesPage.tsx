import { useEffect } from 'react'
import CtaBand from '@/components/CtaBand'
import { Card, HeroBand, ImgPh, Note, Wrap } from './parts'
import { usePage, pageImage, pageHtml, pageCta } from '@/features/site/usePage'

const resources = [
  { title: 'Articles', body: 'Practical writing on relationships, co-parenting, trauma, family healing, and getting the help you need.', to: '/articles', link: 'Browse all articles →' },
  { title: 'Podcast & audio', body: 'Wired to Belong, our NeuroRelational Belonging podcast. Short episodes on relationships, trauma, and the practice of belonging.', href: '#audio', link: 'Audio library (coming soon) →' },
  { title: 'Video library', body: 'Watch conversations, teachings, and a welcome from Nawal.', href: '#video', link: 'Video library (coming soon) →' },
  { title: 'Free guides', body: 'Downloadable tools, starting with the NeuroRelational starter guide.', href: '#guide', link: 'Get the guide (coming soon) →' },
  { title: 'Self-assessment', body: 'A quick, private self-check to help you find the right next step.', href: '#assessment', link: 'Take the assessment (coming soon) →' },
  { title: 'The NeuroRelational model', body: 'The idea at the heart of everything we do.', to: '/the-model', link: 'Explore the model →' },
]

export default function ResourcesPage() {
  const page = usePage('resources')
  const hero = page?.hero
  const cta = pageCta(page, {
    title: 'Prefer to talk it through?',
    text: 'Book a consultation, or send us a note with what is on your mind.',
    buttonLabel: 'Book a consultation →',
  })
  const body = pageHtml(page, 'body', '')

  useEffect(() => {
    document.title = 'Resources — Guides, Articles, Audio & Video | SoundHeart Counseling'
  }, [])

  return (
    <>
      <HeroBand
        eyebrow={hero?.eyebrow ?? 'Resources'}
        title={hero?.title ?? 'Guides, articles, audio, and video'}
        lead={hero?.lead ?? 'A growing library of tools and stories, built around the NeuroRelational Belonging model.'}
      />

      <Wrap>
        <ImgPh label="PHOTO PLACEHOLDER, a warm reading or reflection image" src={pageImage(page, 'hero')} className="mt-10" />

        <div
          className="rich mx-auto mt-12 max-w-[70ch] text-[1.12rem]"
          dangerouslySetInnerHTML={{
            __html: pageHtml(
              page,
              'intro',
              '<p>Everything here is built around the NeuroRelational Belonging model, gathered into one place so you can find the right guide, article, or recording for wherever you are right now.</p>',
            ),
          }}
        />

        <div className="mt-7 grid grid-cols-3 gap-5 max-[820px]:grid-cols-2 max-[560px]:grid-cols-1">
          {resources.map((r) => (
            <Card key={r.title} title={r.title} to={r.to} href={r.href} linkText={r.link}>
              {r.body}
            </Card>
          ))}
        </div>

        <Note>
          Placeholders: the audio, video, guide, and assessment links are ready to point at your
          podcast host, video channel, download, and quiz tool when those are live.
        </Note>

        {body.trim() && <div className="rich mx-auto mt-12 max-w-[70ch]" dangerouslySetInnerHTML={{ __html: body }} />}
      </Wrap>

      <CtaBand title={cta.title} text={cta.text} buttonText={cta.buttonLabel} />
    </>
  )
}
