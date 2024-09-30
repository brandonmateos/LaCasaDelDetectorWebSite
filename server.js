require('dotenv').config(); // Asegúrate de cargar las variables de entorno al inicio
const express = require('express');
const { Pool } = require('pg'); // Importa el cliente de PostgreSQL
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

// Configura los archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint para obtener todos los productos
app.get('/api/products', async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM products");
        console.log('Productos recuperados:', result.rows);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

// Ruta para la página principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Manejador de errores 404
app.use((req, res, next) => {
    console.log(`404 Not Found: ${req.originalUrl}`);
    res.status(404).send('Recurso no encontrado');
});

// Iniciar el servidor
module.exports = app;
