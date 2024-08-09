"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaPlaneDeparture, FaSignInAlt, FaUserPlus, FaTachometerAlt, FaSignOutAlt } from "react-icons/fa";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  // Check if user is logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // Check if token exists to determine login status
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token from localStorage
    setIsLoggedIn(false); // Update state
    router.push("/"); // Redirect to home page
  };

  return (
    <nav className="bg-gray-900 text-white shadow-lg">
      <div className="container mx-auto flex items-center justify-between p-4">
        <Link href="/" className="text-3xl font-bold text-blue-500 hover:text-blue-300 transition">
          Airline Booking
        </Link>

        <div className="flex space-x-6">
          <Link href="/" className="hover:text-blue-400 transition flex items-center space-x-2 relative group">
            <span>Home</span>
            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform"></div>
          </Link>
          <Link href="/flights" className="hover:text-blue-400 transition flex items-center space-x-2 relative group">
            <FaPlaneDeparture className="w-6 h-6" />
            <span>Flights</span>
            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform"></div>
          </Link>
          {isLoggedIn && (
            <Link href="/admin" className="hover:text-blue-400 transition flex items-center space-x-2 relative group">
              <FaTachometerAlt className="w-6 h-6" />
              <span>Admin</span>
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform"></div>
            </Link>
          )}
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="hover:text-red-400 transition flex items-center space-x-2 relative group"
            >
              <FaSignOutAlt className="w-6 h-6" />
              <span>Logout</span>
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-red-500 scale-x-0 group-hover:scale-x-100 transition-transform"></div>
            </button>
          ) : (
            <>
              <Link href="/login" className="hover:text-blue-400 transition flex items-center space-x-2 relative group">
                <FaSignInAlt className="w-6 h-6" />
                <span>Login</span>
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform"></div>
              </Link>
              <Link href="/register" className="hover:text-blue-400 transition flex items-center space-x-2 relative group">
                <FaUserPlus className="w-6 h-6" />
                <span>Register</span>
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform"></div>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
