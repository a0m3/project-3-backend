const Question = require("../models/Question")
const {MONEY_LADDER} = require("../models/ladder")

function validateQuestionBody(body) {
    const {question, options, correctAnswer, level} = body

if(!question || typeof question !== "string" || !question.trim()){
    return "Question text is required!"
}

if(!Array.isArray(options) || options.length !==4 || options.some((o) => !o || !String(o).trim())) {
    return "Please provide four valid answer options"
}

if(
    correctAnswer === undefined ||
    correctAnswer === null ||
    Number(correctAnswer) <0 ||
    Number(correctAnswer) >3
){
    return "A valid correct answer must be provided"
}

if (!level || Number.isNaN(Number(level)) || Number(level) <1 || Number(level) > 15){
    return "A difficulty level between 1 and 15 is required"
}

return null

}