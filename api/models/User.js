const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+\@.+\..+/, "Please add a valid email address"],
  },
  password: {
    type: String,
    required: true,
    minLength: [6, "Password too short"],
  },
});

const UserModel = model("User", UserSchema);
module.exports = UserModel;
