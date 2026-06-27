import { useState } from 'react'

export default function Input({ label, error, icon, type = 'text', className = '', ...props }) {
  const [focused, setFocused] = useState(false)
  const id = props.id || props.name

  return (
    <div className="space-y-1.5">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-surface-700 dark:text-surface-300">
          {label}
        </label>
      )}
      <div className={`relative ${icon ? 'has-icon' : ''}`}>
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-400 dark:text-surface-500 pointer-events-none">
            {icon}
          </div>
        )}
        <input
          id={id}
          type={type}
          className={`input-field ${focused ? 'ring-2 ring-primary-500/40 border-primary-500/50' : ''} ${icon ? 'pl-10' : ''} ${error ? 'border-red-500/50 ring-red-500/30' : ''} ${className}`}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          {...props}
        />
      </div>
      {error && <p className="text-xs text-red-500 dark:text-red-400">{error}</p>}
    </div>
  )
}
