import { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { icons } from '../../data/icons'
import { useTheme } from '../ThemeContext'

const links = [
  { to: '/', label: 'Accueil', end: true },
  { to: '/features', label: 'Fonctionnalités' },
  { to: '/pricing', label: 'Tarifs' },
  { to: '/about', label: 'À propos' },
]

export default function PublicNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const location = useLocation()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-surface-950/80 backdrop-blur-xl border-b border-[#E2E8F0] dark:border-surface-800/50 shadow-[0_1px_3px_0_rgba(0,0,0,0.03)] dark:shadow-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6.5 6.5 17.5 17.5"/><path d="M12 3 21 12"/><path d="M3 12 12 21"/></svg>
            </div>
            <span className="font-bold text-surface-900 dark:text-white text-lg">FitAI</span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {links.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className={({ isActive }) => `px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${isActive ? 'text-primary-700 dark:text-white bg-primary-50 dark:bg-surface-800/60 border border-primary-200/60 dark:border-primary-500/20' : 'text-surface-500 dark:text-surface-400 hover:text-surface-700 dark:hover:text-white hover:bg-[#F1F5F9] dark:hover:bg-surface-800/30'}`}
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button onClick={toggleTheme} className="p-2 rounded-lg text-surface-500 dark:text-surface-400 hover:text-surface-700 dark:hover:text-white hover:bg-[#F1F5F9] dark:hover:bg-surface-800/60 transition-all duration-200">
              {theme === 'dark' ? icons.sun : icons.moon}
            </button>
            <Link to="/login" className="hidden sm:inline-flex btn-ghost text-sm">Connexion</Link>
            <Link to="/register" className="hidden sm:inline-flex btn-primary text-sm">Essai gratuit</Link>
            <button onClick={() => setMobileOpen(true)} className="md:hidden p-2 rounded-lg text-surface-500 dark:text-surface-400 hover:text-surface-700 dark:hover:text-white hover:bg-[#F1F5F9] dark:hover:bg-surface-800/60 transition-colors">
              {icons.menu}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 z-40" onClick={() => setMobileOpen(false)} />
            <motion.div
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25 }}
              className="fixed top-0 right-0 bottom-0 w-72 z-50 bg-white dark:bg-surface-900 border-l border-[#E2E8F0] dark:border-surface-800 p-5"
            >
              <div className="flex justify-end mb-6">
                <button onClick={() => setMobileOpen(false)} className="p-1.5 rounded-lg text-surface-500 dark:text-surface-400 hover:text-surface-700 dark:hover:text-white hover:bg-[#F1F5F9] dark:hover:bg-surface-800/50 transition-colors">{icons.x}</button>
              </div>
              <div className="flex flex-col gap-1">
                {links.map(link => (
                  <NavLink
                    key={link.to} to={link.to} end={link.end}
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) => `px-4 py-3 rounded-xl text-sm font-medium transition-all ${isActive ? 'text-primary-700 dark:text-white bg-primary-50 dark:bg-primary-500/10 border border-primary-200 dark:border-primary-500/20' : 'text-surface-500 dark:text-surface-400 hover:text-surface-700 dark:hover:text-white hover:bg-[#F1F5F9] dark:hover:bg-surface-800/30'}`}
                  >
                    {link.label}
                  </NavLink>
                ))}
                <hr className="my-3 border-[#E2E8F0] dark:border-surface-700" />
                <Link to="/login" onClick={() => setMobileOpen(false)} className="px-4 py-3 rounded-xl text-sm font-medium text-surface-500 dark:text-surface-400 hover:text-surface-700 dark:hover:text-white hover:bg-[#F1F5F9] dark:hover:bg-surface-800/30">Connexion</Link>
                <Link to="/register" onClick={() => setMobileOpen(false)} className="px-4 py-3 rounded-xl text-sm font-medium btn-primary text-center mt-2">Essai gratuit</Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  )
}
