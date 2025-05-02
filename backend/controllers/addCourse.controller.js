const getCourse = require("../utils/getCourse.js");

const User = require("../models/users.models.js")



const addCourseController = async (req, res) =>{

      // take course name

    //query course data with api
    console.log("add course controler ran")


    const courseName = "algebra"; 

    const course = await getCourse(courseName);

    console.log(course);


     //take user id from cookies

    const userID = "68150001b4385c7f51fcc8b3";

    // add it to database with for correct user.
    await User.findByIdAndUpdate(userID, {$push : {course: course} });

    

     




    res.send("test");
    return;
  



   


    

}


module.exports = addCourseController;