const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true,
    },
    descripcion: {
        type: String,
    },
    completada: {
        type: Boolean,
        default: false,
    },
    fecha_creacion: {
        type: Date,
        default: Date.now,
    },
    fecha_vencimiento: {
        type: Date,
    },
});

module.exports = mongoose.model('Task', TaskSchema);
