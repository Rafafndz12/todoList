const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.verificarToken = async (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ error: 'Acceso denegado' });
    }
    try {
        const decoded = jwt.verify(token, 'secreto');
        req.usuario = decoded;
        next();
    } catch (err) {
        res.status(401).json({ error: 'Token inválido' });
    }
};
