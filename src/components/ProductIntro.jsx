import React from "react";
import { logos } from "../data/siteData";

export default function ProductIntro() {
  // 7 products list array setup cleanly
  const authorizedBrands = [
    { id: 1, name: "Fouress Engineering(I) Pvt.Ltd.", logoUrl: logos[0], website: "https://fouressindia.com/" },
    { id: 2, name: "Amiad Filteration(I) Pvt.Ltd.", logoUrl: logos[1], website: "https://amiad.com/" },
    { id: 3, name: "Auma India Pvt.Ltd.", logoUrl: logos[2], website: "https://www.auma.com/en_IN" },
    { id: 4, name: "Fosroc Chemicals India Pvt.Ltd.", logoUrl: logos[3], website: "https://www.fosroc.com/products" },
    { id: 5, name: "J.D Jones & Co. Pvt.Ltd.", logoUrl: logos[4], website: "https://www.jdjones.com/" },
    { id: 6, name: "MYK Laticrete India Pvt.Ltd.", logoUrl: logos[5], website: "https://myklaticrete.com/" },
    { id: 7, name: "Ebro Armaturen", logoUrl: logos[6], website: "https://www.ebro-armaturen.com/en/" },
  ];

  return (
    <section className="py-16 md:py-20 bg-white border-b border-slate-100 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header Text */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Our Principles
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* 🎯 THE CENTERING FLEX LAYOUT MATRIX */}
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 max-w-6xl mx-auto">
          {authorizedBrands.map((brand, index) => {
            // Your custom group checkers matching index array counts
            const isSmallProductLogo = index === 0 || index === 1 || index === 4 || index === 6;
            const isNormalProductLogo = index === 5;

            // 🟢 THE TWEAK: Determine both regular scale AND hover scale dynamically!
            let sizingClasses = "max-h-20 group-hover:scale-110"; // Default baseline rule

            if (isSmallProductLogo) {
              // Extra small logos get high base scale and even higher hover zoom
              sizingClasses = "max-h-24 scale-155 group-hover:scale-175";
            } else if (isNormalProductLogo) {
              // Mid-tier logos get mid base scale and mid hover zoom
              sizingClasses = "max-h-20 scale-135 group-hover:scale-150";
            }

            return (
              <a
                key={brand.id}
                href={brand.website}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center justify-center p-2 w-36 sm:w-40 md:w-44 h-32 transition-all duration-300"
                title={`Visit ${brand.name} Official Website`}
              >
                <img
                  src={brand.logoUrl}
                  alt={`${brand.name} Official Logo`}
                  /* 🟢 Clean look: We inject our dynamically bundled size classes perfectly right here */
                  className={`max-w-full object-contain block pointer-events-none transition-transform duration-300 ${sizingClasses}`}
                  loading="lazy"
                />
              </a>
            );
          })}
        </div>

      </div>
    </section>
  );
}