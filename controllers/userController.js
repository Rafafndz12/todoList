const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.registrarUsuario = async (req, res) => {
    const { nombre, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const nuevoUsuario = await User.create({ nombre, email, password: hashedPassword });
        res.status(201).json(nuevoUsuario);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.loginUsuario = async (req, res) => {
    const { email, password } = req.body;
    try {
        const usuario = await User.findOne({ where: { email } });
        if (!usuario || !await bcrypt.compare(password, usuario.password)) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }
        const token = jwt.sign({ id: usuario.id }, 'secreto', { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.obtenerUsuarioAutenticado = async (req, res) => {
    try {
        const usuario = await User.findByPk(req.usuario.id);
        res.status(200).json(usuario);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.eliminarUsuario = async (req, res) => {
    const { id } = req.params;
    try {
        const usuario = await User.findByPk(id);
        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        await usuario.destroy();
        res.status(200).json({ message: 'Usuario eliminado' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
