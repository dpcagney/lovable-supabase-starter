
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'

export default function DashboardPage() {
  const [data, setData] = useState<{ ts: string; value: number }[]>([])

  useEffect(() => {
    supabase.from('metrics').select('*').order('ts', { ascending: true }).then(({ data }) => {
      if (data) setData(data as any)
    })
    const channel = supabase
      .channel('public:metrics')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'metrics' }, payload => {
        if (payload.eventType === 'INSERT') setData(prev => [...prev, payload.new as any])
      })
      .subscribe()
    return () => { supabase.removeChannel(channel) }
  }, [])

  return (
    <div className="p-6 h-[500px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3"/>
          <XAxis dataKey="ts" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="value" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
