const axios = require("axios");
const Comment = require("../models/commentModel");

const getCommentsByPostId = async (req, res) => {
  const postid = req.params.postid;
  try {
    const response = await axios.get(
      `${process.env.EXTERNAL_COMMENTS_API_URL}?postid=${postid}`
    );
    const comments = response.data.comments;
    await Comment.insert(comments);
    res.json({ comments });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch comments" });
  }
};

module.exports = { getCommentsByPostId };
