import { useEffect } from 'react'
import CtaBand from '@/components/CtaBand'
import { HeroBand } from './parts'

const groups: { category: string; items: { q: string; a: string }[] }[] = [
  {
    category: 'Getting started',
    items: [
      { q: 'How do I find the right therapist?', a: 'Look for someone with real experience in your concern, and pay attention to whether you feel heard and safe. Fit matters more than any single credential. Our guide on finding the right therapist in Alaska walks you through it.' },
      { q: 'How long does therapy take?', a: 'It depends on your goals. Focused concerns can take a handful of sessions, ongoing conditions often take a few months, and deeper work takes longer. We will give you a realistic sense early on.' },
    ],
  },
  {
    category: 'Couples and marriage',
    items: [
      { q: 'Does couples counseling actually work?', a: 'Yes. Most couples who engage in therapy improve, and outcomes are strongest when couples come before resentment sets in. Good couples work helps you understand your cycle, calm reactive patterns, and rebuild closeness.' },
      { q: 'Can therapy save a marriage?', a: 'It can help a stuck couple get unstuck, though the couple does the work. Many marriages recover from serious crises, including affairs, with the right support.' },
      { q: 'What if my spouse refuses to come?', a: 'It is still worth reaching out. Even one motivated partner can shift a relationship, and if you are unsure whether to stay, discernment counseling is designed for exactly that.' },
      { q: 'Why do we keep having the same fight?', a: 'Recurring fights are usually driven by underlying patterns and unmet needs, not the surface topic. Those patterns were learned and can be re-practiced.' },
    ],
  },
  {
    category: 'Retreats and intensives',
    items: [
      { q: 'What is a couples retreat?', a: 'A retreat gives your relationship focused, guided time over several days to work through what is really going on, rather than a weekly hour. Couples leave having practiced real change.' },
      { q: 'Is a marriage retreat worth it?', a: 'For couples in crisis, or stuck in patterns weekly sessions cannot touch, it often is. A retreat removes the weekly reset and lets change build on itself, which frequently becomes a turning point.' },
      { q: 'Should we choose the 3-day or 5-day retreat?', a: 'The 3-day is our standard for most couples. The 5-day is designed for recovery from a crisis or breach of trust, like an affair, where rebuilding trust needs more time.' },
    ],
  },
  {
    category: 'Booking and getting started',
    items: [
      { q: 'How do I get started?', a: 'Book a consultation. Choose a date that works for you, complete secure payment, and fill out a few short intake forms to confirm. It takes just a few minutes, and you can call us if you would rather talk first.' },
      { q: 'What happens in the consultation?', a: 'It is where we understand your situation and guide you to the right counselor, path, or retreat. There is no pressure, and it is also your chance to see whether we are the right fit.' },
    ],
  },
  {
    category: 'Trauma and individual therapy',
    items: [
      { q: 'Can trauma affect my relationships?', a: 'Very much. Trauma shapes how safe we feel with others, how we handle conflict, and how we trust, often without our awareness. Healing it can transform relationships.' },
      { q: 'Does EMDR really work?', a: 'Yes. EMDR is one of the most researched trauma treatments and is widely considered a gold standard for PTSD. You do not have to retell every detail.' },
      { q: 'What does depression look like in men?', a: 'Often anger, irritability, numbness, or overwork rather than obvious sadness. That disguise is part of why it goes unrecognized.' },
    ],
  },
  {
    category: 'How we work',
    items: [
      { q: 'What is the NeuroRelational Belonging model?', a: 'Our signature approach. It holds that connection is a set of patterns the nervous system learned and can relearn, and that healing happens through repeated experiences of safety and belonging.' },
      { q: 'Do you offer telehealth?', a: 'Yes. We offer secure telehealth for individuals, couples, and families across Alaska, which is as effective as in person care for most concerns.' },
      { q: 'Where are you located and who do you serve?', a: 'We are based in the Mat-Su Valley and serve Wasilla, Palmer, Eagle River, and Anchorage in person, plus telehealth across all of Alaska. We work in English and Arabic.' },
    ],
  },
]

export default function FaqPage() {
  useEffect(() => {
    document.title = 'Frequently Asked Questions | SoundHeart Counseling'
  }, [])

  return (
    <>
      <HeroBand
        eyebrow="Good questions"
        title="Frequently Asked Questions"
        lead="The questions we hear most often, about therapy, couples work, retreats, trauma, and getting started. Still stuck? Reach out any time."
      />

      <section className="pb-8">
        <div className="wrap max-w-[820px]">
          {groups.map((g) => (
            <div key={g.category} className="mt-10">
              <h2 className="border-b border-stone pb-[10px] font-serif text-[1.5rem] font-medium text-navy">
                {g.category}
              </h2>
              <div className="mt-4">
                {g.items.map((item) => (
                  <div key={item.q} className="border-b border-stone py-4 last:border-b-0">
                    <h3 className="mb-1 font-serif text-[1.18rem] font-medium text-navy">{item.q}</h3>
                    <p className="m-0 text-[#55606b]">{item.a}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <CtaBand
        title="Still have a question?"
        text="We are happy to answer it. Reach out and we will help, in person or by telehealth across Alaska."
      />
    </>
  )
}
