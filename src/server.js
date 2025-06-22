const app = require('./app');
const Emprestimo = require('./models/emprestimoModel');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  Emprestimo.marcarAtrasados();
  setInterval(() => Emprestimo.marcarAtrasados().catch(console.error), 60 * 60 * 1000);
});
