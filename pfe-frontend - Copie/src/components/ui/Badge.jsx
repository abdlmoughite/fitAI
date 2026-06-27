const variants = {
  primary: 'badge-primary',
  accent: 'badge-accent',
  warning: 'badge-warning',
  danger: 'badge-danger',
  default: 'badge bg-[#F1F5F9] text-surface-600 border border-[#E2E8F0] dark:bg-surface-700/50 dark:text-surface-300 dark:border-surface-600/50',
}

export default function Badge({ children, variant = 'default', className = '', dot }) {
  return (
    <span className={`${variants[variant] || variants.default} ${className}`}>
      {dot && <span className={`w-1.5 h-1.5 rounded-full ${variant === 'accent' ? 'bg-accent-500' : variant === 'warning' ? 'bg-yellow-500' : variant === 'danger' ? 'bg-red-500' : 'bg-primary-500'}`} />}
      {children}
    </span>
  )
}
