const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

router.get("/", (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, process.env.JWT_SECRET, (err, info) => {
    if (err) {
      console.error(err);
      res.status(401).json({ error: "Invalid or expired token" });
    } else {
      res.json(info);
    }
  });
});

module.exports = router;