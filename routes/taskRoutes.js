const express = require('express');
const { crearTarea, obtenerTareas, obtenerTareaPorId, actualizarTarea, eliminarTarea } = require('../controllers/taskController');
const router = express.Router();

router.post('/', crearTarea);
router.get('/', obtenerTareas);
router.get('/:id', obtenerTareaPorId);
router.put('/:id', actualizarTarea);
router.delete('/:id', eliminarTarea);

module.exports = router;
