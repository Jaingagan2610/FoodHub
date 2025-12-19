"use client";

import { useState } from "react";
import api from "@/lib/axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    country: "IN",
    role: "member",
  });

  const [error, setError] = useState("");

  const handleRegister = async () => {
    try {
      const res = await api.post("/users/register", form);
      alert("Registration Successful!");
      router.push("/login");
    } catch (err) {
      setError("Error registering user");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white flex items-center justify-center px-4 relative">
      
      {/* Background Decoration */}
      <div className="absolute top-10 left-10 w-40 h-40 bg-orange-200 rounded-full blur-3xl opacity-40"></div>
      <div className="absolute bottom-10 right-10 w-52 h-52 bg-orange-300 rounded-full blur-3xl opacity-40"></div>

      {/* Register Card */}
      <div className="w-full max-w-md bg-white/90 backdrop-blur-xl shadow-2xl border border-orange-100 rounded-3xl p-8 animate-fadeIn">
        
        {/* Logo */}
        <div className="text-center mb-6">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center shadow-md">
              <span className="text-white text-3xl font-bold">🍽️</span>
            </div>
          </div>
          <h1 className="text-4xl font-extrabold mt-3 text-black">
            <span className="text-orange-500">Food</span>Hub
          </h1>
          <p className="mt-1 text-black">Create your account</p>
        </div>

        {error && (
          <p className="text-red-600 text-center mb-4 font-semibold">
            {error}
          </p>
        )}

        {/* Form */}
        <div className="space-y-4 text-black">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full px-4 py-3 rounded-xl border text-black border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-300 outline-none transition"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <input
            type="email"
            placeholder="Email Address"
            className="w-full px-4 py-3 rounded-xl border text-black border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-300 outline-none transition"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 rounded-xl border text-black border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-300 outline-none transition"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          {/* Country */}
          <select
            className="w-full px-4 py-3 rounded-xl border text-black border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-300 outline-none transition"
            defaultValue="IN"
            onChange={(e) => setForm({ ...form, country: e.target.value })}
          >
            <option value="IN">🇮🇳 India</option>
            <option value="US">🇺🇸 America</option>
          </select>

          {/* Role */}
          <select
            className="w-full px-4 py-3 rounded-xl border text-black border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-300 outline-none transition"
            defaultValue="member"
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          >
            <option value="member">Member</option>
            <option value="manager">Manager</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleRegister}
          className="w-full mt-6 bg-orange-500 hover:bg-orange-600 transition text-white py-3 rounded-xl font-semibold shadow-lg"
        >
          Create Account
        </button>

        {/* Login Link */}
        <p className="mt-4 text-center text-black">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-orange-600">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
