import React from 'react';
import Hero from './sections/Hero'; // <-- 1. THIS IS YOUR NEW IMPORT LINE

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 scroll-smooth antialiased">

      {/* Main Sections Stack */}
      <main>
        {/* 2. WE RENDER YOUR HERO SLIDESHOW RIGHT HERE AT THE TOP */}
        <Hero /> 

        {/* Future sections like <Products />, <About />, <Contact /> will sit down here */}
      </main>
    </div>
  );
}