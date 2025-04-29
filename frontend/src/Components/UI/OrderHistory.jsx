import React, { useState } from "react";
import axios from "axios";

function OrderHistory() {
  const [phone, setPhone] = useState("");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFetchOrders = async () => {
    if (!phone || phone.length !== 10) {
      alert("Please enter a valid 10-digit phone number!");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get(
        `https://digital-dinner-4yb8.onrender.com/api/orders/${phone}`
      );
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
      alert("Failed to fetch order history.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">View Your Order History</h2>

      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Enter Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="border p-2 rounded w-64"
        />
        <button
          onClick={handleFetchOrders}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Fetch Orders
        </button>
      </div>

      {loading && <p>Loading orders...</p>}

      {orders.length > 0 ? (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="border p-4 rounded bg-white shadow">
              <h3 className="font-semibold text-lg mb-2">
                Order Placed On: {new Date(order.created_at).toLocaleString()}
              </h3>
              <p>
                <strong>Total Price:</strong> ₹{order.total_price}
              </p>
              <div className="mt-2">
                <h4 className="font-semibold">Items:</h4>
                <ul className="list-disc ml-6">
                  {order.cart_items.map((item, idx) => (
                    <li key={idx}>
                      {item.name} - ₹{item.price} x {item.quantity || 1}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      ) : (
        !loading && <p>No orders found for this phone number.</p>
      )}
    </div>
  );
}

export default OrderHistory;
