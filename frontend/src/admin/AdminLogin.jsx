import React, { useState } from 'react'
import API, { setAuthToken } from '../services/api'
import { useNavigate } from 'react-router-dom'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [err, setErr] = useState('')
  const nav = useNavigate()

  async function submit(e) {
    e.preventDefault()
    try {
      const r = await API.post('/auth/login', { email, password })
      localStorage.setItem('token', r.data.token)
      setAuthToken(r.data.token)
      nav('/admin/dashboard')
    } catch (e) {
      setErr(e.response?.data?.message || 'Login failed')
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Admin Login</h2>
      {err && <div className="text-red-600 mb-2">{err}</div>}
      <form onSubmit={submit}>
        <input className="w-full mb-2 p-2 border rounded" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input className="w-full mb-2 p-2 border rounded" placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <button className="bg-slate-800 text-white px-4 py-2 rounded">Login</button>
      </form>
    </div>
  )
}
