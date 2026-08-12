// imports
const express = require("express") //importing express package
const app = express() // creates a express application
const dotenv = require("dotenv").config() //this allows me to use my .env values in this file
const morgan = require('morgan')
const cors = require('cors')

// Routes Import
const authRoutes = require('./routes/auth.routes')
const questionsRoute = require('./routes/questions.routes')
const customGameRoutes = require('./routes/customGame.routes')
const historyRoutes = require('./routes/history.routes')

// Middleware
app.use(
    cors({
        origin: process.env.CLIENT_URL || 'http://localhost:5173',
    })
);
app.use(express.json())
app.use(morgan('dev'))



// Routes
app.use('/auth',authRoutes)
app.use('/questions', questionsRoute)
app.use('/custom-games', customGamesRoutes)
app.use('/history',historyRoutes)


module.exports = app