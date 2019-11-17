'use strict'

const db = require('./database')
const Tarot = require('./models/Tarot')
const User = require('./models/User')
const Spread = require('./models/Spread')

Tarot.belongsToMany(User, {through: Spread})

module.exports = {
  db,
  Tarot,
  User,
}
