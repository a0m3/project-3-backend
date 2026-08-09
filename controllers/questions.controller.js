const Question = require("../models/Question")
const { moneyLadder } = require("../models/ladder")




async function getAllQuestions(req, res) {
    try {
        const questions = await Question.find().sort({ level: 1, createdAt: 1 })
        res.status(200).json(questions)
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ message: "Internal server error, try again later." })
    }
}

async function getQuestionById(req, res) {
    try {
        const question = await Question.findById(req.params.id)
        if (!question)
            return res.status(404).json({ message: "Question Not Found." })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ message: "Internal server error, please try again later." })
    }
}

async function createQuestion(req, res) {
    try {
            const { question, options, correctAnswer, level } = req.body
            const createdQuestion = await Question.create({
                question: question,
                options: options,
                correctAnswer: Number(correctAnswer),
                level: Number(level),
                createdBy: req.user._id
            })
            res.status(201).json(createdQuestion)
        
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error, please try again later." });
    }
}

async function updateQuestion(req, res) {
    try {


        const { question, options, correctAnswer, level } = req.body
        const updated = await Question.findByIdAndUpdate(
            req.params.id,
            {
                question: question,
                options: options.map((o) => o),
                correctAnswer: Number(correctAnswer),
                level: Number(level)
            }, { new: true, runValidators: true })
        if (!updated) {
            return res.status(404).json({ message: "Question Not Found" })
            res.status(200).json(updated)
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error, please try again later." });
    }
}

async function deleteQuestion(req, res) {
    try {
        const deletedQuestion = await Question.findByIdAndDelete(req.params.id)
        if (!deletedQuestion) {
            return res.status(404).json({ message: "Question Not Found" })
        }
        res.status(200).json("Question Deleted")
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error, try again later." });
    }
}


async function getGameQuestions(req, res) {
    try {
        const questions = []

        for (let level = 1; level <= moneyLadder.length; level++) {
            const question = await Question.aggregate([
                { $match: { level: level } },
                { $sample: { size: 1 } }
            ])

            if (question.length > 0) {
                questions.push(question[0])
            }
        }

        if (questions.length === 0) {
            return res.status(404).json({
                message: "No questions available."
            })
        }

        res.status(200).json({
            questions: questions,
            ladder: moneyLadder.slice(0, questions.length)
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error. please try again later" })
    }
}


module.exports = {
    getAllQuestions,
    getQuestionById,
    createQuestion,
    updateQuestion,
    deleteQuestion,
    getGameQuestions
}