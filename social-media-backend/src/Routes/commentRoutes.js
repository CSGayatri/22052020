const express = require("express");
const { getCommentsByPostId } = require("../Controllers/commentController");

const router = express.Router();

router.get("/:postid", getCommentsByPostId);

module.exports = router;
