import React, { useEffect, useState, useMemo } from "react";
import { Tooltip } from "@material-tailwind/react";
import DataTable from "react-data-table-component";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../../redux/productSlice";
import { tableHeaderStyles } from "../../utils/utils";
import { DeleteIcon, EditIcon, StarredIcon } from "../../utils/icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export const FavoriteProducts = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.products);
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  );
  const [favoriteItems, setFavoriteItems] = useState([]);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    const filteredItems = items.filter((item) => favorites.includes(item._id));
    setFavoriteItems(filteredItems);
  }, [items, favorites]);

  // Modify toggleFavorite to only allow removal from favorites
  const toggleFavorite = (productId) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.includes(productId)) {
        // Only remove the product from favorites
        const updatedFavorites = prevFavorites.filter((id) => id !== productId);
        
        // Show toast notification
        toast("Removed from favorites", {
          type: "warning",
        });
        
        return updatedFavorites;
      }
      // If productId is not in favorites, do nothing
      return prevFavorites;
    });
  };

  const TABLE_FAVORITES = useMemo(
    () => [
      {
        name: "SKU",
        selector: (row) => row.sku,
        minWidth: "200px",
        sortable: true,
      },
      {
        name: "IMAGE",
        selector: (row) => {
          const mainImage =
            row.images?.find((image) => image.isMain)?.path ||
            "/default-image.jpg";
          return (
            <img
              src={`http://localhost:3000/${mainImage}`}
              alt={row.product_name}
              style={{
                width: "70px",
                height: "auto",
                objectFit: "cover",
                borderRadius: "5px",
              }}
            />
          );
        },
        maxWidth: "auto",
      },
      {
        name: "PRODUCT NAME",
        selector: (row) => row.product_name,
        minWidth: "200px",
      },
      {
        name: "QUANTITY",
        selector: (row) => row.quantity,
        center: true,
      },
      {
        name: "",
        cell: (row) => (
          <div className="flex gap-4">
            <Tooltip content="Delete Product">
              <button onClick={() => navigate(`/edit-product/${row._id}`)}>
                <DeleteIcon />
              </button>
            </Tooltip>
            <Tooltip content="Edit Product">
              <button onClick={() => navigate(`/edit-product/${row._id}`)}>
                <EditIcon />
              </button>
            </Tooltip>
            <Tooltip content="Remove from Favorites">
              <button
                onClick={() => toggleFavorite(row._id)}
                className="text-center"
              >
                <StarredIcon
                  color={favorites.includes(row._id) ? "#001EB9" : "white"}
                />
              </button>
            </Tooltip>
          </div>
        ),
        center: true,
      },
    ],
    [favorites, navigate]
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="mx-10">
      <DataTable
        columns={TABLE_FAVORITES}
        responsive
        data={favoriteItems}
        customStyles={tableHeaderStyles}
        className="mt-4"
        pagination
        paginationPerPage={5}
        paginationRowsPerPageOptions={[5, 10, 15]}
        paginationComponentOptions={{
          rowsPerPageText: "Entries per page:",
          rangeSeparatorText: "of",
        }}
        noDataComponent={<div className="text-center">No favorite products available</div>}
      />
      <ToastContainer />
    </div>
  );
};
