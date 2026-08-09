const router = require("express").Router()
const verifyToken = require("../middleware/verifyToken")
const isAdmin = require("../middleware/isAdmin")
const validateObjectId = require("../middleware/validateObjectId")
const questionsController = require("../controllers/questions.controller")
const validateQuestion = require("../middleware/validateQuestion")


router.get("/game/play", verifyToken, validateQuestion, questionsController.getGameQuestions)

router.get("/", verifyToken, isAdmin, validateQuestion, questionsController.getAllQuestions)
router.post("/", verifyToken, isAdmin, validateQuestion, questionsController.createQuestion)
router.get("/:id", verifyToken, isAdmin, validateObjectId, validateQuestion, questionsController.getQuestionById)
router.put("/:id", verifyToken, isAdmin, validateObjectId, validateQuestion, questionsController.updateQuestion)
router.delete("/:id", verifyToken, isAdmin, validateObjectId, validateQuestion, questionsController.deleteQuestion)

module.exports = router