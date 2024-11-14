import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchProducts } from "../../redux/productSlice";

export const SearchProducts = () => {
  const dispatch = useDispatch();
  const { filteredItems, loading, error, searchTerm } = useSelector(
    (state) => state.products
  );

  // Trigger the search when the component is loaded or searchTerm changes
  useEffect(() => {
    if (searchTerm) {
      dispatch(searchProducts(searchTerm));
    }
  }, [dispatch, searchTerm]); // Fetch products when the search term changes

  // Log the products (filteredItems) after they've been updated
  useEffect(() => {
    if (filteredItems && filteredItems.length > 0) {
      console.log("Search Results:", filteredItems);
    }
  }, [filteredItems]); // This will run whenever filteredItems are updated

  return (
    <div className="search-page">
      <h1>Search results for: {searchTerm}</h1>

      {loading && <div>Loading...</div>}

      {error && <div className="error-message">{error}</div>}

      <div className="search-results">
        {filteredItems?.length > 0 ? (
          <ul>
            {filteredItems.map((product) => (
              <li key={product._id}>
                <h3>{product.product_name}</h3>
                <p>{product.product_description}</p>
                <img
                  src={product.images[0]?.path || "/default-image.jpg"}
                  alt={product.product_name}
                  className="product-image"
                />
              </li>
            ))}
          </ul>
        ) : (
          <p>No products found matching your search.</p>
        )}
      </div>
    </div>
  );
};
