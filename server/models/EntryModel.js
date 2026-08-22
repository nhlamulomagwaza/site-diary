const db = require('../config/database');

class EntryModel {
  findAll(contractName) {
    let query = `
      SELECT id, date, contract_name AS contractName, weather, notes, author_name AS authorName, created_at AS createdAt
      FROM entries
    `;
    const params = [];

    if (contractName) {
      query += ' WHERE contract_name = ?';
      params.push(contractName);
    }

    query += ' ORDER BY date DESC, created_at DESC';

    return db.prepare(query).all(...params);
  }

  create(entry) {
    const stmt = db.prepare(`
      INSERT INTO entries (date, contract_name, weather, notes, author_name)
      VALUES (@date, @contractName, @weather, @notes, @authorName)
    `);

    const result = stmt.run(entry);

    return this.findById(result.lastInsertRowid);
  }

  findById(id) {
    return db.prepare(`
      SELECT id, date, contract_name AS contractName, weather, notes, author_name AS authorName, created_at AS createdAt
      FROM entries
      WHERE id = ?
    `).get(id);
  }

  getSummary() {
    return db.prepare(`
      SELECT contract_name AS contractName, COUNT(*) AS count
      FROM entries
      GROUP BY contract_name
      ORDER BY contract_name ASC
    `).all();
  }
}

module.exports = new EntryModel();
