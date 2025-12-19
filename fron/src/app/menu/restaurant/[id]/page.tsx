"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api from "@/lib/axios";
import { MapPin, Phone, Utensils } from "lucide-react";
import { useCart } from "@/store/useCart";

type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
};

type Restaurant = {
  id: string;
  name: string;
  phone: string;
  description: string;
  location: string;
  imageUrl: string;
  cuisineType: string;
};

export default function RestaurantMenuPage() {
  const { id } = useParams();
  const { addItem } = useCart(); 
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [menu, setMenu] = useState<MenuItem[]>([]);

  useEffect(() => {
    fetchRestaurant();
    fetchMenu();
  }, []);

  const fetchRestaurant = async () => {
    const res = await api.get(`/restaurants/${id}`);
    setRestaurant(res.data);
  };

  const fetchMenu = async () => {
    const res = await api.get(`/menu/restaurant/${id}`);
    console.log("fetchdata",res)
    setMenu(res.data);
  };

  if (!restaurant) return <p className="p-10 text-xl">Loading...</p>;

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">

      {/* Banner */}
      <div className="rounded-2xl overflow-hidden shadow-lg border">
        <img
          src={restaurant.imageUrl}
          alt={restaurant.name}
          className="w-full h-64 object-cover"
        />
      </div>

      {/* Restaurant Info */}
      <div className="mt-6">
        <h1 className="text-4xl font-bold text-black">{restaurant.name}</h1>

        <p className="text-gray-700 mt-2 max-w-3xl">{restaurant.description}</p>

        <div className="flex items-center gap-4 mt-4 text-gray-800">

          <div className="flex items-center gap-2">
            <Utensils className="h-5 w-5 text-orange-600" />
            <span className="font-medium">{restaurant.cuisineType}</span>
          </div>

          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-orange-600" />
            <span>{restaurant.location}</span>
          </div>

          <div className="flex items-center gap-2">
            <Phone className="h-5 w-5 text-orange-600" />
            <span>{restaurant.phone}</span>
          </div>
        </div>
      </div>

      <hr className="my-8 border-gray-300" />

      {/* Menu Title */}
      <h2 className="text-3xl font-bold text-black mb-4">
        Menu <span className="text-orange-600">Items</span>
      </h2>

      {/* Menu Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {menu.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl shadow-md border hover:shadow-lg transition-all overflow-hidden"
          >
            {/* Item Image */}
            <img
              src={item?.image}
              alt={item?.name}
              className="w-full h-48 object-cover"
            />

            {/* Item Content */}
            <div className="p-5">
              <h3
              className="text-xl font-bold text-black">{item.name}</h3>

              <p className="text-gray-600 text-sm mt-2 line-clamp-3">
                {item.description}
              </p>

              <p className="text-orange-600 text-lg font-semibold mt-3">
                ₹ {item.price}
              </p>

              {/* <button
                onClick={() =>

                    addItem({
                      id: item.id,
                      name: item.name,
                      price: item.price,
                      imageUrl: item.imageUrl,
                      })
                 }
                className="w-full bg-orange-600 text-white py-2.5 mt-4 rounded-xl font-semibold hover:bg-orange-700 transition-all"
              >
                Add to Cart
              </button> */}
              <button
  onClick={async () => {
    try {
      const token = localStorage.getItem("token"); // ⬅️ get user token

      const res = await api.post(
        "/cart",
        {
          menuItemId: item.id,
          quantity: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Added to cart:", res.data);

      // Update Zustand UI cart
      addItem({
        id: item.id,
        name: item.name,
        price: item.price,
        imageUrl: item.image,
      });

      alert("Item added to cart!");

    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  }}
  className="w-full bg-orange-600 text-white py-2.5 mt-4 rounded-xl font-semibold hover:bg-orange-700 transition-all"
>
  Add to Cart
</button>


            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
