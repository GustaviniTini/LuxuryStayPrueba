const { Pool } = require('pg');
require('dotenv').config();

// Configuración de la conexión a PostgreSQL
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Crear una nueva reserva
const createReservation = async (req, res) => {
  const { roomNumber, customerName, startDate, endDate } = req.body;

  try {
    const client = await pool.connect();
    
    // Verificar disponibilidad de la habitación
    const checkQuery = 'SELECT * FROM availability WHERE room_number = $1 AND available_date BETWEEN $2 AND $3 AND status = \'available\'';
    const result = await client.query(checkQuery, [roomNumber, startDate, endDate]);
    
    if (result.rows.length === 0) {
      return res.status(400).json({ message: 'No hay habitaciones disponibles en esas fechas' });
    }
    
    // Crear la reserva si hay disponibilidad
    const insertQuery = 'INSERT INTO reservations (room_number, customer_name, start_date, end_date, status) VALUES ($1, $2, $3, $4, $5) RETURNING *';
    const newReservation = await client.query(insertQuery, [roomNumber, customerName, startDate, endDate, 'active']);

    client.release(); // Liberar la conexión

    return res.status(201).json(newReservation.rows[0]);
  } catch (err) {
    console.error('Error al crear la reserva:', err);
    return res.status(500).json({ message: 'Error en el servidor' });
  }
};

// Obtener una reserva por ID
const getReservationById = async (req, res) => {
  const { id } = req.params;

  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM reservations WHERE reservation_id = $1', [id]);

    client.release(); // Liberar la conexión

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Reserva no encontrada' });
    }

    return res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error('Error al consultar la reserva:', err);
    return res.status(500).json({ message: 'Error en el servidor' });
  }
};

// Cancelar una reserva
const cancelReservation = async (req, res) => {
  const { id } = req.params;

  try {
    const client = await pool.connect();
    const result = await client.query('UPDATE reservations SET status = $1 WHERE reservation_id = $2 RETURNING *', ['cancelled', id]);

    client.release(); // Liberar la conexión

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Reserva no encontrada' });
    }

    return res.status(200).json({ message: 'Reserva cancelada exitosamente' });
  } catch (err) {
    console.error('Error al cancelar la reserva:', err);
    return res.status(500).json({ message: 'Error en el servidor' });
  }
};

module.exports = {
  createReservation,
  getReservationById,
  cancelReservation,
};
