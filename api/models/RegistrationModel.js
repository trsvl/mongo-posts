const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const RegSchema = new Schema({
  firstName: {
    type: String,
    required: [true, "Enter a first name"],
  },
  lastName: {
    type: String,
    required: [true, "Enter a last name"],
  },
  email: {
    type: String,
    required: [true, "Enter an email address"],
    unique: true,
    match: [/.+\@.+\..+/, "Please add a valid email address"],
  },
  password: {
    type: String,
    required: [true, "Enter a password"],
    minLength: [6, "Password too short"],
  },
});

const UserModel = model("users", RegSchema);
module.exports = UserModel;
