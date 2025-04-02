const express = require("express");
const cors = require("cors");
const postRoutes = require("./routes/postRoutes");
const commentRoutes = require("./routes/commentRoutes");

const app = express();

app.use(
  cors({
    origin: "*",
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type",
  })
);
app.use(express.json());

app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);

module.exports = app;
