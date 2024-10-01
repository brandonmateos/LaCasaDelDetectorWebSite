require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Configurar archivos estáticos
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
    release();
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

// Ruta para la página principal y el catálogo
app.get(['/', '/catalogo.html'], (req, res) => {
  res.sendFile(path.join(__dirname, 'public', req.path === '/' ? 'index.html' : 'catalogo.html'));
});

// Manejador de errores 404
app.use((req, res, next) => {
  console.log(`404 Not Found: ${req.originalUrl}`);
  res.status(404).send('Recurso no encontrado');
});

// Exportar la app para que Vercel pueda manejarla
module.exports = app;

// Solo iniciar el servidor si no estamos en Vercel
if (process.env.VERCEL_ENV !== 'production') {
  app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
  });
}