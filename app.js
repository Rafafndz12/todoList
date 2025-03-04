const express = require('express');
const connectDB = require('./config/db');
const taskRoutes = require('./routes/taskRoutes');

const app = express();

// Conectar a la base de datos
connectDB();

// Middleware
app.use(express.json());

// Rutas
app.use('/api', taskRoutes);

// Puerto del Servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
