const mongoose = require('mongoose');
const passport = require('passport');

const userSchema = mongoose.Schema({

  user:{
    type: mongoose.Schema.type.objectId,
    ref: "user"
  },
  title: String,
  description: String,
  image: String
});


module.exports = mongoose.model("post", userSchema);