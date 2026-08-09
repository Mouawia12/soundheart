import { Outlet, useLocation } from 'react-router-dom'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { FooterMinimal, FooterSite } from '@/components/layout/footers'
import FloatingContact from '@/components/layout/FloatingContact'

/**
 * Marketing pages. Footer matches the design per page:
 *  - home            → rich Footer
 *  - about / contact → minimal footer
 *  - everything else → footer.site (links + NAP + sig + crisis)
 */
export default function PublicLayout() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'
  const isMinimal = pathname === '/about' || pathname === '/contact'

  return (
    <div className="min-h-screen bg-ivory">
      <Header />
      <main id="top">
        <Outlet />
      </main>
      {isHome ? <Footer /> : isMinimal ? <FooterMinimal /> : <FooterSite />}
      <FloatingContact />
    </div>
  )
}
