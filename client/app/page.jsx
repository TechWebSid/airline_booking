import { FaLocationArrow } from "react-icons/fa";
import Image from 'next/image';

const Hero = () => {
  return (
    <div className="relative bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-gray-900 to-gray-700 opacity-70"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-full h-full flex items-center justify-center">
            {/* You can add an Image or any other content here if needed */}
          </div>
        </div>
      </div>
      <div className="relative z-10 text-center">
        <p className="uppercase tracking-widest text-xs font-semibold mb-4">
          Innovating Travel Experiences
        </p>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
          Welcome to <span className="text-blue-400">Airline Booking</span>
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl mb-8">
          Discover and manage flights with ease. Your journey starts here.
        </p>
        <a href="/admin">
          <button className="flex items-center justify-center text-center bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition">
            <FaLocationArrow className="text-2xl mr-2" />
            <span className="flex-grow text-center text-lg font-medium">Explore Admin Panel</span>
          </button>
        </a>
      </div>
    </div>
  );
};

export default Hero;
