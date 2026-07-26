const express = require('express')
const router = express.Router()
const { db } = require('../db')
const { auth, adminOnly } = require('../middleware/auth')
const { v4: uuidv4 } = require('uuid')

// create order (customer)
router.post('/', async (req, res) => {
  await db.read()
  const { items, customer } = req.body
  if (!items || !Array.isArray(items) || items.length === 0) return res.status(400).json({ message: 'No items' })
  const order = { id: uuidv4(), items, customer: customer || {}, status: 'pending', createdAt: new Date().toISOString() }
  db.data.orders.push(order)
  await db.write()
  res.status(201).json(order)
})

// list orders (admin)
router.get('/', auth, adminOnly, async (req, res) => {
  await db.read()
  res.json(db.data.orders)
})

// update order status (admin)
router.put('/:id/status', auth, adminOnly, async (req, res) => {
  await db.read()
  const order = db.data.orders.find(o => o.id === req.params.id)
  if (!order) return res.status(404).json({ message: 'Not found' })
  order.status = req.body.status || order.status
  await db.write()
  res.json(order)
})

module.exports = router
