"use client";

import api from "@/lib/axios";

export default function PaymentsPage() {
  const pay = async () => {
    const res = await api.post("/payments/pay", { orderId: "YOUR_ORDER_ID" });
    alert(res.data.message);
  };

  return (
    <div>
      <h1>Payments</h1>
      <button onClick={pay}>Pay</button>
    </div>
  );
}
