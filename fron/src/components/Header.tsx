"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { ShoppingCart, LogOut, LayoutDashboard, User } from "lucide-react";
import { useAuth } from "@/store/useAuth";
import { useCart } from "@/store/useCart";

export default function Header() {
  const { user, loading, restoreUser, logout } = useAuth();
  const { cartItems } = useCart();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    restoreUser();
  }, [restoreUser]);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  if (loading) return null;

  const dashboardPath =
    user?.role === "admin"
      ? "/dashboard/admin/main"
      : user?.role === "manager"
      ? "/dashboard/manager"
      : "/dashboard/member";

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        {/* Logo */}
        <Link href="/" className="text-3xl font-extrabold text-orange-500">
          🍽 Food<span className="text-black">Hub</span>
        </Link>

        {/* Right Section */}
        <div className="flex items-center gap-6">
          {user && (
            <>
          {/* Restaurants */}
          {/* <Link href="/restaurant" className="text-black hover:text-orange-600">
            Restaurants
          </Link> */}
         <Link
  href="/restaurant"
  className="relative text-black font-medium after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-orange-600 after:transition-all after:duration-300 hover:after:w-full hover:text-orange-600"
>
  Restaurants
</Link>


          {/* Cart */}
          <Link href="/cart" className="relative text-black hover:text-orange-600">
            <ShoppingCart size={22} />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs px-2 rounded-full">
                {cartItems.length}
              </span>
            )}
          </Link>
          </>
          )}

          {/* NOT Logged In */}
          {!user && (
            <>
              <Link href="/login" className="text-black hover:text-orange-600">
                Login
              </Link>
              <Link
                href="/register"
                className="bg-orange-500 text-white px-5 py-2 rounded-full hover:bg-orange-600"
              >
                Sign Up
              </Link>
            </>
          )}

          {/* Logged In - Profile Dropdown */}
          {user && (
            <div className="relative" ref={dropdownRef}>
              {/* Avatar */}
              <button
                onClick={() => setOpen(!open)}
                className="w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold text-lg shadow"
              >
                {user.name?.charAt(0).toUpperCase()}
              </button>

              {/* Dropdown */}
              {open && (
                <div className="absolute right-0 mt-3 w-52 bg-white border rounded-xl shadow-lg overflow-hidden">

                  <div className="px-4 py-3 border-b">
                    <p className="font-semibold text-black">{user.name}</p>
                    <p className="text-sm text-gray-500 capitalize">{user.role}</p>
                  </div>

                  <Link
                    href="/profile"
                    className="flex items-center gap-2 px-4 py-3 hover:bg-gray-100 text-black"
                    onClick={() => setOpen(false)}
                  >
                    <User size={18} /> Profile
                  </Link>

                  <Link
                    href="/my-orders"
                    className="flex items-center gap-2 px-4 py-3 hover:bg-gray-100 text-black"
                    onClick={() => setOpen(false)}
                  >
                    My Orders
                  </Link>

                  <Link
                    href={dashboardPath}
                    className="flex items-center gap-2 px-4 py-3 hover:bg-gray-100 text-black"
                    onClick={() => setOpen(false)}
                  >
                    <LayoutDashboard size={18} /> Dashboard
                  </Link>

                  <button
                    onClick={logout}
                    className="w-full flex items-center gap-2 px-4 py-3 text-red-600 hover:bg-red-50"
                  >
                    <LogOut size={18} /> Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
