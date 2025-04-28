import React, { useState, useEffect } from "react";
import { useCart } from "./CartContext";
import { ToastContainer, toast, Bounce } from "react-toastify";
import { Link } from "react-router-dom";

function Card() {
  const [menuItem, setMenuItem] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { cart, addToCart } = useCart();

  useEffect(() => {
    async function fetchMenuItem() {
      const response = await fetch("http://localhost:5000/api/menu/");
      const data = await response.json();
      setMenuItem(data);
      setFilteredItems(data);
    }
    fetchMenuItem();
  }, []);

  const handleAddToCart = (item) => {
    const itemExists = cart.some((cartItem) => cartItem._id === item._id);
    if (itemExists) {
      toast.info(`${item.name} is already in the cart`, {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
        transition: Bounce,
      });
    } else {
      addToCart(item);
      toast.success(`${item.name} Added to Cart`, {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    if (category === "All") {
      setFilteredItems(menuItem);
    } else {
      const filtered = menuItem.filter((item) => item.category === category);
      setFilteredItems(filtered);
    }
  };

  const categories = ["All", "Appetizer", "Main Course", "Dessert", "Drink"];

  return (
    <>
      <div className="p-4">
        <div className="flex flex-wrap gap-2 mb-6 justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryClick(cat)}
              className={`px-4 py-2 rounded-lg font-semibold ${
                selectedCategory === cat
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredItems.map((item) => (
            <div
              key={item._id}
              className="border border-gray-300 rounded-lg bg-white text-black shadow-md overflow-hidden cursor-pointer"
            >
              <div className="relative w-full h-48">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-full h-full object-cover rounded-t-lg"
                />
                <div className="absolute bottom-0 left-0 bg-yellow-400 text-black text-xs font-semibold px-3 py-1 rounded-tr-lg">
                  {item.category}
                </div>
              </div>

              <div className="p-4 pt-0">
                <h3 className="text-xl font-semibold mt-2">{item.name}</h3>
                <p className="text-sm text-gray-600 mt-2">{item.description}</p>
                <div className="mt-4 font-bold text-lg">₹{item.price}</div>
                <div className="flex justify-between items-center mt-4">
                  <Link to={`/menu/${item._id}`}>
                    <button className="py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 px-3.5">
                      View Details
                    </button>
                  </Link>

                  <button
                    onClick={() => handleAddToCart(item)}
                    className="py-2 bg-[#953E00] text-white font-semibold rounded-lg hover:bg-orange-700 px-3.5"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default Card;
