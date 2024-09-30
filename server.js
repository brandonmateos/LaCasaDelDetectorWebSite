require('dotenv').config(); // Asegúrate de cargar las variables de entorno al inicio
const express = require('express');
const { Pool } = require('pg'); // Importa el cliente de PostgreSQL
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Configura los archivos estáticos

app.use(express.static(path.join(__dirname, 'public')));

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

// Verificación de la conexión a la base de datos
pool.connect((err, client, release) => {
    if (err) {
      console.error('Error al conectar a la base de datos:', err.stack);
    } else {
      console.log('Conexión exitosa a PostgreSQL');
      release(); // Suelta el cliente después de la prueba de conexión
    }
  });


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
if (process.env.NODE_ENV !== 'production') {
    app.listen(port, () => {
      console.log(`Servidor corriendo en http://localhost:${port}`);
    });
  }
  
  module.exports = app;
  