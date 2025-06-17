const express = require('express');
const UsuarioController = require('../controllers/usuarioController');
const auth = require('../middlewares/auth');

const router = express.Router();

router.post('/registrar', UsuarioController.registrar);
router.post('/login', UsuarioController.login);
router.get('/:id', auth, UsuarioController.obter);

module.exports = router;
