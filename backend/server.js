const express = require("express")
const { GoogleGenerativeAI } = require("@google/generative-ai");
const cors = require('cors')
const bodyParser = require("body-parser");

const app = express();

const port = 3000;

/*const corsOptions = {
    origin: '*', // Allow only requests from this origin
    methods: 'GET,POST', // Allow only these methods
    allowedHeaders: ['Content-Type', 'Authorization'] // Allow only these headers
};*/

app.use(cors());

const genAI = new GoogleGenerativeAI("AIzaSyD0mlSqRX03sIdjhcY3qTWlob4FibasYas");
const model = genAI.getGenerativeModel({ model: "gemini-2.0-pro-exp-02-05" });

//const prompt = "Explain how AI works";

//const result = await model.generateContent(prompt);
//console.log(result.response.text());

app.use(bodyParser.json())


app.post("/", async function(req,res){
    //console.log(JSON.stringify(req.body))

    const prompts = JSON.parse(JSON.stringify(req.body))
    console.log(prompts.promptRating);
    const result = await model.generateContent(prompts.promptRating)
    console.log(result.response.text());

    res.send({title : result.response.text()})
    
})

app.listen(port, () => {
    console.log("server running at" + port)
})