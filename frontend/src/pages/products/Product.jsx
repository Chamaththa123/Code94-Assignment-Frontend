import React, { useState, useEffect } from "react";
import { IconButton, Tooltip } from "@material-tailwind/react";
import Select from "react-select";
import {
  EditNewIcon,
  PlusIcon,
  MinusIcon,
  PaginateLeft,
  PaginateRight,
  ArrowDownIcon,
} from "../../utils/icons";
import { TABLE_HEAD_SUPPLIER } from "../../utils/tableArray";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import DataTable from "react-data-table-component";
import { tableHeaderStyles } from "../../utils/utils";
import axiosClient from "../../../axios-client";

export const Product = () => {
    const [suppliers, setSuppliers] = useState([]);

    useEffect(() => {
        const fetchSupplier = () => {
          axiosClient
            .get(`/products`)
            .then((res) => {
              setSuppliers(res.data);
            })
            .catch((error) => {
              console.log(error);
            });
        };
        fetchSupplier();
      }, []);
    
      const handleEditClick = (supplier) => {
        navigate(`/supplier/edit/${supplier.idSupplier}`);
      };


       // Creating the table
  const TABLE_SUPPLIER = [
    {
      name: "SKU",
      selector: (row) => row.sku,
      wrap: false,
      minWidth: "200px",
      cellStyle: {
        whiteSpace: "normal",
        wordBreak: "break-word",
      },
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
      wrap: false,
      minWidth: "200px",
    },

    {
      name: "PRICE",
      selector: (row) => row.quantity,
      wrap: false,
      maxWidth: "auto",
      right: true,
    },
    {
        name: "QUANTITY",
        selector: (row) => row.quantity,
        wrap: false,
        maxWidth: "auto",
        right: true,
      },
    {
      name: "",
      cell: (row) => (
        <>
          <Tooltip content="Edit Supplier">
            <IconButton
              onClick={() => handleEditClick(row)}
              variant="text"
              className="mx-2 bg-white"
            >
              <EditNewIcon />
            </IconButton>
          </Tooltip>
        </>
      ),
      center: true,
    },
  ];


  return (
    <div className="mx-10">
      <DataTable
            columns={TABLE_SUPPLIER}
            responsive
            data={suppliers}
            customStyles={tableHeaderStyles}
            className="mt-4"
            // pagination
            // paginationPerPage={5}
            // paginationRowsPerPageOptions={[5, 10, 15]}
            // paginationComponentOptions={{
            //   rowsPerPageText: "Entries per page:",
            //   rangeSeparatorText: "of",
            // }}
            noDataComponent={
              <div className="text-center">No data available</div>
            }
            // progressPending={supplierTableLoading}
          />
    </div>
  )
}
