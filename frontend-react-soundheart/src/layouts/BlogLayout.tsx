import { Outlet } from 'react-router-dom'
import Header from '@/components/layout/Header'
import { FooterBlog } from '@/components/layout/footers'
import FloatingContact from '@/components/layout/FloatingContact'

/**
 * Guide / blog / service pages. The new design uses one unified header on every
 * page (About · Services · Retreats · Training · Resources · Shop · Client Login
 * · Get Started), so these pages share the same <Header/> as the marketing site,
 * with the lighter blog footer.
 */
export default function BlogLayout() {
  return (
    <div className="min-h-screen bg-ivory text-[18px] leading-[1.75] text-ink">
      <Header />

      <main>
        <Outlet />
      </main>

      <FooterBlog />
      <FloatingContact />
    </div>
  )
}
