class UsersRepository {
    constructor(dao) {
        this.dao = dao
    }

    createTable() {
        const sql = `
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT)`
        return this.dao.run(sql)
    }
    // Inserting Data
    create(name) {
        return this.dao.run(
            'INSERT INTO users (name) VALUES (?)',
            [name])
    }
    // Updating Data
    update(project) {
        const { id, name } = project
        return this.dao.run(
            `UPDATE users SET name = ? WHERE id = ?`,
            [name, id]
        )
    }
    // Deleting Data
    delete(id) {
        return this.dao.run(
            `DELETE FROM users WHERE id = ?`,
            [id]
        )
    }
    // Query Data
    getById(id) {
        return this.dao.get(
            `SELECT * FROM users WHERE id = ?`,
            [id])
    }
    getPosts(userid) {
        return this.dao.all(
            `SELECT * FROM posts WHERE authorId = ?`,
            [userid])
    }
    getAll() {
        return this.dao.all(`SELECT * FROM users`)
    }
}

module.exports = UsersRepository  