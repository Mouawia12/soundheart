import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { adminApi } from '../api/adminApi'
import type { PageListItem } from '@/features/site/types'

function groupOf(key: string): 'Main pages' | 'Local service pages' | 'Guides' {
  if (key.startsWith('service-')) return 'Local service pages'
  if (key.startsWith('pillar-') || key === 'the-model') return 'Guides'
  return 'Main pages'
}

const ORDER = ['Main pages', 'Local service pages', 'Guides'] as const

export default function PagesListPage() {
  const { data } = useQuery({ queryKey: ['admin-pages'], queryFn: adminApi.pages })

  const groups = (data ?? []).reduce<Record<string, PageListItem[]>>((acc, p) => {
    const g = groupOf(p.key)
    ;(acc[g] ??= []).push(p)
    return acc
  }, {})

  return (
    <div>
      <h1 className="mb-2 font-serif text-[1.8rem] font-medium text-navy">Pages</h1>
      <p className="mb-6 text-[0.95rem] text-[#59636f]">
        Edit each page&apos;s hero text, photos, content, and call-to-action. Changes appear on the live site.
      </p>

      {ORDER.filter((g) => groups[g]?.length).map((g) => (
        <div key={g} className="mb-7">
          <p className="mb-2 text-[0.72rem] font-bold uppercase tracking-[0.14em] text-gold">
            {g} <span className="text-[#a7b0a4]">· {groups[g].length}</span>
          </p>
          <div className="overflow-hidden rounded-[12px] border border-stone bg-white">
            {groups[g].map((p) => (
              <Link
                key={p.key}
                to={`/admin/pages/${p.key}`}
                className="flex items-center justify-between border-b border-stone px-5 py-3 no-underline last:border-b-0 hover:bg-ivory"
              >
                <span className="font-semibold text-navy">{p.name}</span>
                <span className="flex-none pl-4 text-[0.8rem] text-[#59636f]">/{p.key} · Edit →</span>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
