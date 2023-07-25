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

router.get("/", async (req, res) => {
  const { lim, author } = req.query;
  const postsLength = (await Post.find()).length;
  const posts = await Post.find({ author: author })
    .populate("author", "firstName lastName")
    .limit(lim)
    .sort({ updatedAt: -1 });
  const send = {
    posts: posts,
    postsLength: postsLength,
  };
  res.status(200).json(send);
});

router.patch("/nonew/:id", async (req, res) => {
  try {
    const postId = req.params.id;
    const { title, image, description, initialImages } = req.body;
    const deleteImagesArray = initialImages.filter(
      (item) => !image.includes(item)
    );
    if (deleteImagesArray.length !== 0) {
      for (let index = 0; index < deleteImagesArray.length; index++) {
        const filePath = "uploads/" + deleteImagesArray[index];
        try {
          await unlinkAsync(filePath);
          console.log(`Deleted file: ${filePath}`);
        } catch (error) {
          console.error(`Error deleting file: ${filePath}`, error);
        }
      }
    }
    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      {
        title: title,
        image: image,
        description: description,
      },
      {
        new: true,
      }
    );

    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.patch(
  "/new/:id",
  upload.array("image", maximumFiles),
  async (req, res) => {
    try {
      const postId = req.params.id;
      const files = req.files;
      const {
        title,
        image,
        description,
        remainImagesArray,
        deleteImagesArray,
      } = req.body;
      const parsedRemain = JSON.parse(remainImagesArray);
      const parsedDelete = JSON.parse(deleteImagesArray);

      if (parsedDelete.length !== 0) {
        for (let index = 0; index < parsedDelete.length; index++) {
          const filePath = "uploads/" + parsedDelete[index];
          try {
            await unlinkAsync(filePath);
            console.log(`Deleted file: ${filePath}`);
          } catch (error) {
            console.error(`Error deleting file: ${filePath}`, error);
          }
        }
      }

      const imagesArray = [];
      for (let index = 0; index < files.length; index++) {
        imagesArray.push(files[index].filename);
      }
      const uploadImages = parsedRemain.concat(imagesArray);
      const updatedPost = await Post.findByIdAndUpdate(
        postId,
        {
          title: title,
          image: uploadImages,
          description: description,
        },
        {
          new: true,
        }
      );

      res.status(200).json(updatedPost);
    } catch (error) {
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
  }
);

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
