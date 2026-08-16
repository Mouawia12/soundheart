import { useEffect } from 'react'
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useClientAuth } from '@/store/clientAuth'
import { portalApi } from '@/features/portal/portalApi'
import { ensureNotifyPermission, useUnread } from '@/features/messaging/useUnread'
import { BrandMark } from '@/components/layout/Header'

export default function ClientLayout() {
  const user = useClientAuth((s) => s.user)
  const logout = useClientAuth((s) => s.logout)
  const navigate = useNavigate()
  const unread = useUnread('portal-unread', portalApi.unread, 'New message from SoundHeart')

  useEffect(() => ensureNotifyPermission(), [])

  const onLogout = async () => {
    await portalApi.logout()
    logout()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-ivory font-sans text-ink">
      <header className="sticky top-0 z-20 border-b border-stone bg-ivory">
        <div className="mx-auto flex max-w-[1000px] items-center justify-between px-[26px] py-4">
          <Link to="/portal" className="flex items-center gap-[0.55em] no-underline">
            <BrandMark />
            <b className="font-serif text-[1.25rem] font-semibold text-navy">SoundHeart</b>
          </Link>
          <div className="flex items-center gap-4 text-[0.9rem]">
            <NavLink to="/portal" end className={({ isActive }) => `font-semibold no-underline ${isActive ? 'text-gold' : 'text-navy hover:text-gold'}`}>
              Home
            </NavLink>
            <NavLink to="/portal/messages" className={({ isActive }) => `relative font-semibold no-underline ${isActive ? 'text-gold' : 'text-navy hover:text-gold'}`}>
              Messages
              {unread > 0 && (
                <span className="absolute -right-3 -top-2 rounded-full bg-gold px-1.5 py-0.5 text-[0.62rem] font-bold text-navy">{unread}</span>
              )}
            </NavLink>
            <span className="text-[#59636f] max-[620px]:hidden">{user?.name}</span>
            <button
              type="button"
              onClick={onLogout}
              className="rounded-[8px] border border-stone px-3 py-1.5 font-semibold text-navy transition-colors hover:border-gold"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-[1000px] px-[26px] py-10">
        <Outlet />
      </main>
    </div>
  )
}
