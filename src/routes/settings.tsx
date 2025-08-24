
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabaseClient'

export default function SettingsPage() {
  const qc = useQueryClient()

  const profileQuery = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return null
      const { data, error } = await supabase.from('profiles').select('*').eq('id', user.id).single()
      if (error) throw error
      return data
    }
  })

  const updateProfile = useMutation({
    mutationFn: async (full_name: string) => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('No user')
      const { error } = await supabase.from('profiles').update({ full_name }).eq('id', user.id)
      if (error) throw error
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['profile'] })
  })

  if (profileQuery.isLoading) return <div className="p-6">Loading…</div>
  if (!profileQuery.data) return <div className="p-6">Sign in to view settings.</div>

  return (
    <div className="p-6 space-y-4">
      <div>Full name: {profileQuery.data.full_name ?? '—'}</div>
      <button
        className="px-3 py-2 rounded bg-black text-white"
        onClick={() => updateProfile.mutate(prompt('New name?') || '')}
      >
        Update Name
      </button>
    </div>
  )
}
