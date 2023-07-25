const express = require("express");
const router = express.Router();
const Post = require("../models/CreatePostModel");
const multer = require("multer");
const fs = require("fs");
const { promisify } = require("util");
const { v4: uuidv4 } = require("uuid");

const unlinkAsync = promisify(fs.unlink);

const maximumFiles = 3;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, "img-" + uuidv4());
  },
});

const upload = multer({ storage: storage });

router.post("/img", upload.array("image", maximumFiles), async (req, res) => {
  try {
    const { title, description, author } = req.body;
    const files = req.files;
    const filesArr = [];
    for (let index = 0; index < files.length; index++) {
      filesArr.push(files[index].filename);
    }
    const postDoc = await Post.create({
      title,
      image: filesArr,
      description,
      author,
    });
    res.status(200).json(postDoc);
  } catch (e) {
    const files = req.files;
    for (let index = 0; index < files.length; index++) {
      const filePath = files[index].path;
      try {
        await unlinkAsync(filePath);
        console.log(`Deleted file: ${filePath}`);
      } catch (error) {
        console.error(`Error deleting file: ${filePath}`, error);
      }
    }
    res.status(400).json(e.message);
  }
});

router.post("/noimg", async (req, res) => {
  try {
    const { title, files, description, author } = req.body;

    const postDoc = await Post.create({
      title,
      image: files,
      description,
      author,
    });
    res.status(200).json(postDoc);
  } catch (e) {
    res.status(400).json(e.message);
  }
});

router.get("/", async (req, res) => {
  const { lim } = req.query;
  const postsLength = (await Post.find()).length;
  const posts = await Post.find()
    .populate("author", "firstName lastName")
    .limit(lim)
    .sort({ updatedAt: -1 });
  const send = {
    posts: posts,
    postsLength: postsLength,
  };
  res.status(200).json(send);
});

module.exports = router;
