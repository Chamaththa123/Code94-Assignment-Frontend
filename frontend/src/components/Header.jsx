import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { searchProducts } from "../redux/productSlice";

export const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Access products and filteredItems from Redux
  const { filteredItems, loading, error } = useSelector((state) => state.products);

  // Log filteredItems (search results) when they change
  useEffect(() => {
    if (filteredItems.length > 0) {
      console.log("Search Results:", filteredItems);
    }
  }, [filteredItems]); // This will run whenever filteredItems are updated

  const handleSearchClick = () => {
    if (searchTerm.trim()) {
      // Dispatch the search action
      dispatch(searchProducts(searchTerm));

      // Log the search term
      console.log("Search Term:", searchTerm);

      // Navigate to the search results page
      navigate("/search-results");
    }
  };

  return (
    <section>
      <div className="font-satoshi font-bold text-[36px] text-[#162427] leading-[48.6px] tracking-wider">
        PRODUCTS
      </div>

      <div className="flex justify-between py-8">
        <div className="relative w-[500px]">
          <input
            type="text"
            className="bg-[#F7F7F7] w-full rounded-full px-5 py-[10px] text-[16px] border-none focus:outline-none focus:border-transparent"
            placeholder="Search for products"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // Track the search term
          />
          <button
            onClick={handleSearchClick}
            className="absolute right-2 top-1/2 font-satoshi transform -translate-y-1/2 bg-[#001EB9] w-[150px] text-white rounded-full px-4 py-1"
          >
            Search
          </button>
        </div>
        <div className="flex justify-between gap-6">
          <button
            onClick={() => navigate("/add-product")}
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
