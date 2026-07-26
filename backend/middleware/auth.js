const jwt = require('jsonwebtoken')
const { db } = require('../db')
const JWT_SECRET = process.env.JWT_SECRET || 'change_this_secret'

async function auth(req, res, next) {
  const header = req.headers.authorization
  if (!header) return res.status(401).json({ message: 'No token' })
  const token = header.split(' ')[1]
  try {
    const payload = jwt.verify(token, JWT_SECRET)
    await db.read()
    req.user = db.data.users.find(u => u.id === payload.id) || { id: payload.id, role: payload.role }
    next()
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' })
  }
}

function adminOnly(req, res, next) {
  if (!req.user || req.user.role !== 'admin') return res.status(403).json({ message: 'Admins only' })
  next()
}

module.exports = { auth, adminOnly }
