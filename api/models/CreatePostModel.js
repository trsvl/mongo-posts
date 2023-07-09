const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const User = require("../models/User");

const { Schema, model } = mongoose;

const postSchema = new Schema({
  title: {
    type: String,
    required: [true, "Enter a title"],
  },
  image: {
    type: String,
    required: [true, "Enter an image"],
  },
  text: {
    type: String,
    required: [true, "Enter a text"],
  },
  author: {
    type: Schema.Types.ObjectId, ref: 'User',
  }
}, {
  timestamps: true,
});

const PostModel = model("posts", postSchema);
module.exports = PostModel;
