"use client"; 
import { AuthContext } from "@/context/AuthContext";
import Link from "next/link";
import React, { useState, useContext } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { signInUser, signInGoogle } = useContext(AuthContext);
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const result = await signInUser(email, password);
      console.log("Logged in:", result.user);
      router.push("/"); // ✅ navigate to home after login
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInGoogle();
      console.log("Google login:", result.user);
      router.push("/"); // ✅ navigate to home after Google login
    } catch (err) {
      console.error("Google login error:", err);
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
            <div>
              <a className="link link-hover">Forgot password?</a>
            </div>
            <button
              onClick={handleLogin}
              className="btn btn-neutral mt-4"
            >
              Login
            </button>

            {/* Google */}
            <button
              onClick={handleGoogleLogin}
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
              <span className="ml-2">Login with Google</span>
            </button>
            <p>
              Dont have an account?
              <Link className="text-green-400" href={"/Register"}>
                Register
              </Link>
            </p>
          </fieldset>
        </div>
      </div>
    </div>
  );
}
