"use client";

import api from "@/lib/axios";
import { useEffect, useState } from "react";
import { Restaurant } from "../../../../../types/restaurant";

export default function RestaurantDetail({ params }: any) {
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  console.log("i am here")
  useEffect(() => {
    api.get(`/menu/restaurant/${params.id}`)
      .then((res) => setRestaurant(res.data))
      .catch((err) => console.error(err));
  }, [params.id]);

  if (!restaurant) return <p>Loading...</p>;
  
  return (
    <div>
      <h2>{restaurant.name}</h2>

      {restaurant.menuItems?.length > 0 ? (
        restaurant.menuItems.map((item:any) => (
          <div key={item.id}>
            <h4>{item.name}</h4>
            <p>Price: {item.price}</p>
          </div>
        ))
      ) : (
        <p>No Menu Items Found</p>
      )}
    </div>
  );
}
