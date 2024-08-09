"use client";
import { useState, useEffect } from "react";
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export default function Flights() {
  const [flights, setFlights] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState("");

  useEffect(() => {
    fetchFlights();
  }, []);

  const fetchFlights = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/flights");
      if (res.ok) {
        const data = await res.json();
        setFlights(data);
      } else {
        setError("Failed to load flights");
      }
    } catch (err) {
      setError("An error occurred while fetching flights");
    }
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text('Flights List', 14, 16);
    doc.autoTable({
      startY: 22,
      head: [['Flight Number', 'Origin', 'Destination', 'Departure Time', 'Arrival Time', 'Price', 'Seats Available']],
      body: flights.map(flight => [
        flight.flightNumber,
        flight.origin,
        flight.destination,
        new Date(flight.departureTime).toLocaleString(),
        new Date(flight.arrivalTime).toLocaleString(),
        `$${flight.price.toFixed(2)}`,
        flight.seatsAvailable
      ]),
    });
    doc.save('flights.pdf');
  };

  const filteredFlights = flights.filter(flight =>
    flight.destination.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white min-h-screen flex flex-col p-6">
      <header className="bg-gradient-to-r from-teal-600 to-blue-700 p-6 rounded-lg shadow-lg mb-8">
        <h1 className="text-4xl font-bold text-center">Available Flights</h1>
      </header>
      <main className="flex-grow">
        {error && <p className="text-red-400 mb-4 text-center">{error}</p>}
        <div className="bg-gray-900 rounded-lg shadow-lg overflow-hidden">
          <div className="flex justify-between items-center p-4 bg-gradient-to-r from-teal-500 to-blue-600">
            <h2 className="text-2xl font-semibold">Flights List</h2>
            <button
              onClick={exportToPDF}
              className="bg-teal-500 hover:bg-teal-600 text-white py-2 px-4 rounded-md transition"
            >
              Export to PDF
            </button>
          </div>
          <div className="p-4 flex justify-center">
            <input
              type="text"
              placeholder="Search by destination..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full max-w-xs p-2 bg-gray-800 border border-gray-700 rounded-md text-gray-300 placeholder-gray-500"
            />
          </div>
          <table className="w-full text-gray-300">
            <thead>
              <tr className="bg-gray-800">
                <th className="p-4 text-left">Flight Number</th>
                <th className="p-4 text-left">Origin</th>
                <th className="p-4 text-left">Destination</th>
                <th className="p-4 text-left">Departure Time</th>
                <th className="p-4 text-left">Arrival Time</th>
                <th className="p-4 text-left">Price</th>
                <th className="p-4 text-left">Seats Available</th>
              </tr>
            </thead>
            <tbody>
              {filteredFlights.map((flight) => (
                <tr key={flight._id} className="border-b border-gray-700 hover:bg-gray-800 transition">
                  <td className="p-4">{flight.flightNumber}</td>
                  <td className="p-4">{flight.origin}</td>
                  <td className="p-4">{flight.destination}</td>
                  <td className="p-4">
                    {new Date(flight.departureTime).toLocaleDateString()}{" "}
                    {new Date(flight.departureTime).toLocaleTimeString()}
                  </td>
                  <td className="p-4">
                    {new Date(flight.arrivalTime).toLocaleDateString()}{" "}
                    {new Date(flight.arrivalTime).toLocaleTimeString()}
                  </td>
                  <td className="p-4">${flight.price.toFixed(2)}</td>
                  <td className="p-4">{flight.seatsAvailable}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
