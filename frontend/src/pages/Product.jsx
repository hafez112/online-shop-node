import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import API from '../services/api'

export default function Product() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)

  useEffect(() => {
    API.get(`/products/${id}`).then(r => setProduct(r.data)).catch(() => {})
  }, [id])

  if (!product) return <div>Loading...</div>

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
      <div className="mb-4 text-gray-700">{product.description}</div>
      <div className="text-xl font-semibold mb-4">${product.price}</div>
      <button className="bg-teal-500 text-white px-4 py-2 rounded">Add to cart (demo)</button>
    </div>
  )
}
