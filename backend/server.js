require('dotenv').config();
const express = require('express');

const applyMiddleware = require('./middleware.js');
const configGemini = require('./config-gemini.js');

const queryCourseRouter = require('./routes/queryCourse.route.js');

const port = 3000;
const app = express();

async function main() {
  // apply middleware
  applyMiddleware(app);

  //use route
  app.use('/', queryCourseRouter);

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

app.listen(port, () => {
  console.log(`listening at port ${port}`);
});
