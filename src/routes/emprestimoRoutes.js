const express = require('express');
const EmprestimoController = require('../controllers/emprestimoController');
const auth = require('../middlewares/auth');
const authorize = require('../middlewares/authorize');

const router = express.Router();

router.get('/', auth, EmprestimoController.listar);
router.post('/', auth, authorize(['leitor']), EmprestimoController.criar);
router.put('/:id/solicitar-devolucao', auth, authorize(['leitor']), EmprestimoController.solicitarDevolucao);
router.put('/:id/devolver', auth, authorize(['bibliotecario']), EmprestimoController.devolver);
router.delete('/:id', auth, authorize(['bibliotecario']), EmprestimoController.remover);

module.exports = router;
