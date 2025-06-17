const Livro = require('../models/livroModel');

const LivroController = {
  async listar(req, res) {
    try {
      const livros = await Livro.listar();
      res.json(livros);
    } catch (err) {
      res.status(500).json({ message: 'Erro ao listar livros', error: err.message });
    }
  },

  async obter(req, res) {
    try {
      const livro = await Livro.buscarPorId(req.params.id);
      if (!livro) return res.status(404).json({ message: 'Livro não encontrado' });
      res.json(livro);
    } catch (err) {
      res.status(500).json({ message: 'Erro ao obter livro', error: err.message });
    }
  },

  async criar(req, res) {
    try {
      const livro = await Livro.criar(req.body);
      res.status(201).json(livro);
    } catch (err) {
      res.status(500).json({ message: 'Erro ao criar livro', error: err.message });
    }
  },

  async atualizar(req, res) {
    try {
      const livro = await Livro.atualizar(req.params.id, req.body);
      if (!livro) return res.status(404).json({ message: 'Livro não encontrado' });
      res.json(livro);
    } catch (err) {
      res.status(500).json({ message: 'Erro ao atualizar livro', error: err.message });
    }
  },

  async remover(req, res) {
    try {
      await Livro.remover(req.params.id);
      res.status(204).end();
    } catch (err) {
      res.status(500).json({ message: 'Erro ao remover livro', error: err.message });
    }
  }
};

module.exports = LivroController;
