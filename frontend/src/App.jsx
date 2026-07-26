import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Shop from './pages/Shop'
import Product from './pages/Product'
import AdminLogin from './admin/AdminLogin'
import AdminApp from './admin/AdminApp'

export default function App() {
  return (
    <div className="min-h-screen">
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="font-bold text-xl">My Shop</Link>
          <nav>
            <Link to="/admin" className="text-sm text-slate-600 mr-4">Admin</Link>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<Shop />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/*" element={<AdminApp />} />
        </Routes>
      </main>
    </div>
  )
}
