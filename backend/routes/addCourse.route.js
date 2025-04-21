const addCourseRouter = require("express").Router()
const addCourseController = require("../controllers/addCourse.controller.js")


addCourseRouter.post("/add", addCourseController)

module.exports = addCourseRouter;