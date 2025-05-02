const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const User = new mongoose.Schema({
  _id: String,

  userName:{
    type: String,
    required: true,
    unique: true,
    trim: true,
  },

  password: {
    type: String,
    required: true,
    trim: true,
  },

  course: [{
    _id: String,
    title: String,
    rating: String,
    similarClasses: [String],
    topicsCovered: [String],
    learningResources: [String],
  }]

});





/*
 course : [{
            title: str
            rating: str
            similarClasses: [str]
            topicsCovered: [str]
            learningResources:[str]
        }]

*/

module.exports = mongoose.model("User", User);