import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { useClientAuth } from '@/store/clientAuth'
import { portalApi } from './portalApi'
import type { Booking } from '@/features/booking/bookingApi'

function when(b: Booking) {
  return new Date(b.starts_at).toLocaleString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric', hour: 'numeric', minute: '2-digit', timeZone: b.timezone || 'UTC',
  })
}

function BookingRow({ b, upcoming }: { b: Booking; upcoming?: boolean }) {
  return (
    <div className={`flex items-center justify-between gap-3 border-b border-stone py-3 last:border-b-0 ${b.status === 'cancelled' ? 'opacity-55' : ''}`}>
      <div>
        <p className="m-0 font-semibold text-navy">{when(b)}</p>
        <p className="m-0 mt-0.5 text-[0.82rem] text-[#59636f]">
          {b.type === 'online' ? 'Online session' : 'In-person session'}
          {b.status === 'cancelled' ? ' · cancelled' : ''}
        </p>
      </div>
      {upcoming && b.type === 'online' && b.meet_url && b.status !== 'cancelled' && (
        <a href={b.meet_url} target="_blank" rel="noopener noreferrer" className="flex-none rounded-[8px] bg-gold px-3 py-1.5 text-[0.82rem] font-bold text-navy no-underline">
          Join call
        </a>
      )}
    </div>
  )
}

export default function ClientDashboardPage() {
  const user = useClientAuth((s) => s.user)
  const { data: bookings, isLoading } = useQuery({ queryKey: ['my-bookings'], queryFn: portalApi.myBookings })

  const now = Date.now()
  const list = bookings ?? []
  const upcoming = list.filter((b) => new Date(b.starts_at).getTime() >= now && b.status !== 'cancelled')
  const past = list.filter((b) => new Date(b.starts_at).getTime() < now || b.status === 'cancelled')

  return (
    <div>
      <h1 className="m-0 font-serif text-[2rem] font-medium text-navy">
        Welcome{user?.name ? `, ${user.name.split(' ')[0]}` : ''} 👋
      </h1>
      <p className="mb-8 mt-1 text-[1rem] text-[#55606b]">Manage your sessions and account here.</p>

      <div className="grid grid-cols-[1.4fr_0.9fr] gap-6 max-[820px]:grid-cols-1">
        {/* Upcoming sessions */}
        <section className="rounded-[16px] border border-stone bg-white p-6">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="m-0 font-serif text-[1.3rem] font-medium text-navy">Upcoming sessions</h2>
            <Link to="/booking" className="rounded-[8px] border-[1.5px] border-gold px-3 py-1.5 text-[0.85rem] font-bold text-navy no-underline hover:bg-[rgba(184,150,79,0.1)]">
              + Book a session
            </Link>
          </div>
          {isLoading ? (
            <p className="text-[#59636f]">Loading…</p>
          ) : upcoming.length === 0 ? (
            <p className="m-0 text-[#59636f]">No upcoming sessions yet. Book your next one above.</p>
          ) : (
            upcoming.map((b) => <BookingRow key={b.id} b={b} upcoming />)
          )}
        </section>

        {/* Your details + intake */}
        <div className="flex flex-col gap-6">
          <section className="rounded-[16px] border border-stone bg-white p-6">
            <h2 className="mb-3 font-serif text-[1.2rem] font-medium text-navy">Your details</h2>
            <p className="m-0 text-[0.9rem] text-[#55606b]"><b className="text-navy">Name:</b> {user?.name}</p>
            <p className="m-0 mt-1 text-[0.9rem] text-[#55606b]"><b className="text-navy">Email:</b> {user?.email}</p>
            {user?.phone && <p className="m-0 mt-1 text-[0.9rem] text-[#55606b]"><b className="text-navy">Phone:</b> {user.phone}</p>}
          </section>

          <section className="rounded-[16px] border border-[#e9d3ad] bg-[#fff4e8] p-6">
            <h2 className="mb-1 font-serif text-[1.2rem] font-medium text-[#5a4423]">Intake forms</h2>
            <p className="m-0 text-[0.9rem] text-[#6b5636]">
              Secure intake forms will appear here before your first session. This area is coming soon.
            </p>
          </section>
        </div>
      </div>

      {past.length > 0 && (
        <section className="mt-8 rounded-[16px] border border-stone bg-white p-6">
          <h2 className="mb-2 font-serif text-[1.2rem] font-medium text-navy">Past sessions</h2>
          {past.map((b) => <BookingRow key={b.id} b={b} />)}
        </section>
      )}
    </div>
  )
}
