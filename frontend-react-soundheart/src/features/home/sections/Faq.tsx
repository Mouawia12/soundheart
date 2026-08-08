import { Link } from 'react-router-dom'

const faqs = [
  {
    q: 'Do you offer counseling in person or online?',
    a: 'Both. We provide in-person therapy and retreats in the Mat-Su Valley, and we also work with some people elsewhere online through services based on our NeuroRelational model.',
    open: true,
  },
  {
    q: 'What kind of counseling do you offer?',
    a: 'We focus on relationships and families: intensive counseling for couples in crisis, co-parenting support after divorce, and healing for disconnected families carrying generational trauma, all through the NeuroRelational approach.',
  },
  {
    q: 'Do you offer traditional counseling for other mental health conditions?',
    a: 'Yes. Alongside relationship and family work, we provide individual therapy for anxiety, depression, PTSD, ADHD, and neurodivergent support for autism and other conditions.',
  },
  {
    q: 'What therapy approaches and modalities do you use?',
    a: 'Our work is client-centered and trauma-informed. Depending on what you need, we draw on Acceptance and Commitment Therapy (ACT), Mindfulness-Based Cognitive Therapy (MBCT), Dialectical Behavior Therapy (DBT), and EMDR.',
  },
  {
    q: 'What does an intensive look like?',
    a: 'Instead of spreading help across many short weekly sessions, an intensive gives you longer, focused time to work through a crisis. We tailor the length and format to what your relationship or family needs.',
  },
  {
    q: "Can counseling help if my co-parent won't participate?",
    a: "Yes. Even when the other parent isn't ready to join, individual co-parenting support can help you lower conflict, steady your own side of the relationship, and protect your children through the transition.",
  },
  {
    q: 'Do you work with whole families, not just couples?',
    a: 'Yes. Alongside couples and co-parenting work, we support families who have grown disconnected, helping them reconnect and interrupt the patterns passed down across generations.',
  },
  {
    q: 'What areas do you serve?',
    a: 'We are based in the Mat-Su Valley, where we offer in-person therapy and retreats. We also work with some people elsewhere online through services based on our NeuroRelational model.',
  },
  {
    q: 'What is the NeuroRelational approach?',
    a: 'A practice-first way of working with the nervous system. Rather than only talking about problems, we build small, repeatable practices that help your brain learn safety and connection, like physical therapy for how you relate.',
  },
]

export default function Faq() {
  return (
    <section className="bg-stone py-24 max-[560px]:py-[68px]" id="faq">
      <div className="wrap">
        <div className="mx-auto mb-14 max-w-[640px] text-center">
          <p className="eyebrow">Good questions</p>
          <h2 className="text-[clamp(2rem,4vw,2.6rem)]">Frequently asked</h2>
        </div>
        <div className="faq mx-auto mt-[52px] max-w-[820px]">
          {faqs.map((item) => (
            <details key={item.q} open={item.open}>
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </details>
          ))}
          <details>
            <summary>How do I get started?</summary>
            <p>
              Book a consultation in a few simple steps. Have questions first? Complete our{' '}
              <Link to="/contact" className="font-bold text-gold">
                contact form
              </Link>{' '}
              and we&apos;ll help you take the first step.
            </p>
          </details>
        </div>
      </div>
    </section>
  )
}
