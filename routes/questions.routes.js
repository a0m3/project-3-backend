const router = require("express").Router()
const verifyToken = require("../middleware/verifyToken")
const isAdmin = require("../middleware/isAdmin")
const validateObjectId = require("../middleware/validateObjectId")
const questionsController = require("../controllers/questions.controller")
const validateQuestions = require("../middleware/validateQuestion")


router.get("/game/play", verifyToken, questionsController.getGameQuestions)

router.get("/", verifyToken, isAdmin, questionsController.getAllQuestions)
router.post("/", verifyToken, isAdmin, validateQuestions, questionsController.createQuestion)
router.get("/:id", verifyToken, isAdmin, validateObjectId, validateQuestions, questionsController.getQuestionById)
router.put("/:id", verifyToken, isAdmin, validateObjectId, validateQuestions, questionsController.updateQuestion)
router.delete("/:id", verifyToken, isAdmin, validateObjectId, questionsController.deleteQuestion)

module.exports = router