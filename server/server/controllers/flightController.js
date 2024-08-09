const Flight = require('../models/flightModel');

// Get all flights
const getFlights = async (req, res) => {
  try {
    const flights = await Flight.find();
    res.json(flights);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get a single flight by ID
const getFlightById = async (req, res) => {
  try {
    const flight = await Flight.findById(req.params.id);

    if (!flight) {
      return res.status(404).json({ message: 'Flight not found' });
    }

    res.json(flight);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Create a new flight
const createFlight = async (req, res) => {
  const { flightNumber, origin, destination, departureTime, arrivalTime, price, seatsAvailable } = req.body;

  try {
    const flight = new Flight({
      flightNumber,
      origin,
      destination,
      departureTime,
      arrivalTime,
      price,
      seatsAvailable,
    });

    await flight.save();
    res.status(201).json({ message: 'Flight created successfully', flight });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Update an existing flight
const updateFlight = async (req, res) => {
  const { flightNumber, origin, destination, departureTime, arrivalTime, price, seatsAvailable } = req.body;

  try {
    const flight = await Flight.findById(req.params.id);

    if (!flight) {
      return res.status(404).json({ message: 'Flight not found' });
    }

    flight.flightNumber = flightNumber || flight.flightNumber;
    flight.origin = origin || flight.origin;
    flight.destination = destination || flight.destination;
    flight.departureTime = departureTime || flight.departureTime;
    flight.arrivalTime = arrivalTime || flight.arrivalTime;
    flight.price = price || flight.price;
    flight.seatsAvailable = seatsAvailable || flight.seatsAvailable;

    await flight.save();
    res.json({ message: 'Flight updated successfully', flight });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Delete a flight
// flightController.js
// flightController.js
const deleteFlight = async (req, res) => {
  try {
    const result = await Flight.deleteOne({ _id: req.params.id });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Flight not found' });
    }

    res.json({ message: 'Flight deleted successfully' });
  } catch (error) {
    console.error("Error deleting flight:", error); // Log error details
    res.status(500).json({ message: 'Server error', error });
  }
};


module.exports = {
  getFlights,
  getFlightById,
  createFlight,
  updateFlight,
  deleteFlight,
};
