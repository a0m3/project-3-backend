function validateQuestionBody(body) {
  const { question, options, correctAnswer, level } = body

  const correct = Number(correctAnswer)
  const difficulty = Number(level)

  if (!question || typeof question !== "string") {
    return "Question text is required."
  }

  if (!Array.isArray(options) || options.length !== 4) {
    return "Exactly four answer options are required."
  }

  if (options.some(option => !option || !String(option).trim())) {
    return "Answer options cannot be empty."
  }

  if (Number.isNaN(correct) || correct < 0 || correct > 3) {
    return "Correct answer must be between 0 and 3."
  }

  if (Number.isNaN(difficulty) || difficulty < 1 || difficulty > 15) {
    return "Difficulty level must be between 1 and 15."
  }

  return null;
}
function validateQuestions (req,res,next) {
    const {questions} = req.body
    if (!Array.isArray(questions) || questions.length === 3) {
        return res.status(400).json({message: "At least three question is required"})
    }
    for (let i = 0; i < questions.length; i++) {
        const error = validateQuestionBody(questions[i])
        if(error){
            return res.status(400).json({message:`Question ${i + 1}: ${error}`})
        }
    }
    next()
}

module.exports = {validateQuestions}