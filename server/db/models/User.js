const Sequelize = require('sequelize')
const db = require('../database')

module.exports = db.define('student', {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      isEmail: true,
    },
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue:
      'https://a.1stdibscdn.com/jackson-pollock-prints-works-on-paper-expression-no-6-original-serigraph-after-jackson-pollock-1964-for-sale-picture-2/a_6503/1549103659644/J_67974_1_HD_copia_master.jpg',
  },
  gpa: {
    type: Sequelize.DECIMAL,
    validate: {
      min: 0.0,
      max: 4.0,
    },
  },
})
