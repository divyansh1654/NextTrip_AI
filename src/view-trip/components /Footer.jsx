import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa6";

function Footer({ trip }) {
  return (
    <footer className="bg-gradient-to-r from-blue-200 via-indigo-300 to-purple-400 text-white py-6 mt-10 w-full">
      <div className="container mx-auto px-6">
        {/* Footer Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          
          {/* Trip Info (if available) */}
          <div>
            <h2 className="text-lg font-semibold text-shadow-md">🌍 AI Travel Planner</h2>
            {trip?.tripData && (
              <p className="text-black text-sm mt-1">{`Destination: ${trip.tripData.destination || "Unknown"}`}</p>
            )}
            <p className="text-black text-sm">Plan smart, travel better! ✈️</p>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="text-lg font-semibold text-shadow-md">Quick Links</h2>
            <ul className="mt-2 text-black text-sm space-y-1">
              <li><a href="/" className="hover:text-black transition">🏠 Home</a></li>
              <li><a href="/about" className="hover:text-black transition">ℹ️ About</a></li>
              <li><a href="/contact" className="hover:text-black transition">📞 Contact</a></li>
              <li><a href="/privacy" className="hover:text-black transition">🔒 Privacy Policy</a></li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div>
            <h2 className="text-lg font-semibold text-shadow-md">Follow Us</h2>
            <div className="flex justify-center md:justify-start gap-4 mt-2">
              <a 
                href="mailto:divyansh.sharma1654@gmail.com" 
                className="text-black hover:text-white transition"
              >
                <FaEnvelope size={20} />
              </a>
              <a href="https://www.instagram.com/being_hydrogen1654/" className="text-black hover:text-white transition" target="_blank">
                <FaInstagram size={20} />
              </a>
              <a href="https://www.linkedin.com/in/divyansh-sharma1654/" className="text-black hover:text-white transition" target="_blank">
                <FaLinkedin size={20} />
              </a>
            </div>
          </div>

        </div>

        {/* Copyright Section */}
        <div className="border-t border-gray-700 mt-6 pt-4 text-center text-black text-sm">
          © {new Date().getFullYear()} AI Travel Planner. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
