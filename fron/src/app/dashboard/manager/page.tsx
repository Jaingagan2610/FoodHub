"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";
import Link from "next/link";
import { 
  Store, 
  Utensils, 
  ClipboardList, 
  PlusCircle 
} from "lucide-react";

export default function ManagerDashboard() {
  const [user, setUser] = useState<any>(null);
  const [restaurant, setRestaurant] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [menuItems, setMenuItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const userRes = await api.get("/users/profile");
        setUser(userRes.data);

        const restRes = await api.get("/restaurants/my-restaurant");
        setRestaurant(restRes.data);

        if (restRes.data?.id) {
          const menuRes = await api.get(`/menu/restaurant/${restRes.data.id}`);
          setMenuItems(menuRes.data);

          const orderRes = await api.get(`/orders/restaurant/${restRes.data.id}`);
          setOrders(orderRes.data);
        }
      } catch (err) {
        console.error("Error loading manager dashboard", err);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  if (loading) return <p className="p-10 text-xl">Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Title */}
      <h1 className="text-4xl font-bold text-black mb-6">
        Manager Dashboard 
      </h1>

      {/* Restaurant Info */}
      {restaurant ? (
        <div className="bg-white p-6 shadow-md border rounded-2xl mb-8">
          <h2 className="text-2xl font-bold text-black flex items-center gap-2">
            <Store className="text-orange-600" /> Your Restaurant
          </h2>

          <p className="text-xl font-semibold mt-3">{restaurant.name}</p>
          <p className="text-gray-600">{restaurant.location}</p>

          <Link
            href={`/restaurant/edit/${restaurant.id}`}
            className="mt-4 inline-block bg-orange-600 text-white py-2 px-5 rounded-lg hover:bg-orange-700"
          >
            Edit Restaurant
          </Link>
        </div>
      ) : (
        <p className="text-gray-700">No restaurant assigned to your account.</p>
      )}

      {/* Quick Stats */}
      <div className="grid md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white shadow-sm border p-6 rounded-xl">
          <Utensils className="w-10 h-10 text-orange-600 mb-3" />
          <h3 className="text-xl font-bold text-black">Menu Items</h3>
          <p className="text-2xl font-semibold">{menuItems.length}</p>
        </div>

        <div className="bg-white shadow-sm border p-6 rounded-xl">
          <ClipboardList className="w-10 h-10 text-orange-600 mb-3" />
          <h3 className="text-xl font-bold text-black">Orders Received</h3>
          <p className="text-2xl font-semibold">{orders.length}</p>
        </div>

        <div className="bg-white shadow-sm border p-6 rounded-xl">
          <Store className="w-10 h-10 text-orange-600 mb-3" />
          <h3 className="text-xl font-bold text-black">Restaurant Status</h3>
          <p className="text-xl font-semibold text-green-600">Active</p>
        </div>
      </div>

      {/* Quick Actions */}
      <h2 className="text-2xl font-bold text-black mb-4">Quick Actions</h2>

      <div className="grid md:grid-cols-3 gap-6">
        <Link
          href={`/menu/add/${restaurant?.id}`}
          className="bg-orange-600 text-white p-6 rounded-xl shadow-md hover:bg-orange-700 flex flex-col items-center"
        >
          <PlusCircle className="w-12 h-12 mb-3" />
          <span className="text-xl font-semibold">Add Menu Item</span>
        </Link>

        <Link
          href={`/orders/restaurant/${restaurant?.id}`}
          className="bg-white border shadow-md p-6 rounded-xl hover:shadow-lg transition text-center flex flex-col items-center"
        >
          <ClipboardList className="w-12 h-12 text-orange-600 mb-3" />
          <span className="text-xl font-semibold text-black">View Orders</span>
        </Link>

        <Link
          href={`/menu/restaurant/${restaurant?.id}`}
          className="bg-white border shadow-md p-6 rounded-xl hover:shadow-lg transition text-center flex flex-col items-center"
        >
          <Utensils className="w-12 h-12 text-orange-600 mb-3" />
          <span className="text-xl font-semibold text-black">View Menu</span>
        </Link>
      </div>
    </div>
  );
}
