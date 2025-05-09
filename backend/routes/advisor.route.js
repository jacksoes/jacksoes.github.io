const advisorRouter = require('express').Router();
const advisorController = require("../controllers/advisor.controller.js");





advisorRouter.post("/advisor", advisorController);


module.exports = advisorRouter;