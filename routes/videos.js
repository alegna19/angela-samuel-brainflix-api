const { response } = require("express");
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
  const founVideo = videos.find((video) => {
    return video.id === req.params.id;
  });
  if (!founVideo) {
    res.status(404).json({
      message: "The video was not found",
    });
    return;
  }
  res.status(200).json(founVideo);
});

//POST Video
router.post("/", (req, res) => {
  const { title, description } = req.body;
  const newVideo = {
    id: uuid(),
    title: title,
    channel: "Angie",
    image: "http://localhost:8081/images/upload.jpg",
    description: description,
    views: "100",
    likes: "10000",
    duration: "2",
    timestamp: new Date(),
    comments: [],
  };

  videos.push(newVideo);
  fs.writeFile("./data/videos.json", JSON.stringify(videos), (err) => {
    if (err) {
      return res.status(500).json({
        error: true,
        message: "There was an error saving the video post, please try again",
      });
    }

    res.status(201).json(newVideo);
  });
});

//POST Comments
router.post("/:id/comments", (req, res) => {
  const { name, comment, likes } = req.body;
  const newComment = {
    id: uuid(),
    name: name,
    comment: comment,
    likes: likes,
    timestamp: new Date(),
  };

  fs.readFile("./data/videos.json", (err, data) => {
    if (err) {
      return res.status(500).json({
        error: true,
        message: "There was an error reading videos from JSON file",
      });
    }

    const videos = JSON.parse(data);

    const video = videos.find((video) => video.id === req.params.id);
    if (!video) {
      return res.status(404).json({
        error: true,
        message: "Video not found",
      });
    }

    video.comments.push(newComment);

    fs.writeFile("./data/videos.json", JSON.stringify(videos), (err) => {
      if (err) {
        return res.status(500).json({
          error: true,
          message:
            "There was an error saving the comment post, please try again",
        });
      }

      res.status(201).json(newComment);
    });
  });
});

//DELETE Comments
router.delete("/:videoId/comments/:commentId", (req, res) => {
  const requestVideoId = req.params.videoId;
  const requestCommentId = req.params.commentId;
  const requestedVideo = videos.find((video) => video.id === requestVideoId);
  if (!requestedVideo) {
    res.status(404).send("The video was not found");
    return;
  }
  const requestedComment = requestedVideo.comments.find(
    (comment) => comment.id === requestCommentId
  );
  if (!requestedComment) {
    res.status(404).send("The comment was not found");
    return;
  }
  requestedVideo.comments = requestedVideo.comments.filter(
    (comment) => comment.id !== requestCommentId
  );
  res.status(200).send();
});

module.exports = router;
