const router = require("express").Router()
const verifyToken = require("../middleware/verifyToken")
const historyController = require("")

router.use(verifyToken)

module.exports = router