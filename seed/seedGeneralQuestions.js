// Run this from the backend folder:
// node seed/seedGeneralQuestions.js

require("dotenv").config();
const mongoose = require("mongoose");
const connectToDB = require("../config/db");
const Question = require("../models/Question");
const questions = require("./generalQuestions.json");

async function seed() {
    try {
        await connectToDB();

        await Question.deleteMany({});
        await Question.insertMany(questions);

        console.log(`${questions.length} questions added successfully.`);

        await mongoose.connection.close();
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

seed();
