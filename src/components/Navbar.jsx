import React, { useState } from 'react';
import { Link } from 'react-router'; 

export default function Navbar() {
  // 🟢 1. Create state to manage mobile menu open/closed state
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full shadow-xs">
      {/* Top Banner (Hidden on Mobile, Visible on Desktop) */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 border-b border-slate-800 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex space-x-6">
            <a href="tel:+919431133184" 
              className="flex items-center gap-1 hover:text-blue-400 transition-colors duration-150 group">
              <span className="text-blue-400 font-medium group-hover:underline">📞 Call Us:</span> 
               +91 9431133184
            </a>
            <a href="mailto:sarawgi@hotmail.com?subject=Industrial%20Equipment%20Inquiry" 
              className="flex items-center gap-1 hover:text-blue-400 transition-colors duration-150 group">
              <span className="text-blue-400 font-medium group-hover:underline">✉️ Email:</span> 
               sarawgi@hotmail.com 
            </a>
          </div>
          <div className="flex space-x-4">
            <span>📍 Location: Jharkhand, India</span>
          </div>
        </div>
      </div>
      
      {/* Main Navbar Body */}
      <nav className="bg-white/95 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            
            {/* Logo Brand Segment Links to Home */}
            <Link to="/" className="flex items-center gap-3 no-underline outline-none">
              <img src="/Hero/logo.png" alt="SE" 
                className="h-12 w-auto block object-contain mix-blend-multiply"/>
              <span className="text-lg sm:text-xl font-bold text-blue-600 tracking-tight uppercase">
                Sarawagi Enterprises
              </span>
            </Link>
            
            {/* Desktop Navigation Menu (hidden md:flex remains unchanged) */}
            <div className="hidden md:flex space-x-8 font-semibold text-sm text-slate-600">
              <Link to="/" className="hover:text-blue-600 transition-colors duration-150">Home</Link>
              <Link to="/products" className="hover:text-blue-600 transition-colors duration-150">Products</Link>
              <Link to="/about" className="hover:text-blue-600 transition-colors duration-150">About Us</Link>
              <Link to="/contact" className="hover:text-blue-600 transition-colors duration-150">Contact</Link>
            </div>
            
            {/* Action Segment Box */}
            <div className="flex items-center gap-2 sm:gap-4">
              
              {/* Request Quote Action Link */}
              <Link 
                to="/contact" 
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition font-semibold text-xs sm:text-sm shadow-md shadow-blue-600/10"
              >
                Request Quote
              </Link>

              {/* 📱 MOBILE HAMBURGER BUTTON (Visible on small screens, hidden on md+) */}
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                type="button"
                className="md:hidden text-slate-600 hover:text-slate-900 focus:outline-none p-2 rounded-lg hover:bg-slate-100/80 transition-colors"
                aria-label="Toggle Menu"
              >
                {/* Dynamically swaps icon depending on boolean toggle state */}
                {isMenuOpen ? (
                  <svg className="h-5 sm:h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="h-5 sm:h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>

            </div>

          </div>
        </div>

        {/* 📱 MOBILE DROPDOWN LAYOUT DRAWER */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 shadow-sm transition-all duration-200">
            <div className="px-4 pt-2 pb-4 space-y-1 font-semibold text-sm text-slate-600">
              <Link 
                to="/" 
                onClick={() => setIsMenuOpen(false)} // Auto-closes popup selection
                className="block py-2.5 px-3 rounded-lg hover:bg-slate-50 hover:text-blue-600 transition-colors"
              >
                Home
              </Link>
              <Link 
                to="/products" 
                onClick={() => setIsMenuOpen(false)}
                className="block py-2.5 px-3 rounded-lg hover:bg-slate-50 hover:text-blue-600 transition-colors"
              >
                Products
              </Link>
              <Link 
                to="/about" 
                onClick={() => setIsMenuOpen(false)}
                className="block py-2.5 px-3 rounded-lg hover:bg-slate-50 hover:text-blue-600 transition-colors"
              >
                About Us
              </Link>
              <Link 
                to="/contact" 
                onClick={() => setIsMenuOpen(false)}
                className="block py-2.5 px-3 rounded-lg hover:bg-slate-50 hover:text-blue-600 transition-colors"
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}