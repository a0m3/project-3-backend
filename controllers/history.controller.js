const GameHistory = require('../models/GamesHistory')
const {moneyLadder} = require('../models/ladder')

async function createHistory(req,res){
    try{
        const {
            mode,
            gameName,
            customGame = null,
            totalQuestions,
            questionsAnswered,
            correctCount,
            status,
        } = req.body
        if(!['regular', 'custom'].includes(mode)){
            return res.status(400).json({message:'invalid game info'})
        }
        if(!gameName || !gameName.trim()){
            return res.status(400).json({message: "Game name is required"})
        }
        if (!['won', 'lost', 'quit'].includes(status)){
            return res.status(400).json({message: 'invalid game status'})
        }
        const total = Number(totalQuestions)
        const answered = Number(questionsAnswered)
        const correct = Number(correctCount)
        if(
            Number.isNaN(total) || Number.isNaN(answered) ||Number.isNaN(correct) ||
            total < 0 || answered < 0 || correct < 0 || correct > answered || answered > total
        ) {
            return res.status(400).json({message: 'Invalid question coounts submitted'})
        }

        const moneyWon = correct > 0 ? moneyLadder[Math.min(correct, moneyLadder.length) -1 ]: 0

        const createdHistory = await GameHistory.create({
            player: req.user._id,
            mode,
            gameName: gameName.trim(),
            customGame: mode === 'custom' ? customGame : null,
            moneyWon,
            totalQuestions: total,
            questionsAnswered: answered,
            correctCount: correct,
            status,
        })
        res.status(201).json(createdHistory)
    } catch(err){
        res.status(500).json({message:"internal server error"})
    }
}

async function getMyHistory (req,res){
    try{
        const myHistory = await GameHistory.find({player: req.user._id}).sort({playedAt: - 1})
        res.status(200).json(myHistory)
    } catch(err) {
        res.status(500).json ({ message:"Internal server error"})
    }
}

module.exports = {
    createHistory,
    getMyHistory
}