const model = require('../config-gemini.js');

const mongoose = require("mongoose");

const getCourse = async (courseName) =>{

  console.log('query course controller ran');

  console.log(JSON.stringify(courseName));

  const course = courseName;
  //prompts
  const promptRating = `Rate the difficulty of the course out of 5: ${course}. Return only a length 3 decimial in the format $.$`;
  const promptSubject = `give me a list of subjects in the course : ${course}. Return only a string with the format '$^^~~$^^~~$ ...etc' the $'s are the list contents. Try to give me a list of 8 subjects if possible.`;
  const promptResource = `give me a list of resources that will be useful in the course: ${course}. Return only a string with the format '$^^~~$^^~~$ ...etc' the $'s are the list contents.`;
  const promptSimilarClasses = `give me a list of similar classes for the course: ${course}. Return only a string with the format '$^^~~$^^~~$ ...etc' the $'s are the list contents.`;

  //prompt as one request
  const prompt = `separate your answer to these 4 prompts with the string: ~~^%. prompt 1: ${promptRating}, prompt 2: ${promptSimilarClasses}, prompt 3: ${promptSubject}, prompt 4: ${promptResource}`;

  const result = await model.generateContent(prompt);

  //split response into array size 4 and assign prompt results to json object.
  const promptResponses = result.response.text().split('~~^%');

  const courseData = {
    _id: new mongoose.Types.ObjectId(),
    title: courseName,
    rating: promptResponses[0],
    similarClasses: promptResponses[1].split("^^~~"),
    topicsCovered: promptResponses[2].split("^^~~"),
    learningResources: promptResponses[3].split("^^~~"),
  };

  
  return courseData;
  /*

    promptRating: `give me an exact rating out of 5 of the general difficulty of the class ${courseName} return only a length of 3 in the format $.$, use factors such as fail rate and course level,  if you do not recognize the course return the string: 'invalid'`,
            promptSubject: `give me a list of subjects that will be learned in the class: ${courseName} format it as a javscript array like so [$, $, $, $] the $ are strings of topics typically covered.`,
            promptResource: `give me a list of resources that will be useful in the class: ${courseName} format it as a javscript array like so [$, $, $, $] the $ are strings of resources such as websites or books when taking the specified class.`,
            */
};




module.exports = getCourse;