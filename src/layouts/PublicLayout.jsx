import { Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import PublicNavbar from '../components/landing/Navbar'
import PublicFooter from '../components/landing/Footer'

export default function PublicLayout() {
  const location = useLocation()

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-surface-950">
      <PublicNavbar />
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="flex-1"
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>
      <PublicFooter />
    </div>
  )
}
