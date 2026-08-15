import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { bookingApi, type Booking } from '@/features/booking/bookingApi'

function when(b: Booking) {
  const d = new Date(b.starts_at)
  return d.toLocaleString('en-US', {
    weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit', timeZone: b.timezone || 'UTC',
  })
}

export default function BookingsListPage() {
  const qc = useQueryClient()
  const { data } = useQuery({ queryKey: ['admin-bookings'], queryFn: () => bookingApi.bookings() })

  const cancel = useMutation({
    mutationFn: (id: number) => bookingApi.cancel(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin-bookings'] }),
  })

  const rows = data?.items ?? []

  return (
    <div>
      <h1 className="mb-2 font-serif text-[1.8rem] font-medium text-navy">Bookings</h1>
      <p className="mb-6 text-[0.95rem] text-[#59636f]">Sessions clients have booked, most recent first.</p>

      <div className="overflow-hidden rounded-[12px] border border-stone bg-white">
        <div className="grid grid-cols-[1.4fr_1.2fr_1.4fr_0.8fr_0.8fr] gap-3 border-b border-stone bg-ivory px-5 py-3 text-[0.72rem] font-bold uppercase tracking-wide text-[#59636f] max-[720px]:hidden">
          <span>When</span><span>Name</span><span>Email</span><span>Type</span><span></span>
        </div>
        {rows.length === 0 && <p className="m-0 px-5 py-8 text-center text-[#59636f]">No bookings yet.</p>}
        {rows.map((b) => (
          <div
            key={b.id}
            className={`grid grid-cols-[1.4fr_1.2fr_1.4fr_0.8fr_0.8fr] items-center gap-3 border-b border-stone px-5 py-3 text-[0.9rem] last:border-b-0 max-[720px]:grid-cols-1 max-[720px]:gap-1 ${
              b.status === 'cancelled' ? 'opacity-55' : ''
            }`}
          >
            <span className="font-semibold text-navy">{when(b)}</span>
            <span className="text-ink">{b.name}</span>
            <span className="truncate text-[#55606b]">
              {b.email}
              {b.guests?.length ? <span className="text-[#8a929c]"> +{b.guests.length}</span> : null}
            </span>
            <span>
              <span className={`rounded-full px-2 py-0.5 text-[0.75rem] font-bold ${b.type === 'online' ? 'bg-[#e7f0ea] text-[#2e5a44]' : 'bg-[#f3ecdd] text-[#6b5636]'}`}>
                {b.type === 'online' ? 'Online' : 'In person'}
              </span>
            </span>
            <span className="text-right">
              {b.status === 'cancelled' ? (
                <span className="text-[0.8rem] font-semibold text-[#b3261e]">Cancelled</span>
              ) : (
                <button type="button" onClick={() => cancel.mutate(b.id)} className="text-[0.82rem] font-semibold text-[#b3261e] hover:underline">
                  Cancel
                </button>
              )}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
