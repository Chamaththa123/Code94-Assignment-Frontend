import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { searchProducts } from "../redux/productSlice";
import {
  ArrowIcon,
  ProfileIcon,
  SearchIcon,
  StarredIcon,
} from "../utils/icons";
import { logout } from "../redux/authSlice";

export const Header = () => {
  // Accessing user data from the Redux store
  const { user } = useSelector((state) => state.auth);

  // Redux dispatch for dispatching actions
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();
  const { id } = useParams();
  const dropdownRef = useRef(null);
  const profileRef = useRef(null);

  const { filteredItems } = useSelector((state) => state.products);

  // Effect to handle clicks outside the dropdown and close it if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !profileRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (filteredItems.length > 0) {
      console.log("Search Results:", filteredItems);
    }
  }, [filteredItems]);

  // Handles the search button click
  const handleSearchClick = () => {
    if (searchTerm.trim()) {
      dispatch(searchProducts(searchTerm));
      dispatch(searchProducts(searchTerm));
      navigate("/search-results");
    }
  };

  // Function to get dynamic header text based on the current route
  const getHeaderText = () => {
    const path = location.pathname;
    if (path === "/add-product") return ["PRODUCTS", "Add new product"];
    if (path === "/") return ["PRODUCTS"];
    if (path === `/edit-product/${id}`) return ["PRODUCTS", "Edit Product"];
    if (path === `/product-details/${id}`) return ["PRODUCTS", "Product Details"];
    if (path === "/favorite-product") return ["FAVOURITE PRODUCTS"];
    if (path === "/search-results") return ["PRODUCTS"];
    return ["PRODUCTS", "All"];
  };

  const [mainTitle, subTitle] = getHeaderText();

  const handleProfileClick = () => {
    setDropdownOpen((prev) => !prev);
  };

  // Handles logout action
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <section>
      <div className="flex justify-end gap-4 items-center relative">
        <div className="font-semibold">{user}</div>
        <div
          onClick={handleProfileClick}
          ref={profileRef}
          className="cursor-pointer"
        >
          <ProfileIcon />
        </div>

        {dropdownOpen && (
          <div
            ref={dropdownRef}
            className="absolute top-10 right-0 bg-white border rounded shadow-lg py-2 w-[120px]"
          >
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        )}
      </div>

      <div className="flex items-center font-satoshi gap-2">
        <div className="font-bold text-[26px] md:text-[36px] text-[#162427] leading-[48.6px] tracking-widest">
          {mainTitle}
        </div>
        {subTitle && (
          <>
            <ArrowIcon className="mx-2 w-6 h-6 text-[#162427]" />
            <div className="font-bold text-[16px] md:text-[24px] text-[#001EB9] leading-[48.6px] tracking-wider">
              {subTitle}
            </div>
          </>
        )}
      </div>

      {location.pathname !== "/add-product" &&
        location.pathname !== `/edit-product/${id || ""}` && (
          <div className="md:flex md:justify-between py-8">
            <div className="relative md:w-[35%] full">
              <input
                type="text"
                className="bg-[#F7F7F7] w-full rounded-full px-5 md:py-[8px] py-[10px] text-[16px] border-none focus:outline-none focus:border-transparent"
                placeholder="Search for products"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                onClick={handleSearchClick}
                className="absolute right-[5px] top-1/2 font-satoshi text-[15px] font-medium transform -translate-y-1/2 bg-[#001EB9] w-[100px] text-white rounded-full px-[10px] py-[5px] flex items-center justify-center space-x-2"
              >
                <SearchIcon />
                <span>Search</span>
              </button>
            </div>
            <div className="flex justify-between gap-6 md:mt-0 mt-4">
              <button
                onClick={() => navigate("/add-product")}
                className="font-satoshi bg-[#001EB9] text-[15px] rounded-lg text-[#F7F7F7] font-medium md:w-[160px] w-full py-1"
              >
                New Product
              </button>
              <button
                onClick={() => navigate("/favorite-product")}
                className="font-satoshi bg-[#F7F7F7] border border-[#001EB9] rounded-lg font-bold w-[40px] h-[40px] flex items-center justify-center"
              >
                <StarredIcon color={"#001EB9"} />
              </button>
            </div>
          </div>
        )}
    </section>
  );
};
