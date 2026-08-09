import { Outlet } from 'react-router-dom'
import Header from '@/components/layout/Header'
import { FooterBlog } from '@/components/layout/footers'
import FloatingContact from '@/components/layout/FloatingContact'

/**
 * Blog / guide / service pages use the same unified site header as the rest of
 * the site (matching the design), with the lighter blog footer.
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
