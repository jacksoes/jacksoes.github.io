const User = require("../models/users.models.js");
const bcrypt = require("bcrypt");

const signUpController = async (req, res) => {
  console.log("sign up controller ran");

  const testUser = {
    _id: "testid",
    userName: "testuser",
    password: "testpassword",
  };

  const testingUser = new User(testUser);

  if(await User.findById(testUser.testid)){
    res.send({ message: "User already exists" });
  }

 
  const saltRounds = 10;

  //encrypt password
  bcrypt.genSalt(saltRounds, function (err, salt) {
    bcrypt.hash(testUser.password, salt,  async function (err, hash) {
      // change password to encrypted password and store user in database
      testingUser.password = hash;
      await User.create(testingUser);
      res.send({ message: "User is successfully signed up." });

      
    });
  });
  console.log(testUser.password)

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
