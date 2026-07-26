const express = require('express')
const router = express.Router()
const { db } = require('../db')
const { auth, adminOnly } = require('../middleware/auth')

// simple stats for dashboard
router.get('/stats', auth, adminOnly, async (req, res) => {
  await db.read()
  const users = db.data.users.length
  const products = db.data.products.length
  const orders = db.data.orders.length
  res.json({ users, products, orders })
})

module.exports = router
