const model = require('../config-gemini.js');


const advisorController = async (req, res) =>{

    const prompt = req.body.prompt

    let result = await model.generateContent(prompt);
    result = result.response.text()
      // take course name
    res.send({result: result});
  

   
    //res.send({courses: userCourses});
      
    return;
  



   


    

}


module.exports = advisorController;