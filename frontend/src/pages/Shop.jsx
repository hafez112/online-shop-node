import React, { useEffect, useState } from 'react'
import API from '../services/api'
import { Link } from 'react-router-dom'

export default function Shop() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    API.get('/products').then(r => setProducts(r.data)).catch(() => {})
  }, [])

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {products.map(p => (
          <div key={p.id} className="bg-white p-4 rounded shadow">
            <div className="h-40 bg-gray-100 mb-3 flex items-center justify-center text-gray-400">
              {p.images && p.images[0] ? <img src={p.images[0]} alt={p.title} className="h-full object-cover" /> : 'No image'}
            </div>
            <h2 className="font-medium">{p.title}</h2>
            <p className="text-sm text-gray-600">{p.description}</p>
            <div className="mt-2 flex justify-between items-center">
              <div className="text-lg font-bold">${p.price}</div>
              <Link to={`/product/${p.id}`} className="text-sm text-blue-600">View</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
