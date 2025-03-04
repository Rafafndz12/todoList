const Task = require('../models/Task');

exports.crearTarea = async (req, res) => {
    const { titulo, descripcion, fecha_vencimiento } = req.body;
    try {
        const nuevaTarea = new Task({ titulo, descripcion, fecha_vencimiento });
        const tareaGuardada = await nuevaTarea.save();
        res.status(201).json(tareaGuardada);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.obtenerTareas = async (req, res) => {
    try {
        const tareas = await Task.find();
        res.status(200).json(tareas);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.obtenerTareaPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const tarea = await Task.findById(id);
        if (!tarea) {
            return res.status(404).json({ error: 'Tarea no encontrada' });
        }
        res.status(200).json(tarea);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.actualizarTarea = async (req, res) => {
    const { id } = req.params;
    const { titulo, descripcion, completada, fecha_vencimiento } = req.body;
    try {
        const tareaActualizada = await Task.findByIdAndUpdate(
            id,
            { titulo, descripcion, completada, fecha_vencimiento },
            { new: true }
        );
        if (!tareaActualizada) {
            return res.status(404).json({ error: 'Tarea no encontrada' });
        }
        res.status(200).json(tareaActualizada);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.eliminarTarea = async (req, res) => {
    const { id } = req.params;
    try {
        const tareaEliminada = await Task.findByIdAndDelete(id);
        if (!tareaEliminada) {
            return res.status(404).json({ error: 'Tarea no encontrada' });
        }
        res.status(200).json({ message: 'Tarea eliminada' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
