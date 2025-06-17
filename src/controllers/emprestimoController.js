const Livro = require('../models/livroModel');
const Emprestimo = require('../models/emprestimoModel');

const EmprestimoController = {
  async criar(req, res) {
    const { livro_id, data_devolucao_prevista } = req.body;
    const leitor_id = req.user.id;
    try {
      const livro = await Livro.buscarPorId(livro_id);
      if (!livro || livro.quantidade_disponivel <= 0) {
        return res.status(400).json({ message: 'Livro indisponível' });
      }
      await Livro.atualizar(livro_id, { ...livro, quantidade_disponivel: livro.quantidade_disponivel - 1 });
      const emprestimo = await Emprestimo.criar({ livro_id, leitor_id, data_emprestimo: new Date(), data_devolucao_prevista });
      res.status(201).json(emprestimo);
    } catch (err) {
      res.status(500).json({ message: 'Erro ao criar empréstimo', error: err.message });
    }
  },

  async listar(req, res) {
    try {
      const emprestimos = await Emprestimo.listarPorUsuario(req.user);
      res.json(emprestimos);
    } catch (err) {
      res.status(500).json({ message: 'Erro ao listar empréstimos', error: err.message });
    }
  },

  async solicitarDevolucao(req, res) {
    try {
      const emprestimo = await Emprestimo.buscarPorId(req.params.id);
      if (!emprestimo || emprestimo.leitor_id !== req.user.id || emprestimo.status !== 'ativo') {
        return res.status(400).json({ message: 'Empréstimo inválido' });
      }
      const atualizado = await Emprestimo.atualizarStatus(emprestimo.id, 'pendente', null);
      res.json(atualizado);
    } catch (err) {
      res.status(500).json({ message: 'Erro ao solicitar devolução', error: err.message });
    }
  },

  async devolver(req, res) {
    try {
      const emprestimo = await Emprestimo.buscarPorId(req.params.id);
      if (!emprestimo || (emprestimo.status !== 'ativo' && emprestimo.status !== 'pendente')) {
        return res.status(400).json({ message: 'Empréstimo inválido' });
      }
      const livro = await Livro.buscarPorId(emprestimo.livro_id);
      await Livro.atualizar(livro.id, { ...livro, quantidade_disponivel: livro.quantidade_disponivel + 1 });
      const atualizado = await Emprestimo.atualizarStatus(emprestimo.id, 'devolvido', new Date());
      res.json(atualizado);
    } catch (err) {
      res.status(500).json({ message: 'Erro ao devolver livro', error: err.message });
    }
  }
};

module.exports = EmprestimoController;
