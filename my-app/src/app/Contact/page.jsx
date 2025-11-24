"use client";

import useAxios from "@/hooks/useAxios";
import React, { useState } from "react";

export default function ContactPage() {
  const axios = useAxios();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
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
      const res = await axios.post("/message", formData);
      setStatus({ type: "success", text: "Message sent successfully!" });
      setFormData({ name: "", email: "", message: "" }); // reset form
    } catch (err) {
      console.error("Error sending message:", err);
      setStatus({
        type: "error",
        text:
          err.response?.data?.message ||
          "Failed to send message. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-100">
      {/* Hero Section */}
      <div className="hero bg-base-200 py-16">
        <div className="hero-content text-center">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
            <p className="text-gray-600 text-lg">
              We’d love to hear from you! Reach out with any questions, feedback, or support needs.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Info Section */}
      <section className="py-12 px-6 md:px-12">
        <h2 className="text-2xl font-bold text-center mb-8">Get in Touch</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card bg-base-200 shadow-md p-6 text-center">
            <h3 className="font-bold text-xl mb-2">📍 Address</h3>
            <p>123 NextCommerce Street</p>
            <p>Sylhet, Bangladesh</p>
          </div>
          <div className="card bg-base-200 shadow-md p-6 text-center">
            <h3 className="font-bold text-xl mb-2">📞 Phone</h3>
            <p>+880 1798137469</p>
            <p>Mon–Fri, 9am–6pm</p>
          </div>
          <div className="card bg-base-200 shadow-md p-6 text-center">
            <h3 className="font-bold text-xl mb-2">✉️ Email</h3>
            <p>support@nextcommerce.com</p>
            <p>We reply within 24 hours</p>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-12 px-6 md:px-12 bg-base-200">
        <h2 className="text-2xl font-bold text-center mb-8">Send Us a Message</h2>
        <div className="max-w-2xl mx-auto card bg-base-100 shadow-md p-8">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                className="input input-bordered w-full"
                required
              />
            </div>
            <div>
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="input input-bordered w-full"
                required
              />
            </div>
            <div>
              <label className="label">
                <span className="label-text">Message</span>
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your message..."
                className="textarea textarea-bordered w-full h-32"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="btn btn-info w-full"
              disabled={loading}
            >
              {loading ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                "Send Message"
              )}
            </button>
          </form>

          {/* Status message */}
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
      </section>
    </div>
  );
}
