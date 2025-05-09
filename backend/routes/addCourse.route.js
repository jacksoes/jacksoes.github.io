const addCourseRouter = require("express").Router()
const addCourseController = require("../controllers/addCourse.controller.js")


addCourseRouter.get("/add", addCourseController)

module.exports = addCourseRouter;