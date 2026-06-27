export default function Skeleton({ className = '', variant = 'text' }) {
  const base = 'animate-pulse bg-[#E2E8F0] dark:bg-surface-700/50 rounded-lg'
  const variants = {
    text: 'h-4 w-full',
    title: 'h-6 w-3/4',
    avatar: 'h-10 w-10 rounded-full',
    card: 'h-32 w-full rounded-2xl',
    chart: 'h-48 w-full rounded-2xl',
    kpi: 'h-24 w-full rounded-2xl',
  }
  return <div className={`${base} ${variants[variant] || variants.text} ${className}`} />
}

export function CardSkeleton() {
  return (
    <div className="glass-card p-5 space-y-4">
      <Skeleton variant="title" />
      <Skeleton variant="text" />
      <Skeleton variant="text" className="w-2/3" />
    </div>
  )
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1,2,3,4].map(i => <Skeleton key={i} variant="kpi" />)}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2"><Skeleton variant="chart" /></div>
        <div><Skeleton variant="card" /></div>
      </div>
    </div>
  )
}
