import { Outlet } from 'react-router-dom'
import Header from '@/components/layout/Header'
import { FooterSite } from '@/components/layout/footers'
import FloatingContact from '@/components/layout/FloatingContact'

/**
 * Marketing pages. The new design uses one unified header and one unified footer
 * (footer.site) on every page.
 */
export default function PublicLayout() {
  return (
    <div className="min-h-screen bg-ivory">
      <Header />
      <main id="top">
        <Outlet />
      </main>
      <FooterSite />
      <FloatingContact />
    </div>
  )
}
