"use client";

import React, { useState } from "react";
import useAxios from "@/hooks/useAxios";

export default function AddProductPage() {
  const axios = useAxios();
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    image: "",
    description: "",
    stock: "",
  });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const res = await axios.post("/products", {
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock, 10),
      });
      setStatus({ type: "success", text: "Product added successfully!" });
      setFormData({
        name: "",
        price: "",
        category: "",
        image: "",
        description: "",
        stock: "",
      });
    } catch (err) {
      console.error("Error adding product:", err);
      setStatus({
        type: "error",
        text: err.response?.data?.message || "Failed to add product.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-100 py-12 px-6 md:px-12">
      <h1 className="text-3xl font-bold text-center mb-8">Add New Product</h1>

      <div className="max-w-2xl mx-auto card bg-base-200 shadow-md p-8">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="label">
              <span className="label-text">Product Name</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label">
                <span className="label-text">Price ($)</span>
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="input input-bordered w-full"
                required
              />
            </div>
            <div>
              <label className="label">
                <span className="label-text">Stock</span>
              </label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                className="input input-bordered w-full"
                required
              />
            </div>
          </div>

          <div>
            <label className="label">
              <span className="label-text">Category</span>
            </label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="input input-bordered w-full"
              placeholder="e.g. bags, shoes, electronics"
              required
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text">Image URL</span>
            </label>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text">Description</span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="textarea textarea-bordered w-full h-32"
              required
            ></textarea>
          </div>

          <button type="submit" className="btn btn-info w-full" disabled={loading}>
            {loading ? <span className="loading loading-spinner loading-sm"></span> : "Add Product"}
          </button>
        </form>

        {status && (
          <div
            className={`alert mt-4 ${
              status.type === "success" ? "alert-success" : "alert-error"
            }`}
          >
            <span>{status.text}</span>
          </div>
        )}
      </div>
    </div>
  );
}
