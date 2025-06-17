const express = require('express');
const usuarioRoutes = require('./routes/usuarioRoutes');
const livroRoutes = require('./routes/livroRoutes');
const emprestimoRoutes = require('./routes/emprestimoRoutes');

const app = express();
app.use(express.json());

app.use('/usuarios', usuarioRoutes);
app.use('/livros', livroRoutes);
app.use('/emprestimos', emprestimoRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'API Biblioteca' });
});

module.exports = app;
