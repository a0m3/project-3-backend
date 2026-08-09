function validateQuestionBody(body) {
    const { question, options, correctAnswer, level } = body

    if (!question || typeof question !== "string" || !question.trim()) {
        return "Question text is required!"
    }

    if (!Array.isArray(options) || options.length !== 4 || options.some((o) => !o || !String(o).trim())) {
        return "Please provide four valid answer options"
    }

    if (
        correctAnswer === undefined ||
        correctAnswer === null ||
        Number(correctAnswer) < 0 ||
        Number(correctAnswer) > 3
    ) {
        return "A valid correct answer must be provided"
    }

    if (!level || Number.isNaN(Number(level)) || Number(level) < 1 || Number(level) > 15) {
        return "A difficulty level between 1 and 15 is required"
    }

    return null
}

function validateQuestions (req,res,next) {
    const {questions} = req.body
    if (!Array.isArray(questions) || questions.length === 0) {
        return res.status(400).json({message: "At least one question is required"})
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