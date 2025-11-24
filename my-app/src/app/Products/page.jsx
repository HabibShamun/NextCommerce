"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/products");
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-100 p-6">
      {/* Page Title */}
      <h1 className="text-4xl font-bold text-center mb-8">Our Products</h1>

      {/* Smaller Search Bar */}
      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="input input-bordered w-64" // ✅ smaller width
        />
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((card) => (
            <div key={card._id} className="card bg-base-200 shadow-md">
              <figure>
                <img
                  src={card.image}
                  alt={card.name}
                  className="w-full h-48 object-cover"
                />
              </figure>
              <div className="card-body">
                <h3 className="card-title">{card.name}</h3>
                <p className="text-sm text-gray-600">{card.description}</p>
                <p><strong>Price:</strong> ${card.price}</p>
                <p><strong>Category:</strong> {card.category}</p>
                <p><strong>Stock:</strong> {card.stock}</p>

                <Link
                  href={`/Products/${card._id}`}
                  className="btn btn-sm btn-primary mt-4"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center col-span-3 text-gray-500">
            No products match your search.
          </p>
        )}
      </div>
    </div>
  );
}
