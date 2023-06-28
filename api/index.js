const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/User");
const cors = require("cors");

const app = express();
app.use(express.json());

app.use(cors());
const port = 3080;
require("dotenv").config();

mongoose.connect(process.env.MONGO_CONNECT).then(() => {
  console.log("conntected MONGI");
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const userDoc = await User.create({ email, password });
    res.status(200).json(userDoc);
    console.log(userDoc);
  } catch (e) {
    console.log(e.message);
    if (e.message.includes("E11000 duplicate key error")) {
      res.status(400).json({
        email: "some esomse smems",
      });
    }
    if (e.message.includes("Password too short")) {
        res.status(400).json({
            password: "Password too short",
        });
      }
  }
});
const regRoute = require("./routes/Registration")
app.use("/registration", regRoute)

app.listen(port, () => {
  console.log("server is running");
});
