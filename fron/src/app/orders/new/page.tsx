"use client";

import api from "@/lib/axios";
import { useState } from "react";

export default function CreateOrderPage() {
  const [menuItems, setMenuItems] = useState([{ menuItemId: "", quantity: 1 }]);

  const createOrder = async () => {
    const res = await api.post("/orders", {
      menuItems
    });
    alert("Order Created");
  };

  return (
    <div>
      <h2>Create Order</h2>
      <button onClick={createOrder}>Submit</button>
    </div>
  );
}
