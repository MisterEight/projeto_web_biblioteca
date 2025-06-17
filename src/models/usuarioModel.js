const pool = require('../config/db');

const Usuario = {
  async criar({ nome, email, senha, perfil }) {
    const result = await pool.query(
      'INSERT INTO usuarios (nome, email, senha, perfil) VALUES ($1, $2, $3, $4) RETURNING *',
      [nome, email, senha, perfil]
    );
    return result.rows[0];
  },

  async buscarPorEmail(email) {
    const result = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
    return result.rows[0];
  },

  async buscarPorId(id) {
    const result = await pool.query('SELECT * FROM usuarios WHERE id = $1', [id]);
    return result.rows[0];
  }
};

module.exports = Usuario;
