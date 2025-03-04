const Task = require('../models/Task');

exports.crearTarea = async (req, res) => {
    const { titulo, descripcion, fecha_vencimiento, categoryId } = req.body;
    try {
        const nuevaTarea = await Task.create({ titulo, descripcion, fecha_vencimiento, categoryId, userId: req.usuario.id });
        res.status(201).json(nuevaTarea);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.obtenerTareas = async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    try {
        const tareas = await Task.findAndCountAll({
            limit,
            offset: (page - 1) * limit,
            where: { userId: req.usuario.id }
        });
        res.status(200).json(tareas);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.obtenerTareaPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const tarea = await Task.findByPk(id);
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
    const { titulo, descripcion, completada, fecha_vencimiento, categoryId } = req.body;
    try {
        const tarea = await Task.findByPk(id);
        if (!tarea) {
            return res.status(404).json({ error: 'Tarea no encontrada' });
        }
        tarea.titulo = titulo;
        tarea.descripcion = descripcion;
        tarea.completada = completada;
        tarea.fecha_vencimiento = fecha_vencimiento;
        tarea.categoryId = categoryId;
        await tarea.save();
        res.status(200).json(tarea);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.eliminarTarea = async (req, res) => {
    const { id } = req.params;
    try {
        const tarea = await Task.findByPk(id);
        if (!tarea) {
            return res.status(404).json({ error: 'Tarea no encontrada' });
        }
        await tarea.destroy();
        res.status(200).json({ message: 'Tarea eliminada' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
