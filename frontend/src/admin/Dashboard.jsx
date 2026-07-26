import React, { useEffect, useState } from 'react'
import API from '../services/api'

export default function Dashboard() {
  const [stats, setStats] = useState(null)

  useEffect(() => {
    API.get('/admin/stats').then(r => setStats(r.data)).catch(() => {})
  }, [])

  if (!stats) return <div>Loading...</div>

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-white p-4 rounded shadow">
        <div className="text-sm text-gray-500">Users</div>
        <div className="text-2xl font-bold">{stats.users}</div>
      </div>
      <div className="bg-white p-4 rounded shadow">
        <div className="text-sm text-gray-500">Products</div>
        <div className="text-2xl font-bold">{stats.products}</div>
      </div>
      <div className="bg-white p-4 rounded shadow">
        <div className="text-sm text-gray-500">Orders</div>
        <div className="text-2xl font-bold">{stats.orders}</div>
      </div>
    </div>
  )
}
