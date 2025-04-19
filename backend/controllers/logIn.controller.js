const User = require("../models/users.models.js");
const bcrypt = require("bcrypt");

const logInController = async (req, res) => {
  console.log("login controller ran");

 

  const testUser = {
    _id: "testid",
    userName: "testuser",
    password: "testpassword",
  };
  

  const testingUser = await User.findById(testUser._id)
  // if user not found
  if (!testingUser) {
    res.send("user not found");
    return;
  }

  bcrypt.compare(testUser.password, testingUser.password, function(err, result) {

    if(result){
        console.log("password matched")
    }else{
        console.log("password did not match")
    }
    // result == true
    });

  //if user found log in AND password matches
  // await User.findById(testUser.testid) ?  :
};

module.exports = logInController;
