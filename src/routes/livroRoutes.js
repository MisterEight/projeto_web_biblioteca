const express = require('express');
const LivroController = require('../controllers/livroController');
const auth = require('../middlewares/auth');
const authorize = require('../middlewares/authorize');

const router = express.Router();

router.get('/', auth, LivroController.listar);
router.get('/:id', auth, LivroController.obter);
router.post('/', auth, authorize(['bibliotecario']), LivroController.criar);
router.put('/:id', auth, authorize(['bibliotecario']), LivroController.atualizar);
router.delete('/:id', auth, authorize(['bibliotecario']), LivroController.remover);

module.exports = router;
