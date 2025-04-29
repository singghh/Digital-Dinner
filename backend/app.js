const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();


const menuRoutes = require("./routes/menuRoutes");
const orderRoutes = require("./routes/orderRoutes");

// Database connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((error) => console.error("MongoDB connection error:", error));

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is running! Digital Diner API is live.");
});
app.use("/api/menu", menuRoutes);
app.use("/api/orders", orderRoutes); 


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
