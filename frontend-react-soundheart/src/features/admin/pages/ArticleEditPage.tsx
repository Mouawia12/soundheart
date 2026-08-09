import { useEffect, useState, type ReactNode } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { adminApi, type ArticleInput } from '../api/adminApi'
import { apiErrorMessage } from '@/lib/api'
import RichTextEditor from '@/components/RichTextEditor'

const EMPTY: ArticleInput = {
  title: '', slug: '', category_id: null, excerpt: '', body: '', meta_description: '',
  focus_keywords: '', read_time: '', author: 'Nawal Ibrahim Alhawsawi, MA, MS, LPC, LMFT, NCC',
  faqs: [], status: 'published', featured: false,
}

const inputCls =
  'w-full rounded-[6px] border-[1.5px] border-stone bg-white p-[0.6em_0.8em] text-[0.95rem] focus:border-gold focus:outline-none'

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-[0.82rem] font-semibold text-navy">{label}</span>
      {children}
    </label>
  )
}

export default function ArticleEditPage() {
  const { slug } = useParams<{ slug: string }>()
  const isEdit = Boolean(slug)
  const navigate = useNavigate()
  const qc = useQueryClient()
  const [form, setForm] = useState<ArticleInput>(EMPTY)
  const [error, setError] = useState('')
  const [htmlMode, setHtmlMode] = useState(false)

  const { data: cats } = useQuery({ queryKey: ['admin-categories'], queryFn: adminApi.categories })
  const { data: existing } = useQuery({
    queryKey: ['admin-article', slug],
    queryFn: () => adminApi.article(slug as string),
    enabled: isEdit,
  })

  useEffect(() => {
    if (existing) {
      setForm({
        title: existing.title, slug: existing.slug, category_id: existing.category?.id ?? null,
        excerpt: existing.excerpt, body: existing.body, meta_description: existing.meta_description,
        focus_keywords: existing.focus_keywords, read_time: existing.read_time, author: existing.author,
        faqs: existing.faqs ?? [], status: existing.status ?? 'published', featured: existing.featured,
      })
    }
  }, [existing])

  const save = useMutation({
    mutationFn: (data: ArticleInput) =>
      isEdit ? adminApi.updateArticle(slug as string, data) : adminApi.createArticle(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin-articles'] })
      qc.invalidateQueries({ queryKey: ['admin-stats'] })
      navigate('/admin/articles')
    },
    onError: (e) => setError(apiErrorMessage(e, 'Save failed')),
  })

  const set = <K extends keyof ArticleInput>(k: K, v: ArticleInput[K]) =>
    setForm((f) => ({ ...f, [k]: v }))

  const setFaq = (i: number, k: 'q' | 'a', v: string) =>
    setForm((f) => ({ ...f, faqs: (f.faqs ?? []).map((q, idx) => (idx === i ? { ...q, [k]: v } : q)) }))

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="m-0 font-serif text-[1.8rem] font-medium text-navy">
          {isEdit ? 'Edit article' : 'New article'}
        </h1>
        <Link to="/admin/articles" className="text-[0.9rem] font-semibold text-navy no-underline hover:text-gold">
          ← Back
        </Link>
      </div>

      {error && <p className="mb-4 rounded-[6px] bg-[#fdecec] px-3 py-2 text-[0.88rem] text-[#b3261e]">{error}</p>}

      <form
        onSubmit={(e) => {
          e.preventDefault()
          setError('')
          save.mutate(form)
        }}
        className="flex flex-col gap-4"
      >
        <Field label="Title">
          <input className={inputCls} value={form.title} onChange={(e) => set('title', e.target.value)} required />
        </Field>

        <div className="grid grid-cols-3 gap-4 max-[720px]:grid-cols-1">
          <Field label="Slug (auto from title if blank)">
            <input className={inputCls} value={form.slug ?? ''} onChange={(e) => set('slug', e.target.value)} placeholder="my-article" />
          </Field>
          <Field label="Category">
            <select
              className={inputCls}
              value={form.category_id ?? ''}
              onChange={(e) => set('category_id', e.target.value ? Number(e.target.value) : null)}
            >
              <option value="">— none —</option>
              {(cats ?? []).map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </Field>
          <Field label="Read time">
            <input className={inputCls} value={form.read_time ?? ''} onChange={(e) => set('read_time', e.target.value)} placeholder="6 min read" />
          </Field>
        </div>

        <div className="flex flex-wrap items-center gap-6">
          <Field label="Status">
            <select className={inputCls} value={form.status} onChange={(e) => set('status', e.target.value)}>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
          </Field>
          <label className="mt-6 flex items-center gap-2 text-[0.9rem] font-semibold text-navy">
            <input type="checkbox" checked={form.featured} onChange={(e) => set('featured', e.target.checked)} />
            Featured
          </label>
        </div>

        <Field label="Excerpt">
          <textarea className={inputCls} rows={2} value={form.excerpt ?? ''} onChange={(e) => set('excerpt', e.target.value)} />
        </Field>

        <div>
          <div className="mb-1 flex items-center justify-between">
            <span className="text-[0.82rem] font-semibold text-navy">Body</span>
            <button
              type="button"
              onClick={() => setHtmlMode((m) => !m)}
              className="text-[0.78rem] font-semibold text-gold hover:underline"
            >
              {htmlMode ? '◐ Rich text editor' : '</> Edit raw HTML'}
            </button>
          </div>
          {htmlMode ? (
            <textarea
              className={`${inputCls} font-mono text-[0.85rem] leading-relaxed`}
              rows={16}
              value={form.body ?? ''}
              onChange={(e) => set('body', e.target.value)}
            />
          ) : (
            <RichTextEditor value={form.body ?? ''} onChange={(html) => set('body', html)} minHeight={340} />
          )}
        </div>

        <div className="grid grid-cols-2 gap-4 max-[720px]:grid-cols-1">
          <Field label="Meta description (SEO)">
            <textarea className={inputCls} rows={3} value={form.meta_description ?? ''} onChange={(e) => set('meta_description', e.target.value)} />
          </Field>
          <Field label="Focus keywords (SEO)">
            <textarea className={inputCls} rows={3} value={form.focus_keywords ?? ''} onChange={(e) => set('focus_keywords', e.target.value)} />
          </Field>
        </div>

        <Field label="Author">
          <input className={inputCls} value={form.author ?? ''} onChange={(e) => set('author', e.target.value)} />
        </Field>

        {/* FAQs */}
        <div className="rounded-[10px] border border-stone bg-white p-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-[0.9rem] font-bold text-navy">FAQs</span>
            <button
              type="button"
              onClick={() => set('faqs', [...(form.faqs ?? []), { q: '', a: '' }])}
              className="rounded-md border border-stone px-3 py-1 text-[0.82rem] font-semibold text-navy hover:border-gold"
            >
              + Add
            </button>
          </div>
          <div className="flex flex-col gap-3">
            {(form.faqs ?? []).map((f, i) => (
              <div key={i} className="rounded-[8px] bg-ivory p-3">
                <input
                  className={`${inputCls} mb-2`}
                  value={f.q}
                  onChange={(e) => setFaq(i, 'q', e.target.value)}
                  placeholder="Question"
                />
                <textarea
                  className={inputCls}
                  rows={2}
                  value={f.a}
                  onChange={(e) => setFaq(i, 'a', e.target.value)}
                  placeholder="Answer"
                />
                <button
                  type="button"
                  onClick={() => set('faqs', (form.faqs ?? []).filter((_, idx) => idx !== i))}
                  className="mt-2 text-[0.8rem] font-semibold text-[#b3261e] hover:underline"
                >
                  Remove
                </button>
              </div>
            ))}
            {(form.faqs ?? []).length === 0 && (
              <p className="m-0 text-[0.85rem] text-[#59636f]">No FAQs yet.</p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3 pt-2">
          <button
            type="submit"
            disabled={save.isPending}
            className="rounded-btn bg-gold px-6 py-2.5 font-bold text-navy hover:bg-gold-bright disabled:opacity-60"
          >
            {save.isPending ? 'Saving…' : isEdit ? 'Save changes' : 'Create article'}
          </button>
          <Link to="/admin/articles" className="text-[0.9rem] font-semibold text-[#59636f] no-underline hover:text-navy">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  )
}
