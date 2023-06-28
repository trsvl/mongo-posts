const express = require("express");
const router = express.Router();
const User = require("../models/RegistrationModel");

router.post("/", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const userDoc = await User.create({ firstName, lastName, email, password });
    res.status(200).json(userDoc);
  } catch (e) {
    console.log(e.message);
    res.status(400).json({
      firstName: e.errors?.firstName?.message,
      lastName: e.errors?.lastName?.message,
      email:
        e.errors?.email?.message || e.code == 11000
          ? "This email already exists"
          : "",
      password: e.errors?.password?.message,
    });
  }
});

module.exports = router;
