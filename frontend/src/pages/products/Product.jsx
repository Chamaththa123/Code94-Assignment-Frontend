import React, { useState, useEffect, useMemo } from "react";
import DataTable from "react-data-table-component";
import { tableHeaderStyles } from "../../utils/utils";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts, deleteProduct } from "../../redux/productSlice";
import { useNavigate } from "react-router-dom";
import { DeleteIcon, EditIcon, EyeIcon, StarredIcon } from "../../utils/icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DeleteModal } from "../../components/global/DeleteModal";
import { useLocation } from "react-router-dom";
import { clearSuccessMessage } from "../../redux/productSlice";
import { Loader } from "../../components/Loader";

export const Product = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { items, loading, error, successMessage } = useSelector(
    (state) => state.products
  );

  // Local state for managing favorites
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  );

  const [isModalOpen, setIsModalOpen] = useState(false);

  // Store selected product
  const [selectedProductId, setSelectedProductId] = useState(null);

  // Fetch products
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // keep favorites to localStorage
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // Handle favorites
  const toggleFavorite = (productId) => {
    setFavorites((prevFavorites) => {
      const isFavorite = prevFavorites.includes(productId);
      const updatedFavorites = isFavorite
        ? prevFavorites.filter((id) => id !== productId)
        : [...prevFavorites, productId];

      toast(isFavorite ? "Removed from favorites" : "Added to favorites", {
        type: isFavorite ? "warning" : "success",
      });

      return updatedFavorites;
    });
  };

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(clearSuccessMessage());
    }
  }, [successMessage, dispatch]);

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
        cell: (row) =>
          row.mainImageURL ? (
            <img
              src={row.mainImageURL}
              alt={row.product_name}
              style={{
                width: "70px",
                height: "auto",
                objectFit: "cover",
                borderRadius: "5px",
              }}
            />
          ) : (
            <div
              style={{
                width: "70px",
                height: "70px",
                backgroundColor: "#f0f0f0",
                borderRadius: "5px",
              }}
            />
          ),
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
            <button
              onClick={() => {
                setIsModalOpen(true);
                setSelectedProductId(row._id);
              }}
            >
              <DeleteIcon />
            </button>
            <button onClick={() => navigate(`/edit-product/${row._id}`)}>
              <EditIcon />
            </button>
            <button
              onClick={() => toggleFavorite(row._id)}
              className="text-center"
            >
              <StarredIcon
                color={favorites.includes(row._id) ? "#001EB9" : "white"}
              />
            </button>
            <button onClick={() => navigate(`/product-details/${row._id}`)}>
              <EyeIcon />
            </button>
          </div>
        ),
        center: true,
      },
    ],
    [favorites, navigate]
  );

  // Handle loading and error states
  if (loading) return <p><Loader/></p>;

  // Handle deleting product
  const handleDeleteProduct = () => {
    dispatch(deleteProduct(selectedProductId))
      .then(() => {
        setIsModalOpen(false);
        toast.success("Product deleted successfully");
      })
      .catch((error) => {
        toast.error("Error deleting product");
        setIsModalOpen(false);
      });
  };

  const closeModal = () => setIsModalOpen(false);

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

      <DeleteModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={handleDeleteProduct}
      />

      <ToastContainer />
    </div>
  );
};
