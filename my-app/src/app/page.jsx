"use client";

import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import useAxios from "@/hooks/useAxios";
import Link from "next/link";

export default function Home() {
  const [heroProducts, setHeroProducts] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const axios = useAxios();

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });

    const fetchProducts = async () => {
      try {
        const res = await axios.get("/products");
        const shuffled = res.data.sort(() => 0.5 - Math.random());

        setHeroProducts(shuffled.slice(0, 3));     
        setFeaturedProducts(shuffled.slice(3, 6));
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [axios]);

  return (
    <div>
      {/* Hero Carousel */}
      <div className="hero bg-base-200 min-h-[80vh]">
        {loading ? (
          <div className="flex justify-center items-center w-full h-64">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : heroProducts.length > 0 ? (
          <Swiper spaceBetween={20} slidesPerView={1} className="w-full">
            {heroProducts.map((product) => (
              <SwiperSlide key={product._id}>
                <div className="hero-content flex-col lg:flex-row-reverse items-center">
                  <figure data-aos="fade-left" className="w-full lg:w-1/2">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 sm:h-64 md:h-[400px] lg:h-[500px] object-cover rounded-lg shadow-md"
                    />
                  </figure>
                  <div data-aos="fade-right" className="lg:w-1/2 text-center lg:text-left">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
                      {product.name}
                    </h1>
                    <p className="py-6 text-sm sm:text-base md:text-lg">
                      {product.description}
                    </p>
                    <Link href="/Products">
                      <button className="btn btn-info">Shop Now</button>
                    </Link>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <p className="text-center w-full py-10">No products available</p>
        )}
      </div>

      {/* Featured Products */}
      <section className="py-12 bg-base-100">
        <h2 className="text-3xl font-bold text-center mb-8" data-aos="fade-up">
          Featured Products
        </h2>
        {loading ? (
          <div className="flex justify-center items-center">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6">
            {featuredProducts.map((product) => (
              <div key={product._id} className="card bg-base-200 shadow-md" data-aos="zoom-in">
                <figure>
                  <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                </figure>
                <div className="card-body">
                  <h3 className="card-title">{product.name}</h3>
                  <p className="text-sm text-gray-600">{product.description}</p>
                  <p><strong>Price:</strong> ${product.price}</p>
                  <p><strong>Category:</strong> {product.category}</p>
                  <p><strong>Stock:</strong> {product.stock}</p>
                  <Link href={`/Products/${product._id}`}>
                    <button className="btn btn-sm btn-primary mt-4">View Details</button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Testimonials */}
      <section className="py-12 bg-base-200">
        <h2 className="text-3xl font-bold text-center mb-8" data-aos="fade-up">
          What Our Customers Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6">
          <div className="card bg-base-100 shadow-md p-6" data-aos="fade-right">
            <p>"Amazing quality and fast delivery!"</p>
            <h4 className="mt-4 font-semibold">- Sarah K.</h4>
          </div>
          <div className="card bg-base-100 shadow-md p-6" data-aos="fade-up">
            <p>"Great deals and excellent customer service."</p>
            <h4 className="mt-4 font-semibold">- John D.</h4>
          </div>
          <div className="card bg-base-100 shadow-md p-6" data-aos="fade-left">
            <p>"I love shopping here, highly recommended."</p>
            <h4 className="mt-4 font-semibold">- Ayesha R.</h4>
          </div>
        </div>
      </section>

      {/* Promo Section */}
      <section className="py-12 bg-base-100">
        <h2 className="text-3xl font-bold text-center mb-8" data-aos="fade-up">
          Special Promotions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6">
          <div className="card bg-base-200 shadow-md p-6 text-center" data-aos="zoom-in">
            <h3 className="font-bold text-xl mb-2">Holiday Sale</h3>
            <p>Up to 50% off all items this season.</p>
            <Link href="/Products">
              <button className="btn btn-sm btn-info mt-4">Shop Now</button>
            </Link>
          </div>
          <div className="card bg-base-200 shadow-md p-6 text-center" data-aos="zoom-in">
            <h3 className="font-bold text-xl mb-2">Free Shipping</h3>
            <p>Enjoy free shipping on orders over $100.</p>
            <Link href="/Products">
              <button className="btn btn-sm btn-info mt-4">Shop Now</button>
            </Link>
          </div>
          <div className="card bg-base-200 shadow-md p-6 text-center" data-aos="zoom-in">
            <h3 className="font-bold text-xl mb-2">New Arrivals</h3>
            <p>Check out the latest products in our store.</p>
            <Link href="/Products">
              <button className="btn btn-sm btn-info mt-4">Shop Now</button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-12 bg-base-100">
        <h2 className="text-3xl font-bold text-center mb-8" data-aos="fade-up">
          Why Choose Us
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6 text-center">
          <div className="card bg-base-200 shadow-md p-6" data-aos="flip-left">
            <h3 className="font-bold text-xl mb-2">Fast Delivery</h3>
            <p>Get your products delivered quickly and reliably.</p>
          </div>
          <div className="card bg-base-200 shadow-md p-6" data-aos="flip-up">
            <h3 className="font-bold text-xl mb-2">Best Deals</h3>
            <p>Enjoy exclusive discounts and offers every day.</p>
          </div>
          <div className="card bg-base-200 shadow-md p-6" data-aos="flip-right">
            <h3 className="font-bold text-xl mb-2">Top Quality</h3>
            <p>We ensure only the best products reach you.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
