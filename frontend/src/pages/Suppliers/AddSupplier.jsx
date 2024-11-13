import { useState } from "react";
import axiosClient from "../../../axios-client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ProcessingIcon, AddCustomerIcon } from "../../utils/icons";
import { FormInput } from "../../components/global/FormInput";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export const AddSupplier = () => {
  const navigate = useNavigate();

  // Initial form data
  const [submitting, setSubmitting] = useState(false);
  const initialFormData = {
    Code: "",
    Name: "",
    Email: "",
    Contact_No: "",
  };

  // State variables for form data and errors
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const validate = (data) => {
    const errors = {};
    if (!data.Code) {
      errors.Code = "Code is required.";
    }
    if (!data.Name) {
      errors.Name = "Name is required.";
    }
    if (!data.Contact_No) {
      errors.Contact_No = "Contact Number is required.";
    }
    return errors;
  };

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    const validateErrors = validate(formData);
    setErrors(validateErrors);
    if (Object.keys(validateErrors).length === 0) {
      const result = await Swal.fire({
        text: "Are you sure you want to add the supplier?",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Save and Issue",
        cancelButtonText: "Cancel",
      });
      if (result.isConfirmed) {
        setSubmitting(true);
        try {
          axiosClient
            .post(`/supplier`, formData)
            .then((res) => {
              toast.success("Supplier added successfully !");
              setFormData(initialFormData);
            })
            .catch((error) => {
              setSubmitting(false);
              console.log(error);
              toast.error("Failed to add Supplier. Please try again.");
            });
          setSubmitting(false);
          navigate(`/suppliers`);
        } catch (error) {
          toast.error("Failed to add Supplier. Please try again.");
        }
      }
    } else {
      let errorMessage = "";
      Object.values(validateErrors).forEach((error) => {
        errorMessage += `${error}\n`;
      });
      Swal.fire({
        icon: "error",
        text: "Please fill out all required fields.",
        allowOutsideClick: false,
      });
    }
  };

  // Array of input items for rendering the form
  const inputItems = [
    {
      name: "Code*",
      inputName: "Code",
      type: "text",
      placeholder: "Type here....",
    },
    {
      name: " Name*",
      inputName: "Name",
      type: "text",
      placeholder: "Type here....",
    },

    {
      name: "Email",
      inputName: "Email",
      type: "email",
      placeholder: "Type here....",
    },
    {
      name: "Contact No ",
      inputName: "Contact No",
      type: "text",
    },
  ];

  return (
    <>
      <section className="pb-12 mt-8">
        <div className="w-full bg-white rounded-[15px] md:px-[30px] px-[4%] pt-[20px] pb-[40px]">
          <div className="flex items-center gap-4">
            <AddCustomerIcon />
            <span className="font-satoshi  font-medium text-[16px] md:text-[22px] leading-8 md:leading-[30px] text-[#64728C] mt-1">
              New Supplier
            </span>
          <div className="font-satoshi font-bold text-[36px]">FAVOURITE PRODUCTS</div>

          </div>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col items-start w-full gap-3 mt-6 md:flex-row md:gap-20 md:mt-10">
              {inputItems.slice(0, 2).map((item, itemIndex) => {
                return (
                  <div className="md:w-[30%] w-full mb-3" key={itemIndex}>
                    <FormInput
                      data={formData}
                      type={item.type}
                      errors={errors}
                      handleChange={handleChange}
                      name={item.name}
                      inputName={item.inputName}
                      placeholder={item.placeholder}
                    />
                  </div>
                );
              })}
            </div>
            <div className="flex flex-col items-start w-full gap-3 mt-3 md:flex-row md:gap-20 md:mt-5">
              {inputItems.slice(2, 3).map((item, itemIndex) => {
                return (
                  <div className="md:w-[30%] w-full mb-3" key={itemIndex}>
                    <FormInput
                      data={formData}
                      type={item.type}
                      errors={errors}
                      handleChange={handleChange}
                      name={item.name}
                      inputName={item.inputName}
                      placeholder={item.placeholder}
                    />
                  </div>
                );
              })}
              <div className="md:w-[30%] w-full mb-3">
                <div className="w-full">
                  <p className="font-poppins text-[14px] md:text-[16px] leading-[24px] font-medium text-[#64728C]">
                    Contact Number*
                  </p>
                  <input
                    name="Contact Number"
                    type="text"
                    className="block rounded-[15px] focus:outline-[#bdbdbd] border-0 py-2.5 pl-3 text-gray-900 ring-1 ring-inset mt-2 ring-gray-300 placeholder:text-[#64728C]-400 placeholder:text-[14px] md:placeholder:text-[14px] placeholder:poppins focus:ring-1 focus:ring-inset sm:leading-6 w-full text-[14px] md:text-[15px] font-normal font-poppins"
                    value={formData.Contact_No}
                    onChange={(e) => {
                      const inputValue = e.target.value;
                      const isNumericInput = /^\d+$/.test(inputValue);

                      if (isNumericInput || inputValue === "") {
                        setFormData({
                          ...formData,
                          Contact_No: inputValue,
                        });
                        setErrors((prevErrors) => ({
                          ...prevErrors,
                          Contact_No: "",
                        }));
                      } else {
                        setErrors((prevErrors) => ({
                          ...prevErrors,
                          Contact_No: "Please enter only phone number.",
                        }));
                      }
                    }}
                    placeholder="Type here...."
                  />
                  {errors.Contact_No && (
                    <p className="pt-1 text-xs font-medium text-red-500 font-poppins">
                      {errors.Contact_No}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="font-poppins font-normal text-[12px] leading-[18px] text-[#64728C] text-opacity-70 md:mt-5 mt-3">
              *Required Filed
            </div>
            <div className="flex justify-end gap-5 md:mt-0 mt-7">
              <button
                className="bg-white font-poppins text-[14px] font-semibold leading-[22px] px-4 py-2 rounded-[20px] min-w-[80px] hover:bg-[#263679] hover:text-white text-[#263679] border border-[#263679] transition-all duration-300 flex items-center gap-2 justify-center"
                type="button"
                onClick={() => {
                  setFormData(initialFormData);
                }}
              >
                Cancel
              </button>
              <button
                className="bg-[#263679] font-poppins text-[14px] font-semibold leading-[22px] px-4 py-2 rounded-[20px] min-w-[80px] hover:bg-[#374D66] hover:text-white text-white border border-[#263679] transition-all duration-300 flex items-center gap-2 justify-center"
                type="submit"
                disabled={submitting}
              >
                {submitting && <ProcessingIcon />}
                Save
              </button>
            </div>
          </form>
        </div>
      </section>
      <ToastContainer />
    </>
  );
};
