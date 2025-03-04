const express = require('express');
const { registrarUsuario, loginUsuario, obtenerUsuarioAutenticado, eliminarUsuario } = require('../controllers/userController');
const { verificarToken } = require('../middleware/auth');
const router = express.Router();

router.post('/registro', registrarUsuario);
router.post('/login', loginUsuario);
router.get('/me', verificarToken, obtenerUsuarioAutenticado);
router.delete('/eliminar/:id', verificarToken, eliminarUsuario);

module.exports = router;
