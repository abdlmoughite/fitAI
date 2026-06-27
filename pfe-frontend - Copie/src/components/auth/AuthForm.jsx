import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import Input from '../ui/Input'
import Button from '../ui/Button'
import { useAuth } from '../../context/AuthContext'
import { icons } from '../../data/icons'

export default function AuthForm({ mode = 'login' }) {
  const { login, register } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const isLogin = mode === 'login'

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      let user
      if (isLogin) {
        user = await login(email, password)
      } else {
        if (!firstname.trim()) { setError('Le prénom est requis'); setLoading(false); return }
        user = await register(firstname.trim(), lastname.trim(), email, password)
      }
      const redirect = user.role === 'super_admin' ? '/dashboard/super'
        : user.role === 'admin' ? '/dashboard/admin'
        : '/dashboard'
      navigate(redirect)
    } catch (err) {
      const msg = err.response?.data?.error || err.message || 'Une erreur est survenue'
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  const quickFill = (role) => {
    const accounts = {
      super_admin: { email: 'superadmin@fitai.com', password: '123456' },
      admin: { email: 'admin@fitai.com', password: '123456' },
      client: { email: 'client@fitai.com', password: '123456' },
    }
    const acc = accounts[role]
    setEmail(acc.email)
    setPassword(acc.password)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-md"
    >
      <div className="bg-white rounded-2xl shadow-[0_4px_24px_0_rgba(0,0,0,0.06)] border border-[#E2E8F0] p-8 dark:bg-surface-800/40 dark:border-surface-700/30">
        <div className="text-center mb-6">
          <Link to="/" className="inline-flex items-center gap-2.5 mb-4">
            <div className="w-9 h-9 rounded-lg gradient-bg flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6.5 6.5 17.5 17.5"/><path d="M12 3 21 12"/><path d="M3 12 12 21"/></svg>
            </div>
            <span className="font-bold text-surface-900 text-xl dark:text-white">FitAI</span>
          </Link>
          <h1 className="text-xl font-bold text-surface-900 dark:text-white">
            {isLogin ? 'Connecte-toi' : 'Crée ton compte'}
          </h1>
          <p className="text-sm text-surface-500 dark:text-surface-400 mt-1">
            {isLogin ? 'Accède à ton espace FitAI' : 'Commence ton parcours fitness'}
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm dark:bg-red-500/10 dark:border-red-500/20 dark:text-red-400">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div className="grid grid-cols-2 gap-3">
              <Input
                label="Prénom"
                placeholder="Alexandre"
                icon={icons.user}
                value={firstname}
                onChange={e => setFirstname(e.target.value)}
              />
              <Input
                label="Nom"
                placeholder="Martin"
                value={lastname}
                onChange={e => setLastname(e.target.value)}
              />
            </div>
          )}
          <Input
            label="Email"
            type="email"
            placeholder="exemple@email.com"
            icon={icons.mail}
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <Input
            label="Mot de passe"
            type="password"
            placeholder="••••••••"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            }
            value={password}
            onChange={e => setPassword(e.target.value)}
          />

          {isLogin && (
            <div className="flex justify-end">
              <span className="text-xs text-primary-600 hover:text-primary-500 cursor-pointer transition-colors dark:text-primary-400">Mot de passe oublié ?</span>
            </div>
          )}

          <Button type="submit" variant="primary" size="lg" className="w-full" loading={loading}>
            {isLogin ? 'Se connecter' : 'Créer mon compte'}
          </Button>
        </form>

        {isLogin && (
          <div className="mt-5 pt-4 border-t border-[#E2E8F0] dark:border-surface-700/50">
            <p className="text-xs text-surface-500 dark:text-surface-400 text-center mb-2">Comptes de démonstration :</p>
            <div className="flex flex-wrap justify-center gap-1.5">
              <button onClick={() => quickFill('super_admin')} className="px-2.5 py-1 text-[10px] rounded-lg bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100 transition-colors dark:bg-yellow-500/10 dark:text-yellow-400 dark:border-yellow-500/20">
                Super Admin
              </button>
              <button onClick={() => quickFill('admin')} className="px-2.5 py-1 text-[10px] rounded-lg bg-accent-50 text-accent-700 border border-accent-200 hover:bg-accent-100 transition-colors dark:bg-accent-500/10 dark:text-accent-400 dark:border-accent-500/20">
                Admin
              </button>
              <button onClick={() => quickFill('client')} className="px-2.5 py-1 text-[10px] rounded-lg bg-primary-50 text-primary-700 border border-primary-200 hover:bg-primary-100 transition-colors dark:bg-primary-500/10 dark:text-primary-400 dark:border-primary-500/20">
                Client
              </button>
            </div>
          </div>
        )}

        <div className="mt-4 pt-4 border-t border-[#E2E8F0] dark:border-surface-700/50 text-center">
          <p className="text-sm text-surface-500 dark:text-surface-400">
            {isLogin ? "Pas encore de compte ?" : 'Déjà un compte ?'}{' '}
            <Link to={isLogin ? '/register' : '/login'} className="text-primary-600 hover:text-primary-500 font-medium transition-colors dark:text-primary-400">
              {isLogin ? "S'inscrire" : 'Se connecter'}
            </Link>
          </p>
        </div>
      </div>

      <div className="flex justify-center mt-4">
        <Link to="/" className="inline-flex items-center gap-1.5 text-xs text-surface-400 hover:text-surface-600 transition-colors dark:text-surface-500 dark:hover:text-surface-300">
          {icons.chevronRight}
          Retour à l'accueil
        </Link>
      </div>
    </motion.div>
  )
}
