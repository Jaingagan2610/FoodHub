"use client";

import Link from "next/link";
import { useAuth } from "@/store/useAuth";
import { useCart } from "@/store/useCart"; // ⬅️ your cart store

export default function Header() {
  const { user, logout } = useAuth();
  const { cartItems } = useCart();

  return (
    <header className="w-full bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-orange-100">
      <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-6">

        {/* Logo */}
        <Link
          href="/"
          className="text-3xl font-extrabold text-orange-500 tracking-tight flex items-center gap-1"
        >
          <span className="rounded-full bg-orange-500 text-white px-2 py-1 text-xl">
            🍽
          </span>
          Food<span className="text-black">Hub</span>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-6">
          <Link
            href="/restaurant"
            className="text-black font-medium hover:text-orange-600 transition"
          >
            Restaurants
          </Link>

          {/* Cart Button */}
          <Link
            href="/cart"
            className="relative flex items-center text-black font-medium hover:text-orange-600 transition"
          >
            🛒 Cart
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-3 bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full shadow-md">
                {cartItems.length}
              </span>
            )}
          </Link>

          {!user && (
            <>
              <Link
                href="/login"
                className="text-black hover:text-orange-600 transition font-medium"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="bg-orange-500 text-white px-5 py-2 rounded-full font-medium shadow-md hover:bg-orange-600 transition"
              >
                Get Started
              </Link>
            </>
          )}

          {user && (
            <>
              <Link
                href="/profile"
                className="text-black hover:text-orange-600 transition font-medium"
              >
                Profile
              </Link>
               <Link
              href="/my-orders"
              className="text-black font-medium hover:text-orange-600 transition"
            >
              My Orders
            </Link>

              <button
                onClick={logout}
                className="px-5 py-2 rounded-full bg-orange-500 text-white font-medium shadow-md hover:bg-orange-600 transition"
              >
                Logout
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
