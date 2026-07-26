const { Low } = require('lowdb')
const { JSONFile } = require('lowdb/node')
const path = require('path')
const fs = require('fs')

const file = path.join(__dirname, 'data', 'db.json')
if (!fs.existsSync(path.join(__dirname, 'data'))) fs.mkdirSync(path.join(__dirname, 'data'), { recursive: true })
const adapter = new JSONFile(file)
const db = new Low(adapter)

async function init() {
  await db.read()
  db.data = db.data || { users: [], products: [], orders: [] }
  await db.write()
}

module.exports = { db, init }
