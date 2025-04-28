import React from "react";
import Hero from "./Components/UI/Hero";
import Card from "./Components/UI/Card";
import "./App.css";
import { CartProvider } from "./Components/UI/CartContext";
import Cart from "./Components/UI/Cart";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CardDetails from "./Components/UI/CardDetail";
import OrderHistory from "./Components/UI/OrderHistory";

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero />
                <Card />
              </>
            }
          />
          <Route path="/menu/:id" element={<CardDetails />} />
          <Route path="/Cart" element={<Cart />} />
          <Route path="/OrderHistory" element={<OrderHistory />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
