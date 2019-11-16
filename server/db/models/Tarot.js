const Sequelize = require('sequelize')
const db = require('../database')

module.exports = db.define('tarot', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue:
      'https://live.staticflickr.com/8752/17121964950_cf8ec1d25d_b.jpg',
  },
  address: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  description: {
    type: Sequelize.TEXT,
  },
})
