const Category = require('../models/Category');

exports.crearCategoria = async (req, res) => {
    const { nombre } = req.body;
    try {
        const nuevaCategoria = await Category.create({ nombre });
        res.status(201).json(nuevaCategoria);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.obtenerCategorias = async (req, res) => {
    try {
        const categorias = await Category.findAll();
        res.status(200).json(categorias);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
