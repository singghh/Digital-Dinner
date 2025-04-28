const express = require("express");
const router = express.Router();
const pool = require("../models/order");

router.post("/", async (req, res) => {
  const { name, phone, cartItems, totalPrice } = req.body;

  // Basic validation
  if (!name || !phone || !cartItems || !cartItems.length || !totalPrice) {
    return res
      .status(400)
      .json({ message: "Please provide all required fields." });
  }

  try {
    const query = `
      INSERT INTO orders (name, phone, cart_items, total_price)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    const values = [name, phone, JSON.stringify(cartItems), totalPrice];

    const result = await pool.query(query, values);

    res.status(201).json({
      message: "Order placed successfully!",
      order: result.rows[0],
    });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ message: "Server error while placing order." });
  }
});

router.get("/:phone", async (req, res) => {
  const { phone } = req.params;

  try {
    const result = await pool.query(
      "SELECT * FROM orders WHERE phone = $1 ORDER BY created_at DESC",
      [phone]
    );

    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Server error while fetching orders." });
  }
});

module.exports = router;
