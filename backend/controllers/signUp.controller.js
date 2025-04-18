const User = require("../models/users.models.js")

const signUpController = async(req, res) => {
    console.log("sign up controller ran")

    

    const testUser = {
        _id: "testid",
        userName: "testuser",
        password: "testpassword",
    }

    const testingUser = new User(testUser);
    //encrypt password
    
    
    // refine user as json

    //check if user exists by id
    //

    await User.findById(testUser.testid) ? async () => {await User.create(testingUser); res.send({message: "User is successfully signed up."}) } : res.send({message: "User already exists"});

    // if user does not exists insert and send back response

    // if user does exist send back response

    // add try catch for error
   


}





module.exports = signUpController;