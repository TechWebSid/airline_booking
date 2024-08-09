const express = require('express');
const {
  getFlights,
  getFlightById,
  createFlight,
  updateFlight,
  deleteFlight,
} = require('../controllers/flightController');
const { authMiddleware, adminMiddleware } = require('../middlewares/authMiddleware');

const router = express.Router();

// Get all flights
router.get('/', getFlights);

// Get a single flight by ID
router.get('/:id', getFlightById);

// Create a new flight
router.post('/', authMiddleware, adminMiddleware, createFlight);

// Update an existing flight
router.put('/:id', authMiddleware, adminMiddleware, updateFlight);

// Delete a flight
router.delete('/:id', authMiddleware, adminMiddleware, deleteFlight);

module.exports = router;
