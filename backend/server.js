const express = require('express')
const cors = require('cors')
const { init } = require('./db')
const authRoutes = require('./routes/auth')
const productsRoutes = require('./routes/products')
const ordersRoutes = require('./routes/orders')
const adminRoutes = require('./routes/admin')
const path = require('path')

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/products', productsRoutes)
app.use('/api/orders', ordersRoutes)
app.use('/api/admin', adminRoutes)

// serve frontend if built
const frontendDist = path.join(__dirname, '..', 'frontend', 'dist')
app.use(express.static(frontendDist))
app.get('*', (req, res) => {
  res.sendFile(path.join(frontendDist, 'index.html'))
})

const PORT = process.env.PORT || 4000
init().then(() => {
  app.listen(PORT, () => console.log(`Backend running on ${PORT}`))
})
