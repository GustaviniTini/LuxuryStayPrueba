const express = require('express');
const { Pool } = require('pg');
const app = express();
const port = 5000;
require('dotenv').config();


// Configuración de la conexión a PostgreSQL
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

app.use(express.json());

// Endpoint para registrar una nueva habitación
app.post('/rooms', async (req, res) => {
  const { room_number, room_type, status } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO rooms (room_number, room_type, status) VALUES ($1, $2, $3) RETURNING *',
      [room_number, room_type, status]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error al registrar habitación:', err);
    res.status(500).json({ message: 'Error al registrar habitación' });
  }
});

// Endpoint para actualizar el estado de una habitación
app.patch('/rooms/:id', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const result = await pool.query(
      'UPDATE rooms SET status = $1 WHERE room_id = $2 RETURNING *',
      [status, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Habitación no encontrada' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error al actualizar habitación:', err);
    res.status(500).json({ message: 'Error al actualizar habitación' });
  }
});

app.listen(port, () => {
  console.log(`Microservicio de inventario escuchando en http://localhost:${port}`);
});
