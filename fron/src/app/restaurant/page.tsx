// "use client";

// import api from "@/lib/axios";
// import { useEffect, useState } from "react";

// export default function RestaurantsPage() {
//   const [restaurants, setRestaurants] = useState([]);

//   useEffect(() => {
//     api.get("/restaurant").then((res) => setRestaurants(res.data));
//   }, []);

//   return (
//     <div>
//       <h1>Restaurants</h1>
//       {restaurants.map((r: any) => (
//         <div key={r.id}>
//           <h3>{r.name}</h3>
//           <p>{r.location}</p>
//         </div>
//       ))}
//     </div>
//   );
// }
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import api from "@/lib/axios";
import { MapPin, Phone, Utensils } from "lucide-react";

type Restaurant = {
  id: string;
  name: string;
  phone: string;
  description: string;
  location: string;
  imageUrl: string;
  cuisineType: string;
  country: "IN" | "USA";
};

export default function RestaurantsPage() {
  const [country, setCountry] = useState("IN");
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  useEffect(() => {
    fetchRestaurants();
  }, [country]);

  const fetchRestaurants = async () => {
    const res = await api.get(`/restaurants?country=${country}`);
    setRestaurants(res.data);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">

      {/* Page Title */}
      <h1 className="text-4xl font-extrabold text-black mb-6">
        Discover <span className="text-orange-600">Restaurants</span>
      </h1>

      {/* Country Filter */}
      <div className="flex gap-3 mb-10">
        {["IN", "USA"].map((c) => (
          <button
            key={c}
            onClick={() => setCountry(c)}
            className={`px-6 py-2.5 rounded-full border text-sm font-semibold transition-all
            ${
              country === c
                ? "bg-orange-600 text-white border-orange-600 shadow-md"
                : "bg-white text-black border-gray-300 hover:border-orange-500 hover:text-orange-600"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Restaurant Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {restaurants.map((r) => (
          <div
            key={r.id}
            className="bg-white rounded-2xl shadow-md border hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
          >
            {/* Banner Image */}
            <img
              src={r.imageUrl}
              alt={r.name}
              className="w-full h-52 object-cover"
            />

            {/* Card Content */}
            <div className="p-5">

              {/* Name */}
              <h2 className="text-2xl font-bold text-black">{r.name}</h2>

              {/* Description */}
              <p className="text-gray-700 text-sm mt-2 line-clamp-3">
                {r.description}
              </p>

              {/* Cuisine Type */}
              <div className="flex items-center gap-2 mt-3">
                <Utensils className="h-4 w-4 text-orange-600" />
                <span className="text-sm font-medium text-orange-600">
                  {r.cuisineType}
                </span>
              </div>

              {/* Location */}
              <div className="flex items-center gap-2 mt-3">
                <MapPin className="h-4 w-4 text-gray-700" />
                <p className="text-gray-700 text-sm">{r.location}</p>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-2 mt-2">
                <Phone className="h-4 w-4 text-gray-800" />
                <p className="text-gray-900 text-sm">{r.phone}</p>
              </div>

              {/* Menu Button */}
              
              <Link
                href={`/menu/restaurant/${r.id}`}
                onClick={()=>{
                  console.log("jjjj",r.id)
                }}
                className="block bg-orange-600 mt-5 text-white text-center py-2.5 rounded-xl font-semibold hover:bg-orange-700 transition"
              >
                View Menu
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

