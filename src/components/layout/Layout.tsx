import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import MegaMenu from './MegaMenu'
import Footer from '../../sections/Footer'

export default function Layout({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation()

  // Reset scroll on route change (Lenis-friendly).
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [pathname])

  return (
    <div className="surface-ink-flat min-h-screen text-white">
      <MegaMenu />
      <main className="pt-[80px]">{children}</main>
      <Footer />
    </div>
  )
}
