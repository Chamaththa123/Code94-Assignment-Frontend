import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "../../redux/productSlice";
import { FormInput } from "../../components/global/FormInput";

export const AddProduct = () => {
  const [productData, setProductData] = useState({
    sku: "",
    quantity: "",
    productName: "",
    productDescription: "",
  });
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [mainImageIndex, setMainImageIndex] = useState(-1); // Instead of null

  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();

  const handleInputChange = (name, value) => {
    setProductData((prevData) => ({ ...prevData, [name]: value }));
    if (errors[name]) setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const handleImageChange = ({ target: { files } }) => {
    const selectedFiles = Array.from(files);
    setImages((prevImages) => {
      const newImages = [...prevImages, ...selectedFiles];
      // Automatically set the first image as the main image if it's the only image
      if (newImages.length === 1) {
        setMainImageIndex(0); // Set the first image as the main image
      }
      return newImages;
    });
    setImagePreviews((prevPreviews) => [
      ...prevPreviews,
      ...selectedFiles.map((file) => URL.createObjectURL(file)),
    ]);
    if (errors.images) setErrors((prevErrors) => ({ ...prevErrors, images: "" }));
  };
  
  
  

  const handleSetMainImage = (index) => {
    setMainImageIndex(index);
  };
  

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
    setImagePreviews(imagePreviews.filter((_, i) => i !== index));
    if (mainImageIndex === index) setMainImageIndex(null);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!productData.sku) newErrors.sku = "SKU is required";
    if (!productData.productName) newErrors.productName = "Product Name is required";
    if (!productData.quantity) newErrors.quantity = "Quantity is required";
    if (!productData.productDescription) newErrors.productDescription = "Product Description is required";
    if (images.length === 0) newErrors.images = "At least one image is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
  
    const formData = new FormData();
    formData.append("sku", productData.sku);
    formData.append("quantity", productData.quantity);
    formData.append("product_name", productData.productName);
    formData.append("product_description", productData.productDescription);
  
    images.forEach((image, index) => {
      formData.append("images", image);
      // Automatically mark the only image or main selected image as main
      const isMain = (index === mainImageIndex || images.length === 1) ? "true" : "false";
      formData.append("isMain", isMain);
    });
  
    dispatch(addProduct(formData));
    setProductData({
      sku: "",
      quantity: "",
      productName: "",
      productDescription: "",
    });
    setImages([]);
    setImagePreviews([]);
    setMainImageIndex(-1); // Reset to -1 if no main image is set
    setErrors({});
  };
  
  
  

  const inputFields = [
    { name: "Product SKU", inputName: "sku", type: "text", placeholder: "Enter SKU" },
    { name: "Product Name", inputName: "productName", type: "text", placeholder: "Enter product name" },
    { name: "Quantity", inputName: "quantity", type: "number", placeholder: "Enter quantity" },
  ];

  return (
    <form onSubmit={handleSubmit} className="mx-[5%] my-[4%]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-20 mb-4">
        {inputFields.slice(0, 1).map((field) => (
          <FormInput
            key={field.inputName}
            name={field.name}
            inputName={field.inputName}
            type={field.type}
            data={productData}
            handleChange={handleInputChange}
            errors={errors}
            placeholder={field.placeholder}
          />
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-20 mb-4">
        {inputFields.slice(1, 3).map((field) => (
          <FormInput
            key={field.inputName}
            name={field.name}
            inputName={field.inputName}
            type={field.type}
            data={productData}
            handleChange={handleInputChange}
            errors={errors}
            placeholder={field.placeholder}
          />
        ))}
      </div>
      <div className="mb-3">
        <label className="font-medium font-satoshi">Product Description</label>
        <div className="font-normal text-[14px] text-[#969191] font-satoshi">
          A small description about the product
        </div>
        <textarea
          name="productDescription"
          value={productData.productDescription}
          onChange={(e) => handleInputChange("productDescription", e.target.value)}
          className="block w-full rounded-[5px] bg-[#F7F7F7] border-0 py-2.5 pl-3 text-gray-900 ring-1 ring-inset mt-2 ring-[#D0D5DD] placeholder:text-[#667085] placeholder:text-[14px] focus:ring-1 focus:ring-inset text-[14px]"
          rows="4"
        />
        {errors.productDescription && <p className="pt-1 text-xs font-medium text-red-500 font-satoshi">{errors.productDescription}</p>}
      </div>

      <div className="mb-3 flex items-center justify-start">
        <div>
          <label className="font-medium font-satoshi">Product Images</label>
          <div className="font-normal text-[14px] text-[#969191] font-satoshi w-[200px]">
            JPEG, PNG, SVG, or GIF (Maximum file size 50MB)
          </div>
        </div>
        <label
          onClick={() => document.getElementById("fileInput").click()}
          className="bg-[#F7F7F7] rounded-full py-2 px-4 cursor-pointer text-[#001EB9] font-medium"
        >
          Add Image
        </label>
        <input
          id="fileInput"
          type="file"
          multiple
          onChange={handleImageChange}
          className="hidden"
        />
        {errors.images && <p className="text-xs font-medium text-red-500 font-satoshi mt-2">{errors.images}</p>}
      </div>

      <div className="flex flex-wrap gap-2 mb-4 font-satoshi">
        {imagePreviews.map((preview, index) => (
          <div key={index} className="relative">
            <img src={preview} alt={`Preview ${index + 1}`} className="w-44 h-24 object-cover rounded-lg" />
            <button
              type="button"
              onClick={() => removeImage(index)}
              className="absolute top-1 right-1 bg-red-500 text-white text-[12px] rounded-full pt-[-3px] px-[6px]"
            >
              X
            </button>
            <div className="flex items-center mt-1">
              <input
                type="radio"
                name="mainImage"
                checked={mainImageIndex === index}
                onChange={() => handleSetMainImage(index)}
              />
              <label className="ml-1 text-[14px]">Set as Main</label>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-[#001EB9] text-white py-2 px-4 rounded-lg font-medium"
        >
          Add Product
        </button>
      </div>
    </form>
  );
};
