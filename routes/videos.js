const express = require("express");
const fs = require("fs");
const { v4: uuid } = require("uuid");

const router = express.Router();

router.get("/", (_req, res) => {
  fs.readFile("./data/videos.json", (err, data) => {
    if (err) {
      return res
        .status(500)
        .json({ error: true, message: "Could not read videos from JSON file" });
    }
    res.json(
      JSON.parse(data).map((video) => {
        return { title: video.title };
      })
    );
  });
});

// router.get("/videos/:id", (req, res) => {
//   const requestVideoID = req.params.id;

// });

module.exports = router;
