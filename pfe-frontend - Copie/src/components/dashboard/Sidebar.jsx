import { NavLink, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../../context/AuthContext'
import { icons } from '../../data/icons'

const clientLinks = [
  { to: '/dashboard', label: 'Tableau de bord', icon: icons.home, end: true },
  { to: '/dashboard/ai-coach', label: 'Coach IA', icon: icons.brain },
  { to: '/dashboard/workout-generator', label: 'Générateur', icon: icons.dumbbell },
  { to: '/dashboard/training', label: 'Session', icon: icons.timer },
  { to: '/dashboard/analytics', label: 'Analytiques', icon: icons.barChart },
  { to: '/dashboard/profile', label: 'Profil', icon: icons.user },
]

const adminLinks = [
  { to: '/dashboard/admin', label: 'Support', icon: icons.messageCircle, end: true },
  { to: '/dashboard/admin/tickets', label: 'Tickets', icon: icons.bell },
  { to: '/dashboard/admin/moderation', label: 'Modération', icon: icons.shield },
  { to: '/dashboard/profile', label: 'Profil', icon: icons.user },
]

const superAdminLinks = [
  { to: '/dashboard/super', label: 'Plateforme', icon: icons.activity, end: true },
  { to: '/dashboard/super/admins', label: 'Administrateurs', icon: icons.users },
  { to: '/dashboard/super/system', label: 'Santé Système', icon: icons.settings },
  { to: '/dashboard/super/logs', label: 'Logs IA', icon: icons.brain },
  { to: '/dashboard/profile', label: 'Profil', icon: icons.user },
]

const roleConfig = {
  client: { links: clientLinks, label: 'Espace Client' },
  admin: { links: adminLinks, label: 'Espace Support' },
  super_admin: { links: superAdminLinks, label: 'Administration' },
}

export default function Sidebar({ open, onClose }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const config = roleConfig[user?.role] || roleConfig.client

  const handleLogout = () => { logout(); navigate('/login') }

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 lg:hidden"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64
          bg-white border-r border-[#E2E8F0]
          dark:bg-surface-900/95 dark:border-surface-800
          transform transition-transform duration-300 ease-in-out
          lg:transform-none overflow-y-auto scrollbar-thin
          shadow-[1px_0_3px_-1px_rgba(0,0,0,0.03)]
          dark:shadow-none
          flex flex-col
          ${open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        <div className="flex items-center justify-between p-4 border-b border-[#E2E8F0] dark:border-surface-800">
          <NavLink to={user?.role === 'client' ? '/dashboard' : `/dashboard/${user?.role === 'super_admin' ? 'super' : 'admin'}`} className="flex items-center gap-2.5" onClick={onClose}>
            <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6.5 6.5 17.5 17.5"/><path d="M12 3 21 12"/><path d="M3 12 12 21"/></svg>
            </div>
            <span className="font-bold text-surface-900 text-lg dark:text-white">FitAI</span>
          </NavLink>
          <button onClick={onClose} className="lg:hidden p-1.5 rounded-lg text-surface-400 hover:text-surface-600 hover:bg-[#F1F5F9] dark:hover:text-white dark:hover:bg-surface-800 transition-colors">
            {icons.x}
          </button>
        </div>

        <div className="flex-1 p-3">
          <p className="px-3 text-[10px] font-semibold uppercase tracking-[0.08em] text-surface-400 mb-2">{config.label}</p>
          <nav className="space-y-0.5">
            {config.links.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                onClick={onClose}
                className={({ isActive }) => `sidebar-link ${isActive ? 'sidebar-link-active' : ''}`}
              >
                <span className="w-5 h-5 flex items-center justify-center flex-shrink-0">{link.icon}</span>
                <span>{link.label}</span>
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="p-3 border-t border-[#E2E8F0] dark:border-surface-800 bg-white dark:bg-surface-900/95">
          <div className="rounded-xl bg-[#F8FAFC] dark:bg-surface-800/50 p-3 border border-[#E2E8F0] dark:border-surface-700/50">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-primary-50 dark:bg-primary-500/20 flex items-center justify-center text-xs font-bold text-primary-600 dark:text-primary-400 shadow-sm">
                {user?.initials || '?'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-surface-900 dark:text-white truncate">{user?.name || 'Utilisateur'}</p>
                <p className="text-[11px] text-surface-500 dark:text-surface-400">{roleLabel(user?.role)}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="mt-2 w-full flex items-center justify-center gap-1.5 py-1.5 text-xs font-medium text-surface-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors dark:hover:text-red-400 dark:hover:bg-red-500/10"
            >
              {icons.logOut} Déconnexion
            </button>
          </div>
        </div>
      </aside>
    </>
  )
}

function roleLabel(role) {
  const labels = { client: 'Client · Plan Pro', admin: 'Administrateur Support', super_admin: 'Super Administrateur' }
  return labels[role] || 'Utilisateur'
}
