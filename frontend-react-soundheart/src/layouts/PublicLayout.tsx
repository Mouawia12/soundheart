import { Outlet } from 'react-router-dom'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import FloatingContact from '@/components/layout/FloatingContact'

export default function PublicLayout() {
  return (
    <div className="min-h-screen bg-ivory">
      <Header />
      <main id="top">
        <Outlet />
      </main>
      <Footer />
      <FloatingContact />
    </div>
  )
}
