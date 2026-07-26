import React from 'react'
import { Routes, Route, Link, Navigate } from 'react-router-dom'
import Dashboard from './Dashboard'
import ProductsAdmin from './ProductsAdmin'

function requireAuth() {
  return !!localStorage.getItem('token')
}

export default function AdminApp() {
  if (!requireAuth()) {
    return <Navigate to="/admin/login" replace />
  }
  return (
    <div className="flex gap-6">
      <aside className="w-64 bg-white p-4 rounded shadow">
        <h3 className="font-semibold mb-4">Admin</h3>
        <ul>
          <li><Link to="/admin/dashboard" className="text-sm text-slate-600">Dashboard</Link></li>
          <li><Link to="/admin/products" className="text-sm text-slate-600">Products</Link></li>
        </ul>
        <button className="mt-4 text-sm text-red-600" onClick={() => { localStorage.removeItem('token'); window.location.href = '/' }}>Logout</button>
      </aside>
      <section className="flex-1">
        <Routes>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="products" element={<ProductsAdmin />} />
          <Route index element={<Navigate to="dashboard" replace />} />
        </Routes>
      </section>
    </div>
  )
}
