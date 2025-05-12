const getCourse = require("../utils/getCourse.js");

const User = require("../models/users.models.js")



const addCourseController = async (req, res) =>{

      // take course name

      let userCourses = []

      //const userID = req.cookies.userID;
      const userID = req.cookies.userID;
    const foundUser = await User.findOne({_id: userID})
    if(foundUser.course && foundUser){
      userCourses = foundUser.course
    }
    res.send({courses: userCourses});
      
    return;
  



   


    

}


module.exports = addCourseController;