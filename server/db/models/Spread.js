const Sequelize = require('sequelize')
const db = require('../database')

module.exports = db.define('spread', {
  date: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  }
})
