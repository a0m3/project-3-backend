const mongoose = require("mongoose")


const customQuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true,
        trim: true
    },
    options: {
        type: [String],
        required: true,
        validate: {
            validator: (arr) => Array.isArray(arr) && arr.length === 4 && arr.every((o) => typeof o === "string" && o.trim().length > 0),
            message: "Exactly four non-empty answer options are required.",
        }
    },
    correctAnswer: {
        type:String,
        required: true,
        min: 0,
        max: 3
    }
})


const customGameSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    creator:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        requried: true
    },
    questions: {
        type: [customQuestionSchema],
        default: []
    }
}, {timestamps:true})

const CustomGame = mongoose.model("CustomGame", customGameSchema)

module.exports = CustomGame