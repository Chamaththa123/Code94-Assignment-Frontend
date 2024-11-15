import React, {
  useEffect,
  useRef,
  useState,
  useMemo,
  useCallback,
} from "react";
import DataTable from "react-data-table-component";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../../redux/productSlice";
import { tableHeaderStyles } from "../../utils/utils";
import { DeleteIcon, EditIcon, EyeIcon, StarredIcon } from "../../utils/icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { DeleteModal } from "../../components/global/DeleteModal";
import { Loader } from "../../components/Loader";

export const FavoriteProducts = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.products);
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);

  // Store selected product
  const [selectedProductId, setSelectedProductId] = useState(null);

  // Local state for managing favorites
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  );
  const toastShownRef = useRef(false);
  const [favoriteItems, setFavoriteItems] = useState([]);

  // Fetch products
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Sync favorites with localStorage
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // Update favoriteItems when favorites change
  useEffect(() => {
    const filteredItems = items.filter((item) => favorites.includes(item._id));
    setFavoriteItems(filteredItems);
  }, [items, favorites]);

  // Memoized function for toggling favorite status
  const toggleFavorite = useCallback((productId) => {
    setFavorites((prevFavorites) => {
      const isFavorite = prevFavorites.includes(productId);

      if (isFavorite) {
        const updatedFavorites = prevFavorites.filter((id) => id !== productId);
        if (!toastShownRef.current) {
          toast("Removed from favorites", { type: "warning" });
          toastShownRef.current = true;
          setTimeout(() => {
            toastShownRef.current = false;
          }, 300);
        }

        return updatedFavorites;
      } else {
        const updatedFavorites = [...prevFavorites, productId];

        if (!toastShownRef.current) {
          toast("Added to favorites", { type: "success" });
          toastShownRef.current = true;
          setTimeout(() => {
            toastShownRef.current = false;
          }, 300);
        }

        return updatedFavorites;
      }
    });
  }, []);

  // Table columns definition
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
    [favorites, navigate, toggleFavorite]
  );

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
        noDataComponent={
          <div className="text-center">No favorite products available</div>
        }
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
