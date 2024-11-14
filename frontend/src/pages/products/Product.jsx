import React, { useState, useEffect, useMemo } from "react";
import { Tooltip } from "@material-tailwind/react";
import DataTable from "react-data-table-component";
import { tableHeaderStyles } from "../../utils/utils";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../../redux/productSlice";
import { useNavigate } from "react-router-dom";
import { DeleteIcon, EditIcon, StarredIcon } from "../../utils/icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Product = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.products);
  const navigate = useNavigate();

  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  );

  // Fetch products on component mount
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Persist favorites to localStorage when favorites array changes
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // Handle toggling favorites and show toast notification
  const toggleFavorite = (productId) => {
    setFavorites((prevFavorites) => {
      const isFavorite = prevFavorites.includes(productId);
      const updatedFavorites = isFavorite
        ? prevFavorites.filter((id) => id !== productId)
        : [...prevFavorites, productId];

      // Show toast notification
      toast(isFavorite ? "Removed from favorites" : "Added to favorites", {
        type: isFavorite ? "warning" : "success",
      });

      return updatedFavorites;
    });
  };

  // Define table columns
  const columns = useMemo(
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
            <Tooltip content="Favorite Product">
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

  // Handle loading and error states
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="mx-10">
      <DataTable
        columns={columns}
        data={items}
        customStyles={tableHeaderStyles}
        responsive
        pagination
        paginationPerPage={5}
        paginationRowsPerPageOptions={[5, 10, 15]}
        paginationComponentOptions={{
          rowsPerPageText: "Entries per page:",
          rangeSeparatorText: "of",
        }}
        noDataComponent={<div className="text-center">No data available</div>}
      />
      <ToastContainer />
    </div>
  );
};
