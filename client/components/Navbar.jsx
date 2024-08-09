"use client";
import Link from "next/link";
import { FaPlaneDeparture, FaSignInAlt, FaUserPlus, FaTachometerAlt } from "react-icons/fa";

export default function Navbar() {
  return (
    <nav className="bg-gray-900 text-white shadow-md">
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Logo or Brand Name */}
        <Link href="/" className="text-2xl font-bold hover:text-blue-400 transition">
          Airline Booking
        </Link>

        {/* Navigation Links */}
        <div className="flex space-x-6">
          <Link
            href="/"
            className="hover:text-blue-400 transition flex items-center space-x-2"
          >
            <span>Home</span>
          </Link>
          <Link
            href="/flights"
            className="hover:text-blue-400 transition flex items-center space-x-2"
          >
            <FaPlaneDeparture className="w-5 h-5" />
            <span>Flights</span>
          </Link>
          <Link
            href="/admin"
            className="hover:text-blue-400 transition flex items-center space-x-2"
          >
            <FaTachometerAlt className="w-5 h-5" />
            <span>Admin</span>
          </Link>
          <Link
            href="/login"
            className="hover:text-blue-400 transition flex items-center space-x-2"
          >
            <FaSignInAlt className="w-5 h-5" />
            <span>Login</span>
          </Link>
          <Link
            href="/register"
            className="hover:text-blue-400 transition flex items-center space-x-2"
          >
            <FaUserPlus className="w-5 h-5" />
            <span>Register</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
