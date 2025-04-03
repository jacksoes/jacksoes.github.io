const express = require("express")
const { GoogleGenerativeAI } = require("@google/generative-ai");
const cors = require('cors')
const bodyParser = require("body-parser");
require('dotenv').config();


const app = express();

const port = 3000;


app.use(cors());

const genAI = new GoogleGenerativeAI(process.env.GEMENI_API);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });


app.use(bodyParser.json())


app.post("/", async function(req,res){
    //console.log(JSON.stringify(req.body))

    const prompts = JSON.parse(JSON.stringify(req.body))
    console.log(prompts.promptRating);
    const result = await model.generateContent(prompts.promptRating +"\n" + prompts.promptSubject + "\n" + prompts.promptResource + "\nSeparate each of the 3 responses with the string '&split'")
    console.log(result.response.text());

    res.send(result.response.text())
    
})


app.listen(port, () => {
  console.log(`listening at port ${port}`)
})