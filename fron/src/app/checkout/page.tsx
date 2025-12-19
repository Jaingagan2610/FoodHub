"use client";

import { useEffect, useState } from "react";
import { Minus, Plus, Trash2, AlertCircle } from "lucide-react";
import Link from "next/link";
import api from "@/lib/axios";
import { Alert, AlertTitle } from "@mui/material";

export default function CheckoutPage() {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCart = async () => {
    try {
      const res = await api.get("/cart");
      setCartItems(res.data);
    } catch (err) {
      console.error("Error fetching cart:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);
  useEffect(() => {
  const script = document.createElement("script");
  script.src = "https://checkout.razorpay.com/v1/checkout.js";
  script.async = true;
  document.body.appendChild(script);
}, []);

  if (loading) return <p className="p-10">Loading...</p>;

  const isCartEmpty = cartItems.length === 0;
  const userRole = cartItems[0]?.user?.role;
  const canCheckout = userRole === "admin" || userRole === "manager";

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
//    const handlePayment = async () => {
//   const amount = total + 40; // subtotal + delivery

//   // 1. Create Razorpay order from backend
//   const res = await api.post("/payment/create-order", { amount });
//   const order = res.data;

//   // 2. Open Razorpay checkout UI
//   const options = {
//     key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
//     amount: order.amount,
//     currency: "INR",
//     name: "FoodHub",
//     description: "Order Payment",
//     order_id: order.id,

//     handler: function (response: any) {
//       alert("Payment Successful!");

//       // Clear cart after payment success
//       cartItems.forEach(async (item) => {
//         await api.delete(`/cart/${item.id}`);
//       });


//     },

//     prefill: {
//       name: cartItems[0]?.user?.name || "",
//       email: cartItems[0]?.user?.email || "",
//     },
//     theme: {
//       color: "#ff6600",
//     },
//   };

//   const razor = new (window as any).Razorpay(options);
//   razor.open();
// };
  const handlePayment = async () => {
  try {
    const amount = total + 40;

    // 1️⃣ CREATE ORDER (Pending)
    const orderBody = {
      menuItems: cartItems.map((item) => ({
        menuItemId: item.menuItem.id,
        quantity: item.quantity,
      })),
    };

    const orderRes = await api.post("/orders", orderBody);
    const createdOrder = orderRes.data;
    const orderId = createdOrder.id;

    console.log("Order Created:", orderId);

    // 2️⃣ CREATE Razorpay Order
    const rpOrderRes = await api.post("/payments/create-order", {
      amount,
    });

    const rpOrder = rpOrderRes.data;

    // 3️⃣ OPEN Razorpay Checkout
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: rpOrder.amount,
      currency: "INR",
      name: "FoodHub",
      description: "Order Payment",
      order_id: rpOrder.id,

      handler: async function (response: any) {
        alert("Payment Success!");

        // 4️⃣ RECORD PAYMENT IN BACKEND
        await api.post("/payments", {
          orderId: orderId,
          paymentMethod: "upi",
        });

        // 5️⃣ UPDATE ORDER STATUS -> confirmed
        await api.put(`/orders/${orderId}/status`, {
          status: "confirmed",
        });

        // 6️⃣ CLEAR CART
        for (const item of cartItems) {
          await api.delete(`/cart/${item.id}`);
        }

        // alert("Order Confirmed!");
        // window.location.href = `/orderConformation?orderId=${orderId}`;
        const { razorpay_payment_id, razorpay_order_id } = response;
        window.location.href = `/orderConformation?orderId=${razorpay_order_id}&paymentId=${razorpay_payment_id}`;


      },

      prefill: {
        name: "User",
        email: "user@example.com",
      },
      theme: {
        color: "#ff6600",
      },
    };

    const razor = new (window as any).Razorpay(options);
    razor.open();
  } catch (error) {
    console.error("Payment Error:", error);
    alert("Payment Failed!");
  }
};

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-black mb-8">
        Checkout <span className="text-orange-600">Summary</span>
      </h1>

      {/* If cart empty */}
      {isCartEmpty && (
        <div className="text-center py-20">
          <h2 className="text-2xl font-semibold text-gray-700">
            Your cart is empty 🛒
          </h2>

          <Link
            href="/restaurant"
            className="mt-6 inline-block bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-700 transition"
          >
            Explore Restaurants
          </Link>
        </div>
      )}

      {/* Checkout UI */}
      {!isCartEmpty && (
        <div className="grid md:grid-cols-3 gap-10">
          {/* LEFT SIDE - CART ITEMS */}
          <div className="md:col-span-2 space-y-5">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-5 bg-white p-4 shadow-md rounded-xl border"
              >
                <img
                  src={item.menuItem.image}
                  className="h-24 w-24 rounded-xl object-cover"
                />

                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-black">
                    {item.menuItem.name}
                  </h2>
                  <p className="text-gray-600 text-sm mt-1">
                    ₹ {item.price} × {item.quantity}
                  </p>

                  <div className="flex items-center gap-3 mt-3">
                    <button className="p-2 rounded-full bg-gray-200 hover:bg-gray-300">
                      <Minus className="w-4 h-4 text-black" />
                    </button>

                    <span className="text-lg font-semibold text-black">
                      {item.quantity}
                    </span>

                    <button className="p-2 rounded-full bg-gray-200 hover:bg-gray-300">
                      <Plus className="w-4 h-4 text-black" />
                    </button>
                  </div>
                </div>

                <button className="text-red-500 hover:text-red-700">
                  <Trash2 className="w-6 h-6" />
                </button>
              </div>
            ))}
          </div>

          {/* RIGHT SIDE - SUMMARY */}
          <div className="bg-white shadow-lg p-6 rounded-xl border">
            <h2 className="text-2xl font-bold text-black mb-4">
              Order Summary
            </h2>

            <div className="flex justify-between text-lg font-medium text-black mb-3">
              <span>Subtotal</span>
              <span>₹ {total}</span>
            </div>

            <div className="flex justify-between text-lg text-gray-700 mb-3">
              <span>Delivery Fee</span>
              <span>₹ 40</span>
            </div>

            <hr className="my-4" />

            <div className="flex justify-between text-2xl font-bold text-black mb-6">
              <span>Total</span>
              <span>₹ {total + 40}</span>
            </div>

            {/* ❌ Show warning if NOT admin/manager */}
           {!canCheckout && (
  <Alert 
    severity="error" 
    variant="filled" 
    sx={{ mb: 2, borderRadius: "10px" }}
  >
    <AlertTitle>Error</AlertTitle>
    Only <b>Admins</b> and <b>Managers</b> can complete checkout.  
    Members can browse and add items only.
  </Alert>
)}


            {/* ✔ Enable/Disable Checkout Button */}
            {/* <button
            onClick={handlePayment}
              disabled={!canCheckout}
              className={`w-full py-3 rounded-xl font-semibold transition ${
                canCheckout
                  ? "bg-orange-600 text-white hover:bg-orange-700"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              Place Order
            </button> */}
            <button
  onClick={handlePayment}
  disabled={!canCheckout}
  className="w-full bg-orange-600 disabled:bg-gray-400 text-white py-3 rounded-xl font-semibold hover:bg-orange-700 transition"
>
  Place Order
</button>


            <button
              className="w-full mt-3 text-red-500 font-medium hover:underline"
            >
              Clear Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
}


