# Who Wants to Be a Millionaire Backend API

## Overview

This is the backend API for the **Who Wants to Be a Millionaire** MERN
project. It is built with Node.js, Express and MongoDB.

The backend handles user accounts, authentication, regular game
questions, custom games and game history. It also includes admin access
for managing the regular game questions.

## Related Links

-   **Backend Repository:** https://github.com/a0m3/project-3-backend
-   **Frontend Repository:** https://github.com/a0m3/project-3-frontend
-   **Deployed Backend:** Not deployed yet
-   **Deployed Frontend:** Not deployed yet

## Technologies Used

-   Node.js
-   Express
-   MongoDB
-   Mongoose
-   JSON Web Tokens (JWT)
-   bcrypt
-   dotenv
-   CORS
-   Morgan
-   express-rate-limit
-   Jest
-   Supertest

## Features

-   User registration
-   User login
-   JWT authentication
-   Protected routes
-   Admin-only question management
-   Regular Millionaire game questions
-   Random question selection by difficulty level
-   Create custom games
-   Edit custom games
-   Delete custom games
-   Play custom games
-   Game history
-   User-specific custom games and history
-   Request validation
-   MongoDB relationships using Mongoose
-   Rate limiting middleware
-   API testing for authentication

## Project Structure

``` text
backend/
├── config/
│   └── db.js
├── controllers/
│   ├── auth.controller.js
│   ├── customGames.controller.js
│   ├── history.controller.js
│   └── questions.controller.js
├── middleware/
│   ├── isAdmin.js
│   ├── rateLimiters.js
│   ├── validateObjectId.js
│   ├── validateQuestion.js
│   └── verifyToken.js
├── models/
│   ├── CustomGame.js
│   ├── GamesHistory.js
│   ├── Question.js
│   ├── User.js
│   └── ladder.js
├── routes/
│   ├── auth.routes.js
│   ├── customGame.routes.js
│   ├── history.routes.js
│   └── questions.routes.js
├── seed/
│   ├── generalQuestions.json
│   └── seedGeneralQuestions.js
├── tests/
│   └── auth.test.js
├── app.js
├── server.js
└── package.json
```

### Folder Responsibilities

  -----------------------------------------------------------------------
  Folder                              Purpose
  ----------------------------------- -----------------------------------
  `config`                            Connects the application to MongoDB

  `controllers`                       Contains the main logic for each
                                      API feature

  `middleware`                        Handles authentication, admin
                                      checks, validation and rate
                                      limiting

  `models`                            Contains the Mongoose schemas

  `routes`                            Contains the API routes

  `seed`                              Contains the general questions and
                                      the script used to add them to
                                      MongoDB

  `tests`                             Contains backend tests

  `app.js`                            Sets up Express, middleware and
                                      routes

  `server.js`                         Connects to MongoDB and starts the
                                      server
  -----------------------------------------------------------------------

## Getting Started

### Prerequisites

Install:

-   Node.js
-   MongoDB locally or a MongoDB Atlas account

## Installation

### 1. Clone the repository

``` bash
git clone https://github.com/a0m3/project-3-backend.git
cd project-3-backend
```

### 2. Install dependencies

``` bash
npm install
```

### 3. Create the environment file

Create a `.env` file in the root directory:

``` env
PORT=3000
MONGODB_URI=your-mongodb-connection-string
CLIENT_URL=http://localhost:5173
JWT_SECRET=your-secret-key
```

Do not commit your real `.env` file to GitHub.

### 4. Start the development server

``` bash
npm run dev
```

The API will run at:

``` text
http://localhost:3000
```

### 5. Start the server normally

``` bash
npm start
```

## Database Models

### User

Stores registered users and their roles.

  Field              Type     Rules
  ------------------ -------- -----------------------------------------
  `username`         String   Required, unique, trimmed and lowercase
  `hashedPassword`   String   Required and hashed with bcrypt
  `role`             String   `user` or `admin`
  `createdAt`        Date     Generated automatically
  `updatedAt`        Date     Generated automatically

### Question

Stores the questions used in the regular Millionaire game.

  Field             Type       Rules
  ----------------- ---------- -----------------------------
  `question`        String     Required
  `options`         Array      Exactly 4 non-empty options
  `correctAnswer`   Number     0 to 3
  `level`           Number     1 to 15
  `createdBy`       ObjectId   Reference to `User`

### CustomGame

Stores games created by users and their questions.

  -----------------------------------------------------------------------
  Field                   Type                    Rules
  ----------------------- ----------------------- -----------------------
  `name`                  String                  Required

  `creator`               ObjectId                Reference to `User`

  `questions`             Array                   Custom questions, each
                                                  with 4 options and a
                                                  level
  -----------------------------------------------------------------------

### GameHistory

Stores the result of games played by a user.

  -----------------------------------------------------------------------
  Field                   Type                    Rules
  ----------------------- ----------------------- -----------------------
  `player`                ObjectId                Reference to `User`

  `mode`                  String                  `regular` or `custom`

  `gameName`              String                  Required

  `customGame`            ObjectId                Reference to
                                                  `CustomGame` when using
                                                  custom mode

  `moneyWon`              Number                  Amount won

  `totalQuestions`        Number                  Total questions in the
                                                  game

  `questionsAnswered`     Number                  Questions answered

  `correctCount`          Number                  Correct answers

  `status`                String                  `won`, `lost` or `quit`

  `playedAt`              Date                    Generated automatically
  -----------------------------------------------------------------------

## Entity Relationships

``` text
User
 │
 ├── creates ──> CustomGame
 │                 │
 │                 └── contains ──> Custom Questions
 │
 ├── creates ──> Questions (admin)
 │
 └── has ──────> GameHistory
                      │
                      └── can reference ──> CustomGame
```

## API Base URL

Local development:

``` text
http://localhost:3000
```

## Endpoints

### Authentication

  Method   Endpoint          Access          Description
  -------- ----------------- --------------- ---------------------------
  `POST`   `/auth/sign-up`   Public          Create a new account
  `POST`   `/auth/sign-in`   Public          Sign in and receive a JWT
  `GET`    `/auth/me`        Authenticated   Get the current user

### Regular Questions

  ------------------------------------------------------------------------------
  Method            Endpoint                 Access            Description
  ----------------- ------------------------ ----------------- -----------------
  `GET`             `/questions/game/play`   Authenticated     Get random
                                                               questions for a
                                                               regular game

  `GET`             `/questions`             Admin             Get all questions

  `POST`            `/questions`             Admin             Create a question

  `GET`             `/questions/:id`         Admin             Get a question by
                                                               ID

  `PUT`             `/questions/:id`         Admin             Update a question

  `DELETE`          `/questions/:id`         Admin             Delete a question
  ------------------------------------------------------------------------------

### Custom Games

  --------------------------------------------------------------------------------
  Method            Endpoint                   Access            Description
  ----------------- -------------------------- ----------------- -----------------
  `POST`            `/custom-games`            Authenticated     Create a custom
                                                                 game

  `GET`             `/custom-games`            Authenticated     Get the user's
                                                                 custom games

  `GET`             `/custom-games/:id`        Authenticated     Get one custom
                                                                 game

  `PUT`             `/custom-games/:id`        Authenticated     Edit a custom
                                                                 game

  `DELETE`          `/custom-games/:id`        Authenticated     Delete a custom
                                                                 game

  `GET`             `/custom-games/:id/play`   Authenticated     Get a custom game
                                                                 ready to play
  --------------------------------------------------------------------------------

### Game History

  Method   Endpoint     Access          Description
  -------- ------------ --------------- -----------------------------
  `POST`   `/history`   Authenticated   Save a completed game
  `GET`    `/history`   Authenticated   Get the user's game history

## Status Codes

    Status Meaning
  -------- ------------------------------------------------
     `200` Successful request
     `201` Resource created
     `400` Invalid request
     `401` Authentication required or invalid credentials
     `403` User does not have permission
     `404` Resource not found
     `409` Username already exists
     `500` Unexpected server error

## Seeding General Questions

The project includes a set of general questions in:

``` text
seed/generalQuestions.json
```

The seed script is located at:

``` text
seed/seedGeneralQuestions.js
```

Run the seed script with Node after setting your MongoDB connection
string in the environment file.

``` bash
node seed/seedGeneralQuestions.js
```

## Testing

The backend includes Jest and Supertest tests for authentication.

Run:

``` bash
npm test
```

The tests cover user sign-up and sign-in cases such as missing
information, duplicate usernames and invalid credentials.

## Future Enhancements

-   Add more automated tests for questions, custom games and history
-   Add more game modes
-   Add more lifelines and multiplayer support
-   Deploy the API and database

## Team Members

  -----------------------------------------------------------------------------------
  GitHub                                          Responsibilities
  ----------------------------------------------- -----------------------------------
  [a0m3](https://github.com/a0m3)                 Frontend and backend development

  [mohasa7an22](https://github.com/mohasa7an22)   Frontend and backend development
  -----------------------------------------------------------------------------------

## Credits

Built as a MERN Stack project.
