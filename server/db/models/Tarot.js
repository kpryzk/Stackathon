const Sequelize = require('sequelize')
const db = require('../database')

const Tarot = db.define('tarot', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  name_short: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  value: {
    type: Sequelize.STRING,
  },
  value_int: {
    type: Sequelize.INTEGER
  },
  suit: {
    type: Sequelize.STRING
  },
  type: {
    type: Sequelize.STRING
  },
  meaning_up: {
    type: Sequelize.TEXT
  },
  meaning_rev: {
    type: Sequelize.TEXT
  },
  desc: {
    type: Sequelize.TEXT
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: 'http://www.aeclectic.net/tarot/cards/_img/madame-endora-08642.jpg'
  }
})

module.exports = Tarot
