const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(
  express.urlencoded({
    extended: false,
  })
);

const port = 3080;

mongoose.connect(process.env.MONGO_CONNECT).then(() => {
  console.log("Mongo is connected");
});

const regRoute = require("./routes/Registration");
const logRoute = require("./routes/Login");
const profileRoute = require("./routes/Profile");
const logoutRoute = require("./routes/Logout");
const createPostRoute = require("./routes/CreatePost");
const ediPostRoute = require("./routes/EditPost");

app.use("/registration", regRoute);
app.use("/login", logRoute);
app.use("/profile", profileRoute);
app.use("/logout", logoutRoute);
app.use("/createpost", createPostRoute);
app.use("/editpost", ediPostRoute);

app.listen(port, () => {
  console.log("server is running");
});
