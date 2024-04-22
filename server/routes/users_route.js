const express =require( 'express');
const {
    changeProfilePhoto,
    forgetPasswordRequest,
    getUserDetails,
    logOutUser,
    loginUser,
    registerUser,
    resetPassword,
    verifyEmail
} =require( '../controllers/users-controllers');


const validation  =require('../middlewares/tokenValidator');
const { upload } = require('../config/db_config');



const Route = express.Router();
// console.log(upload);
//NOTE - Register new user
Route.route("/").post(registerUser)
Route.route("/verify-email/:id/:token").get(verifyEmail);
Route.route("/forgot-password").post(forgetPasswordRequest);
Route.route("/reset-password").put(resetPassword);
Route.route("/login").post(loginUser);
Route.route("/logout").get(logOutUser);
Route.route("/profile-photo").post(validation,upload.single('photo'),changeProfilePhoto)
Route.route("/").get(validation,getUserDetails);
module.exports= Route;