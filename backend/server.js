require('dotenv').config();
const express = require('express');

const applyMiddleware = require('./middleware.js');
const configGemini = require('./config-gemini.js');

const queryCourseRouter = require('./routes/queryCourse.route.js');
const signUpRouter = require("./routes/signUp.route.js")
const logInRouter = require("./routes/logIn.route.js")
const addCourseRouter = require("./routes/addCourse.route.js")
const removeCourseRouter = require("./routes/removeCourse.route.js")
const advisorRouter = require("/routes/advisor.route.js")

const connectDatabase = require('./database.js')

const port = 3000;
const app = express();

async function main() {
  // apply middleware
  applyMiddleware(app);
  connectDatabase();

  //use route
  app.use('/', queryCourseRouter);
  app.use('/', signUpRouter);
  app.use('/', logInRouter);
  app.use("/", addCourseRouter)
  app.use("/", removeCourseRouter);
  app.use("/", advisorRouter);

  //console.log(result.response.text())
}

main();

/*
app.post("/", async function(req,res){
    //console.log(JSON.stringify(req.body))

    const prompts = JSON.parse(JSON.stringify(req.body))
    console.log(prompts.promptRating);
    const result = await model.generateContent(prompts.promptRating +"\n" + prompts.promptSubject + "\n" + prompts.promptResource + "\nSeparate each of the 3 responses with the string '&split'")
    console.log(result.response.text());

    res.send(result.response.text())

})
*/

app.listen(port, '0.0.0.0', () => {
  console.log(`listening at port ${port}`);
});
// '0.0.0.0',