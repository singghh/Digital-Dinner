import React, { useState } from "react";
import { useCart } from "./CartContext";
import axios from "axios";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Cart() {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  let name = /^[a-zA-Z]+(?: [a-zA-Z]+)*$/;

  const grandTotal = cart.reduce(
    (total, item) => total + item.price * (item.quantity || 1),
    0
  );

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (!name || !phone) {
      toast.error("Please fill in all fields!", { theme: "light" });
      return;
    }
    if (name.length < 6) {
      toast.error("Name should be more than 6 characters", { theme: "light" });
      return;
    }
    if (phone.length !== 10) {
      toast.error("Phone Number should be 10 digits", { theme: "light" });
      return;
    }
    if (!name.match(username)) {
      toast.error("Please enter a valid name!", { theme: "light" });
      return;
    }

    try {
      const response = await axios.post(
        "https://digital-dinner-4yb8.onrender.com/api/orders",
        {
          name,
          phone,
          cartItems: cart,
          totalPrice: grandTotal,
        }
      );

      setName("");
      setPhone("");
      setShowOrderForm(false);
      console.log(response.data);

      if (response.data.message === "Order placed successfully!") {
        toast.success("🎉 Order placed successfully!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
          transition: Bounce,
        });
      }
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("Something went wrong while placing the order!", {
        theme: "light",
      });
    }
  };

  return (
    <>
      <div className="p-4">
        <h2 className="text-2xl font-semibold mb-8">Your Cart</h2>

        {cart.length === 0 ? (
          <p className="text-gray-600">Your cart is empty</p>
        ) : (
          <>
            {/* Items */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {cart.map((item, index) => (
                <div
                  key={index}
                  className="border border-gray-300 rounded-lg bg-white text-black shadow-md overflow-hidden"
                >
                  <div className="p-4 flex flex-col gap-2">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-full h-40 object-cover rounded-lg"
                    />
                  </div>

                  <div className="p-4 pt-0">
                    <h3 className="text-xl font-semibold m-0">{item.name}</h3>
                    <p className="text-sm text-gray-600 mt-2">
                      {item.description}
                    </p>

                    <div className="mt-4 font-bold text-lg">
                      Actual Price ₹{item.price}
                    </div>

                    <div className="mt-4 font-bold text-lg">
                      Total Quantity Price ₹{item.price * (item.quantity || 1)}
                    </div>

                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() =>
                          updateQuantity(
                            item._id,
                            Math.max((item.quantity || 1) - 1, 1)
                          )
                        }
                        className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400"
                      >
                        -
                      </button>
                      <span>{item.quantity || 1}</span>
                      <button
                        onClick={() =>
                          updateQuantity(item._id, (item.quantity || 1) + 1)
                        }
                        className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400"
                      >
                        +
                      </button>
                    </div>

                    <div className="text-sm text-gray-400 mt-2">
                      {item.category}
                    </div>

                    <button
                      onClick={() => removeFromCart(item._id)}
                      className="py-2 px-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-700 mt-4"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 text-right">
              <h3 className="text-2xl font-bold">
                Grand Total: ₹{grandTotal.toFixed(2)}
              </h3>
              <button
                onClick={() => setShowOrderForm(true)}
                className="mt-4 py-2 px-6 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
              >
                Order Now
              </button>
            </div>

            {showOrderForm && (
              <div className="fixed inset-0 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
                <div className="relative">
                  <button
                    onClick={() => setShowOrderForm(false)}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-2xl"
                  >
                    &times;
                  </button>

                  <form
                    onSubmit={handlePlaceOrder}
                    className="bg-white p-8 rounded-lg shadow-lg w-80 border-2"
                  >
                    <h3 className="text-xl font-bold mb-4">Place Your Order</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Please fill in your details to place the order.
                    </p>
                    <input
                      type="text"
                      placeholder="Name"
                      className="block w-full p-2 mb-4 border rounded"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                    <input
                      type="number"
                      placeholder="Phone Number"
                      className="block w-full p-2 mb-4 border rounded"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                    <button
                      type="submit"
                      className="w-full py-2 px-4 bg-green-500 text-white font-semibold rounded hover:bg-green-600"
                    >
                      Submit Order
                    </button>
                  </form>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* ToastContainer always outside */}
      <ToastContainer />
    </>
  );
}

export default Cart;
