"use client";

import useAxios from "@/hooks/useAxios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProductDetailPage() {
  const axios = useAxios();
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios(`/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error("Error fetching product:", err);
      }
    };
    if (id) fetchProduct();
  }, [id]);

  if (!product) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Back Button */}
      <button onClick={() => router.back()} className="btn btn-outline mb-6">
        ← Back
      </button>

      {/* Banner Image */}
      <div className="w-full h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden rounded-lg shadow-md mb-8">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Product Info */}
      <div className="space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold">{product.name}</h1>
        <p className="text-gray-700 text-base md:text-lg leading-relaxed">
          {product.description}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="bg-base-200 p-4 rounded-lg shadow-sm">
            <p className="text-lg">
              <strong>Price:</strong> ${product.price}
            </p>
            <p>
              <strong>Category:</strong> {product.category}
            </p>
            <p>
              <strong>Stock:</strong> {product.stock}
            </p>
          </div>

          <div className="bg-base-200 p-4 rounded-lg shadow-sm">
            <p>
              <strong>Date Added:</strong>{" "}
              {product.date ? new Date(product.date).toLocaleDateString() : "N/A"}
            </p>
            <p>
              <strong>Priority:</strong> {product.priority || "Normal"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
