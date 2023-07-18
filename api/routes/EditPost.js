const express = require("express");
const router = express.Router();
const Post = require("../models/CreatePostModel");
const User = require("../models/User");
const multer  = require('multer');
const fs = require('fs')
const { promisify } = require('util')
const { v4: uuidv4 } = require('uuid');


router.get("/", async (req, res) => {
  const { lim, author } = req.query
  const postsLength = (await Post.find()).length
  const posts = await Post.find({ author: author }).populate('author', "firstName lastName").limit(lim)
  const send = {
    posts: posts,
    postsLength: postsLength,
  }
  res.status(200).json(send);
 })

 router.patch("/:id", async (req, res) => {
  try {
    const postId = req.params.id;
    const updatedPost = await Post.findByIdAndUpdate(postId, req.body, {
      new: true,
    });
    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
      const postId = req.params.id;
      await Post.findByIdAndDelete(postId);
      res.json({ message: "Post deleted successfully" });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});

module.exports = router;
