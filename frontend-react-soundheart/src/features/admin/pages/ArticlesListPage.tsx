import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { adminApi } from '../api/adminApi'

export default function ArticlesListPage() {
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const qc = useQueryClient()

  const { data, isLoading } = useQuery({
    queryKey: ['admin-articles', { search, page }],
    queryFn: () => adminApi.articles({ search: search || undefined, page, per_page: 20 }),
  })

  const del = useMutation({
    mutationFn: (slug: string) => adminApi.deleteArticle(slug),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin-articles'] }),
  })

  const meta = data?.meta
  const items = data?.items ?? []

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h1 className="m-0 font-serif text-[1.8rem] font-medium text-navy">Articles</h1>
        <Link
          to="/admin/articles/new"
          className="rounded-btn bg-gold px-4 py-2 text-[0.9rem] font-bold text-navy no-underline hover:bg-gold-bright"
        >
          + New article
        </Link>
      </div>

      <input
        value={search}
        onChange={(e) => {
          setSearch(e.target.value)
          setPage(1)
        }}
        placeholder="Search articles…"
        className="mb-4 w-full max-w-[360px] rounded-[6px] border-[1.5px] border-stone bg-white p-[0.6em_0.9em] text-[0.95rem] focus:border-gold focus:outline-none"
      />

      <div className="overflow-hidden rounded-[12px] border border-stone bg-white">
        <table className="w-full border-collapse text-[0.9rem]">
          <thead>
            <tr className="bg-ivory text-left text-[0.72rem] uppercase tracking-[0.08em] text-[#59636f]">
              <th className="px-4 py-3 font-bold">Title</th>
              <th className="px-4 py-3 font-bold">Category</th>
              <th className="px-4 py-3 font-bold">Status</th>
              <th className="px-4 py-3 text-right font-bold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-[#59636f]">Loading…</td>
              </tr>
            )}
            {items.map((a) => (
              <tr key={a.id} className="border-t border-stone align-top">
                <td className="px-4 py-3">
                  <Link to={`/admin/articles/${a.slug}/edit`} className="font-semibold text-navy no-underline hover:text-gold">
                    {a.title}
                  </Link>
                  {a.featured && (
                    <span className="ml-2 rounded-full bg-gold/20 px-2 py-0.5 text-[0.66rem] font-bold text-[#8a6b1f]">
                      Featured
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 text-[#59636f]">{a.category?.name ?? '—'}</td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-2 py-0.5 text-[0.72rem] font-bold ${
                      a.status === 'published'
                        ? 'bg-[#e4efe6] text-[#2e5a44]'
                        : 'bg-stone text-[#7a6f52]'
                    }`}
                  >
                    {a.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <Link to={`/admin/articles/${a.slug}/edit`} className="font-semibold text-navy no-underline hover:text-gold">
                    Edit
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      if (confirm(`Delete "${a.title}"? This cannot be undone.`)) del.mutate(a.slug)
                    }}
                    className="ml-3 font-semibold text-[#b3261e] hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {meta && meta.last_page > 1 && (
        <div className="mt-4 flex items-center justify-center gap-4 text-[0.9rem]">
          <button
            type="button"
            disabled={page <= 1}
            onClick={() => setPage((p) => p - 1)}
            className="rounded-md border border-stone px-3 py-1.5 disabled:opacity-40"
          >
            ← Prev
          </button>
          <span className="text-[#59636f]">
            Page {meta.current_page} of {meta.last_page} · {meta.total} total
          </span>
          <button
            type="button"
            disabled={page >= meta.last_page}
            onClick={() => setPage((p) => p + 1)}
            className="rounded-md border border-stone px-3 py-1.5 disabled:opacity-40"
          >
            Next →
          </button>
        </div>
      )}
    </div>
  )
}
