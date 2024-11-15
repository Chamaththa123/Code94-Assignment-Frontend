import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchProducts } from "../../redux/productSlice";
import { ArrowIcon } from "../../utils/icons";
import { Loader } from "../../components/Loader";
import { useNavigate } from "react-router-dom";

export const SearchProducts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Accessing the required state from Redux store
  const { filteredItems, loading, error, searchTerm } = useSelector(
    (state) => state.products
  );

  // Trigger the search when the component is loaded
  useEffect(() => {
    if (searchTerm) {
      dispatch(searchProducts(searchTerm));
      console.log("set", searchTerm);
    }
  }, [dispatch, searchTerm]);

  // Log the products
  useEffect(() => {
    if (filteredItems && filteredItems.length > 0) {
      console.log("result", filteredItems);
    }
  }, [filteredItems]);

  return (
    <div className="search-page">
      <div className="search-header text-[24px] font-medium text-[#969191] tracking-widest">
        {filteredItems?.length} results found
      </div>

      {loading && (
        <div>
          <Loader />
        </div>
      )}

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
                      <button
                        onClick={() =>
                          navigate(`/product-details/${product._id}`)
                        }
                      >
                        <ArrowIcon />
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="flex justify-center mt-5">
            No products found matching your search.
          </p>
        )}
      </div>
    </div>
  );
};
