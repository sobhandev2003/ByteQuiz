const { Router } = require("express");
const validation = require("../middlewares/tokenValidator");
// const { upload } =require( "./users_route";
const { createNewQuiz,
    deleteQuiz,
    updateUnlike,
    updateLike,
    submitQuiz } = require("../controllers/quiz-controllers");
const { upload } = require("../config/db_config");

const Route = Router();

Route.route("/").post(validation, upload.single("poster"), createNewQuiz);
Route.route("/delete").delete(validation, deleteQuiz);
Route.route("/like").put(validation, updateLike)
Route.route("/unlike").put(validation, updateUnlike);
Route.route("/submit").put(validation, submitQuiz)

module.exports = Route