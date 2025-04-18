const User = require("../models/users.models.js")

const logInController = (req, res) => {

    console.log("login controller ran")


    const testUser = {
            _id: "testid",
            userName: "testuser",
            password: "testpassword",
        }
    
    const testingUser = new User(testUser);


    //if user found log in AND password matches
   // await User.findById(testUser.testid) ?  :

}

module.exports = logInController;