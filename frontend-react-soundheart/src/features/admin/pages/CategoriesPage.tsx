import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { adminApi } from '../api/adminApi'
import type { Category } from '@/features/blog/types'

export default function CategoriesPage() {
  const qc = useQueryClient()
  const [name, setName] = useState('')
  const { data } = useQuery({ queryKey: ['admin-categories'], queryFn: adminApi.categories })
  const invalidate = () => qc.invalidateQueries({ queryKey: ['admin-categories'] })

  const create = useMutation({
    mutationFn: () => adminApi.createCategory({ name }),
    onSuccess: () => {
      invalidate()
      setName('')
    },
  })
  const rename = useMutation({
    mutationFn: (c: Category) => adminApi.updateCategory(c.id, { name: c.name }),
    onSuccess: invalidate,
  })
  const del = useMutation({
    mutationFn: (id: number) => adminApi.deleteCategory(id),
    onSuccess: invalidate,
  })

  return (
    <div>
      <h1 className="mb-6 font-serif text-[1.8rem] font-medium text-navy">Categories</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          if (name.trim()) create.mutate()
        }}
        className="mb-6 flex gap-2"
      >
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="New category name"
          className="w-full max-w-[320px] rounded-[6px] border-[1.5px] border-stone bg-white p-[0.6em_0.9em] text-[0.95rem] focus:border-gold focus:outline-none"
        />
        <button type="submit" className="rounded-btn bg-gold px-4 py-2 text-[0.9rem] font-bold text-navy hover:bg-gold-bright">
          Add
        </button>
      </form>

      <div className="overflow-hidden rounded-[12px] border border-stone bg-white">
        {(data ?? []).map((c) => (
          <div key={c.id} className="flex items-center gap-3 border-b border-stone px-4 py-3 last:border-b-0">
            <input
              defaultValue={c.name}
              onBlur={(e) => {
                if (e.target.value.trim() && e.target.value !== c.name) {
                  rename.mutate({ ...c, name: e.target.value })
                }
              }}
              className="flex-1 rounded-[6px] border border-transparent bg-transparent px-2 py-1 font-semibold text-navy hover:border-stone focus:border-gold focus:outline-none"
            />
            <span className="text-[0.8rem] text-[#59636f]">{c.articles_count ?? 0} articles</span>
            <button
              type="button"
              onClick={() => {
                if (confirm(`Delete category "${c.name}"? Its articles will be uncategorized.`)) del.mutate(c.id)
              }}
              className="text-[0.85rem] font-semibold text-[#b3261e] hover:underline"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
