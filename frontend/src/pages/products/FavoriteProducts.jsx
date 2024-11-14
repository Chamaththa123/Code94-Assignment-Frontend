import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../../redux/productSlice";
import { tableHeaderStyles } from "../../utils/utils";

export const FavoriteProducts = () => {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.products);
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  );
  const [favoriteItems, setFavoriteItems] = useState([]);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    const filteredItems = items.filter((item) => favorites.includes(item._id));
    setFavoriteItems(filteredItems);
  }, [items, favorites]);

  const TABLE_FAVORITES = [
    {
      name: "SKU",
      selector: (row) => row.sku,
      wrap: false,
      minWidth: "200px",
      sortable: true,
    },
    {
      name: "IMAGE",
      selector: (row) => {
        const mainImage = row.images.find((image) => image.isMain);
        return (
          <img
            src={mainImage ? `http://localhost:3000/${mainImage.path}` : "/default-image.jpg"}
            alt={row.product_name}
            style={{ width: "70px", height: "auto", objectFit: "cover", borderRadius: "5px" }}
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
      name: "PRICE",
      selector: (row) => row.price,
      right: true,
    },
    {
      name: "QUANTITY",
      selector: (row) => row.quantity,
      right: true,
    },
  ];

  return (
    <div className="mx-10">
      <h2>Favorite Products</h2>
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
    </div>
  );
};
