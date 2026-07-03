// src/components/ProductIntro.jsx
import React from 'react';
import {logos} from '../data/siteData';

export default function ProductIntro() {
    const authorizedBrands = [
        {
            id: 1,
            name: "Fouress Engineering(I) Pvt.Ltd.",
            logoUrl: logos[0],
            website: "https://fouressindia.com/" 
        },
        {
            id: 2,
            name: "Amiad Filteration(I) Pvt.Ltd.",
            logoUrl: logos[1],
            website: "https://amiad.com/"
        },
        {
            id: 3,
            name: "Auma India Pvt.Ltd.",
            logoUrl: logos[2],
            website: "https://www.auma.com/en_IN"
        },
        {
            id: 4,
            name: "Fosroc Chemicals India Pvt.Ltd.",
            logoUrl: logos[3],
            website: "https://www.fosroc.com/products"
        },
        {
            id: 5,
            name: "J.D Jones & Co. Pvt.Ltd.",
            logoUrl: logos[4],
            website: "https://www.jdjones.com/"
        },
        {
            id: 6,
            name: "MYK Laticrete India Pvt.Ltd.",
            logoUrl: logos[5],
            website: "https://myklaticrete.com/"
        }
    ];

    return (
        <section className="py-20 bg-white border-b border-slate-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
                        Our Products
                    </h2>
                    <div className="w-24 h-1 bg-blue-600 mx-auto mt-4 rounded-full"></div>
                </div>

                {/* Brands Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-12 items-center justify-items-center">
                    {authorizedBrands.map((brand) => (
                        <a 
                            key={brand.id} 
                            href={brand.website} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="group flex flex-col items-center justify-center p-6 w-full h-40 rounded-xl hover:bg-slate-50 transition-all duration-300"
                            title={`Visit ${brand.name} Official Website`}
                        >
                            <img 
                                src={brand.logoUrl} 
                                alt={`${brand.name} Official Logo`} 
                                className="max-h-20 w-auto object-contain filter grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                            />
                        </a>
                    ))}
                </div>

            </div>
        </section>
    );
}