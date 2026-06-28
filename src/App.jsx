import { Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from './components/ThemeContext'
import { AuthProvider } from './context/AuthContext'
import RoleGuard from './components/dashboard/RoleGuard'
import PublicLayout from './layouts/PublicLayout'
import AuthLayout from './layouts/AuthLayout'
import DashboardLayout from './layouts/DashboardLayout'
import LandingPage from './pages/landing/LandingPage'
import FeaturesPage from './pages/landing/FeaturesPage'
import PricingPage from './pages/landing/PricingPage'
import AboutPage from './pages/landing/AboutPage'
import LoginPage from './pages/auth/LoginPage'
import RegisterPage from './pages/auth/RegisterPage'
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage'
import ResetPasswordPage from './pages/auth/ResetPasswordPage'
import OverviewPage from './pages/dashboard/OverviewPage'
import AICoachPage from './pages/dashboard/AICoachPage'
import WorkoutGeneratorPage from './pages/dashboard/WorkoutGeneratorPage'
import TrainingSessionPage from './pages/dashboard/TrainingSessionPage'
import AnalyticsPage from './pages/dashboard/AnalyticsPage'
import ProfilePage from './pages/dashboard/ProfilePage'
import SuperAdminOverview from './pages/dashboard/SuperAdminOverview'
import SuperAdminAdmins from './pages/dashboard/SuperAdminAdmins'
import SuperAdminSystem from './pages/dashboard/SuperAdminSystem'
import SuperAdminLogs from './pages/dashboard/SuperAdminLogs'
import AdminOverview from './pages/dashboard/AdminOverview'
import AdminTickets from './pages/dashboard/AdminTickets'
import AdminModeration from './pages/dashboard/AdminModeration'

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Routes>
          <Route element={<PublicLayout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/features" element={<FeaturesPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Route>

          <Route element={<AuthLayout />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
          </Route>

          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<RoleGuard roles={['client']}><OverviewPage /></RoleGuard>} />
            <Route path="ai-coach" element={<RoleGuard roles={['client']}><AICoachPage /></RoleGuard>} />
            <Route path="workout-generator" element={<RoleGuard roles={['client']}><WorkoutGeneratorPage /></RoleGuard>} />
            <Route path="training" element={<RoleGuard roles={['client']}><TrainingSessionPage /></RoleGuard>} />
            <Route path="analytics" element={<RoleGuard roles={['client']}><AnalyticsPage /></RoleGuard>} />
            <Route path="profile" element={<ProfilePage />} />

            <Route path="super" element={<RoleGuard roles={['super_admin']}><SuperAdminOverview /></RoleGuard>} />
            <Route path="super/admins" element={<RoleGuard roles={['super_admin']}><SuperAdminAdmins /></RoleGuard>} />
            <Route path="super/system" element={<RoleGuard roles={['super_admin']}><SuperAdminSystem /></RoleGuard>} />
            <Route path="super/logs" element={<RoleGuard roles={['super_admin']}><SuperAdminLogs /></RoleGuard>} />

            <Route path="admin" element={<RoleGuard roles={['admin']}><AdminOverview /></RoleGuard>} />
            <Route path="admin/tickets" element={<RoleGuard roles={['admin']}><AdminTickets /></RoleGuard>} />
            <Route path="admin/moderation" element={<RoleGuard roles={['admin']}><AdminModeration /></RoleGuard>} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </ThemeProvider>
  )
}
