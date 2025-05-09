const model = require('../config-gemini.js');


const advisorController = async (req, res) =>{

    const prompt = req.body.prompt

    const result = await model.generateContent(prompt);

      // take course name
    res.send({result: result});
  

   
    //res.send({courses: userCourses});
      
    return;
  



   


    

}


module.exports = advisorController;