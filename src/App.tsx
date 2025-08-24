
import { Route, Routes, Navigate, Link } from 'react-router-dom'
import IndexPage from './routes/index'
import DashboardPage from './routes/dashboard'
import SettingsPage from './routes/settings'
import { supabase } from './lib/supabaseClient'
import { useEffect, useState } from 'react'

export default function App() {
  const [session, setSession] = useState<null | Awaited<ReturnType<typeof supabase.auth.getSession>>['data']['session']>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session))
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s))
    return () => sub.subscription.unsubscribe()
  }, [])

  return (
    <div className="min-h-dvh">
      <nav className="border-b px-4 py-2 flex gap-4">
        <Link to="/">Home</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/settings">Settings</Link>
      </nav>

      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/dashboard" element={session ? <DashboardPage /> : <Navigate to="/" />} />
        <Route path="/settings" element={session ? <SettingsPage /> : <Navigate to="/" />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  )
}
