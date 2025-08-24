
import { supabase } from '@/lib/supabaseClient'
import { useState } from 'react'
import { LogIn, LogOut } from 'lucide-react'

export default function IndexPage() {
  const [loading, setLoading] = useState(false)

  const signIn = async () => {
    const email = prompt('Email for magic link (OTP)?') || ''
    if (!email) return
    setLoading(true)
    await supabase.auth.signInWithOtp({ email })
    alert('Magic link sent (check your inbox).')
    setLoading(false)
  }

  const signOut = async () => {
    setLoading(true)
    await supabase.auth.signOut()
    setLoading(false)
  }

  return (
    <div className="p-6 space-x-2">
      <button className="px-3 py-2 rounded bg-black text-white disabled:opacity-50" onClick={signIn} disabled={loading}>
        <LogIn className="inline mr-2 h-4 w-4" /> Sign In (OTP)
      </button>
      <button className="px-3 py-2 rounded border disabled:opacity-50" onClick={signOut} disabled={loading}>
        <LogOut className="inline mr-2 h-4 w-4" /> Sign Out
      </button>
    </div>
  )
}
