const model = require('../config-gemini.js');

const mongoose = require("mongoose");
const User = require("../models/users.models.js")

const queryCourseController = async (req, res) => {
  console.log('query course controller ran');

  console.log(JSON.stringify(req.body.courseName));

  const course = req.body.courseName;
  //prompts
  const promptRating = `Rate the difficulty of the course out of 5: ${course}. Return only a length 3 decimial in the format $.$`;
  const promptSubject = `give me a list of subjects that are typically learned in the course : ${course}. Return only a string with the format '$^^~~$^^~~$ ...etc' the $'s are the list contents.`;
  const promptSimilar = `give me a list of similar classes to the course : ${course}. Return only a string with the format '$^^~~$^^~~$ ...etc' the $'s are the list contents.`;
  const promptResource = `give me a list of resources like websites or books that will be useful in the course: ${course}. Return only a string with the format '$^^~~$^^~~$ ...etc' the $'s are the list contents.`;

  //prompt as one request
  const prompt = `separate your answer to these 3 promps with the string: ~~^%. prompt 1: ${promptRating}, prompt 2: ${promptSimilar}, prompt 3: ${promptSubject}, promp 4: ${promptResource}`;

  const result = await model.generateContent(prompt);

  //split response into array size 3 and assign prompt results to json object.
  const promptReponses = result.response.text().split('~~^%');

  const courseData = {
    _id: new mongoose.Types.ObjectId(),
    title: course,
    rating: promptReponses[0],
    similarClasses: promptReponses[1].split('^^~~'),
    topicsCovered: promptReponses[2].split('^^~~'),
    learningResources: promptReponses[3].split('^^~~'),
  };

  //console.log(courseData.rating);
  //console.log(courseData.subjects);
 // console.log(courseData.resources);
  res.json(courseData);
  /*

    promptRating: `give me an exact rating out of 5 of the general difficulty of the class ${courseName} return only a length of 3 in the format $.$, use factors such as fail rate and course level,  if you do not recognize the course return the string: 'invalid'`,
            promptSubject: `give me a list of subjects that will be learned in the class: ${courseName} format it as a javscript array like so [$, $, $, $] the $ are strings of topics typically covered.`,
            promptResource: `give me a list of resources that will be useful in the class: ${courseName} format it as a javscript array like so [$, $, $, $] the $ are strings of resources such as websites or books when taking the specified class.`,
            */
  if(!req.cookies.userID)
  {
    return;
  }


  const userID = req.cookies.userID;

  await User.findByIdAndUpdate(userID, {$push : {course: courseData} });

  //res.send("course was added");
  return;

};


module.exports = queryCourseController;
