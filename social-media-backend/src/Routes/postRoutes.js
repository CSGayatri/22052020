const express = require("express");
const { getPosts } = require("../Controllers/postController");

const router = express.Router();

router.get("/", getPosts);

module.exports = router;
