import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { icons } from '../../data/icons'
import { notifications, adminNotifications, superAdminNotifications } from '../../data/mockData'
import { useTheme } from '../ThemeContext'

const roleBadgeConfig = {
  client: { label: 'Client', class: 'bg-primary-50 text-primary-700 border-primary-200 dark:bg-primary-500/10 dark:text-primary-400 dark:border-primary-500/20' },
  admin: { label: 'Admin', class: 'bg-accent-50 text-accent-700 border-accent-200 dark:bg-accent-500/10 dark:text-accent-400 dark:border-accent-500/20' },
  super_admin: { label: 'Super Admin', class: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-yellow-500/10 dark:text-yellow-400 dark:border-yellow-500/20' },
}

export default function Navbar({ onMenuClick }) {
  const { theme, toggleTheme } = useTheme()
  const { user } = useAuth()
  const [showNotifications, setShowNotifications] = useState(false)

  const notifMap = { client: notifications, admin: adminNotifications, super_admin: superAdminNotifications }
  const items = notifMap[user?.role] || notifications
  const unread = items.filter(n => !n.read).length
  const badge = roleBadgeConfig[user?.role] || roleBadgeConfig.client
  const title = { client: 'Tableau de bord', admin: 'Support', super_admin: 'Plateforme' }

  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-[#E2E8F0] shadow-[0_1px_3px_0_rgba(0,0,0,0.03)] dark:bg-surface-900/80 dark:border-surface-800 dark:shadow-none">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        <button onClick={onMenuClick} className="lg:hidden p-2 rounded-lg text-surface-500 hover:text-surface-700 hover:bg-[#F1F5F9] dark:text-surface-400 dark:hover:text-white dark:hover:bg-surface-800 transition-colors">
          {icons.menu}
        </button>

        <div className="hidden md:flex items-center gap-3">
          <span className="text-sm font-medium text-surface-500 dark:text-surface-400">{title[user?.role] || 'Dashboard'}</span>
          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold border ${badge.class}`}>
            {badge.label}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-surface-500 hover:text-surface-700 hover:bg-[#F1F5F9] dark:text-surface-400 dark:hover:text-white dark:hover:bg-surface-800/60 transition-all duration-200"
            title={theme === 'dark' ? 'Mode clair' : 'Mode sombre'}
          >
            {theme === 'dark' ? icons.sun : icons.moon}
          </button>

          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-lg text-surface-500 hover:text-surface-700 hover:bg-[#F1F5F9] dark:text-surface-400 dark:hover:text-white dark:hover:bg-surface-800/60 transition-all duration-200"
            >
              {icons.bell}
              {unread > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-accent-500 rounded-full text-[10px] font-bold text-white flex items-center justify-center">
                  {unread}
                </span>
              )}
            </button>

            {showNotifications && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowNotifications(false)} />
                <div className="absolute right-0 top-full mt-2 w-80 bg-white dark:bg-surface-800/95 rounded-2xl border border-[#E2E8F0] dark:border-surface-700 shadow-xl dark:shadow-2xl z-50 max-h-96 overflow-y-auto scrollbar-thin">
                  <div className="p-3 border-b border-[#E2E8F0] dark:border-surface-700">
                    <h3 className="text-sm font-semibold text-surface-900 dark:text-white">Notifications</h3>
                  </div>
                  {items.map(n => (
                    <div key={n.id} className={`p-3 border-b border-[#E2E8F0]/50 dark:border-surface-700/50 last:border-0 hover:bg-[#F8FAFC] dark:hover:bg-surface-800/40 transition-colors ${!n.read ? 'bg-primary-50/50 dark:bg-primary-500/5' : ''}`}>
                      <p className="text-sm font-medium text-surface-900 dark:text-white">{n.title}</p>
                      <p className="text-xs text-surface-500 dark:text-surface-400 mt-0.5">{n.message}</p>
                      <p className="text-[10px] text-surface-400 dark:text-surface-500 mt-1">{n.time}</p>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          <div className="flex items-center gap-2 pl-2 border-l border-[#E2E8F0] dark:border-surface-700">
            <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-500/20 flex items-center justify-center text-xs font-bold text-primary-600 dark:text-primary-400">
              {user?.initials || '?'}
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-medium text-surface-900 dark:text-white leading-tight">{user?.name?.split(' ')[0] || 'Utilisateur'}</p>
              <p className="text-[10px] text-surface-500 dark:text-surface-400">{user?.plan || 'Compte'}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
