const express = require("express");
const passport = require("passport");
const router = express.Router();
const User = require("../models/User");

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

router.post("/login", passport.authenticate("local"), (req, res) => {
  if (!req.user) return res.status(403).json({ message: "Unauthorized" });
  return res.status(200).json(req.user);
});

router.post("/logout", (req, res, next) => {
  // req.logout() is defined by passport
  req.logout();
  res.status(200).json({ message: "Log out success!" });
});

router.post("/signup", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  if (username === "" || password === "") {
    return res.status(500).json({ message: "Indicate username and password" });
  }

  User.findOne({ username }, "username", (err, user) => {
    if (user !== null) {
      return res.status(500).json({ message: "The username already exists" });
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username,
      password: hashPass
    });

    newUser
      .save()
      .then(() => {
        return res.status(200).json({ user: newUser });
      })
      .catch(err => {
        return res.status(500).json({ message: "Something went wrong" });
      });
  });
});

router.get("/loggedin", (req, res, next) => {
  // req.isAuthenticated() is defined by passport
  if (req.isAuthenticated()) {
    return res.status(200).json(req.user);
  }
  return res.status(403).json({ message: "Unauthorized" });
});

module.exports = router;
