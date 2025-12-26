// "use client";

// import { useState, useEffect } from "react";
// import Link from "next/link";
// import api from "@/lib/axios";
// import { MapPin, Phone, Utensils } from "lucide-react";

// type Restaurant = {
//   id: string;
//   name: string;
//   phone: string;
//   description: string;
//   location: string;
//   imageUrl: string;
//   cuisineType: string;
//   country: "IN" | "USA";
// };

// export default function MemberDashboard() {
//   const [country, setCountry] = useState("IN");
//   const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

//   useEffect(() => {
//     fetchRestaurants();
//   }, [country]);

//   const fetchRestaurants = async () => {
//     const res = await api.get(`/restaurants?country=${country}`);
//     setRestaurants(res.data);
//   };

//   return (
//     <div className="max-w-7xl mx-auto px-6 py-10">

//       {/* Page Title */}
//       <h1 className="text-4xl font-extrabold text-black mb-6">
//         Discover <span className="text-orange-600">Restaurants</span>
//       </h1>

//       {/* Country Filter */}
//       <div className="flex gap-3 mb-10">
//         {["IN", "USA"].map((c) => (
//           <button
//             key={c}
//             onClick={() => setCountry(c)}
//             className={`px-6 py-2.5 rounded-full border text-sm font-semibold transition-all
//             ${
//               country === c
//                 ? "bg-orange-600 text-white border-orange-600 shadow-md"
//                 : "bg-white text-black border-gray-300 hover:border-orange-500 hover:text-orange-600"
//             }`}
//           >
//             {c}
//           </button>
//         ))}
//       </div>

//       {/* Restaurant Cards */}
//       <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//         {restaurants.map((r) => (
//           <div
//             key={r.id}
//             className="bg-white rounded-2xl shadow-md border hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
//           >
//             {/* Banner Image */}
//             <img
//               src={r.imageUrl}
//               alt={r.name}
//               className="w-full h-52 object-cover"
//             />

//             {/* Card Content */}
//             <div className="p-5">

//               {/* Name */}
//               <h2 className="text-2xl font-bold text-black">{r.name}</h2>

//               {/* Description */}
//               <p className="text-gray-700 text-sm mt-2 line-clamp-3">
//                 {r.description}
//               </p>

//               {/* Cuisine Type */}
//               <div className="flex items-center gap-2 mt-3">
//                 <Utensils className="h-4 w-4 text-orange-600" />
//                 <span className="text-sm font-medium text-orange-600">
//                   {r.cuisineType}
//                 </span>
//               </div>

//               {/* Location */}
//               <div className="flex items-center gap-2 mt-3">
//                 <MapPin className="h-4 w-4 text-gray-700" />
//                 <p className="text-gray-700 text-sm">{r.location}</p>
//               </div>

//               {/* Phone */}
//               <div className="flex items-center gap-2 mt-2">
//                 <Phone className="h-4 w-4 text-gray-800" />
//                 <p className="text-gray-900 text-sm">{r.phone}</p>
//               </div>

//               {/* Menu Button */}
              
//               <Link
//                 href={`/menu/restaurant/${r.id}`}
//                 onClick={()=>{
//                   console.log("jjjj",r.id)
//                 }}
//                 className="block bg-orange-600 mt-5 text-white text-center py-2.5 rounded-xl font-semibold hover:bg-orange-700 transition"
//               >
//                 View Menu
//               </Link>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";
import Link from "next/link";
import { User, ShoppingBag, Utensils, ClipboardList } from "lucide-react";

export default function MemberDashboard() {
  const [user, setUser] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch user profile + orders
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const profileRes = await api.get("/users/profile");
  //       setUser(profileRes.data);

  //       const ordersRes = await api.get("/orders/my-orders");
  //       setOrders(ordersRes.data);
  //     } catch (err) {
  //       console.error("Error loading dashboard:", err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, []);
  useEffect(() => {
  let isMounted = true;

  const fetchData = async () => {
    try {
      const profileRes = await api.get("/users/profile");
      if (isMounted) setUser(profileRes.data);

      const ordersRes = await api.get("/orders/my-orders");
      if (isMounted) setOrders(ordersRes.data);
    } catch (err) {
      console.error("Error loading dashboard:", err);
    } finally {
      if (isMounted) setLoading(false);
    }
  };

  fetchData();

  return () => {
    isMounted = false;
  };
}, []);


  if (loading) return <p className="p-10 text-xl">Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-black mb-6">
        Welcome, <span className="text-orange-600">{user?.name}</span> 👋
      </h1>

      {/* Profile Summary Card */}
      <div className="bg-white p-6 rounded-2xl shadow-md border mb-10">
        <h2 className="text-2xl font-semibold text-black flex items-center gap-2 mb-4">
          <User className="text-orange-600" /> Profile Information
        </h2>

        <div className="space-y-2 text-gray-700">
          <p><b>Name:</b> {user?.name}</p>
          <p><b>Email:</b> {user?.email}</p>
          <p><b>Role:</b> {user?.role}</p>
        </div>
      </div>

      {/* Quick Action Buttons */}
      <h2 className="text-2xl font-bold text-black mb-4">Quick Actions</h2>

      <div className="grid md:grid-cols-3 gap-6 mb-10">
        <Link
          href="/my-orders"
          className="bg-white border shadow-sm hover:shadow-lg transition p-6 rounded-xl flex flex-col items-center text-center"
        >
          <ClipboardList className="w-12 h-12 text-orange-600 mb-4" />
          <span className="text-xl font-semibold text-black">My Orders</span>
        </Link>

        <Link
          href="/cart"
          className="bg-white border shadow-sm hover:shadow-lg transition p-6 rounded-xl flex flex-col items-center text-center"
        >
          <ShoppingBag className="w-12 h-12 text-orange-600 mb-4" />
          <span className="text-xl font-semibold text-black">My Cart</span>
        </Link>

        <Link
          href="/restaurant"
          className="bg-white border shadow-sm hover:shadow-lg transition p-6 rounded-xl flex flex-col items-center text-center"
        >
          <Utensils className="w-12 h-12 text-orange-600 mb-4" />
          <span className="text-xl font-semibold text-black">Explore Restaurants</span>
        </Link>
      </div>

      {/* Recent Orders */}
      <h2 className="text-2xl font-bold text-black mb-4">Recent Orders</h2>

      {orders.length === 0 ? (
        <p className="text-gray-600">You haven’t placed any orders yet.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white border shadow-sm p-5 rounded-xl hover:shadow-md transition"
            >
              <div className="flex justify-between">
                <div>
                  <p className="font-semibold text-black">
                    Order #{order.id.slice(0, 6)}
                  </p>
                  <p className="text-gray-600 text-sm">
                    Status: <span className="font-medium">{order.status}</span>
                  </p>
                </div>
                <p className="text-orange-600 font-bold text-lg">
                  ₹ {order.totalPrice}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
