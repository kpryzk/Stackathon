const router = require('express').Router()
const { Tarot } = require('../db')

router.get('/', async (req, res, next) => {
  try {
    const tarot = await Tarot.findAll()
    res.json(tarot)
  } catch (error) {
    next(error)
  }
})

module.exports = router