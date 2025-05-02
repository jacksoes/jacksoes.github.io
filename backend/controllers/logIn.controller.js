const User = require("../models/users.models.js");
const bcrypt = require("bcrypt");

const logInController = async (req, res) => {
  console.log("login controller ran");

  const username = JSON.stringify(req.body.username);
  const password = JSON.stringify(req.body.password);


  const userLogin = {
      userName: username,
      password: password,
    };
  
    //find user by email
  const foundUser = await User.findOne({userName : userLogin.userName});
  // if user not found
  if (!foundUser) {
    res.send({ message: "User already exists", loggedIn : false});
    return;
  }

  bcrypt.compare(userLogin.password, foundUser.password, function(err, result) {

    if(result){
        console.log("password matched");
        res.send({ message: "User is successfully logged in", loggedIn : true});

    }else{
        console.log("password did not match");
        res.send({ message: "incorrect password", loggedIn : false});
    }
    // result == true
    });
    return;
  //if user found log in AND password matches
  // await User.findById(testUser.testid) ?  :
};

module.exports = logInController;
