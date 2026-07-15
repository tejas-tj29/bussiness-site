import React, { useState, useEffect } from "react";
import { principleCompanies } from "../data/productsData";

const AdminManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState("MYK Laticrete");

  // 1. Fetch Products Logic
  const fetchProducts = async (company) => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:5000/api/v1/products/all?companyName=${encodeURIComponent(company)}`
      );
      const json = await response.json();
      if (json.success) {
        setProducts(json.data);
      }
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(activeCategory);
  }, [activeCategory]);

  const handleDelete = async (productId, productTitle) => {
    const isConfirmed = window.confirm(`Are you sure you want to delete "${productTitle}"?`);
    
    if (!isConfirmed) return;

    try {
      const response = await fetch(`http://localhost:5000/api/v1/products/remove/${productId}`, {
        method: "DELETE",
      });
      
      const json = await response.json();

      if (json.success) {
        setProducts(products.filter((item) => item._id !== productId));
        alert("✅ Product deleted successfully!");
      } else {
        alert("❌ Failed to delete: " + json.message);
      }
    } catch (err) {
      console.error("Delete error:", err);
      alert("❌ Network error during deletion.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Manage Inventory</h2>
        
        {/* Category Filter Dropdown for Admin */}
        <select 
          value={activeCategory}
          onChange={(e) => setActiveCategory(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-medium"
        >
          {principleCompanies.map(company => (
            <option key={company} value={company}>{company}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading products...</p>
      ) : products.length === 0 ? (
        <p className="text-gray-500 italic p-4 bg-gray-50 rounded">No products found in this category.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="p-3 border-b border-gray-200 rounded-tl-lg">Image</th>
                <th className="p-3 border-b border-gray-200">Product Title</th>
                <th className="p-3 border-b border-gray-200 rounded-tr-lg text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((item) => (
                <tr key={item._id} className="hover:bg-gray-50 transition-colors border-b border-gray-100">
                  <td className="p-3 w-20">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-12 h-12 object-contain mix-blend-multiply bg-white rounded border"
                    />
                  </td>
                  <td className="p-3 font-semibold text-gray-800">{item.title}</td>
                  <td className="p-3 text-right">
                    <button 
                      onClick={() => handleDelete(item._id, item.title)}
                      className="px-4 py-2 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white border border-red-200 hover:border-red-600 rounded-lg font-medium transition-colors"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminManageProducts;