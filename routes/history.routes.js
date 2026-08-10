const router = require("express").Router()
const verifyToken = require("../middleware/verifyToken")
const historyController = require("")

router.use(verifyToken)

router.post("/", historyController.createHistory)
router.get("/", historyController.getMyHistory)

module.exports = router