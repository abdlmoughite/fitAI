import { Link } from 'react-router-dom'

export default function PublicFooter() {
  return (
    <footer className="border-t border-[#E2E8F0] dark:border-surface-800 bg-white dark:bg-surface-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6.5 6.5 17.5 17.5"/><path d="M12 3 21 12"/><path d="M3 12 12 21"/></svg>
              </div>
              <span className="font-bold text-surface-900 dark:text-white text-lg">FitAI</span>
            </div>
            <p className="text-sm text-surface-500 dark:text-surface-400 leading-relaxed max-w-xs">
              Ton coach fitness intelligent qui s'adapte à tes objectifs, ton niveau et ta progression.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-surface-900 dark:text-white mb-3">Produit</h4>
            <div className="flex flex-col gap-2">
              <Link to="/features" className="text-sm text-surface-500 dark:text-surface-400 hover:text-surface-700 dark:hover:text-white transition-colors">Fonctionnalités</Link>
              <Link to="/pricing" className="text-sm text-surface-500 dark:text-surface-400 hover:text-surface-700 dark:hover:text-white transition-colors">Tarifs</Link>
              <Link to="/about" className="text-sm text-surface-500 dark:text-surface-400 hover:text-surface-700 dark:hover:text-white transition-colors">À propos</Link>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-surface-900 dark:text-white mb-3">Légal</h4>
            <div className="flex flex-col gap-2">
              <span className="text-sm text-surface-500 dark:text-surface-400">Confidentialité</span>
              <span className="text-sm text-surface-500 dark:text-surface-400">CGV</span>
              <span className="text-sm text-surface-500 dark:text-surface-400">Mentions légales</span>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-surface-900 dark:text-white mb-3">Contact</h4>
            <div className="flex flex-col gap-2">
              <span className="text-sm text-surface-500 dark:text-surface-400">hello@fitai.coach</span>
              <span className="text-sm text-surface-500 dark:text-surface-400">@fitai.coach</span>
            </div>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-[#E2E8F0] dark:border-surface-800 text-center text-sm text-surface-500 dark:text-surface-500">
          &copy; {new Date().getFullYear()} FitAI Coach. Tous droits réservés.
        </div>
      </div>
    </footer>
  )
}
