const logInRouter = require('express').Router();
const logInController = require("../controllers/logIn.controller.js");





logInRouter.post("/logIn", logInController);


module.exports = logInRouter;