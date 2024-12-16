const http = require('http');
const soap = require('strong-soap').soap;
const { Pool } = require('pg');
const fs = require('fs');
require('dotenv').config();

// Configuración de la conexión a PostgreSQL
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Función para consultar la disponibilidad de habitaciones
async function checkAvailability(startDate, endDate, roomType) {
  const client = await pool.connect();
  try {
    const query = `
      SELECT room_id, room_type, available_date, status
      FROM availability
      WHERE room_type = $1
        AND available_date BETWEEN $2 AND $3
        AND status = 'available';
    `;
    const res = await client.query(query, [roomType, startDate, endDate]);
    return res.rows;
  } catch (err) {
    console.error('Error al consultar la base de datos:', err);
    return [];
  } finally {
    client.release();
  }
}

// Implementación del servicio SOAP
const service = {
  AvailabilityService: {
    AvailabilityPort: {
      async checkAvailability(args) {
        const { startDate, endDate, roomType } = args;
        const rooms = await checkAvailability(startDate, endDate, roomType);
        return { availability: JSON.stringify(rooms) };
      },
    },
  },
};

// Cargar el archivo WSDL
const wsdl = fs.readFileSync('service.wsdl', 'utf8');

// Crear servidor HTTP
const server = http.createServer((req, res) => {
  if (req.url === '/wsdl') {
    // Sirve el archivo WSDL cuando se hace una solicitud GET a /wsdl
    res.writeHead(200, { 'Content-Type': 'text/xml' });
    res.end(wsdl);
  } else {
    res.writeHead(404);
    res.end();
  }
});

// Escuchar las peticiones SOAP
soap.listen(server, '/soap', service, wsdl, (err) => {
  if (err) {
    console.error('Error al configurar el servicio SOAP:', err);
  } else {
    console.log('SOAP Service está corriendo en el puerto 3001');
  }
});

server.listen(3001);
