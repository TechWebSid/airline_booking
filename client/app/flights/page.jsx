"use client";
import { useState, useEffect } from "react";

export default function Flights() {
  const [flights, setFlights] = useState([]);
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

  return (
    <div className="bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white min-h-screen flex flex-col p-6">
      <header className="bg-gradient-to-r from-purple-600 to-blue-600 p-4 mb-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center">Flights</h1>
      </header>
      <main className="flex-grow">
        {error && <p className="text-red-400 mb-4 text-center">{error}</p>}
        <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <h2 className="text-2xl text-center font-semibold p-4 bg-gradient-to-r from-blue-500 to-teal-500">
            Flights List
          </h2>
          <table className="w-full text-gray-300">
            <thead>
              <tr className="bg-gray-700">
                <th className="p-3 text-left">Flight Number</th>
                <th className="p-3 text-left">Origin</th>
                <th className="p-3 text-left">Destination</th>
                <th className="p-3 text-left">Departure Time</th>
                <th className="p-3 text-left">Arrival Time</th>
                <th className="p-3 text-left">Price</th>
                <th className="p-3 text-left">Seats Available</th>
              </tr>
            </thead>
            <tbody>
              {flights.map((flight) => (
                <tr key={flight._id} className="border-b border-gray-700 hover:bg-gray-700">
                  <td className="p-3">{flight.flightNumber}</td>
                  <td className="p-3">{flight.origin}</td>
                  <td className="p-3">{flight.destination}</td>
                  <td className="p-3">
                    {new Date(flight.departureTime).toLocaleDateString()}{" "}
                    {new Date(flight.departureTime).toLocaleTimeString()}
                  </td>
                  <td className="p-3">
                    {new Date(flight.arrivalTime).toLocaleDateString()}{" "}
                    {new Date(flight.arrivalTime).toLocaleTimeString()}
                  </td>
                  <td className="p-3">${flight.price.toFixed(2)}</td>
                  <td className="p-3">{flight.seatsAvailable}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
