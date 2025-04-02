const axios = require("axios");
const Post = require("../models/postModel");

const getPosts = async (req, res) => {
  try {
    const response = await axios.get(process.env.EXTERNAL_POSTS_API_URL);
    const posts = response.data;
    await Post.insert(posts);
    res.json({ posts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch posts" });
  }
};

module.exports = { getPosts };
