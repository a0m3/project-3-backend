const mongoose = require("mongoose")

const gameHistorySchema = new mongoose.Schema({
    player: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    mode: {
        type: String,
        enum: ["regular", "custom"],
        required: true
    },
    gameName: {
        type: String,
        required: true
    },
    customGame: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CustomGame",
        default: null,
    },
    moneyWon: {
        type: Number,
        required: true,
        min: 0,
    },
    totalQuestions: {
        type: Number,
        required: true,
        min: 0,
    },
    questionsAnswered: {
        type: Number,
        required: true,
        min: 0,
    },
    correctCount: {
        type: Number,
        required: true,
        min: 0,
    },
    status: {
        type: String,
        enum: ["won", "lost", "quit"],
        required: true,
    },
    playedAt: {
        type: Date,
        default: Date.now,
    },
},
    { timestamps: true },
)

const GameHistory = mongoose.model("GameHistory", gameHistorySchema)

module.exports = GameHistory