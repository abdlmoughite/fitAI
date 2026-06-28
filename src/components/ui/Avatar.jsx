import { useState } from 'react'

const lightColors = [
  'bg-primary-100 text-primary-600',
  'bg-accent-100 text-accent-600',
  'bg-amber-100 text-amber-600',
  'bg-pink-100 text-pink-600',
  'bg-cyan-100 text-cyan-600',
]

const darkColors = [
  'bg-primary-500/20 text-primary-400',
  'bg-accent-500/20 text-accent-400',
  'bg-yellow-500/20 text-yellow-400',
  'bg-pink-500/20 text-pink-400',
  'bg-cyan-500/20 text-cyan-400',
]

// Fix: initalsToIndex doit recevoir les couleurs en paramètre
function initalsToIndex(str, colorsList) {
  let hash = 0
  for (let i = 0; i < str.length; i++) hash = str.charCodeAt(i) + ((hash << 5) - hash)
  return Math.abs(hash) % colorsList.length
}

export default function Avatar({ name, initials, src, size = 'md', className = '', status }) {
  const sizes = { sm: 'h-8 w-8 text-xs', md: 'h-10 w-10 text-sm', lg: 'h-12 w-12 text-base', xl: 'h-16 w-16 text-lg' }
  const isDark = typeof document !== 'undefined' && document.documentElement.classList.contains('dark')
  const colors = isDark ? darkColors : lightColors
  const colorClass = initials ? colors[initalsToIndex(initials, colors)] : colors[0]

  const [imgError, setImgError] = useState(false)

  return (
    <div className={`relative inline-flex items-center justify-center rounded-full ${sizes[size] || sizes.md} ${(!src || imgError) ? colorClass : ''} overflow-hidden ${className}`}>
      {src && !imgError ? (
        <img 
          src={src} 
          alt={name || 'Avatar'} 
          className="w-full h-full object-cover" 
          onError={() => setImgError(true)}
        />
      ) : (
        <span className="font-semibold">{initials || '?'}</span>
      )}
      {status && (
        <span className={`absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white dark:border-surface-900 ${status === 'online' ? 'bg-accent-500' : status === 'away' ? 'bg-yellow-400' : 'bg-surface-400 dark:bg-surface-500'}`} />
      )}
    </div>
  )
}
