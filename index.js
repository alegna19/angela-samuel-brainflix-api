const express = require("express");
const app = express();
const videosRoutes = require("./routes/videos");
const cors = require("cors");

require("dotenv").config();
const PORT = process.env.PORT || 8081;

app.use(express.json());
app.use(cors({ origin: process.env.FRONTEND_URL }));
app.use(express.static("public"));
app.use("/videos", videosRoutes);

app.listen(PORT, () => {
  console.log("Listening on port 8081");
});
