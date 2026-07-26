import React, { useEffect, useState } from 'react'
import API from '../services/api'

export default function ProductsAdmin() {
  const [products, setProducts] = useState([])
  const [form, setForm] = useState({ title: '', price: '', stock: '' })

  useEffect(() => { load() }, [])

  function load() { API.get('/products').then(r => setProducts(r.data)).catch(() => {}) }

  async function create(e) {
    e.preventDefault()
    await API.post('/products', { ...form, price: Number(form.price), stock: Number(form.stock) })
    setForm({ title: '', price: '', stock: '' })
    load()
  }

  async function remove(id) {
    if (!confirm('Delete product?')) return
    await API.delete(`/products/${id}`)
    load()
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-3">Products Admin</h2>

      <form onSubmit={create} className="mb-4 bg-white p-4 rounded shadow">
        <input className="w-full p-2 mb-2 border rounded" placeholder="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
        <input className="w-full p-2 mb-2 border rounded" placeholder="Price" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} />
        <input className="w-full p-2 mb-2 border rounded" placeholder="Stock" value={form.stock} onChange={e => setForm({ ...form, stock: e.target.value })} />
        <button className="bg-teal-600 text-white px-4 py-2 rounded">Create</button>
      </form>

      <div className="grid gap-3">
        {products.map(p => (
          <div key={p.id} className="bg-white p-4 rounded shadow flex justify-between items-center">
            <div>
              <div className="font-medium">{p.title}</div>
              <div className="text-sm text-gray-600">${p.price} • stock {p.stock}</div>
            </div>
            <div>
              <button className="text-red-600 mr-2" onClick={() => remove(p.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
