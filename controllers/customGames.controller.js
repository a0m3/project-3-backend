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
        res.status(200).json(gameRoom)
    } catch(err){
        res.status(500).json({message: 'Internal Server Error'})
    }
}
// might have to come back to this later

async function getGameById(req,res)  {
    try{
        const foundGame = await CustomGame.findById(req.params.id).populate("creator", "username")
        if (!foundGame) return res.status(404).json({message:"Custom game not found"})
        if (!foundGame.creator._id.equals(req.user._id)){
            return res.status(403).json({message: "You do not have access to this custom game"}
            )
        }
        res.status(200).json(foundGame)
    } catch(err){
        res.status(500).json({message: "Internal server Error"})
    }
}

async function createCustomGame(req,res){
    try{
        const{name,questions = []} = req.body
        if (!name || !name.trim()) {
            return res.status(400).json({ message: 'Custom game name is required'})
        }
        
        const newGame = await CustomGame.create({
            name,
            questions,
            creator: req.user._id
        })
        res.status(201).json(newGame)
    } catch(err){
        res.status(500).json({message: 'Internal server error'})
    }
}

async function updateCustomGame(req,res){
    try{
        const updateGame = await CustomGame.findById(req.params.id)
        if(!updateGame) return res.status(404).json({message:' Custom game not found'})
        if(!updateGame.creator.equals(req.user._id)) {
            return res.status(403).json({message:'You cannot edit another users game'})
        }
        const {name , questions} = req.body
        
        if (name !== undefined) updateGame.name = name.trim()
        if (questions !== undefined) updateGame.questions = questions

        await updateGame.save()
        res.status(200).json(updateGame)
    } catch(err) {
        res.status(500).json({message: 'Internal server error'})

    }
}

async function deleteGame(req,res){
    try{
        const foundGame = await CustomGame.findById(req.params.id)
        if (!foundGame) return res.status(404).json({message:"custom game not found"})
        if (!foundGame.creator.equals(req.user._id)){
            return res.status(403).json({message:"you cannot delete other users games"})
        }
        const deletedGame = await CustomGame.findByIdAndDelete(req.params.id)
        res.json(deletedGame)
    } catch(err){
        res.status(500).json({message: 'Internal server error'})

    }

}

async function playGame( req,res){
    try{
        const gameRoom = await CustomGame.findById(req.params.id)
        if(!gameRoom) return res.status(404).json({message:"Cannot find the game you are looking for"})
        if(!gameRoom.creator.equals(req.user._id)) {
            return res.status(403).json({message: "You do not have access to this room"})
        }
        if(gameRoom.questions.length < minimumQuestions){
            return res.status(400).json ({message:`This game needs at least 3 questions before it can start`})
        }
        const roundCount = gameRoom.questions.length < moneyLadder.length
        ? gameRoom.questions.length : moneyLadder.length

        res.status(200).json({
            _id:gameRoom._id,
            name:gameRoom.name,
            questions:gameRoom.questions.slice(0, roundCount),
            ladder: moneyLadder.slice(0, roundCount)
        })
    } catch(err){
        res.status(500).json({ message:"Internal server error"})
    }
}

module.exports ={
    getMyCustomGames,
    getGameById,
    createCustomGame,
    updateCustomGame,
    deleteGame,
    playGame
}