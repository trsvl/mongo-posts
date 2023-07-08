const express = require("express");
const router = express.Router();
const Post = require("../models/CreatePostModel");
const multer  = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
    cb(null,  'img-' + Date.now())
  }
});

 const upload = multer({storage: storage})

router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { title, text, uid } = req.body;
    const file = req.file;
    console.log(file);
    const postDoc = await Post.create({
      title,
      image: file.filename,
      text,
      uid
    });
    res.status(200).json(postDoc);
  } catch (e) {
    console.log(e.message);
    res.status(400).json(e.message);
  }
});

router.get("/", async (req, res) => {
  const posts = await Post.find();
  res.status(200).json(posts);
 })

module.exports = router;
