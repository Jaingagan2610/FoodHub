"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";
import Link from "next/link";

export default function MyOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await api.get("/orders/my");
      setOrders(res.data);
    } catch (err) {
      console.error("Error fetching orders:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) return <p className="p-10 text-xl">Loading...</p>;

  if (orders.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-semibold text-gray-700">
          You have no orders yet 🚫
        </h2>

        <Link
          href="/restaurant"
          className="mt-6 inline-block bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-700 transition"
        >
          Browse Restaurants
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-black mb-8">
        My <span className="text-orange-600">Orders</span>
      </h1>

      <div className="space-y-8">
        {orders.map(order => (
          <div
            key={order.id}
            className="bg-white p-5 shadow-md rounded-xl border"
          >
            {/* Order Header */}
            <div className="flex justify-between items-center mb-4">
              <div>
                <p className="text-lg font-semibold text-black">
                  Order #{order.id.slice(0, 8)}
                </p>
                <p className="text-gray-600 text-sm">
                  {new Date(order.createdAt).toLocaleString()}
                </p>
              </div>

              <span
                className={`px-4 py-1 rounded-full text-white font-medium ${
                  order.status === "confirmed"
                    ? "bg-green-600"
                    : order.status === "pending"
                    ? "bg-yellow-500"
                    : "bg-red-600"
                }`}
              >
                {order.status}
              </span>
            </div>

            {/* Order Items */}
            <div className="space-y-4">
              {order.items.map((item: any) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 border-b pb-3"
                >
                  <img
                    src={item.menuItem.image}
                    className="w-20 h-20 object-cover rounded-lg"
                  />

                  <div className="flex-1">
                    <p className="font-semibold text-black">
                      {item.menuItem.name}
                    </p>
                    <p className="text-gray-600 text-sm">
                      Qty: {item.quantity}
                    </p>
                  </div>

                  <p className="font-bold text-orange-600">
                    ₹ {item.price * item.quantity}
                  </p>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="flex justify-between mt-4 text-lg font-semibold text-black">
              <span>Total Price:</span>
              <span>₹ {order.totalPrice}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
