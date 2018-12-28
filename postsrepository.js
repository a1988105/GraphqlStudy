class PostsRepository {
  constructor(dao) {
    this.dao = dao
  }

  createTable() {
    const sql = `
      CREATE TABLE IF NOT EXISTS posts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        body TEXT,
        authorId INTEGER,
        CONSTRAINT user_fk_userId FOREIGN KEY (authorId)
          REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE)`
    return this.dao.run(sql)
  }
  // Inserting Data
  create(title, body, authorId) {
    return this.dao.run(
      `INSERT INTO posts (title, body, authorId)
        VALUES (?, ?, ?)`,
      [title, body, authorId])
  }
  // Updating Data
  update(post) {
    const { id, title, body, authorId } = post
    return this.dao.run(
      `UPDATE posts
      SET title     = ?,
          body      = ?,
          authorId  = ?,
      WHERE id      = ?`,
      [title, body, authorId, id]
    )
  }
  // Deleting Data
  delete(id) {
    return this.dao.run(
      `DELETE FROM posts WHERE id = ?`,
      [id]
    )
  }
  // Query Data
  getById(id) {
    return this.dao.get(
      `SELECT * FROM posts WHERE id = ?`,
      [id])
  }
  getAll() {
    return this.dao.all(`SELECT * FROM posts`)
  }
}

module.exports = PostsRepository  