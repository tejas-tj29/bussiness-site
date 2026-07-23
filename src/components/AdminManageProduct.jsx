import React, { useState, useEffect } from "react";
import { principleCompanies } from "../data/productsData";

const AdminManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState(principleCompanies[0]);

  const [editingId, setEditingId] = useState(null);
  const [tempCategory, setTempCategory] = useState("");

  // 1. Fetch Products Logic
  const fetchProducts = async (company) => {
    if (!company) return;
    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/products/${encodeURIComponent(company)}`,
      );
      const json = await response.json();
      if (json.success) {
        setProducts(json.data);
      } else setProducts([]);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(activeCategory);
  }, [activeCategory]);

  const handleSaveCategory = async (productId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/products/update-category/${productId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ category: tempCategory }),
        },
      );

      const json = await response.json();
      if (json.success) {
        // Local state update kar do taaki page refresh na karna pade
        setProducts(
          products.map((item) =>
            item._id === productId ? { ...item, category: tempCategory } : item,
          ),
        );
        setEditingId(null);
        alert("✅ Category updated successfully!");
      } else {
        alert("❌ Failed to update: " + json.message);
      }
    } catch (err) {
      console.error("Update error:", err);
      alert("❌ Network error during update.");
    }
  };

  const handleDelete = async (productId, productTitle) => {
    const isConfirmed = window.confirm(
      `Are you sure you want to delete "${productTitle}"?`,
    );

    if (!isConfirmed) return;

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/products/remove/${productId}`,
        {
          method: "DELETE",
          credentials: "include", // Include cookies for session management
        },
      );

      if (response.status === 401) {
        alert(
          "Your session expired or your access was revoked. Please log in again.",
        );
        localStorage.removeItem("isAdminLoggedIn"); // Pass faad do
        window.location.href = "/admin/login"; // Login par phek do
        return;
      }

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
    <div className="w-full bg-white p-8 rounded-xl shadow-sm border border-gray-200">
      <div className="flex justify-between items-center mb-8 border-b pb-4">
        <h2 className="text-3xl font-bold text-gray-800">Manage Inventory</h2>

        {/* Category Filter Dropdown for Admin */}
        <select
          value={activeCategory}
          onChange={(e) => setActiveCategory(e.target.value)}
          className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-semibold bg-gray-50 text-gray-700 outline-none cursor-pointer"
        >
          {principleCompanies.map((company) => (
            <option key={company} value={company}>
              {company}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="flex justify-center py-10">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
        </div>
      ) : products.length === 0 ? (
        <p className="text-gray-500 text-lg italic p-8 bg-gray-50 rounded-lg text-center border border-dashed border-gray-300">
          No products found in this category.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="w-full text-left bg-white">
            <thead className="bg-gray-100 border-b border-gray-200">
              <tr>
                {/* Fixed widths to balance the layout perfectly */}
                <th className="py-4 px-6 font-semibold text-gray-700 w-32">
                  Image
                </th>
                <th className="py-4 px-6 font-semibold text-gray-700">
                  Sub-Category
                </th>
                <th className="py-4 px-6 font-semibold text-gray-700 w-48 text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {products.map((item) => (
                <tr
                  key={item._id}
                  className="hover:bg-blue-50/50 transition-colors duration-200"
                >
                  <td className="py-4 px-6">
                    <div className="w-16 h-16 bg-white border border-gray-200 rounded-lg overflow-hidden flex items-center justify-center p-1 shadow-sm">
                      <img
                        src={
                          item.image ||
                          "https://placehold.co/100x100?text=No+Image"
                        }
                        alt={item.category || "Product Image"}
                        className="max-h-full max-w-full object-contain mix-blend-multiply"
                      />
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    {editingId === item._id ? (
                      <input
                        type="text"
                        value={tempCategory}
                        autoFocus
                        onChange={(e) => setTempCategory(e.target.value)}
                        className="p-2 border border-blue-500 rounded-lg outline-none text-sm bg-white font-medium text-gray-800 w-full shadow-sm"
                      />
                    ) : (
                      <span className="text-lg font-medium text-gray-800">
                        {item.category}
                      </span>
                    )}
                  </td>
                  {/* Action Buttons (Edit / Save / Cancel / Delete) */}
                  <td className="py-4 px-6 text-right space-x-2">
                    {editingId === item._id ? (
                      <>
                        <button
                          onClick={() => handleSaveCategory(item._id)}
                          className="px-3 py-1.5 bg-green-600 text-white rounded-lg text-xs font-semibold hover:bg-green-700 transition"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          className="px-3 py-1.5 bg-gray-300 text-gray-700 rounded-lg text-xs font-semibold hover:bg-gray-400 transition"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => {
                            setEditingId(item._id);
                            setTempCategory(item.category || "");
                          }}
                          className="px-3 py-1.5 bg-blue-50 text-blue-600 border border-blue-200 rounded-lg text-xs font-semibold hover:bg-blue-600 hover:text-white transition"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(item._id, item.category)}
                          className="px-3 py-1.5 bg-white text-red-600 border border-red-200 rounded-lg text-xs font-semibold hover:bg-red-600 hover:text-white transition"
                        >
                          Delete
                        </button>
                      </>
                    )}
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
