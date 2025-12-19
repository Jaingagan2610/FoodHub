"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";
import { Trash2, Plus, Minus, Link } from "lucide-react";
import { useRouter } from "next/navigation";

export type CartItem = {
  id: string;
  quantity: number;
  price: number; // backend price snapshot
  menuItem: {
    id: string;
    name: string;
    image: string;
    description: string;
    price: number;
  };
};

export default function CartPage() {
  const router = useRouter(); // NOW it works
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  
  

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    const res = await api.get("/cart");
    console.log("resss",res)
    setCart(res.data);
    setLoading(false);
  };

  const updateQuantity = async (id: string, qty: number) => {
  if (qty < 1) return;

  try {
    const res = await api.put(`/cart/${id}`, {
      quantity: qty
    });

    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: qty } : item
      )
    );
  } catch (err) {
    console.error("Update quantity error:", err);
  }
};


  // const removeItem = async (id: string) => {
  //   const res = await api.delete(`/cart/${id}`);
  //   setCart(res.data);
  // };

  // const total = cart?.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const removeItem = async (id: string) => {
  await api.delete(`/cart/${id}`);
  setCart(cart.filter((item) => item.id !== id));
};

const total = (Array.isArray(cart) ? cart : []).reduce(
  (acc, item) => acc + item.price * item.quantity,
  0
);

  if (loading) return <p className="p-10 text-xl">Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold mb-6 text-black">
        Your <span className="text-orange-600">Cart</span>
      </h1>

      {cart.length === 0 ? (
        <p className="text-gray-500 text-lg">Your cart is empty.</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          
          {/* Cart Items */}
          <div className="md:col-span-2 space-y-6">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-5 bg-white p-5 rounded-2xl shadow-md border"
              >
                <img
                  src={item?.menuItem?.image}
                  alt={item?.menuItem?.name}
                  className="w-28 h-28 rounded-xl object-cover"
                />

                <div className="flex-1">
                  <h2  className="text-xl font-bold text-black">{item?.menuItem?.name}</h2>

                  <p  onClick={()=>{
                    console.log("hello",item)
                  }} className="text-orange-600 font-semibold mt-1">
                    ₹ {item.price}
                  </p>

                  {/* Quantity */}
                  <div className="flex items-center gap-3 mt-3 text-black">
  {/* Decrease */}
  <button
    onClick={() => updateQuantity(item.id, item.quantity - 1)}
    className="p-2 rounded-full bg-gray-200 hover:bg-gray-300"
  >
    <Minus className="w-4 h-4 text-black" />
  </button>

  {/* Quantity number */}
  <span className="text-lg font-semibold text-black">
    {item.quantity}
  </span>

  {/* Increase */}
  <button
    onClick={() => updateQuantity(item.id, item.quantity + 1)}
    className="p-2 rounded-full bg-gray-200 hover:bg-gray-300"
  >
    <Plus className="w-4 h-4 text-black" />
  </button>
</div>

                </div>

                {/* Delete */}
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-6 h-6" />
                </button>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="bg-white shadow-md border p-6 rounded-2xl h-fit">
            <h2 className="text-2xl font-bold text-black mb-4">Order Summary</h2>

            <div className="flex justify-between text-lg font-medium text-gray-800">
              <span>Total</span>
              <span className="text-orange-600 font-bold">₹ {total}</span>
            </div>
            <button
            onClick={() => router.push("/checkout")}
      className="mt-6 w-full bg-orange-600 text-white py-3 rounded-xl font-semibold hover:bg-orange-700 transition"
    >
      Proceed to Checkout
    </button>
   
          </div>

        </div>
      )}
    </div>
  );
}
