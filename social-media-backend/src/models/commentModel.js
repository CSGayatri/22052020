const pool = require("../config/db");

const Comment = {
  insert: async (comments) => {
    const query =
      "INSERT INTO comments (id, postid, content) VALUES ($1, $2, $3) ON CONFLICT (id) DO NOTHING";
    for (let comment of comments) {
      await pool.query(query, [comment.id, comment.postid, comment.content]);
    }
  },
  getByPostId: async (postid) => {
    const result = await pool.query(
      "SELECT * FROM comments WHERE postid = $1",
      [postid]
    );
    return result.rows;
  },
};

module.exports = Comment;
