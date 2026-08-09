import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { HeroBand } from './parts'

export type LegalBlock = { p: string } | { ul: string[] }
export interface LegalSection {
  h: string
  blocks: LegalBlock[]
}

export default function LegalPage({
  eyebrow,
  title,
  intro,
  sections,
}: {
  eyebrow: string
  title: string
  intro: string
  sections: LegalSection[]
}) {
  useEffect(() => {
    document.title = `${title} | SoundHeart Counseling`
  }, [title])

  return (
    <>
      <HeroBand eyebrow={eyebrow} title={title} lead={intro} />
      <div className="mx-auto max-w-[760px] px-[26px] py-10">
        {sections.map((s) => (
          <div key={s.h} className="mt-8">
            <h2 className="mb-2 text-[1.4rem]">{s.h}</h2>
            {s.blocks.map((b, i) =>
              'ul' in b ? (
                <ul key={i} className="mb-4 list-none p-0">
                  {b.ul.map((li) => (
                    <li key={li} className="relative mb-2 pl-6 text-[#43504a]">
                      <span className="absolute left-0 top-[0.6em] h-2 w-2 rounded-full bg-gold" />
                      {li}
                    </li>
                  ))}
                </ul>
              ) : (
                <p key={i} className="mb-4 leading-[1.8] text-[#43504a]">
                  {b.p}
                </p>
              ),
            )}
          </div>
        ))}

        <p className="mt-8 text-[#43504a]">
          Questions?{' '}
          <Link to="/contact" className="font-bold text-gold">
            Contact us
          </Link>
          .
        </p>
      </div>
    </>
  )
}
