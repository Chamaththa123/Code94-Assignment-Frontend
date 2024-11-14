import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchProductById, updateProduct } from "../../redux/productSlice";

export const ProductEdit = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { selectedProduct, loading, error } = useSelector(
    (state) => state.products
  );

  const [productData, setProductData] = useState({
    sku: "",
    quantity: "",
    productName: "",
    productDescription: "",
  });
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  console.log(imagePreviews)
  const [mainImageIndex, setMainImageIndex] = useState(null);

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (selectedProduct) {
      setProductData({
        sku: selectedProduct.sku,
        quantity: selectedProduct.quantity,
        productName: selectedProduct.product_name,
        productDescription: selectedProduct.product_description,
      });
      
      // Ensure selectedProduct.images is an array of File objects or image URLs
      setImages(selectedProduct.images || []);
      
      // Create object URLs only for File objects, otherwise use the image URL directly
      setImagePreviews(
        selectedProduct.images
          ? selectedProduct.images.map((img) => {
              // Check if img is a File object, otherwise use it as is (URL or base64)
              if (img instanceof File) {
                return URL.createObjectURL(img);
              }
              // If it's a URL or base64 string, use it directly
              return img; // Assuming it's already an image URL or base64
            })
          : []
      );
      
      // Set the main image index if available
      const mainImage = selectedProduct.images?.find((image) => image.isMain);
      setMainImageIndex(selectedProduct.images?.indexOf(mainImage));
    }
  }, [selectedProduct]);

  const handleInputChange = ({ target: { name, value } }) => {
    setProductData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageChange = ({ target: { files } }) => {
    const selectedFiles = Array.from(files);
    setImages((prevImages) => [...prevImages, ...selectedFiles]);
    setImagePreviews((prevPreviews) => [
      ...prevPreviews,
      ...selectedFiles.map((file) => URL.createObjectURL(file)),
    ]);
  };

  const handleSetMainImage = (index) => setMainImageIndex(index);

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
    setImagePreviews(imagePreviews.filter((_, i) => i !== index));
    if (mainImageIndex === index) setMainImageIndex(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("sku", productData.sku);
    formData.append("quantity", productData.quantity);
    formData.append("product_name", productData.productName);
    formData.append("product_description", productData.productDescription);

    images.forEach((image, index) => {
      formData.append("images", image);
      formData.append("isMain", index === mainImageIndex);
    });

    dispatch(updateProduct({ id, updatedData: formData }));
    navigate("/"); // Redirect to the product list page after updating
  };

  useEffect(() => {
    // Cleanup function to revoke object URLs when component unmounts
    return () => {
      imagePreviews.forEach((preview) => {
        // Check if preview is a string and starts with 'blob:' (object URL)
        if (typeof preview === 'string' && preview.startsWith('blob:')) {
          URL.revokeObjectURL(preview); // Revoke object URL to free up memory
        }
      });
    };
  }, [imagePreviews]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <form onSubmit={handleSubmit}>
      {["sku", "quantity", "productName"].map((field, idx) => (
        <div key={field} className={`flex gap-3 ${idx < 2 ? "mb-3" : "mb-4"}`}>
          <div className="w-[50%]">
            <label>
              {field === "sku"
                ? "Product SKU"
                : field === "productName"
                ? "Product Name"
                : "Quantity"}
            </label>
            <input
              type={field === "quantity" ? "number" : "text"}
              name={field}
              value={productData[field]}
              onChange={handleInputChange}
              className="bg-[#F7F7F7] w-full rounded-lg py-2"
              required
            />
          </div>
        </div>
      ))}

      <div className="flex gap-3 mb-3">
        <div className="w-[100%]">
          <label>Product Description</label>
          <textarea
            name="productDescription"
            value={productData.productDescription}
            onChange={handleInputChange}
            className="bg-[#F7F7F7] w-full rounded-lg py-2"
            rows="4"
            required
          />
        </div>
      </div>

      <div className="mb-3">
        <label>Product Images</label>
        <input
          type="file"
          multiple
          onChange={handleImageChange}
          className="bg-[#F7F7F7] w-full rounded-lg py-2"
        />
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
  {imagePreviews.map((preview, index) => (
    <div key={index} className="relative">
      <img
        src={preview} // Directly use preview here, as it will be an object URL or image URL
        alt={`Preview ${index + 1}`}
        className="w-24 h-24 object-cover rounded-lg"
      />
      <button
        type="button"
        onClick={() => removeImage(index)}
        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
      >
        &times;
      </button>
      <div className="flex items-center mt-1">
        <input
          type="radio"
          name="mainImage"
          checked={mainImageIndex === index}
          onChange={() => handleSetMainImage(index)}
        />
        <label className="ml-1">Set as Main</label>
      </div>
    </div>
  ))}
</div>


      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded-lg"
      >
        Update Product
      </button>
    </form>
  );
};
