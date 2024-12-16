const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const reservationsRoutes = require('./routes/reservationsRoutes'); // Asegúrate de crear este archivo

const app = express();
app.use(bodyParser.json()); // Parsear el cuerpo de las solicitudes en formato JSON

// Configuración de Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',  // Versión de OpenAPI
    info: {
      title: 'LuxuryStay API', // Nombre de la API
      version: '1.0.0',  // Versión de la API
      description: 'API para gestionar reservas y disponibilidad en LuxuryStay', // Descripción de la API
    },
  },
  apis: ['./routes/reservationsRoutes.js'],  // Apunta a las rutas donde están las anotaciones de Swagger
};

// Generación de la documentación Swagger
const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs)); // Endpoint para la documentación Swagger

// Usar las rutas de reservas (vamos a crear este archivo)
app.use('/api', reservationsRoutes);

// Arrancar el servidor
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`API REST for reservations is running on port ${PORT}`);
  console.log('Swagger documentation available at http://localhost:4000/api-docs');
});
