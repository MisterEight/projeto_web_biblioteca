const pool = require('../config/db');

const Livro = {
  async listar() {
    const result = await pool.query('SELECT * FROM livros ORDER BY id');
    return result.rows;
  },

  async buscarPorId(id) {
    const result = await pool.query('SELECT * FROM livros WHERE id = $1', [id]);
    return result.rows[0];
  },

  async criar({ titulo, autor, ano_publicacao, quantidade_disponivel }) {
    const result = await pool.query(
      'INSERT INTO livros (titulo, autor, ano_publicacao, quantidade_disponivel) VALUES ($1, $2, $3, $4) RETURNING *',
      [titulo, autor, ano_publicacao, quantidade_disponivel]
    );
    return result.rows[0];
  },

  async atualizar(id, { titulo, autor, ano_publicacao, quantidade_disponivel }) {
    const result = await pool.query(
      'UPDATE livros SET titulo=$1, autor=$2, ano_publicacao=$3, quantidade_disponivel=$4 WHERE id=$5 RETURNING *',
      [titulo, autor, ano_publicacao, quantidade_disponivel, id]
    );
    return result.rows[0];
  },

  async remover(id) {
    await pool.query('DELETE FROM livros WHERE id = $1', [id]);
  }
};

module.exports = Livro;
