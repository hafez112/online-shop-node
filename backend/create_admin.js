// node create_admin.js admin@example.com YourPassword
const bcrypt = require('bcrypt')
const { db, init } = require('./db')
const { v4: uuidv4 } = require('uuid')

async function run() {
  const email = process.argv[2] || 'admin@example.com'
  const password = process.argv[3] || 'admin123'
  await init()
  await db.read()
  const exists = db.data.users.find(u => u.email === email)
  if (exists) {
    console.log('Admin already exists:', email)
    return process.exit(0)
  }
  const hash = await bcrypt.hash(password, 10)
  const admin = { id: uuidv4(), name: 'Admin', email, passwordHash: hash, role: 'admin' }
  db.data.users.push(admin)
  await db.write()
  console.log('Created admin:', email)
}
run().catch(e => { console.error(e); process.exit(1) })
