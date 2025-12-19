"use client";

import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default function OrderConfirmationPage() {
  // Read details passed via query params or router state
  const params = new URLSearchParams(typeof window !== "undefined" ? window.location.search : "");
  const orderId = params.get("orderId");
  const paymentId = params.get("paymentId");

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50 p-6">
      <div className="bg-white shadow-lg rounded-xl p-10 max-w-xl text-center border">
        
        <CheckCircle className="mx-auto text-green-600" size={80} />

        <h1 className="text-4xl font-bold text-black mt-5">
          Order <span className="text-green-600">Confirmed!</span>
        </h1>

        <p className="text-gray-700 text-lg mt-3">
          Thank you for your order. Your payment has been successfully processed.
        </p>

        <div className="mt-6 bg-gray-100 p-4 rounded-lg text-left">
          <p className="text-gray-800">
            <strong>Order ID:</strong> {orderId || "N/A"}
          </p>
          <p className="text-gray-800 mt-2">
            <strong>Payment ID:</strong> {paymentId || "N/A"}
          </p>
        </div>

        <Link
          href="/restaurant"
          className="mt-8 inline-block bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-700 transition"
        >
          Continue Browsing
        </Link>
      </div>
    </div>
  );
}
