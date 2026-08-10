import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { adminApi } from '../api/adminApi'

function StatCard({ label, value }: { label: string; value: number | undefined }) {
  return (
    <div className="rounded-[12px] border border-stone bg-white p-5 shadow-[0_12px_30px_-24px_rgba(31,61,46,0.5)]">
      <p className="m-0 text-[0.72rem] font-bold uppercase tracking-[0.12em] text-gold">{label}</p>
      <p className="m-0 mt-1 font-serif text-[2rem] font-medium text-navy">{value ?? '—'}</p>
    </div>
  )
}

export default function DashboardPage() {
  const { t } = useTranslation()
  const { data } = useQuery({ queryKey: ['admin-stats'], queryFn: adminApi.stats })

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="m-0 font-serif text-[1.8rem] font-medium text-navy">{t('admin.dashboard.title')}</h1>
        <Link
          to="/admin/articles/new"
          className="rounded-btn bg-gold px-4 py-2 text-[0.9rem] font-bold text-navy no-underline hover:bg-gold-bright"
        >
          {t('admin.dashboard.newArticle')}
        </Link>
      </div>

      <div className="grid grid-cols-4 gap-4 max-[720px]:grid-cols-2">
        <StatCard label={t('admin.dashboard.articles')} value={data?.articles} />
        <StatCard label={t('admin.dashboard.published')} value={data?.published} />
        <StatCard label={t('admin.dashboard.drafts')} value={data?.drafts} />
        <StatCard label={t('admin.dashboard.categories')} value={data?.categories} />
      </div>

      <h2 className="mb-3 mt-8 font-serif text-[1.25rem] font-medium text-navy">{t('admin.dashboard.recent')}</h2>
      <div className="overflow-hidden rounded-[12px] border border-stone bg-white">
        {(data?.recent ?? []).map((a) => (
          <Link
            key={a.id}
            to={`/admin/articles/${a.slug}/edit`}
            className="flex items-center justify-between border-b border-stone px-5 py-3 no-underline last:border-b-0 hover:bg-ivory"
          >
            <span className="font-medium text-navy">{a.title}</span>
            <span className="text-[0.8rem] text-[#59636f]">
              {a.category?.name} · {a.status}
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}
