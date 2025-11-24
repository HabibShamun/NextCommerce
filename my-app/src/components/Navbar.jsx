"use client";

import Link from "next/link";
import React, { useContext } from "react";
import logo from "./../../public/logo.png";
import Image from "next/image";
import { AuthContext } from "@/context/AuthContext";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const { user, signOutUser } = useContext(AuthContext);
  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/Products", label: "Products" },
    { href: "/About", label: "About Us" },
    { href: "/Contact", label: "Contact" },
  ];

  return (
    <div className="navbar bg-base-100 shadow-sm">
      {/* Left side */}
      <div className="navbar-start">
        {/* Mobile dropdown */}
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul
            tabIndex={-1}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
          >
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`px-5 ${
                    pathname === link.href ? "text-[#0078D4] font-semibold" : "text-gray-700"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}

            {/* User dropdown (mobile) */}
            {user && (
              <li>
                <details>
                  <summary>{user.displayName || user.email}</summary>
                  <ul className="p-2">
                    <li>
                      <Link href="/AddProduct">Add Product</Link>
                    </li>
                    <li>
                      <Link href="/ManageProducts">Manage Products</Link>
                    </li>
                  </ul>
                </details>
              </li>
            )}
          </ul>
        </div>

        {/* Logo */}
        <Link href={'/'} className="flex justify-center items-center">
          <Image src={logo} alt="Logo" width={60} height={60} />
          <span className="btn hidden sm:block btn-ghost text-xl">NextCommerce</span>
        </Link>
      </div>

      {/* Center links (desktop) */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`px-5 ${
                  pathname === link.href ? "text-[#0078D4] font-semibold" : "text-gray-700"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}

          {/* User dropdown (desktop) */}
          {user && (
            <li>
              <details>
                <summary>{user.displayName || user.email}</summary>
                <ul className="p-2 bg-base-100 rounded-box shadow">
                  <li>
                    <Link href="/AddProduct">Add Product</Link>
                  </li>
                  <li>
                    <Link href="/ManageProducts">Manage Products</Link>
                  </li>
                </ul>
              </details>
            </li>
          )}
        </ul>
      </div>

      {/* Right side (auth) */}
      <div className="navbar-end">
        {user ? (
          <button onClick={signOutUser} className="btn  text-white btn-primary btn-sm">Logout</button>
        ) : (
          <>
            <Link
              href="/Login"
              className={`px-5 ${
                pathname === "/Login" ? "  text-white btn-primary font-semibold" : "text-gray-700"
              }`}
            >
              Login
            </Link>
            <Link
              href="/Register"
              className={`px-5 ${
                pathname === "/Register" ? " text-white btn-primary font-semibold" : "text-gray-700"
              }`}
            >
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
