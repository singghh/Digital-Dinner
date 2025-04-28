import { Utensils } from "lucide-react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="relative overflow-hidden bg-gradient-to-r from-amber-900 to-amber-700 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="py-16 sm:py-24 lg:py-32">
            <div className="flex items-center mb-8">
              <Utensils className="h-8 w-8 mr-3" />
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold tracking-tight">
                Digital Diner
              </h1>
            </div>

            <p className="mt-6 max-w-lg text-xl sm:text-2xl font-light">
              Delicious food at your fingertips. Explore our menu and discover
              culinary delights.
            </p>
            <div className="flex gap-3">
              <div className="mt-10 flex items-center gap-x-6">
                <Button
                  onClick={() => navigate("/Cart")}
                  variant="contained"
                  sx={{
                    backgroundColor: "white",
                    color: "#78350F",
                    fontWeight: "500",
                  }}
                >
                  Your Cart
                </Button>
              </div>
              <div className="mt-10 flex items-center gap-x-6">
                <Button
                  onClick={() => navigate("/OrderHistory")}
                  variant="contained"
                  sx={{
                    backgroundColor: "white",
                    color: "#78350F",
                    fontWeight: "500",
                  }}
                >
                  Order History
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute inset-y-0 right-0 hidden lg:block w-1/3">
          <div className="h-full w-full bg-black/30 backdrop-blur-sm" />
        </div>
      </div>
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-2xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-center mt-8">
          Our Menu
        </h1>
        <p className="mt-2 max-w-lg text-lg sm:text-xl font-light text-center">
          Explore our carefully crafted dishes made with the finest ingredients
        </p>
      </div>
    </>
  );
};

export default HeroSection;
