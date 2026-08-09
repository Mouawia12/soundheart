import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { site } from '@/config/site'
import CtaBand from '@/components/CtaBand'
import { SvcHero } from './parts'
import { usePage, pageHtml, pageCta } from '@/features/site/usePage'
import servicesData from './data/services.json'

interface Service {
  slug: string
  kicker: string
  h1: string
  sub: string
  chips: string[]
  bodyHtml: string
  cta: { title: string; text: string }
}

const services = servicesData as Service[]

export default function ServicePage() {
  const { slug } = useParams<{ slug: string }>()
  const svc = services.find((s) => s.slug === slug)
  const page = usePage(svc ? `service-${svc.slug}` : '')
  const hero = page?.hero

  useEffect(() => {
    if (svc) document.title = `${svc.h1} | SoundHeart Counseling`
  }, [svc])

  if (!svc) {
    return (
      <div className="mx-auto max-w-[760px] px-[26px] py-24 text-center">
        <h1 className="font-serif text-3xl text-navy">Page not found</h1>
        <Link to="/" className="mt-6 inline-block border-b-2 border-gold font-bold text-navy no-underline">
          ← Back home
        </Link>
      </div>
    )
  }

  const cta = pageCta(page, { title: svc.cta.title, text: svc.cta.text, buttonLabel: 'Book a consultation' })

  return (
    <>
      <SvcHero
        kicker={hero?.eyebrow ?? svc.kicker}
        title={hero?.title ?? svc.h1}
        sub={hero?.lead ?? svc.sub}
        chips={svc.chips}
        buttonHref={site.simplePracticeUrl}
      />
      <div
        className="prose-service mx-auto max-w-[820px] px-[26px] py-8"
        dangerouslySetInnerHTML={{ __html: pageHtml(page, 'body', svc.bodyHtml) }}
      />
      <CtaBand title={cta.title} text={cta.text} buttonText={cta.buttonLabel} />
    </>
  )
}
