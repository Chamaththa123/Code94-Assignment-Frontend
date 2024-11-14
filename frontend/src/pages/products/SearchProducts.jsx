import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchProducts } from "../../redux/productSlice";
import { ArrowIcon } from "../../utils/icons";

export const SearchProducts = () => {
  const dispatch = useDispatch();
  const { filteredItems, loading, error, searchTerm } = useSelector(
    (state) => state.products
  );

  // Trigger the search when the component is loaded or searchTerm changes
  useEffect(() => {
    if (searchTerm) {
      dispatch(searchProducts(searchTerm));
      console.log('set', searchTerm);
    }
  }, [dispatch, searchTerm]);  // Fetch products when the search term changes

  // Log the products (filteredItems) after they've been updated
  useEffect(() => {
    if (filteredItems && filteredItems.length > 0) {
      console.log("Search Results:", filteredItems);
    }
  }, [filteredItems]); // This will run whenever filteredItems are updated

  return (
    <div className="search-page">
      <div className="search-header text-[24px] font-medium text-[#969191] tracking-widest">
        {searchTerm ? (
          <>
            {filteredItems?.length} results found for “{searchTerm}”
          </>
        ) : (
          <span>Please enter a search term.</span>
        )}
      </div>

      {loading && (
        <div className="loading-spinner flex justify-center items-center mt-5">
          <div className="spinner-border animate-spin border-t-4 border-blue-500 border-8 rounded-full w-12 h-12"></div>
        </div>
      )}

      {error && <div className="error-message text-red-500 mt-3">{error}</div>}

      <div className="md:mx-[10%] mx-[5%]">
        {filteredItems?.length > 0 ? (
          <ul>
            {filteredItems.map((product) => (
              <li key={product._id}>
                <div>
                  <div className="flex border-b border-[#969191]">
                  <div className="w-[90%]">
                  <div className="px-10 py-5">
                    <div className="text-[15px] text-[#001EB9] font-medium leading-8">
                      {product.sku}
                    </div>
                    <div className="text-[20px] text-[#162427] font-semibold leading-8">
                      {product.product_name}
                    </div>
                    <div className="text-[14px] text-[#969191] font-normal leading-8">
                      {product.product_description}
                    </div>
                  </div>
                  </div>
                  <div className="w-[10%] flex justify-center items-center">
<ArrowIcon/>
                  </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="flex justify-center mt-5">
            {searchTerm ? "No products found matching your search." : "Please enter a search term to find products."}
          </p>
        )}
      </div>
    </div>
  );
};
