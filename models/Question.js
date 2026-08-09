const mongoose = require("mongoose")

const questionSchema = new mongoose.Schema(
    {
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
            type: Number,
            required: true,
            min: 0,
            max: 3
        },
        level: {
            type: Number,
            required: true,
            min: 1,
            max: 15
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    }, { timestamps: true }
)

const Question = mongoose.model("Question", questionSchema)

module.exports = Question