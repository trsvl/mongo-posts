const express = require("express");
const router = express.Router();
const User = require("../models/RegistrationModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const salt = bcrypt.genSaltSync(10);

router.post("/", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const userDoc = await User.create({
      firstName,
      lastName,
      email,
      password: bcrypt.hashSync(password, salt),
    });

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
  } catch (e) {
    console.log(e.message);
    res.status(400).json({
      firstName: e.errors?.firstName?.message,
      lastName: e.errors?.lastName?.message,
      email: e.errors?.email?.message,
      password: e.errors?.password?.message,
    });
  }
});

module.exports = router;
