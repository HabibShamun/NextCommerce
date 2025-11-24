"use client";

import React from "react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-base-100">
      {/* Hero Section */}
      <div className="hero bg-base-200 py-16">
        <div className="hero-content text-center">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">About Us</h1>
            <p className="text-gray-600 text-lg">
              Welcome to <span className="font-semibold">NextCommerce</span> —
              your trusted destination for quality products and seamless shopping
              experiences.
            </p>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <section className="py-12 px-6 md:px-12">
        <div className="card bg-base-200 shadow-md p-8">
          <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
          <p className="text-gray-700 leading-relaxed">
            At NextCommerce, our mission is to provide customers with the best
            deals, top‑quality products, and exceptional service. We believe in
            making online shopping simple, enjoyable, and reliable.
          </p>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-12 px-6 md:px-12">
        <h2 className="text-2xl font-bold text-center mb-8">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card bg-base-200 shadow-md p-6 text-center">
            <h3 className="font-bold text-xl mb-2">Integrity</h3>
            <p>We are committed to honesty and transparency in everything we do.</p>
          </div>
          <div className="card bg-base-200 shadow-md p-6 text-center">
            <h3 className="font-bold text-xl mb-2">Innovation</h3>
            <p>We embrace modern technology to deliver a better shopping experience.</p>
          </div>
          <div className="card bg-base-200 shadow-md p-6 text-center">
            <h3 className="font-bold text-xl mb-2">Customer First</h3>
            <p>Your satisfaction is our top priority, always.</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 bg-base-200 text-center">
        <h2 className="text-2xl font-bold mb-4">Join Our Journey</h2>
        <p className="text-gray-700 mb-6">
          Be part of our growing community and enjoy exclusive deals every day.
        </p>
        <button className="btn btn-info">Explore Products</button>
      </section>
    </div>
  );
}
