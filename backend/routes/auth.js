const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { db } = require('../db')
const { v4: uuidv4 } = require('uuid')

const JWT_SECRET = process.env.JWT_SECRET || 'change_this_secret'

// Register (open)
router.post('/register', async (req, res) => {
  await db.read()
  const { name, email, password } = req.body
  if (!email || !password) return res.status(400).json({ message: 'email/password required' })
  if (db.data.users.find(u => u.email === email)) return res.status(400).json({ message: 'Email exists' })
  const hash = await bcrypt.hash(password, 10)
  const user = { id: uuidv4(), name: name || 'User', email, passwordHash: hash, role: 'customer' }
  db.data.users.push(user)
  await db.write()
  const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '7d' })
  res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } })
})

// Login
router.post('/login', async (req, res) => {
  await db.read()
  const { email, password } = req.body
  const user = db.data.users.find(u => u.email === email)
  if (!user) return res.status(401).json({ message: 'Invalid credentials' })
  const ok = await bcrypt.compare(password, user.passwordHash)
  if (!ok) return res.status(401).json({ message: 'Invalid credentials' })
  const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '7d' })
  res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } })
})

module.exports = router
