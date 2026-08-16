import { Link, Outlet, useNavigate } from 'react-router-dom'
import { useClientAuth } from '@/store/clientAuth'
import { portalApi } from '@/features/portal/portalApi'
import { BrandMark } from '@/components/layout/Header'

export default function ClientLayout() {
  const user = useClientAuth((s) => s.user)
  const logout = useClientAuth((s) => s.logout)
  const navigate = useNavigate()

  const onLogout = async () => {
    await portalApi.logout()
    logout()
    navigate('/portal/login')
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
            <span className="text-[#59636f] max-[560px]:hidden">{user?.name}</span>
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
