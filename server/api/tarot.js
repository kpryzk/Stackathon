const router = require('express').Router()
const { Tarot } = require('../db')
const Sequelize = require('sequelize')

router.get('/', async (req, res, next) => {
  try {
    const tarot = await Tarot.findAll()
    res.json(tarot)
  } catch (error) {
    next(error)
  }
})

router.get('/randomCard', async (req, res, next) => {
  try {

    const card = await Tarot.findAll({limit: 1, order: [[Sequelize.fn('RANDOM')]]})
    res.json(card)
  } catch (error) {
    next(error)
  }
})

router.get('/randomThree', async (req, res, next) => {
  try {

    const cards = await Tarot.findAll({limit: 3, order: [[Sequelize.fn('RANDOM')]]})
    res.json(cards)
  } catch (error) {
    next(error)
  }
})

router.get('/:tarotId', async (req, res, next) => {
  try {
    const tarot = await Tarot.findOne({where: {
      id : req.params.tarotId
    }})
    res.json(tarot)
  } catch (error) {
    next(error)
  }
})

module.exports = router

