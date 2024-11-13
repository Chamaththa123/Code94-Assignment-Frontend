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

export const Supplier = () => {
  const [suppliers, setSuppliers] = useState([]);

  const [supplierTableLoading, setSupplierTableLoading] = useState(false);
  const handleLoading = () => setSupplierTableLoading((pre) => !pre);

  const [filteredSuppliers, setFilteredSuppliers] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [supplierPerPage] = useState(10);

  const [expandedSupplierIndex, setExpandedSupplierIndex] = useState(null);

  // Pagination function
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const navigate = useNavigate();

  // Define status options
  const statusOptions = [
    { value: "", label: "All" },
    { value: "1", label: "Active" },
    { value: "0", label: "Inactive" },
    // Add more status options if needed
  ];

  //Fetching supplier details
  useEffect(() => {
    const fetchSupplier = () => {
      axiosClient
        .get(`/supplier`)
        .then((res) => {
          setSuppliers(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchSupplier();
  }, [supplierTableLoading]);

  // Handler for clicking edit button
  const handleEditClick = (supplier) => {
    navigate(`/supplier/edit/${supplier.idSupplier}`);
  };

  // Handler for search input changes
  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Filter supplier based on search query and status
  useEffect(() => {
    const filtered = suppliers.filter((supplier) => {
      const matchesSearch =
        supplier.Code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        supplier.Name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        supplier.Contact_No.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesSearch;
    });
    setFilteredSuppliers(filtered);
  }, [searchQuery, suppliers]);

  // Creating the table
  const TABLE_SUPPLIER = [
    {
      name: "Code",
      selector: (row) => row.Code,
      wrap: false,
      minWidth: "200px",
      cellStyle: {
        whiteSpace: "normal",
        wordBreak: "break-word",
      },
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => row.Name,
      wrap: false,
      maxWidth: "auto",
    },
    {
      name: "Email",
      selector: (row) => row.Email,
      wrap: false,
      minWidth: "200px",
    },

    {
      name: "Contact No",
      selector: (row) => row.Contact_No,
      wrap: false,
      maxWidth: "auto",
      right: true,
    },
    // {
    //   name: "Status",
    //   selector: (row) => (
    //     <div className="flex items-center justify-center">
    //       <div
    //         className={`font-poppins font-semibold text-center text-[11px] px-2 py-[2px] min-w-[70px] rounded-full cursor-pointer ${
    //           row.Status == "inactive"
    //             ? `bg-[#ffe6e6] text-[#FF5B5B]`
    //             : `bg-[#d9f3ea] text-[#00B074]`
    //         }`}
    //       >
    //         {row.Status == 0 ? "Inactive" : "Active"}
    //       </div>
    //     </div>
    //   ),
    //   wrap: false,
    //   maxWidth: "auto",
    //   center: true,
    // },
    {
      name: "Action",
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
    },
  ];

  // Mobile version row expand
  const handleExpandClick = (index) => {
    if (expandedSupplierIndex === index) {
      setExpandedSupplierIndex(null);
    } else {
      setExpandedSupplierIndex(index);
    }
  };

  return (
    <>
      {/* Desktop version */}
      <section className="hidden mt-8 md:block">
        <div className="w-full bg-white rounded-[15px] px-[30px] pt-[20px] pb-[40px]">
          <div className="flex flex-col mt-4 md:flex-row md:justify-left">
            <div className="w-full md:w-[250px] md:mr-5 mb-4 md:mb-0">
              <p className="font-poppins text-[14px] font-medium leading-[22px] text-[#64728C] pb-2">
                Search Supplier
              </p>
              <input
                type="text"
                placeholder="Type here...."
                value={searchQuery}
                onChange={handleSearchInputChange}
                className="border border-[#e6e8ed] focus:outline-[#bdbdbd] rounded-[15px] px-5 py-2 min-w-[250px] text-[15px] font-poppins font-medium leading-[22px]"
              />
            </div>
          </div>
        </div>
        <div className="w-full bg-white rounded-[15px] px-[30px] pt-[20px] pb-[20px] mt-10 relative">
          <Link
            className="w-[50px] aspect-square absolute rounded-full bg-[#76BC21] -top-5 -right-3 flex items-center justify-center cursor-pointer"
            to="/supplier/add"
          >
            <PlusIcon width={"24px"} color={"#FFFFFF"} />
          </Link>
          <DataTable
            columns={TABLE_SUPPLIER}
            responsive
            data={filteredSuppliers}
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
              <div className="text-center">No data available</div>
            }
            progressPending={supplierTableLoading}
          />
        </div>
      </section>

      {/* Mobile version */}
      <section className="mt-5 bg-white px-[3%] w-full rounded-[10px] py-3 md:hidden">
        <div className="flex justify-end">
          <Link
            className="w-[30px] aspect-square rounded-full bg-[#76BC21] -top-5 -right-3 flex items-center justify-center cursor-pointer"
            to="/supplier/add"
          >
            <PlusIcon width={"14px"} color={"#FFFFFF"} />
          </Link>
        </div>
        <div className="flex flex-col mt-3">
          <div className="w-full mb-4 md:w-1/5 md:mr-5 md:mb-0">
            <p className="font-poppins text-[14px] font-medium leading-[22px] text-[#64728C] pb-2">
              Search Supplier
            </p>
            <input
              type="text"
              placeholder="Type here...."
              value={searchQuery}
              onChange={handleSearchInputChange}
              className="border border-[#e6e8ed] focus:outline-[#bdbdbd] rounded-[15px] px-5 py-2 min-w-[250px] text-[15px] font-poppins font-medium leading-[22px]"
            />
          </div>
        </div>
        <div className="w-full pt-5">
          <div className="w-full bg-[#769EFF] bg-opacity-30 px-2 py-2 font-poppins font-medium text-[12px] leading-[18px] text-[#10275E] flex items-center gap-2">
            <ArrowDownIcon />
            Name
          </div>
          {filteredSuppliers
            .slice(
              (currentPage - 1) * supplierPerPage,
              currentPage * supplierPerPage
            )
            .map((supplier, index) => (
              <>
                <div
                  className="w-full flex items-center px-2 py-2 border-b border-[#64728C] border-opacity-10"
                  onClick={() => handleExpandClick(index)}
                >
                  <span className="w-[14px] aspect-square border border-[#64728C] rounded-full flex justify-center items-center mr-3">
                    {expandedSupplierIndex === index ? (
                      <MinusIcon width={"8px"} />
                    ) : (
                      <PlusIcon width={"8px"} color={"#64728C"} />
                    )}
                  </span>
                  <span className="font-poppins font-medium text-[12px] leading-[18px] text-[#64728C]">
                    {supplier.Name}
                  </span>
                </div>
                {expandedSupplierIndex === index && (
                  <div className="w-full pl-[35px] bg-[#D9D9D9] bg-opacity-20">
                    <div className="w-full py-2 font-poppins font-medium text-[12px] leading-[18px] text-[#64728C] border-b border-[#64728C] border-opacity-10">
                      {supplier.Name}
                    </div>
                    <div className="w-full flex items-center py-2 border-b border-[#64728C] border-opacity-10">
                      <div className="w-[40%] font-poppins font-medium text-[12px] leading-[18px] text-[#64728C]">
                        {TABLE_HEAD_SUPPLIER[0]}
                      </div>
                      <div className="w-[60%] font-poppins font-normal text-[12px] leading-[18px] text-wrap text-[#64728C]">
                        {supplier.Code}
                      </div>
                    </div>
                    <div className="w-full flex items-center py-2 border-b border-[#64728C] border-opacity-10">
                      <div className="w-[40%] font-poppins font-medium text-[12px] leading-[18px] text-[#64728C]">
                        {TABLE_HEAD_SUPPLIER[2]}
                      </div>
                      <div className="w-[60%] font-poppins font-normal text-[12px] leading-[18px] overflow-wrap break-word word-break break-all text-[#64728C]">
                        {supplier.Email}
                      </div>
                    </div>
                    <div className="w-full flex items-center py-2 border-b border-[#64728C] border-opacity-10">
                      <div className="w-[40%] font-poppins font-medium text-[12px] leading-[18px] text-[#64728C]">
                        {TABLE_HEAD_SUPPLIER[3]}
                      </div>
                      <div className="w-[60%] font-poppins font-normal text-[12px] leading-[18px] overflow-wrap break-word word-break break-all text-[#64728C]">
                        {supplier.Contact_No}
                      </div>
                    </div>
                    {/* <div className="w-full flex items-center py-2 border-b border-[#64728C] border-opacity-10">
                      <div className="w-[40%] font-poppins font-medium text-[12px] leading-[18px] text-[#64728C]">
                        {TABLE_HEAD_SUPPLIER[6]}
                      </div>
                      <div className="w-[60%] font-poppins font-medium text-[12px] leading-[18px]">
                        <div
                          className={`font-poppins text-center px-2 py-[2px] w-fit min-w-[60px] rounded-full cursor-pointer ${
                            supplier.status == 0
                              ? `bg-[#ffe6e6] text-[#FF5B5B]`
                              : `bg-[#d9f3ea] text-[#00B074]`
                          }`}
                          onClick={() => handleSupplierStatus(supplier)}
                        >
                          {supplier.status == 0 ? "Inactive" : "Active"}
                        </div>
                      </div>
                    </div> */}
                    <div className="w-full flex items-center py-2 border-b border-[#64728C] border-opacity-10">
                      <div className="w-[40%] font-poppins font-medium text-[12px] leading-[18px] text-[#64728C]">
                        {TABLE_HEAD_SUPPLIER[4]}
                      </div>
                      <div className="w-[60%] flex items-center gap-2">
                        <button
                          onClick={() => handleEditClick(supplier)}
                          variant="text"
                          className="bg-transparent"
                        >
                          <EditNewIcon />
                        </button>
                      </div>
                    </div>
                    {/* <div className="flex items-center w-full py-2">
                      <div className="w-[40%] font-poppins font-medium text-[12px] leading-[18px] text-[#64728C]">
                        {TABLE_HEAD_SUPPLIER[8]}
                      </div>
                      <div className="w-[60%] flex items-center gap-2">
                        <button
                          onClick={() => handleEditClick(supplier)}
                          variant="text"
                          className="bg-white"
                        >
                          <EditNewIcon />
                        </button>
                      </div>
                    </div> */}
                  </div>
                )}
              </>
            ))}
        </div>
        <div className="flex justify-end gap-4 mt-10">
          <span className="font-poppins font-medium text-[10px] text-[#64728C]">
            Page {currentPage} of{" "}
            {Math.ceil(filteredSuppliers.length / supplierPerPage)}
          </span>
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <PaginateLeft />
          </button>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={
              currentPage ===
              Math.ceil(filteredSuppliers.length / supplierPerPage)
            }
          >
            <PaginateRight />
          </button>
        </div>
      </section>

      <ToastContainer />
    </>
  );
};
