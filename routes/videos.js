const express = require("express");
const fs = require("fs");
const { v4: uuid } = require("uuid");

const router = express.Router();
const videos = JSON.parse(fs.readFileSync("./data/videos.json"));

//Get Videos
router.get("/", (_req, res) => {
  fs.readFile("./data/videos.json", (err, data) => {
    if (err) {
      return res
        .status(500)
        .json({ error: true, message: "Could not read videos from JSON file" });
    }
    res.json(
      JSON.parse(data).map((video) => {
        return {
          id: video.id,
          title: video.title,
          channel: video.channel,
          image: video.image,
        };
      })
    );
  });
});

//Get Videos By ID
router.get("/:id", (req, res) => {
  //const videos = JSON.parse(fs.readFileSync("./data/videos.json"));
  const founVideo = videos.find((video) => {
    return video.id === req.params.id;
  });
  if (!founVideo) {
    res.status(404).json({
      message: "The video with id" + requestVideoID + "was not found",
    });
    return;
  }
  res.status(200).json(founVideo);
});

module.exports = router;

//POST Videos
router.post("/:id/comments", (req, res) => {
  const { name, comment } = req.body;
  const newComment = {
    id: uuid(),
    name: name,
    comment: comment,
  };
  videos.push(newComment);
  res.json(newComment);
});
