const express = require('express');
const path = require('path');
const usuarioRoutes = require('./routes/usuarioRoutes');
const livroRoutes = require('./routes/livroRoutes');
const emprestimoRoutes = require('./routes/emprestimoRoutes');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use('/usuarios', usuarioRoutes);
app.use('/livros', livroRoutes);
app.use('/emprestimos', emprestimoRoutes);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

module.exports = app;
