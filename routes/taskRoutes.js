const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

// Crear Tarea
router.post('/tareas', taskController.crearTarea);

// Obtener Todas las Tareas
router.get('/tareas', taskController.obtenerTareas);

// Obtener Tarea por ID
router.get('/tareas/:id', taskController.obtenerTareaPorId);

// Actualizar Tarea
router.put('/tareas/:id', taskController.actualizarTarea);

// Eliminar Tarea
router.delete('/tareas/:id', taskController.eliminarTarea);

module.exports = router;
