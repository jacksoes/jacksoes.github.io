const getCourse = require("../utils/getCourse.js");

const User = require("../models/users.models.js")



const addCourseController = async (req, res) =>{

      // take course name

  

      //const userID = req.cookies.userID;
      const userID = req.cookies.userID;
    const foundUser = await User.findOne({_id: userID})
    const userCourses = foundUser.course

    res.send({courses: userCourses});
      
    return;
  



   


    

}


module.exports = addCourseController;