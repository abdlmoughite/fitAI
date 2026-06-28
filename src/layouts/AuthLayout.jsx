import { Outlet } from 'react-router-dom'

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] dark:bg-surface-950 mesh-bg p-4">
      <Outlet />
    </div>
  )
}
