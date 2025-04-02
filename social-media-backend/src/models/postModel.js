const pool = require("../config/db");

const Post = {
  insert: async (posts) => {
    const query =
      "INSERT INTO posts (id, userid, content) VALUES ($1, $2, $3) ON CONFLICT (id) DO NOTHING";
    for (let post of posts) {
      await pool.query(query, [post.id, post.userid, post.content]);
    }
  },
  getAll: async () => {
    const result = await pool.query("SELECT * FROM posts");
    return result.rows;
  },
};

module.exports = Post;
