import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'
import { authService } from '../../services/authService'
import { icons } from '../../data/icons'

export default function ResetPasswordPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')
  
  const [loading, setLoading] = useState(false)
  const [validating, setValidating] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [tokenValid, setTokenValid] = useState(false)

  useEffect(() => {
    const validateToken = async () => {
      if (!token) {
        setError('Token manquant. Veuillez utiliser le lien envoyé par email.')
        setValidating(false)
        return
      }

      try {
        const isValid = await authService.validateResetToken(token)
        setTokenValid(isValid)
        if (!isValid) {
          setError('Token invalide ou expiré. Veuillez demander un nouveau lien.')
        }
      } catch (err) {
        setError('Erreur lors de la validation du token.')
      } finally {
        setValidating(false)
      }
    }

    validateToken()
  }, [token])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas.')
      return
    }

    if (password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères.')
      return
    }

    setLoading(true)
    try {
      await authService.resetPassword(token, password)
      setSuccess(true)
      setTimeout(() => {
        navigate('/login')
      }, 3000)
    } catch (err) {
      const msg = err.response?.data?.error || err.message || 'Une erreur est survenue'
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  if (validating) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-2xl shadow-[0_4px_24px_0_rgba(0,0,0,0.06)] border border-[#E2E8F0] p-8 dark:bg-surface-800/40 dark:border-surface-700/30">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
            <p className="mt-4 text-sm text-surface-500 dark:text-surface-400">Validation du token...</p>
          </div>
        </div>
      </motion.div>
    )
  }

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-2xl shadow-[0_4px_24px_0_rgba(0,0,0,0.06)] border border-[#E2E8F0] p-8 dark:bg-surface-800/40 dark:border-surface-700/30">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center dark:bg-green-500/20">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600 dark:text-green-400"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            </div>
            <h1 className="text-xl font-bold text-surface-900 dark:text-white mb-2">
              Mot de passe réinitialisé !
            </h1>
            <p className="text-sm text-surface-500 dark:text-surface-400 mb-4">
              Vous pouvez maintenant vous connecter avec votre nouveau mot de passe.
            </p>
            <p className="text-xs text-surface-400 dark:text-surface-500">
              Redirection vers la page de connexion...
            </p>
          </div>
        </div>
      </motion.div>
    )
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
            Réinitialiser le mot de passe
          </h1>
          <p className="text-sm text-surface-500 dark:text-surface-400 mt-1">
            Entrez votre nouveau mot de passe
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm dark:bg-red-500/10 dark:border-red-500/20 dark:text-red-400">
            {error}
          </div>
        )}

        {!tokenValid ? (
          <div className="text-center py-4">
            <Link to="/forgot-password" className="text-primary-600 hover:text-primary-500 font-medium transition-colors dark:text-primary-400">
              Demander un nouveau lien
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Nouveau mot de passe"
              type="password"
              placeholder="••••••••"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              }
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <Input
              label="Confirmer le mot de passe"
              type="password"
              placeholder="••••••••"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              }
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
            />

            <Button type="submit" variant="primary" size="lg" className="w-full" loading={loading}>
              Réinitialiser le mot de passe
            </Button>
          </form>
        )}

        <div className="mt-4 pt-4 border-t border-[#E2E8F0] dark:border-surface-700/50 text-center">
          <p className="text-sm text-surface-500 dark:text-surface-400">
            <Link to="/login" className="text-primary-600 hover:text-primary-500 font-medium transition-colors dark:text-primary-400">
              Retour à la connexion
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
