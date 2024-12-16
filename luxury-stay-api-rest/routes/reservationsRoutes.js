const express = require('express');
const router = express.Router();
const reservationsController = require('../controllers/reservationsController'); // Controladores de la API

/**
 * @swagger
 * /api/reservations:
 *   post:
 *     summary: Crear una nueva reserva
 *     description: Crea una nueva reserva si hay disponibilidad
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               roomNumber:
 *                 type: integer
 *               customerName:
 *                 type: string
 *               startDate:
 *                 type: string
 *                 format: date
 *               endDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Reserva creada exitosamente
 *       400:
 *         description: No hay habitaciones disponibles
 */

/**
 * @swagger
 * /api/reservations/{id}:
 *   get:
 *     summary: Consultar una reserva por ID
 *     description: Recupera los detalles de una reserva específica
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID de la reserva
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Reserva encontrada
 *       404:
 *         description: Reserva no encontrada
 */

/**
 * @swagger
 * /api/reservations/{id}:
 *   delete:
 *     summary: Cancelar una reserva
 *     description: Elimina una reserva específica
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID de la reserva
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Reserva cancelada
 *       404:
 *         description: Reserva no encontrada
 */

// Rutas de la API para gestionar las reservas
router.post('/reservations', reservationsController.createReservation);
router.get('/reservations/:id', reservationsController.getReservationById);
router.delete('/reservations/:id', reservationsController.cancelReservation);

module.exports = router;
