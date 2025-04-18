const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const User = new Schema({
  _id: ObjectId,

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

});