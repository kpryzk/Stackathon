'use strict'

const {db} = require('./server/db')
const app = require('./server')
const PORT = 5885

db.sync()
  .then(() => {
    console.log('db synced')
    app.listen(PORT, () => console.log(`connected to ${PORT}`))
  })
