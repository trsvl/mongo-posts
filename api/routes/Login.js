const express = require("express");
const router = express.Router();
const User = require("../models/RegistrationModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email && !password) {
      return res.status(400).json({
        email: "Enter an email address",
        password: "Enter a password",
      });
    }

    if (!email) {
      return res.status(400).json({
        email: "Enter an email address",
      });
    }

    if (!password) {
      return res.status(400).json({
        password: "Enter a password",
      });
    }

    const userDoc = await User.findOne({ email });

    if (!userDoc) {
      return res.status(400).json({
        email: "Incorrect email or password",
      });
    }

    const passed = bcrypt.compareSync(password, userDoc.password);

    if (passed) {
      const token = jwt.sign(
        {
          email: userDoc.email,
          author: userDoc._id,
          firstName: userDoc.firstName,
          lastName: userDoc.lastName,
        },
        process.env.JWT_SECRET,
        { expiresIn: "100h" }
      );
      res.cookie("token", token, { httpOnly: true }).json({ success: true });
    } else {
      return res.status(400).json({
        email: "Incorrect email or password",
      });
    }
  } catch (e) {
    res.status(400).json(e.message);
  }
});

module.exports = router;
