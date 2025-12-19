"use client";

import { useState } from "react";
import api from "@/lib/axios";
import { useAuth } from "@/store/useAuth";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const loginStore = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleLogin = async () => {
    try {
      const res = await api.post("/auth/login", form);
      loginStore.login(res.data);

      const role = res.data.user.role;
      if (role === "admin") router.push("/dashboard/admin");
      else if (role === "manager") router.push("/dashboard/manager");
      else router.push("/dashboard/member");
    } catch (error) {
      alert("Invalid Credentials");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white flex items-center justify-center px-4 relative">
      
      {/* Orange Blurry Backgrounds */}
      <div className="absolute top-10 left-10 w-40 h-40 bg-orange-200 rounded-full blur-3xl opacity-40"></div>
      <div className="absolute bottom-10 right-10 w-52 h-52 bg-orange-300 rounded-full blur-3xl opacity-40"></div>

      {/* Login Card */}
      <div className="w-full max-w-md bg-white/90 backdrop-blur-xl shadow-2xl border border-orange-100 rounded-3xl p-8 animate-fadeIn">

        {/* Logo + Title */}
        <div className="text-center mb-6">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center shadow-md">
              <span className="text-white text-3xl font-bold">🍽️</span>
            </div>
          </div>

          <h1 className="text-4xl font-extrabold mt-3 text-black">
            <span className="text-orange-500">Food</span>Hub
          </h1>

          <p className="text-black mt-1 text-base">
            Login to continue your order
          </p>
        </div>

        {/* Inputs */}
        <div className="space-y-4 text-black">
          <div>
            <label className="font-medium text-black">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full mt-1 px-4 py-3 rounded-xl border border-gray-300 text-black bg-gray-50 focus:ring-2 focus:ring-orange-300 focus:border-orange-500 outline-none transition"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          <div>
            <label className="font-medium text-black">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full mt-1 px-4 py-3 rounded-xl border border-gray-300 text-black bg-gray-50 focus:ring-2 focus:ring-orange-300 focus:border-orange-500 outline-none transition"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>

          <button
            onClick={handleLogin}
            className="w-full py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold transition shadow-lg"
          >
            Login
          </button>
        </div>

        {/* Sign Up Link */}
        <p className="text-center text-black text-sm mt-6">
          Don't have an account?{" "}
          <Link href="/register" className="font-semibold text-orange-600 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
