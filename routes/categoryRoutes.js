const express = require('express');
const { crearCategoria, obtenerCategorias } = require('../controllers/categoryController');
const router = express.Router();

router.post('/', crearCategoria);
router.get('/', obtenerCategorias);

module.exports = router;
