const CustomGame = require('../models/CustomGame')

const {moneyLadder} = require('../models/ladder')

const minimumQuestions = 3

async function getMyCustomGames(req,res) {
    try{
        const foundGame = await CustomGame.find({creator: req.user._id})

        const gameRoom = foundGame.map((game) => ({
            _id: game._id,
            name: game.name,
            questionCount: game.questions.length,
        }))
        res.status(200).json(gameQuestions)
    } catch(err){
        res.status(500).json({message: 'Internal Server Error'})
    }
}
// might have to come back to this later

async function getGameById(req,res)  {
    try{
        const foundGame = await CustomGame.findById(req.params.id).populate("creator", "username")
        if (!foundGame) return res.status(404).json({message:"Custome game not found"})
        if (!game.creator._id.equals(req.user._id)){
            return res.status(403).json({message: "You do not have access to this custom game"}
            )
        }
    } catch(err){
        res.status(500).json({message: "Internal server Error"})
    }
}