import React, { useEffect, useRef, useState } from "react";
import { clientLogos } from "../data/siteData";

export default function ClientMarquee() {
  const scrollContainerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // 🟢 Automated Shield: Smooth string vs object parsing
  const baseClients = clientLogos.map((item, index) => {
    const isObject = typeof item === "object" && item !== null;
    return {
      id: `logo-${index + 1}`,
      logoUrl: isObject ? item.url : item,
      extraStyles: isObject ? item.customClass : "",
    };
  });

  const clients = [
    ...baseClients,
    ...baseClients,
    ...baseClients,
    ...baseClients,
  ];

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    let animationFrameId;
    const scroll = () => {
      if (!isDragging && !isHovered) {
        container.scrollLeft += 1;
        if (container.scrollLeft >= container.scrollWidth / 4) {
          container.scrollLeft = 0;
        }
      }
      animationFrameId = requestAnimationFrame(scroll);
    };
    animationFrameId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isDragging, isHovered]);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeftState(scrollContainerRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault(); // Stops the browser from highlighted text or blue-masking logos
    
    // Find where the user's hand is right now on the screen
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    
    // Calculate the distance moved from the anchor point (multiplied for responsiveness)
    const walk = (x - startX) * 1.5;
    
    // Combine your initial scroll baseline position with the movement distance
    let newScrollLeft = scrollLeftState - walk;

    // 🟢 THE FIX: Two-Way Infinite Gate Checkers
    const loopResetThreshold = scrollContainerRef.current.scrollWidth / 4;

    if (newScrollLeft < 0) {
      // ⬅️ LEFT DRAGGING PROTECTION: If you hit a negative boundary, teleport instantly to the right loop fold
      newScrollLeft = loopResetThreshold;
      
      // Update our anchor baselines so continuous movements don't cause sudden snapping jumps
      setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
      setScrollLeftState(loopResetThreshold);
    } else if (newScrollLeft >= loopResetThreshold) {
      // ➡️ RIGHT DRAGGING PROTECTION: If you overshoot the right loop fold, wrap back to 0 cleanly
      newScrollLeft = 0;
      
      // Update our anchor baselines
      setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
      setScrollLeftState(0);
    }

    // Pass the perfectly calculated pixel coordinates back to the HTML layout layer
    scrollContainerRef.current.scrollLeft = newScrollLeft;
  };

  return (
    <section className="py-16 bg-white select-none">
      {/* Header Block Section */}
      <div className="max-w-7xl mx-auto px-4 mb-14 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-800 uppercase tracking-wider">
          Our Clients
        </h2>
        <div className="w-16 h-1 bg-blue-600 mx-auto mt-3 rounded-full"></div>
      </div>

      {/* Spacing container forces clean gaps on the right & left sides */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-16">
        <div className="relative w-full overflow-hidden flex items-center before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-16 before:bg-linear-to-r before:from-white before:to-transparent after:absolute after:right-0 after:top-0 after:z-10 after:h-full after:w-16 after:bg-linear-to-l after:from-white after:to-transparent py-4">
          <div
            ref={scrollContainerRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={() => setIsDragging(false)}
            onMouseLeave={() => setIsDragging(false)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseOver={() => setIsHovered(true)}
            onMouseOut={() => {
              if (!isDragging) setIsHovered(false);
            }}
            className={`flex gap-16 md:gap-25 items-center overflow-x-auto overflow-y-hidden whitespace-nowrap scrollbar-none select-none ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}          >
            
            <style>{`div::-webkit-scrollbar { display: none; }`}</style>

            {clients.map((client, index) => {
              const originalIndex = index % clientLogos.length;

              // 🟢 FIX 1: Turn the boolean rule into an index-number check list!
              // For example, if your 4th logo (index 3) and 6th logo (index 5) look tiny, add them here:
              const isSmallLogo =  originalIndex === 0 || originalIndex === 1|| originalIndex === 4|| originalIndex === 5||
              originalIndex === 6|| originalIndex === 7||  originalIndex === 10|| originalIndex === 11|| originalIndex === 21
              ||  originalIndex === 20;
              const isNormalLogo = originalIndex === 16|| originalIndex === 8|| originalIndex === 9||originalIndex === 19;

              return (
                <div
                  key={`${client.id}-${index}`}
                  // 🟢 FIX 2: Fixed strict bounding boxes keep items uniformly aligned by height
                  className="shrink-0 h-16 md:h-20 w-36 md:w-44 flex items-center justify-center transition-transform duration-200 hover:scale-105"
                >
                  <img
                    src={client.logoUrl}
                    alt="Corporate company partner logo"
                    // 🟢 FIX 3: Strict h-full containment forces browsers to prioritize natural scaling inside the box container bounds
                    className={`h-full max-w-full object-contain block pointer-events-none transition-transform ${
                      isSmallLogo ? "scale-155" : ""
                    } ${isNormalLogo ? "scale-120" : ""} ${client.extraStyles}`}
                    loading="lazy"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}