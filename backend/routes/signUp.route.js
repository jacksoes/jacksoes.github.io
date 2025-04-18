const signUpRouter = require('express').Router();
const signUpController = require('../controllers/signUp.controller.js')


signUpRouter.post("/signUp", signUpController)

module.exports = signUpRouter;