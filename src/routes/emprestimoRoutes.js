const express = require('express');
const EmprestimoController = require('../controllers/emprestimoController');
const auth = require('../middlewares/auth');
const authorize = require('../middlewares/authorize');

const router = express.Router();

router.get('/', auth, EmprestimoController.listar);
router.post('/', auth, authorize(['leitor']), EmprestimoController.criar);
router.put('/:id/devolver', auth, authorize(['bibliotecario']), EmprestimoController.devolver);

module.exports = router;
