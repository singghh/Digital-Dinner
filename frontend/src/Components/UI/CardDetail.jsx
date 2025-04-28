import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function CardDetails() {
  const { id } = useParams();
  const [itemDetails, setItemDetails] = useState(null);

  useEffect(() => {
    async function fetchItemDetails() {
      const response = await fetch(`http://localhost:5000/api/menu/${id}`);
      const data = await response.json();
      setItemDetails(data);
    }
    fetchItemDetails();
  }, [id]);

  if (!itemDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <div className="border border-gray-300 rounded-lg bg-white text-black shadow-md overflow-hidden">
        <div className="relative w-full h-[500px]">
          <img
            src={itemDetails.imageUrl}
            alt={itemDetails.name}
            className="w-full h-full object-cover rounded-t-lg"
          />
        </div>

        <div className="p-4 pt-0">
          <h3 className="text-xl font-semibold mt-2">{itemDetails.name}</h3>
          <p className="text-sm text-gray-600 mt-2">
            {itemDetails.description}
          </p>
          <div className="mt-4 font-bold text-lg">₹{itemDetails.price}</div>
        </div>
      </div>
    </div>
  );
}

export default CardDetails;
