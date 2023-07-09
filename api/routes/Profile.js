const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

router.get("/", (req, res) => {
    const {token} = req.cookies;
    jwt.verify(token, process.env.JWT_SECRET, (err,info)=>{
      if (err) throw err;
      res.json(info);
    })
})

module.exports = router;
