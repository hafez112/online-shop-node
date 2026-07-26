const express = require('express')
const router = express.Router()
const { db } = require('../db')
const { auth, adminOnly } = require('../middleware/auth')
const { v4: uuidv4 } = require('uuid')

// list products
router.get('/', async (req, res) => {
  await db.read()
  res.json(db.data.products)
})

// get product
router.get('/:id', async (req, res) => {
  await db.read()
  const p = db.data.products.find(x => x.id === req.params.id)
  if (!p) return res.status(404).json({ message: 'Not found' })
  res.json(p)
})

// admin create
router.post('/', auth, adminOnly, async (req, res) => {
  await db.read()
  const data = req.body
  const product = { id: uuidv4(), title: data.title || 'Untitled', description: data.description || '', price: Number(data.price) || 0, stock: Number(data.stock) || 0, images: data.images || [] }
  db.data.products.push(product)
  await db.write()
  res.status(201).json(product)
})

// admin update
router.put('/:id', auth, adminOnly, async (req, res) => {
  await db.read()
  const idx = db.data.products.findIndex(x => x.id === req.params.id)
  if (idx === -1) return res.status(404).json({ message: 'Not found' })
  db.data.products[idx] = { ...db.data.products[idx], ...req.body }
  await db.write()
  res.json(db.data.products[idx])
})

// admin delete
router.delete('/:id', auth, adminOnly, async (req, res) => {
  await db.read()
  db.data.products = db.data.products.filter(x => x.id !== req.params.id)
  await db.write()
  res.json({ ok: true })
})

module.exports = router
