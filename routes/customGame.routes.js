const router = require('express').Router()
const verifyToken = require('../middleware/verifyToken')
const validateQuestions = require('../middleware/validateQuestion')
const customGamecontroller = require('../controllers/customGames.controller')

router.post('/', verifyToken, validateQuestions, customGamecontroller.createCustomGame)

router.get('/', verifyToken, customGamecontroller.getMyCustomGames)

router.get('/:id', verifyToken, customGamecontroller.getGameById)

router.put('/:id', verifyToken, validateQuestions, customGamecontroller.updateCustomGame)

router.delete('/:id', verifyToken, customGamecontroller.deleteGame)

router.get('/:id/play', verifyToken, customGamecontroller.playGame)

module.exports = router