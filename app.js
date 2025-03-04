const express = require('express');
const sequelize = require('./config/database');
const taskRoutes = require('./routes/taskRoutes');
const userRoutes = require('./routes/userRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const { verificarToken } = require('./middleware/auth');

const app = express();

// Conectar a la base de datos
sequelize.authenticate().then(() => {
    console.log('Conectado a la base de datos MySQL');
}).catch(err => {
    console.error('No se pudo conectar a la base de datos:', err);
});

// Sincronizar los modelos
sequelize.sync({ force: true }).then(() => {
    console.log('Modelos sincronizados y base de datos reiniciada');
}).catch(err => {
    console.error('Error al sincronizar los modelos:', err);
});

// Middleware
app.use(express.json());

// Rutas
app.use('/api/tareas', verificarToken, taskRoutes);
app.use('/api/usuarios', userRoutes);
app.use('/api/categorias', verificarToken, categoryRoutes);

// Puerto del Servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
