import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAuthStore } from '@/store/auth'
import { adminApi } from '@/features/admin/api/adminApi'
import LangToggle from '@/components/LangToggle'

const nav = [
  { to: '/admin', key: 'dashboard', end: true },
  { to: '/admin/articles', key: 'articles', end: false },
  { to: '/admin/categories', key: 'categories', end: false },
  { to: '/admin/pages', key: 'pages', end: false },
  { to: '/admin/settings', key: 'settings', end: false },
]

export default function AdminLayout() {
  const { t } = useTranslation()
  const user = useAuthStore((s) => s.user)
  const logout = useAuthStore((s) => s.logout)
  const navigate = useNavigate()

  const onLogout = async () => {
    try {
      await adminApi.logout()
    } catch {
      /* ignore */
    }
    logout()
    navigate('/login')
  }

  return (
    <div className="flex h-screen overflow-hidden bg-ivory font-sans text-ink">
      <aside className="flex h-screen w-[240px] shrink-0 flex-col overflow-y-auto bg-navy-deep text-ivory">
        <Link to="/admin" className="flex items-center gap-2 px-6 py-5 no-underline">
          <img src="/brand-mark.jpg" alt="" className="h-9 w-auto rounded-[8px]" />
          <span className="font-serif text-[1.15rem] font-semibold text-ivory">SoundHeart</span>
        </Link>
        <p className="px-6 pb-2 text-[0.66rem] font-bold uppercase tracking-[0.16em] text-gold-bright">
          Admin
        </p>
        <nav className="flex flex-col gap-1 px-3">
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `rounded-md px-3 py-2 text-[0.95rem] font-medium no-underline transition-colors ${
                  isActive ? 'bg-gold text-navy' : 'text-[#c9d3c8] hover:bg-white/5 hover:text-ivory'
                }`
              }
            >
              {t(`admin.nav.${item.key}`)}
            </NavLink>
          ))}
        </nav>
        <div className="mt-auto border-t border-white/10 px-4 py-4 text-[0.8rem]">
          <div className="mb-3 flex items-center justify-between gap-2">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold-bright no-underline hover:underline"
            >
              {t('admin.viewSite')}
            </a>
            <LangToggle className="text-[#c9d3c8]" />
          </div>
          <p className="m-0 truncate text-[#9DAC9E]">{user?.email}</p>
          <button
            type="button"
            onClick={onLogout}
            className="mt-2 w-full rounded-md border border-white/15 py-1.5 text-[0.85rem] font-semibold text-ivory transition-colors hover:bg-white/5"
          >
            {t('admin.signOut')}
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto overflow-x-hidden">
        <div className="mx-auto max-w-[1000px] px-8 py-8">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
