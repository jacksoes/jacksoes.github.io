const User = require("../models/users.models.js");
const bcrypt = require("bcrypt");

const signUpController = async (req, res) => {
  console.log("sign up controller ran");


  const testCourses = [
    {
        title: "algebra",
        rating: "3",
        similarCLasses: ["calc1", "calc2"],
        topicsCovered: ["topic1", "topic2" ],
        learningResources: ["textbook", "officehours"]


  },
  {
    title: "linear algebra",
        rating: "4",
        similarCLasses: ["calc4", "calc5"],
        topicsCovered: ["topic4", "topic5" ],
        learningResources: ["textbook", "officehours"],
        

  }
]

  const testUser = {
    _id: "testid",
    userName: "testuser",
    password: "testpassword",
    course: testCourses,
  };

  

  const testingUser = new User(testUser);

  if(await User.findById(testUser._id)){
    res.send({ message: "User already exists" });
    return;
  }

 /*
 course : [{
            title: str
            rating: str
            similarClasses: [str]
            topicsCovered: [str]
            learningResources:[str]
        }]

*/
  const saltRounds = 10;

  //encrypt password
  bcrypt.genSalt(saltRounds, function (err, salt) {
    bcrypt.hash(testUser.password, salt,  async function (err, hash) {
      // change password to encrypted password and store user in database
      testingUser.password = hash;
      await User.create(testingUser);
      res.send({ message: "User is successfully signed up." });
      return;

      
    });
  });


  // Load hash from your password DB.
  
 


  //encrypt password

  // refine user as json

  //check if user exists by id
  //



  // if user does not exists insert and send back response

  // if user does exist send back response

  // add try catch for error
};

module.exports = signUpController;
