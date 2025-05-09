const User = require("../models/users.models.js")

const removeCourseController = async (req, res) => {



        //const userID = req.cookies.userID;
          const userID = req.cookies.userID;

          const courseID = req.body.courseID

          await User.updateOne({_id: userID},
             {$pull: { course: {_id : courseID}
            }
        }
    );
          
        return;
      



}

module.exports = {removeCourseController}