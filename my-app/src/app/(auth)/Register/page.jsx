"use client";

import Link from "next/link";
import React, { useState, useContext } from "react";
import { AuthContext } from "@/context/AuthContext";

export default function RegisterPage() {
  const { createUser, signInGoogle } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      const result = await createUser(email, password);
      console.log("Registered:", result.user);
      // You can redirect here with router.push("/dashboard")
    } catch (err) {
      console.error("Register error:", err);
    }
  };

  const handleGoogleRegister = async () => {
    try {
      const result = await signInGoogle();
      console.log("Google register:", result.user);
    } catch (err) {
      console.error("Google register error:", err);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
 <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <div className="card-body">
        <fieldset className="fieldset">
          <label className="label">Email</label>
          <input
            type="email"
            className="input"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className="label">Password</label>
          <input
            type="password"
            className="input"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            onClick={handleRegister}
            className="btn btn-neutral mt-4"
          >
            Register
          </button>

          {/* Google */}
          <button
            onClick={handleGoogleRegister}
            className="btn bg-white text-black border-[#e5e5e5] mt-2"
          >
            <svg
              aria-label="Google logo"
              width="16"
              height="16"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <g>
                <path d="m0 0H512V512H0" fill="#fff"></path>
                <path
                  fill="#34a853"
                  d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                ></path>
                <path
                  fill="#4285f4"
                  d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                ></path>
                <path
                  fill="#fbbc02"
                  d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                ></path>
                <path
                  fill="#ea4335"
                  d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                ></path>
              </g>
            </svg>
            <span className="ml-2">Register with Google</span>
          </button>

          <p className="mt-4">
            Already have an account?{" "}
            <Link  href="/Login" className="text-green-400 link link-hover">
              Login
            </Link>
          </p>
        </fieldset>
      </div>
    </div>
    </div>
   
  );
}
