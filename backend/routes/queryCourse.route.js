const queryCourseRouter = require('express').Router();
const queryCourseController = require('../controllers/queryCourse.controller.js');

queryCourseRouter.post('/queryCourse', queryCourseController);

module.exports = queryCourseRouter;
