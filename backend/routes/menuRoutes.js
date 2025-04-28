const express = require("express");
const router = express.Router();

// Import the MenuItem model
const MenuItem = require("../models/menu");

router.get("/", async (req, res) => {
  try {
    const { category } = req.query;

    let menuItems;
    if (category) {
      menuItems = await MenuItem.find({ category });
    } else {
      menuItems = await MenuItem.find();
    }

    res.status(200).json(menuItems);
  } catch (error) {
    console.error("Error fetching menu items:", error);
    res
      .status(500)
      .json({ message: "Server error while fetching menu items." });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const menuItem = await MenuItem.findById(req.params.id);

    if (!menuItem) {
      return res.status(404).json({ message: "Menu item not found" });
    }

    res.status(200).json(menuItem);
  } catch (error) {
    console.error("Error fetching menu item by ID:", error);
    res.status(500).json({ message: "Server error while fetching menu item." });
  }
});

module.exports = router;
