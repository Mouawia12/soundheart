import { useEffect, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import ChatThread from '@/features/messaging/ChatThread'
import { adminApi } from '../api/adminApi'

export default function MessagesPage() {
  const qc = useQueryClient()
  const [selected, setSelected] = useState<number | null>(null)

  const { data: convs } = useQuery({
    queryKey: ['admin-conversations'],
    queryFn: adminApi.conversations,
    refetchInterval: 6000,
  })

  useEffect(() => {
    if (selected === null && convs && convs.length) setSelected(convs[0].id)
  }, [convs, selected])

  const { data: thread } = useQuery({
    queryKey: ['admin-conversation', selected],
    queryFn: () => adminApi.conversationMessages(selected as number),
    enabled: selected !== null,
    refetchInterval: 4000,
  })

  // Opening/reading a thread clears its unread — refresh the badge + list.
  useEffect(() => {
    if (thread) {
      qc.invalidateQueries({ queryKey: ['admin-messages-unread'] })
      qc.invalidateQueries({ queryKey: ['admin-conversations'] })
    }
  }, [thread, qc])

  const send = useMutation({
    mutationFn: (body: string) => adminApi.sendConversationMessage(selected as number, body),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin-conversation', selected] })
      qc.invalidateQueries({ queryKey: ['admin-conversations'] })
      qc.invalidateQueries({ queryKey: ['admin-messages-unread'] })
    },
  })

  return (
    <div>
      <h1 className="mb-4 font-serif text-[1.8rem] font-medium text-navy">Messages</h1>

      <div className="grid h-[70vh] grid-cols-[300px_1fr] overflow-hidden rounded-[16px] border border-stone max-[720px]:grid-cols-1">
        {/* Conversation list */}
        <div className="overflow-y-auto border-r border-stone bg-white max-[720px]:max-h-[200px]">
          {(convs ?? []).length === 0 && <p className="p-5 text-[0.9rem] text-[#59636f]">No conversations yet.</p>}
          {(convs ?? []).map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setSelected(c.id)}
              className={`flex w-full flex-col items-start gap-0.5 border-b border-stone px-4 py-3 text-left transition-colors ${
                selected === c.id ? 'bg-ivory' : 'hover:bg-ivory/60'
              }`}
            >
              <div className="flex w-full items-center justify-between">
                <span className="font-semibold text-navy">{c.name}</span>
                {c.unread > 0 && (
                  <span className="rounded-full bg-gold px-1.5 py-0.5 text-[0.68rem] font-bold text-navy">{c.unread}</span>
                )}
              </div>
              {c.last && <span className="line-clamp-1 text-[0.8rem] text-[#59636f]">{c.last}</span>}
            </button>
          ))}
        </div>

        {/* Thread */}
        <div className="min-h-0 bg-white">
          {selected === null ? (
            <p className="flex h-full items-center justify-center text-[#8a929c]">Select a conversation</p>
          ) : (
            <div className="flex h-full flex-col">
              <div className="border-b border-stone px-4 py-3">
                <p className="m-0 font-semibold text-navy">{thread?.name}</p>
                <p className="m-0 text-[0.8rem] text-[#59636f]">{thread?.email}</p>
              </div>
              <div className="min-h-0 flex-1">
                <ChatThread messages={thread?.messages ?? []} onSend={(b) => send.mutate(b)} meIsAdmin sending={send.isPending} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
