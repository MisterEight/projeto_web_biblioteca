const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuarioModel');

const UsuarioController = {
  async registrar(req, res) {
    const { nome, email, senha, perfil } = req.body;
    try {
      const senhaHash = await bcrypt.hash(senha, 10);
      const usuario = await Usuario.criar({ nome, email, senha: senhaHash, perfil });
      res.status(201).json(usuario);
    } catch (err) {
      res.status(500).json({ message: 'Erro ao registrar usuário', error: err.message });
    }
  },

  async login(req, res) {
    const { email, senha } = req.body;
    try {
      const usuario = await Usuario.buscarPorEmail(email);
      if (!usuario) return res.status(401).json({ message: 'Usuário ou senha inválidos' });
      const match = await bcrypt.compare(senha, usuario.senha);
      if (!match) return res.status(401).json({ message: 'Usuário ou senha inválidos' });

      const token = jwt.sign({ id: usuario.id, perfil: usuario.perfil }, process.env.JWT_SECRET || 'secret', {
        expiresIn: '1h'
      });
      res.json({ token });
    } catch (err) {
      res.status(500).json({ message: 'Erro no login', error: err.message });
    }
  }
};

module.exports = UsuarioController;
