import { useEffect, useState, type ChangeEvent } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Link, useParams } from 'react-router-dom'
import { adminApi } from '../api/adminApi'
import { apiErrorMessage } from '@/lib/api'
import RichTextEditor from '@/components/RichTextEditor'
import type { PageData } from '@/features/site/types'

const inputCls =
  'w-full rounded-[6px] border-[1.5px] border-stone bg-white p-[0.6em_0.8em] text-[0.95rem] focus:border-gold focus:outline-none'

/** Map a page key to its public URL (service-* pages live under /services/*). */
function viewPath(key?: string): string {
  if (!key || key === 'home') return '/'
  if (key.startsWith('service-')) return `/services/${key.slice('service-'.length)}`
  return `/${key}`
}

function ImageField({
  label,
  url,
  onChange,
}: {
  label: string
  url: string | null
  onChange: (url: string | null) => void
}) {
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState('')

  const onFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setBusy(true)
    setErr('')
    try {
      const res = await adminApi.uploadMedia(file)
      onChange(res.url)
    } catch (error) {
      setErr(apiErrorMessage(error, 'Upload failed'))
    } finally {
      setBusy(false)
      e.target.value = ''
    }
  }

  return (
    <div className="rounded-[10px] border border-stone bg-white p-4">
      <p className="mb-2 text-[0.85rem] font-semibold text-navy">{label}</p>
      <div className="mb-3 flex h-44 items-center justify-center overflow-hidden rounded-[8px] border border-dashed border-stone bg-ivory">
        {url ? (
          <img src={url} alt="" className="h-full w-full object-cover" />
        ) : (
          <span className="text-[0.8rem] text-[#8a929c]">No image — using the design placeholder</span>
        )}
      </div>
      <div className="flex items-center gap-3">
        <label className="cursor-pointer rounded-md border border-stone px-3 py-1.5 text-[0.85rem] font-semibold text-navy hover:border-gold">
          {busy ? 'Uploading…' : url ? 'Replace image' : 'Upload image'}
          <input type="file" accept="image/*" className="hidden" onChange={onFile} disabled={busy} />
        </label>
        {url && (
          <button type="button" onClick={() => onChange(null)} className="text-[0.85rem] font-semibold text-[#b3261e] hover:underline">
            Remove
          </button>
        )}
      </div>
      {err && <p className="mt-2 text-[0.8rem] text-[#b3261e]">{err}</p>}
    </div>
  )
}

export default function PageEditorPage() {
  const { key } = useParams<{ key: string }>()
  const qc = useQueryClient()
  const { data: page } = useQuery({
    queryKey: ['admin-page', key],
    queryFn: () => adminApi.page(key as string),
    enabled: Boolean(key),
  })
  const [form, setForm] = useState<PageData>({})
  const [saved, setSaved] = useState(false)
  const [htmlSections, setHtmlSections] = useState<Record<string, boolean>>({})

  useEffect(() => {
    if (page) setForm(page.data ?? {})
  }, [page])

  const save = useMutation({
    mutationFn: () => adminApi.updatePage(key as string, form),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['page', key] })
      qc.invalidateQueries({ queryKey: ['admin-page', key] })
      setSaved(true)
      setTimeout(() => setSaved(false), 2500)
    },
  })

  const setHero = (field: 'eyebrow' | 'title' | 'lead', value: string) =>
    setForm((f) => ({ ...f, hero: { ...f.hero, [field]: value } }))
  const setImage = (imgKey: string, url: string | null) =>
    setForm((f) => ({ ...f, images: (f.images ?? []).map((i) => (i.key === imgKey ? { ...i, url } : i)) }))
  const setSection = (secKey: string, text: string) =>
    setForm((f) => ({ ...f, sections: (f.sections ?? []).map((s) => (s.key === secKey ? { ...s, text } : s)) }))
  const setCta = (field: 'title' | 'text' | 'buttonLabel', value: string) =>
    setForm((f) => ({ ...f, cta: { ...f.cta, [field]: value } }))

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="m-0 font-serif text-[1.8rem] font-medium text-navy">
          Edit page{page ? ` · ${page.name}` : ''}
        </h1>
        <Link to="/admin/pages" className="text-[0.9rem] font-semibold text-navy no-underline hover:text-gold">
          ← Back
        </Link>
      </div>

      {form.hero && (
        <section className="mb-8">
          <h2 className="mb-3 font-serif text-[1.2rem] font-medium text-navy">Hero</h2>
          <div className="flex flex-col gap-3">
            <label className="text-[0.82rem] font-semibold text-navy">
              Eyebrow
              <input className={`${inputCls} mt-1`} value={form.hero.eyebrow ?? ''} onChange={(e) => setHero('eyebrow', e.target.value)} />
            </label>
            <label className="text-[0.82rem] font-semibold text-navy">
              Title
              <input className={`${inputCls} mt-1`} value={form.hero.title ?? ''} onChange={(e) => setHero('title', e.target.value)} />
            </label>
            <label className="text-[0.82rem] font-semibold text-navy">
              Lead
              <textarea className={`${inputCls} mt-1`} rows={2} value={form.hero.lead ?? ''} onChange={(e) => setHero('lead', e.target.value)} />
            </label>
          </div>
        </section>
      )}

      {(form.images?.length ?? 0) > 0 && (
        <section className="mb-8">
          <h2 className="mb-3 font-serif text-[1.2rem] font-medium text-navy">Photos</h2>
          <div className="grid grid-cols-2 gap-4 max-[720px]:grid-cols-1">
            {form.images!.map((img) => (
              <ImageField key={img.key} label={img.label} url={img.url} onChange={(url) => setImage(img.key, url)} />
            ))}
          </div>
        </section>
      )}

      {(form.sections?.length ?? 0) > 0 && (
        <section className="mb-8">
          <h2 className="mb-3 font-serif text-[1.2rem] font-medium text-navy">Content</h2>
          <div className="flex flex-col gap-5">
            {form.sections!.map((s) =>
              s.rich === false ? (
                <label key={s.key} className="text-[0.82rem] font-semibold text-navy">
                  {s.label}
                  <input className={`${inputCls} mt-1`} value={s.text} onChange={(e) => setSection(s.key, e.target.value)} />
                </label>
              ) : (
                <div key={s.key}>
                  <div className="mb-1.5 flex items-center justify-between">
                    <p className="m-0 text-[0.82rem] font-semibold text-navy">{s.label}</p>
                    <button
                      type="button"
                      onClick={() => setHtmlSections((m) => ({ ...m, [s.key]: !m[s.key] }))}
                      className="text-[0.75rem] font-semibold text-gold hover:underline"
                    >
                      {htmlSections[s.key] ? '◐ Rich text editor' : '</> Edit raw HTML'}
                    </button>
                  </div>
                  {htmlSections[s.key] ? (
                    <textarea
                      className={`${inputCls} font-mono text-[0.8rem] leading-relaxed`}
                      rows={14}
                      value={s.text}
                      onChange={(e) => setSection(s.key, e.target.value)}
                    />
                  ) : (
                    <RichTextEditor value={s.text} onChange={(html) => setSection(s.key, html)} />
                  )}
                </div>
              ),
            )}
          </div>
        </section>
      )}

      {form.cta && (
        <section className="mb-8">
          <h2 className="mb-3 font-serif text-[1.2rem] font-medium text-navy">Call to action</h2>
          <div className="flex flex-col gap-3 rounded-[10px] border border-stone bg-white p-4">
            <label className="text-[0.82rem] font-semibold text-navy">
              Title
              <input className={`${inputCls} mt-1`} value={form.cta.title ?? ''} onChange={(e) => setCta('title', e.target.value)} />
            </label>
            <label className="text-[0.82rem] font-semibold text-navy">
              Text
              <textarea className={`${inputCls} mt-1`} rows={2} value={form.cta.text ?? ''} onChange={(e) => setCta('text', e.target.value)} />
            </label>
            <label className="text-[0.82rem] font-semibold text-navy">
              Button label
              <input className={`${inputCls} mt-1`} value={form.cta.buttonLabel ?? ''} onChange={(e) => setCta('buttonLabel', e.target.value)} />
            </label>
          </div>
        </section>
      )}

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => save.mutate()}
          disabled={save.isPending}
          className="rounded-btn bg-gold px-6 py-2.5 font-bold text-navy hover:bg-gold-bright disabled:opacity-60"
        >
          {save.isPending ? 'Saving…' : 'Save changes'}
        </button>
        {saved && <span className="text-[0.9rem] font-semibold text-[#2e5a44]">Saved ✓</span>}
        {page && (
          <a href={viewPath(key)} target="_blank" rel="noopener noreferrer" className="text-[0.9rem] font-semibold text-[#59636f] no-underline hover:text-navy">
            View page ↗
          </a>
        )}
      </div>
    </div>
  )
}
