import React, { useState, useEffect } from "react";
import { principleCompanies } from "../data/productsData";
import { Helmet } from "react-helmet-async";

const Products = () => {
  // 🎛️ State Pools for Products List, Loading states, and Active Filters
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState("MYK Laticrete");

  const companiesList = principleCompanies;

  const fetchInventoryData = async (company) => {
    setLoading(true);
    setError(null);
    try {
      // 🔗 Matching the exact modular v1 query paths of our server layout
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/products/all?companyName=${encodeURIComponent(company)}`,
      );

      const jsonPayload = await response.json();

      if (jsonPayload.success) {
        setProducts(jsonPayload.data); // Safely array binding into our UI hook
      } else {
        throw new Error(
          jsonPayload.message || "Failed to parse content parameters.",
        );
      }
    } catch (err) {
      console.error("🔌 [FRONTEND FETCH ERROR]: Wire handshake failed:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ⏱️ Auto-trigger network request loop whenever user changes category toggles
  useEffect(() => {
    fetchInventoryData(activeCategory);
  }, [activeCategory]);

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
      <Helmet>
        <title>Industrial Chemicals & Polymers | Sarawagi Enterprises</title>
        <meta
          name="description"
          content="Browse our wide range of premium industrial chemicals, masterbatches, and polymers. We are the authorized wholesale suppliers in Jamshedpur."
        />
        <meta
          name="keywords"
          content="Industrial chemicals, polymers, masterbatches, wholesale supplier, Sarawagi Enterprises products, Jamshedpur"
        />
      </Helmet>

      {/* 📁 Left Sidebar Brand Nav Navigation Panel */}
      <div className="w-full md:w-1/4 flex flex-col gap-2">
        <h3 className="text-xl font-bold mb-4 text-gray-800">Our Principals</h3>
        {companiesList.map((company) => (
          <button
            key={company}
            onClick={() => setActiveCategory(company)}
            className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-all ${
              activeCategory === company
                ? "bg-blue-600 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {company}
          </button>
        ))}
      </div>

      {/* 🖼️ Right Side Products Display Layout Canvas */}
      <div className="w-full md:w-3/4">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">
          {activeCategory} - Product Range
        </h2>

        {/* 🩺 Diagnostics Loading Handler Frames */}
        {loading && (
          <div className="flex justify-center items-center h-48">
            <div className="animate-spin rounded-full h-10 w-48 border-b-2 border-blue-600"></div>
            <p className="ml-3 text-gray-500 font-medium">
              Querying Database Cluster...
            </p>
          </div>
        )}

        {/* ❌ Error State UI Feedback Banner */}
        {error && (
          <div className="bg-red-50 text-red-700 p-4 rounded-xl border border-red-200">
            ⚠ Connection Lag Error: {error}. Check if backend local port
            listener is active!
          </div>
        )}

        {/* 🧱 Grid Layout Loop Generation */}
        {!loading &&
          !error &&
          (products.length === 0 ? (
            <p className="text-gray-500 italic py-12 text-center">
              No products found in database for this brand branch yet. Use Admin
              Form/Thunder client to inject data!
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((item) => (
                <div
                  key={item._id}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow flex flex-col"
                >
                  {/* 🟢 THE BOX-LESS FLOATING IMAGE CONTAINER */}
                  <div className="h-56 w-full p-4 flex items-center justify-center bg-white">
                    <img
                      src={
                        item.image ||
                        "https://placehold.co/600x400?text=No+Image"
                      }
                      alt={item.title}
                      className="max-h-full max-w-full object-contain mix-blend-multiply transition-transform duration-500 hover:scale-110"
                    />
                  </div>

                  {/* 📝 THE PRODUCT TEXT (Title & Specs) */}
                  <div className="p-4 border-t border-gray-100 mt-auto bg-gray-50">
                    <h4 className="font-bold text-lg text-gray-800 mb-2 truncate">
                      {item.title}
                    </h4>
                  </div>
                </div>
              ))}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Products;
