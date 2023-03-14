const express = require("express");
const app = express();
const port = 8081;
const videosRoutes = require("./routes/videos");

app.use(express.json());
app.use(express.static("public"));
app.use("/videos", videosRoutes);

app.listen(port, () => {
  console.log("Listening on port 8081");
});
