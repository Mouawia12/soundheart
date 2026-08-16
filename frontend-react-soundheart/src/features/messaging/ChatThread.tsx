import { useEffect, useRef, useState, type FormEvent } from 'react'

export interface ChatMessage {
  id: number
  from_admin: boolean
  body: string
  created_at: string
}

/** Presentational chat thread — bubbles + a send box. Auto-scrolls to newest. */
export default function ChatThread({
  messages,
  onSend,
  meIsAdmin,
  sending,
  emptyText = 'No messages yet. Say hello 👋',
}: {
  messages: ChatMessage[]
  onSend: (body: string) => void
  meIsAdmin: boolean
  sending?: boolean
  emptyText?: string
}) {
  const [text, setText] = useState('')
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages.length])

  const time = (iso: string) => new Date(iso).toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' })

  const submit = (e: FormEvent) => {
    e.preventDefault()
    const b = text.trim()
    if (!b) return
    onSend(b)
    setText('')
  }

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="flex-1 space-y-2 overflow-y-auto bg-ivory/40 p-4">
        {messages.length === 0 && <p className="py-12 text-center text-[0.9rem] text-[#8a929c]">{emptyText}</p>}
        {messages.map((m) => {
          const mine = meIsAdmin ? m.from_admin : !m.from_admin
          return (
            <div key={m.id} className={`flex ${mine ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[78%] rounded-[14px] px-3.5 py-2 text-[0.92rem] leading-[1.5] shadow-[0_6px_16px_-12px_rgba(31,61,46,0.5)] ${
                  mine ? 'rounded-br-[4px] bg-gold text-navy' : 'rounded-bl-[4px] border border-stone bg-white text-ink'
                }`}
              >
                <p className="m-0 whitespace-pre-wrap break-words">{m.body}</p>
                <span className={`mt-0.5 block text-end text-[0.65rem] ${mine ? 'text-navy/60' : 'text-[#9aa2ac]'}`}>{time(m.created_at)}</span>
              </div>
            </div>
          )
        })}
        <div ref={endRef} />
      </div>

      <form onSubmit={submit} className="flex gap-2 border-t border-stone bg-white p-3">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message…"
          className="flex-1 rounded-full border-[1.5px] border-stone px-4 py-2 text-[0.95rem] focus:border-gold focus:outline-none"
        />
        <button type="submit" disabled={sending || !text.trim()} className="flex-none rounded-full bg-gold px-5 py-2 font-bold text-navy transition-colors hover:bg-gold-bright disabled:opacity-50">
          Send
        </button>
      </form>
    </div>
  )
}
