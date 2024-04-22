const express =require( "express");
const  validation =require( "../middlewares/tokenValidator");
const { createNewQuestion, getAllQuizQuestion } = require("../controllers/question-controllers");
const Router=express.Router();


Router.route("/create").post(validation,createNewQuestion)
Router.route("/get").get(validation,getAllQuizQuestion)

module.exports= Router