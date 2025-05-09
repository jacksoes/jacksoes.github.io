const removeCourseRouter = require("express").Router();
const removeCourseController = require("../controllers/removeCourse.controller.js");


removeCourseRouter.post("remove", removeCourseController);


module.exports = removeCourseController;