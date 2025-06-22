const pool = require('../config/db');

const Emprestimo = {
  async criar({ livro_id, leitor_id, data_emprestimo, data_devolucao_prevista }) {
    const result = await pool.query(
      `INSERT INTO emprestimos (livro_id, leitor_id, data_emprestimo, data_devolucao_prevista, status)
       VALUES ($1, $2, $3, $4, 'ativo') RETURNING *`,
      [livro_id, leitor_id, data_emprestimo, data_devolucao_prevista]
    );
    return result.rows[0];
  },

  async listarPorUsuario(usuario) {
    if (usuario.perfil === 'bibliotecario') {
      const result = await pool.query('SELECT * FROM emprestimos ORDER BY id');
      return result.rows;
    } else {
      const result = await pool.query('SELECT * FROM emprestimos WHERE leitor_id=$1 ORDER BY id', [usuario.id]);
      return result.rows;
    }
  },

  async buscarPorId(id) {
    const result = await pool.query('SELECT * FROM emprestimos WHERE id = $1', [id]);
    return result.rows[0];
  },

  async atualizarStatus(id, status, data_devolucao_real) {
    const result = await pool.query(
      'UPDATE emprestimos SET status=$1, data_devolucao_real=$2 WHERE id=$3 RETURNING *',
      [status, data_devolucao_real, id]
    );
    return result.rows[0];
  },

  async remover(id) {
    await pool.query('DELETE FROM emprestimos WHERE id=$1', [id]);
  },

  async marcarAtrasados() {
    await pool.query(
      "UPDATE emprestimos SET status='atrasado' " +
        "WHERE status IN ('ativo','pendente') " +
        "AND data_devolucao_prevista < CURRENT_DATE " +
        "AND data_devolucao_real IS NULL"
    );
  }
};

module.exports = Emprestimo;
