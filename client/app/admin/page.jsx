"use client";
import { useState, useEffect, useLayoutEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { FaPencilAlt, FaTrash } from "react-icons/fa";

export default function AdminPage() {
  const [flights, setFlights] = useState([]);
  const [flightNumber, setFlightNumber] = useState("");
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [departureTime, setDepartureTime] = useState("");
  const [arrivalTime, setArrivalTime] = useState("");
  const [price, setPrice] = useState("");
  const [seatsAvailable, setSeatsAvailable] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [editFlightId, setEditFlightId] = useState(null);
  const router = useRouter();
  const token = localStorage.getItem("token");

  useLayoutEffect(() => {
    if (!token) {
      router.push("/login");
      return;
    }
  }, []);

  useEffect(() => {
    if (token) checkAuth();
  }, [token]);

  const checkAuth = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/auth/profile",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setIsAuthenticated(true);
        setIsAdmin(true);
        fetchFlights();
      }
    } catch (err) {
      router.push('/login');
    }
  };

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

  const handleAddFlight = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:5000/api/flights${editFlightId ? `/${editFlightId}` : ''}`, {
        method: editFlightId ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ flightNumber, origin, destination, departureTime, arrivalTime, price, seatsAvailable }),
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess(editFlightId ? "Flight updated successfully" : "Flight added successfully");
        setFlightNumber("");
        setOrigin("");
        setDestination("");
        setDepartureTime("");
        setArrivalTime("");
        setPrice("");
        setSeatsAvailable("");
        setEditFlightId(null);
        fetchFlights();
      } else {
        setError(data.message || "Failed to save flight");
      }
    } catch (err) {
      setError("An error occurred while saving flight");
    }
  };

  const handleEdit = (flight) => {
    setEditFlightId(flight._id);
    setFlightNumber(flight.flightNumber);
    setOrigin(flight.origin);
    setDestination(flight.destination);
    setDepartureTime(new Date(flight.departureTime).toISOString().split('T')[0]);
    setArrivalTime(new Date(flight.arrivalTime).toISOString().split('T')[0]);
    setPrice(flight.price);
    setSeatsAvailable(flight.seatsAvailable);
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/flights/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
  
      if (res.ok) {
        setSuccess("Flight deleted successfully");
        fetchFlights(); // Refresh the list of flights
      } else {
        const data = await res.json();
        setError(data.message || "Failed to delete flight");
      }
    } catch (err) {
      console.error("Error during delete operation:", err); // Log any unexpected errors
      setError("An error occurred while deleting flight");
    }
  };

  if (!isAuthenticated || !isAdmin) {
    return <div className="bg-gray-900 text-white min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen p-6 flex flex-col">
      <header className="bg-gray-800 p-4 mb-6 rounded-md shadow-lg">
        <h1 className="text-2xl text-center font-bold text-blue-500">Admin Panel</h1>
      </header>

      <main className="flex-grow">
        {error && <p className="text-red-400 mb-4">{error}</p>}
        {success && <p className="text-green-400 mb-4">{success}</p>}

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-blue-400">Add/Edit Flight</h2>
          <form onSubmit={handleAddFlight} className="bg-gray-800 p-6 rounded-lg shadow-lg space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label htmlFor="flightNumber" className="block text-sm font-medium mb-1 text-gray-300">Flight Number</label>
                <input
                  type="text"
                  id="flightNumber"
                  value={flightNumber}
                  onChange={(e) => setFlightNumber(e.target.value)}
                  required
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md"
                />
              </div>
              <div>
                <label htmlFor="origin" className="block text-sm font-medium mb-1 text-gray-300">Origin</label>
                <input
                  type="text"
                  id="origin"
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  required
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md"
                />
              </div>
              <div>
                <label htmlFor="destination" className="block text-sm font-medium mb-1 text-gray-300">Destination</label>
                <input
                  type="text"
                  id="destination"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  required
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md"
                />
              </div>
              <div>
                <label htmlFor="departureTime" className="block text-sm font-medium mb-1 text-gray-300">Departure Time</label>
                <input
                  type="date"
                  id="departureTime"
                  value={departureTime}
                  onChange={(e) => setDepartureTime(e.target.value)}
                  required
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md"
                />
              </div>
              <div>
                <label htmlFor="arrivalTime" className="block text-sm font-medium mb-1 text-gray-300">Arrival Time</label>
                <input
                  type="date"
                  id="arrivalTime"
                  value={arrivalTime}
                  onChange={(e) => setArrivalTime(e.target.value)}
                  required
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md"
                />
              </div>
              <div>
                <label htmlFor="price" className="block text-sm font-medium mb-1 text-gray-300">Price</label>
                <input
                  type="number"
                  id="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md"
                />
              </div>
              <div>
                <label htmlFor="seatsAvailable" className="block text-sm font-medium mb-1 text-gray-300">Seats Available</label>
                <input
                  type="number"
                  id="seatsAvailable"
                  value={seatsAvailable}
                  onChange={(e) => setSeatsAvailable(e.target.value)}
                  required
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full p-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
            >
              {editFlightId ? "Update Flight" : "Add Flight"}
            </button>
          </form>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4 text-blue-400">Flight List</h2>
          <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
            {flights.length === 0 ? (
              <p className="text-gray-400">No flights available.</p>
            ) : (
              <table className="w-full bg-gray-700 rounded-lg">
                <thead>
                  <tr className="border-b border-gray-600">
                    <th className="py-2 px-4 text-left text-gray-300">Flight Number</th>
                    <th className="py-2 px-4 text-left text-gray-300">Origin</th>
                    <th className="py-2 px-4 text-left text-gray-300">Destination</th>
                    <th className="py-2 px-4 text-left text-gray-300">Departure Time</th>
                    <th className="py-2 px-4 text-left text-gray-300">Arrival Time</th>
                    <th className="py-2 px-4 text-left text-gray-300">Price</th>
                    <th className="py-2 px-4 text-left text-gray-300">Seats Available</th>
                    <th className="py-2 px-4 text-left text-gray-300">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {flights.map((flight) => (
                    <tr key={flight._id} className="border-b border-gray-600">
                      <td className="py-2 px-4">{flight.flightNumber}</td>
                      <td className="py-2 px-4">{flight.origin}</td>
                      <td className="py-2 px-4">{flight.destination}</td>
                      <td className="py-2 px-4">{new Date(flight.departureTime).toLocaleDateString()}</td>
                      <td className="py-2 px-4">{new Date(flight.arrivalTime).toLocaleDateString()}</td>
                      <td className="py-2 px-4">${flight.price.toFixed(2)}</td>
                      <td className="py-2 px-4">{flight.seatsAvailable}</td>
                      <td className="py-2 px-4 flex space-x-2">
                        <button onClick={() => handleEdit(flight)} className="text-yellow-400 hover:text-yellow-500">
                          <FaPencilAlt />
                        </button>
                        <button onClick={() => handleDelete(flight._id)} className="text-red-400 hover:text-red-500">
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
