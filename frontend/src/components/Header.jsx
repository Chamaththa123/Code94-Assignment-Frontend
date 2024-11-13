import React from "react";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();

  const handleNewProductClick = () => {
    navigate("/add-product");
  };

  return (
    <section>
      <div className="font-satoshi font-bold text-[36px] text-[#162427] leading-[48.6px] tracking-wider">
        PRODUCT
      </div>

      <div className="flex justify-between py-8">
        <div className="relative w-[500px]">
          <input
            type="text"
            className="bg-[#F7F7F7] w-full rounded-full px-5 py-[10px] text-[16px] border-none focus:outline-none focus:border-transparent"
            placeholder="Search for products"
          />
          <button className="absolute right-2 top-1/2 font-satoshi transform -translate-y-1/2 bg-[#001EB9] w-[150px] text-white rounded-full px-4 py-1">
            Search
          </button>
        </div>
        <div className="flex justify-between gap-6">
          <button
            onClick={handleNewProductClick}
            className="font-satoshi bg-[#001EB9] rounded-lg text-[#F7F7F7] font-bold w-[200px] py-1"
          >
            New Product
          </button>
          <button className="font-satoshi bg-[#F7F7F7] border-1 border-[#001EB9] rounded-lg font-bold w-[40px] py-1">
            *
          </button>
        </div>
      </div>
    </section>
  );
};
