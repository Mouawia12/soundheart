import { useEffect } from 'react'
import CtaBand from '@/components/CtaBand'
import { Card, HeroBand, Note, Wrap } from './parts'

const items = [
  { title: 'The NeuroRelational Library', body: 'The book series that started it all, written for couples, families, and helpers who want to go deeper.', href: '#books', link: 'Coming soon →' },
  { title: 'Retreats', body: 'Immersive in-person retreats in the Mat-Su Valley, focused time to work through what a weekly hour cannot.', to: '/retreats', link: 'Explore retreats →' },
  { title: 'Courses & resources', body: 'Guided self-paced courses and tools built around the NeuroRelational Belonging model.', href: '#courses', link: 'Coming soon →' },
]

export default function ShopPage() {
  useEffect(() => {
    document.title = 'Books, Retreats & Courses | SoundHeart Counseling'
  }, [])

  return (
    <>
      <HeroBand
        eyebrow="Shop"
        title="Books, retreats, and courses"
        lead="Everything that grows out of the NeuroRelational Belonging model, in one place."
      />

      <Wrap>
        <div className="mt-10 grid grid-cols-3 gap-5 max-[720px]:grid-cols-1">
          {items.map((it) => (
            <Card key={it.title} title={it.title} to={it.to} href={it.href} linkText={it.link}>
              {it.body}
            </Card>
          ))}
        </div>

        <Note>
          The book and course links are ready to point at your store (Gumroad, Thinkific, or your
          platform of choice) when those are live.
        </Note>
      </Wrap>

      <CtaBand
        title="Not sure where to start?"
        text="Book a consultation and we will help you find the right book, retreat, or course for where you are."
      />
    </>
  )
}
