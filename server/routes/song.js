const express = require("express");
const passport = require("passport");
const router = express.Router();
const Song = require("../models/Song");

router.post("/create", (req, res) => {
  if (!req.user) return res.status(403).json({ message: "Unauthorized" });
  const songData = { ...req.body };
  songData.userId = req.user._id;
  const newSong = new Song(songData);
  Song.create(newSong)
    .then(song => {
      return res.status(200).json(song);
    })
    .catch(err => {
      return res.status(500).json({ message: "Could not store song!" });
    });
});

router.get("/mysongs", (req, res) => {
  if (!req.user) return res.status(403).json({ message: "Unauthorized" });
  Song.find({ userId: req.user._id })
    .then(songs => {
      return res.status(200).json(songs);
    })
    .catch(err => {
      return res.status(500).json({ message: "Could not fetch your songs!" });
    });
});

module.exports = router;
