import { useEffect } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import ChatThread from '@/features/messaging/ChatThread'
import { portalApi } from './portalApi'

export default function ClientMessagesPage() {
  const qc = useQueryClient()
  const { data: messages } = useQuery({
    queryKey: ['portal-messages'],
    queryFn: portalApi.messages,
    refetchInterval: 4000,
  })

  // Loading the thread marks admin replies read — clear the header badge.
  useEffect(() => {
    if (messages) qc.invalidateQueries({ queryKey: ['portal-unread'] })
  }, [messages, qc])
  const send = useMutation({
    mutationFn: portalApi.sendMessage,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['portal-messages'] })
      qc.invalidateQueries({ queryKey: ['portal-unread'] })
    },
  })

  return (
    <div>
      <h1 className="m-0 font-serif text-[2rem] font-medium text-navy">Messages</h1>
      <p className="mb-6 mt-1 text-[1rem] text-[#55606b]">Chat directly with SoundHeart. We'll reply as soon as we can.</p>

      <div className="h-[68vh] overflow-hidden rounded-[16px] border border-stone bg-white">
        <ChatThread
          messages={messages ?? []}
          onSend={(b) => send.mutate(b)}
          meIsAdmin={false}
          sending={send.isPending}
          emptyText="No messages yet. Send your first message below 👋"
        />
      </div>
    </div>
  )
}
